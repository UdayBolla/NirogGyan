import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-slate-800 text-white shadow-lg py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="text-9xl font-bold font-sans tracking-wide">
          NirogGyan
        </Link>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link to="/" className="text-lg text-slate-300 hover:text-blue-400 transition-colors duration-300">
                Home
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;