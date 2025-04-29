export async function readAppointments() {
  try {
    const response = await fetch('/api/appointments')
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error reading appointments:', error)
    return []
  }
}

export async function writeAppointments(appointments: any[]) {
  try {
    const response = await fetch('/api/appointments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      },
      body: JSON.stringify(appointments)
    })
    if (!response.ok) {
      throw new Error('Failed to save appointments')
    }
    // Force a fresh read after write
    await fetch('/api/appointments', {
      method: 'GET',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
  } catch (error) {
    console.error('Error writing appointments:', error)
    throw error
  }
}