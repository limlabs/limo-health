import express, { type Request, type Response, type NextFunction } from 'express'
import path from 'path'
import { getAppointments, saveAppointments } from './appointments.js'
import { getMedications, saveMedications } from './medications.js'
import { createServer } from 'http'
import fs from 'fs'

const app = express()
const server = createServer(app)

// Middleware
app.use(express.json())

// Set up CORS
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

// Determine the correct paths based on environment
const isProduction = process.env.NODE_ENV === 'production'
const distPath = isProduction 
  ? path.resolve(process.cwd())
  : path.join(process.cwd(), 'dist')

// Log environment info
console.log(`Environment: ${isProduction ? 'production' : 'development'}`)
console.log(`Current working directory: ${process.cwd()}`)
console.log(`Serving static files from: ${distPath}`)

// Log directory contents for debugging
console.log('Directory contents:')
require('child_process').execSync('ls -la', { stdio: 'inherit' })

// API routes must be defined before the static file serving
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ 
    status: 'ok', 
    environment: isProduction ? 'production' : 'development',
    cwd: process.cwd(),
    files: require('fs').readdirSync('.')
  })
})

// Serve static files
console.log('Setting up static file serving...')
app.use(express.static(distPath, { index: false }))
app.use('/assets', express.static(path.join(distPath, 'assets'))) 
console.log('Static file serving configured')

// Health check endpoint
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', environment: process.env.NODE_ENV || 'development' })
})

// API Routes
app.get('/api/appointments', async (_req: Request, res: Response) => {
  try {
    const appointments = await getAppointments()
    res.json(appointments)
  } catch (error) {
    console.error('Failed to read appointments:', error)
    res.status(500).json({ error: 'Failed to fetch appointments' })
  }
})

app.post('/api/appointments', async (req: Request, res: Response) => {
  try {
    await saveAppointments(req.body)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to save appointments' })
  }
})

app.get('/api/medications', async (_req: Request, res: Response) => {
  try {
    const medications = await getMedications()
    res.json(medications)
  } catch (error) {
    console.error('Error in GET /medications:', error)
    res.status(500).json({ error: 'Failed to fetch medications' })
  }
})

app.post('/api/medications', async (req: Request, res: Response) => {
  try {
    await saveMedications(req.body)
    res.json({ success: true })
  } catch (error) {
    res.status(500).json({ error: 'Failed to save medications' })
  }
})

// Client-side routing - must be the last route
app.use((req: Request, res: Response, next: NextFunction) => {
  // Skip API and asset requests
  if (req.path.startsWith('/api/') || req.path.startsWith('/assets/')) {
    return next();
  }
  
  const indexPath = path.join(distPath, 'index.html');
  
  // Check if index.html exists
  if (fs.existsSync(indexPath)) {
    res.sendFile(indexPath, (err) => {
      if (err) {
        console.error('Error sending file:', err);
        res.status(500).send('Error loading application');
      }
    });
  } else {
    res.status(500).send('Client application not built. Run `npm run build` first.');
  }
});

const PORT = process.env.PORT || 3000

// Start the server
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
  console.log(`Serving static files from: ${distPath}`)
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
})
