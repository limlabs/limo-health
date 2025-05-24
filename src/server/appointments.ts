import { promises as fs } from 'fs'
import path from 'path'

const APPOINTMENTS_FILE = path.resolve(process.cwd(), 'src/data/appointments.json')

async function ensureFileExists() {
  try {
    await fs.access(APPOINTMENTS_FILE)
  } catch {
    await fs.mkdir(path.dirname(APPOINTMENTS_FILE), { recursive: true })
    // Initialize with empty array
    await fs.writeFile(APPOINTMENTS_FILE, JSON.stringify([], null, 2), 'utf8')
  }
}

export async function getAppointments() {
  await ensureFileExists()
  try {
    const data = await fs.readFile(APPOINTMENTS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading appointments:', error)
    return []
  }
}

export async function saveAppointments(appointments: any[]) {
  await ensureFileExists()
  try {
    await fs.writeFile(
      APPOINTMENTS_FILE,
      JSON.stringify(appointments, null, 2),
      'utf8'
    )
  } catch (error) {
    console.error('Error writing appointments:', error)
    throw error
  }
}
