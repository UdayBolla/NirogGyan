import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
  details: string;
  schedule: { date: string; times: string[] }[];
}

const DoctorProfilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/doctors/${id}`);
        if (!response.ok) {
          throw new Error('Doctor not found');
        }
        const data = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctor();
  }, [id]);

  if (loading) {
    return <div className="text-center p-8 text-xl text-gray-500">Loading doctor details...</div>;
  }

  if (!doctor) {
    return <div className="text-center p-8 text-xl text-red-500">Doctor not found.</div>;
  }

  return (
    <div className="container mx-auto p-4 max-w-4xl mt-10">
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <div className="flex flex-col md:flex-row items-center md:items-start mb-8 border-b pb-8">
          <img
            src={doctor.image}
            alt={doctor.name}
            className="w-40 h-40 rounded-full object-cover mb-6 md:mb-0 md:mr-10 border-4 border-blue-200"
          />
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-bold text-gray-800">{doctor.name}</h1>
            <p className="text-2xl text-blue-600 mt-2">{doctor.specialization}</p>
            <p className="text-gray-700 mt-4">{doctor.details}</p>
          </div>
        </div>

        <h2 className="text-3xl font-bold mt-8 mb-4 text-gray-800">Availability Schedule</h2>
        {doctor.schedule.length > 0 ? (
          doctor.schedule.map((slot) => (
            <div key={slot.date} className="mb-6">
              <h3 className="font-semibold text-xl text-gray-700">{new Date(slot.date).toDateString()}</h3>
              <div className="flex flex-wrap gap-3 mt-2">
                {slot.times.map((time) => (
                  <span
                    key={time}
                    className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-lg font-medium"
                  >
                    {time}
                  </span>
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No appointments available at this time.</p>
        )}

        <button
          onClick={() => navigate(`/book/${doctor.id}`)}
          className="mt-10 w-full bg-blue-600 text-white py-4 rounded-lg text-xl font-bold hover:bg-blue-700 transition-colors shadow-lg"
        >
          Book Appointment
        </button>
      </div>
    </div>
  );
};

export default DoctorProfilePage;