import React, { useState, useEffect } from 'react';
import DoctorCard from '../components/DoctorCard';

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  image: string;
  availabilityStatus: string;
}

const LandingPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/doctors');
        if (!response.ok) {
          throw new Error('Failed to fetch doctors');
        }
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter(doctor =>
    doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doctor.specialization.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <div className="text-center mb-12 bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-5xl font-extrabold text-slate-800 mb-4">Find a Doctor</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Search for medical professionals by name or specialization to book an appointment.
        </p>
        <input
          type="text"
          placeholder="Search for a doctor or specialization..."
          className="mt-6 w-full max-w-xl p-4 border border-slate-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-inner text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      
      {loading ? (
        <div className="text-center text-slate-500 text-xl mt-10">Loading doctors...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map(doctor => (
              <DoctorCard key={doctor.id} doctor={doctor} />
            ))
          ) : (
            <div className="col-span-full text-center text-slate-500 text-lg">No doctors found matching your search.</div>
          )}
        </div>
      )}
    </div>
  );
};

export default LandingPage;