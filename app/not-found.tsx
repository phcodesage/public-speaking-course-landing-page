"use client";

import Link from 'next/link';
import { Home, AlertCircle } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-8" style={{ backgroundColor: '#fbeceb' }}>
          <AlertCircle className="w-12 h-12" style={{ color: '#ca3433' }} />
        </div>
        
        <h1 className="text-5xl md:text-6xl font-extrabold mb-4 tracking-tight" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
          404
        </h1>
        
        <h2 className="text-2xl md:text-3xl font-bold mb-6" style={{ color: '#0e1f3e', fontFamily: 'Montserrat, sans-serif' }}>
          Page Not Found
        </h2>
        
        <p className="text-lg text-gray-600 mb-10 max-w-lg mx-auto">
          Oops! The page you are looking for does not exist. It might have been moved or deleted.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white text-lg transition-transform duration-300 hover:scale-[1.02] shadow-md hover:shadow-lg"
          style={{ backgroundColor: '#ca3433', fontFamily: 'Montserrat, sans-serif' }}
        >
          <Home className="w-5 h-5" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
