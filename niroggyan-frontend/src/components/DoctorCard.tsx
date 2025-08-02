import React from 'react';
import { Link } from 'react-router-dom';

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialization: string;
    image: string;
    availabilityStatus: string;
  };
}

const DoctorCard: React.FC<DoctorCardProps> = ({ doctor }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Available Today':
        return 'text-green-600';
      case 'Fully Booked':
        return 'text-red-600';
      case 'On Leave':
        return 'text-yellow-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex items-center p-6 bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300">
      <img
        src={doctor.image}
        alt={doctor.name}
        className="w-24 h-24 rounded-full object-cover mr-6 ring-4 ring-blue-400 ring-opacity-25 flex-shrink-0"
      />
      <div className="flex-grow">
        <h3 className="text-2xl font-bold text-slate-800">{doctor.name}</h3>
        <p className="text-slate-500 text-lg font-medium">{doctor.specialization}</p>
        <p className={`mt-2 font-semibold text-lg ${getStatusColor(doctor.availabilityStatus)}`}>
          {doctor.availabilityStatus}
        </p>
      </div>
      <Link to={`/doctor/${doctor.id}`} className="flex-shrink-0">
        <button className="bg-blue-600 text-white py-2 px-6 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-md">
          View Profile
        </button>
      </Link>
    </div>
  );
};

export default DoctorCard;