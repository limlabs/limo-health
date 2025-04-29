import type { Plugin } from 'vite'
import { getAppointments, saveAppointments } from './appointments'

export function appointmentsPlugin(): Plugin {
  console.log('[APPOINTMENTS] Creating plugin...')
  return {
    name: 'appointments-api',
    configureServer(server) {
      console.log('[APPOINTMENTS] Configuring server...')
      server.middlewares.use(async (req, res, next) => {
        const url = new URL(req.url || '', `http://${req.headers.host}`)
        
        // Only handle /api/appointments requests
        if (url.pathname !== '/api/appointments') {
          return next()
        }

        // Set CORS headers
        res.setHeader('Access-Control-Allow-Origin', '*')
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST')
        res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

        // Handle preflight
        if (req.method === 'OPTIONS') {
          res.writeHead(204)
          res.end()
          return
        }

        // Handle GET
        if (req.method === 'GET') {
          try {
            const appointments = await getAppointments()
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(appointments))
          } catch (error) {
            console.error('Failed to read appointments:', error)
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Failed to read appointments' }))
          }
          return
        }

        // Handle POST
        if (req.method === 'POST') {
          try {
            const chunks: Buffer[] = []
            for await (const chunk of req) {
              chunks.push(chunk)
            }
            const data = Buffer.concat(chunks).toString()
            const appointments = JSON.parse(data)
            await saveAppointments(appointments)
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify({ success: true }))
          } catch (error) {
            console.error('Failed to save appointments:', error)
            res.statusCode = 500
            res.end(JSON.stringify({ error: 'Failed to save appointments' }))
          }
          return
        }

        // Handle unsupported methods
        res.statusCode = 405
        res.end(JSON.stringify({ error: 'Method not allowed' }))
      })
    }
  }
}
