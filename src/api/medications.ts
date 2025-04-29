export async function readMedications() {
  try {
    const response = await fetch('/api/medications')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error reading medications:', error)
    return []
  }
}

export async function writeMedications(medications: any[]) {
  try {
    const response = await fetch('/api/medications', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(medications)
    })
    if (!response.ok) {
      throw new Error('Failed to save medications')
    }
  } catch (error) {
    console.error('Error writing medications:', error)
    throw error
  }
}
