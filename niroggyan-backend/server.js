const express = require('express');
const cors = require('cors');
const doctors = require('./doctors.json'); // Import the mock data

const app = express();
const port = 5000; // Choose a port for your backend

// Middleware
app.use(cors()); // Enable CORS for the frontend
app.use(express.json()); // Enable JSON body parsing

// API Endpoints

// GET all doctors
app.get('/api/doctors', (req, res) => {
  res.json(doctors);
});

// GET a single doctor by ID
app.get('/api/doctors/:id', (req, res) => {
  const doctor = doctors.find(d => d.id === req.params.id);
  if (doctor) {
    res.json(doctor);
  } else {
    res.status(404).send('Doctor not found');
  }
});

// POST a new appointment
// This is a mock endpoint and doesn't actually save anything.
app.post('/api/appointments', (req, res) => {
  const newAppointment = req.body;
  console.log('New appointment received:', newAppointment);
  // In a real application, you would save this to a database.
  res.status(201).json({ message: 'Appointment booked successfully!', appointment: newAppointment });
});

// Start the server
app.listen(port, () => {
  console.log(`Backend server listening at http://localhost:${port}`);
});