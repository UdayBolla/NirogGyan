import React, { useState, useEffect, type FormEvent } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const AppointmentForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    patientName: '',
    email: '',
    appointmentDate: '',
    appointmentTime: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [doctorName, setDoctorName] = useState('the doctor');

  useEffect(() => {
    const fetchDoctor = async () => {
        try {
            const response = await fetch(`https://niroggyan-1.onrender.com/api/doctors/${id}`);
            if (response.ok) {
                const data = await response.json();
                setDoctorName(data.name);
            }
        } catch (error) {
            console.error('Error fetching doctor name:', error);
        }
    };
    fetchDoctor();
  }, [id]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!formData.patientName || !formData.email || !formData.appointmentDate || !formData.appointmentTime) {
      alert('Please fill out all fields.');
      return;
    }
    
    try {
      const response = await fetch('https://niroggyan-1.onrender.com/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, doctorId: id }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to book appointment');
      }
      
      const result = await response.json();
      console.log(result.message);
      setIsSubmitted(true);
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert('Failed to book appointment. Please try again.');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  if (isSubmitted) {
    return (
      <div className="container mx-auto p-8 max-w-md text-center bg-green-100 rounded-lg shadow-md mt-10">
        <h2 className="text-2xl font-bold text-green-700">Appointment Confirmed!</h2>
        <p className="mt-4 text-green-600">
          Thank you, {formData.patientName}. Your appointment with {doctorName} has been successfully booked.
        </p>
        <p className="text-green-600">
          A confirmation email will be sent to {formData.email}.
        </p>
        <button
          onClick={() => navigate('/')}
          className="mt-6 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Go to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-md bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-6">Book an Appointment with {doctorName}</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="patientName" className="block text-gray-700 font-semibold mb-2">
            Patient Name
          </label>
          <input
            type="text"
            id="patientName"
            name="patientName"
            value={formData.patientName}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-2">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="appointmentDate" className="block text-gray-700 font-semibold mb-2">
            Date
          </label>
          <input
            type="date"
            id="appointmentDate"
            name="appointmentDate"
            value={formData.appointmentDate}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label htmlFor="appointmentTime" className="block text-gray-700 font-semibold mb-2">
            Time
          </label>
          <input
            type="time"
            id="appointmentTime"
            name="appointmentTime"
            value={formData.appointmentTime}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-bold hover:bg-blue-700 transition-colors"
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
};

export default AppointmentForm;
