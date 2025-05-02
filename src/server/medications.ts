import { promises as fs } from 'fs'
import path from 'path'
import { encrypt, decrypt, isEncrypted } from './crypto'

const MEDICATIONS_FILE = path.resolve(process.cwd(), 'src/data/medications.json')

async function ensureFileExists() {
  try {
    await fs.access(MEDICATIONS_FILE)
  } catch {
    await fs.mkdir(path.dirname(MEDICATIONS_FILE), { recursive: true })
    // Initialize with encrypted empty array
    const encryptedData = await encrypt([])
    await fs.writeFile(MEDICATIONS_FILE, encryptedData, 'utf8')
  }
}

export async function getMedications() {
  await ensureFileExists()
  try {
    const data = await fs.readFile(MEDICATIONS_FILE, 'utf8')
    
    // Handle both encrypted and non-encrypted data (for backward compatibility)
    if (isEncrypted(data)) {
      return await decrypt(data)
    } else {
      // If data is not encrypted yet, parse it normally
      // This helps with transition to encrypted format
      const parsedData = JSON.parse(data)
      
      // Encrypt the data for future use
      const encryptedData = await encrypt(parsedData)
      await fs.writeFile(MEDICATIONS_FILE, encryptedData, 'utf8')
      
      return parsedData
    }
  } catch (error) {
    console.error('Error reading medications:', error)
    return []
  }
}

export async function saveMedications(medications: any[]) {
  await ensureFileExists()
  try {
    // Encrypt the medications data
    const encryptedData = await encrypt(medications)
    
    await fs.writeFile(MEDICATIONS_FILE, encryptedData, 'utf8')
  } catch (error) {
    console.error('Error saving medications:', error)
    throw error
  }
}
