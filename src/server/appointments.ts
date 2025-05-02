import { promises as fs } from 'fs'
import path from 'path'
import { encrypt, decrypt, isEncrypted } from './crypto'

const APPOINTMENTS_FILE = path.resolve(process.cwd(), 'src/data/appointments.json')

async function ensureFileExists() {
  try {
    await fs.access(APPOINTMENTS_FILE)
  } catch {
    await fs.mkdir(path.dirname(APPOINTMENTS_FILE), { recursive: true })
    // Initialize with encrypted empty array
    const encryptedData = await encrypt([])
    await fs.writeFile(APPOINTMENTS_FILE, encryptedData, 'utf8')
  }
}

export async function getAppointments() {
  await ensureFileExists()
  try {
    const data = await fs.readFile(APPOINTMENTS_FILE, 'utf8')
    
    // Handle both encrypted and non-encrypted data (for backward compatibility)
    if (isEncrypted(data)) {
      return await decrypt(data)
    } else {
      // If data is not encrypted yet, parse it normally
      // This helps with transition to encrypted format
      const parsedData = JSON.parse(data)
      
      // Encrypt the data for future use
      const encryptedData = await encrypt(parsedData)
      await fs.writeFile(APPOINTMENTS_FILE, encryptedData, 'utf8')
      
      return parsedData
    }
  } catch (error) {
    console.error('Error reading appointments:', error)
    return []
  }
}

export async function saveAppointments(appointments: any[]) {
  await ensureFileExists()
  try {
    // Encrypt the appointments data
    const encryptedData = await encrypt(appointments)
    
    await fs.writeFile(
      APPOINTMENTS_FILE,
      encryptedData,
      'utf8'
    )
  } catch (error) {
    console.error('Error writing appointments:', error)
    throw error
  }
}
