// Simple script to trigger the encryption process by making API requests
// This uses the built-in fetch API which is available in modern Node.js

// Make a request to the appointments endpoint
fetch('http://localhost:5174/appointments')
  .then(response => response.json())
  .then(data => {
    console.log('Appointments data fetched, should trigger encryption on read');
    
    // Now make a request to the medications endpoint
    return fetch('http://localhost:5174/medications');
  })
  .then(response => response.json())
  .then(data => {
    console.log('Medications data fetched, should trigger encryption on read');
    console.log('Check your data files to see if they are now encrypted');
  })
  .catch(error => {
    console.error('Error:', error);
  });
