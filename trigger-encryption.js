// Simple script to trigger the encryption process
const fetch = require('node-fetch');

async function triggerEncryption() {
  try {
    // Get appointments (this will trigger encryption on read)
    console.log('Fetching appointments to trigger encryption...');
    const appointmentsResponse = await fetch('http://localhost:5174/appointments');
    const appointments = await appointmentsResponse.json();
    console.log('Appointments fetched and should now be encrypted');
    
    // Get medications (this will trigger encryption on read)
    console.log('Fetching medications to trigger encryption...');
    const medicationsResponse = await fetch('http://localhost:5174/medications');
    const medications = await medicationsResponse.json();
    console.log('Medications fetched and should now be encrypted');
    
    console.log('Encryption process completed. Check your data files and .env file.');
  } catch (error) {
    console.error('Error triggering encryption:', error);
  }
}

triggerEncryption();
