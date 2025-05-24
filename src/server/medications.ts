import { promises as fs } from 'fs'
import path from 'path'

const MEDICATIONS_FILE = path.resolve(process.cwd(), 'src/data/medications.json')

async function ensureFileExists() {
  try {
    await fs.access(MEDICATIONS_FILE)
  } catch {
    await fs.mkdir(path.dirname(MEDICATIONS_FILE), { recursive: true })
    // Initialize with empty array
    await fs.writeFile(MEDICATIONS_FILE, JSON.stringify([], null, 2), 'utf8')
  }
}

export async function getMedications() {
  await ensureFileExists()
  try {
    const data = await fs.readFile(MEDICATIONS_FILE, 'utf8')
    return JSON.parse(data)
  } catch (error) {
    console.error('Error reading medications:', error)
    return []
  }
}

export async function saveMedications(medications: any[]) {
  await ensureFileExists()
  try {
    await fs.writeFile(MEDICATIONS_FILE, JSON.stringify(medications, null, 2), 'utf8')
  } catch (error) {
    console.error('Error saving medications:', error)
    throw error
  }
}
