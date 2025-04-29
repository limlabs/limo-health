import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import { getAppointments, saveAppointments } from './appointments'
import { getMedications, saveMedications } from './medications'

const app = express()
app.use(express.json())

// Enable CORS
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// GET /api/appointments
app.get('/appointments', async (_req: Request, res: Response) => {
  try {
    const appointments = await getAppointments()
    res.json(appointments)
  } catch (error) {
    console.error('Failed to read appointments:', error)
    res.status(500).json({ error: 'Failed to read appointments' })
  }
})

// POST /api/appointments
app.post('/appointments', async (req: Request, res: Response) => {
  try {
    await saveAppointments(req.body)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to save appointments' })
  }
})

// GET /medications
app.get('/medications', async (_req: Request, res: Response) => {
  console.log('GET /medications called')
  try {
    console.log('Calling getMedications...')
    const medications = await getMedications()
    console.log('Got medications:', medications)
    res.json(medications)
  } catch (error) {
    console.error('Error in GET /medications:', error)
    res.status(500).json({ error: 'Failed to fetch medications' })
  }
})

// POST /medications
app.post('/medications', async (req: Request, res: Response) => {
  try {
    await saveMedications(req.body)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to save medications' })
  }
})

// Catch-all route for debugging
app.use((req: Request, res: Response) => {
  console.log('404 for URL:', req.url)
  console.log('Method:', req.method)
  console.log('Headers:', req.headers)
  res.status(404).send('Not found')
})

// Start the server
const port = 5174
app.listen(port, () => {
  console.log(`API server running on http://localhost:${port}`)
})
