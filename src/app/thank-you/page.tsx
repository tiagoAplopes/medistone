"use client";

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';

export default function ThankYou() {
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.href = '/';
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative min-h-screen bg-black">
      {/* Navbar */}
      <Navigation showLogo={false} variant="default" />
      
      {/* Main Content */}
      <main className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/assets/PG-03_SEC-01_BACKGROUND.avif')" }}>
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/50 z-0"></div>
        
        <div className="w-full max-w-4xl px-6 py-16 flex flex-col items-center justify-center relative z-10 min-h-[80vh]">
          {/* Ícone de sucesso */}
          <div className="mb-8">
            <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center">
              <svg 
                className="w-12 h-12 text-white" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-josefin font-bold text-white mb-8 text-center" style={{letterSpacing: '0.01em'}}>
            Thank you!
          </h1>
          
          <div className="text-center max-w-3xl">
            <p className="text-2xl md:text-3xl text-white font-josefin font-light mb-6">
              Your message has been sent successfully
            </p>
            
            <p className="text-lg md:text-xl text-white/90 font-raleway font-light mb-8">
              We appreciate you reaching out to us. Our team will review your message and get back to you as soon as possible, typically within 24 hours.
            </p>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8">
              <p className="text-white font-raleway mb-4">
                You will be automatically redirected to the home page in:
              </p>
              <div className="text-4xl font-josefin font-bold text-white">
                {countdown} seconds
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/" 
                className="px-8 py-3 bg-white text-black font-raleway font-semibold rounded-2xl hover:bg-gray-100 transition-colors"
              >
                Return to Home
              </Link>
              <Link 
                href="/products" 
                className="px-8 py-3 bg-transparent border-2 border-white text-white font-raleway font-semibold rounded-2xl hover:bg-white hover:text-black transition-colors"
              >
                View Our Products
              </Link>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer Section */}
      <section className="w-full bg-[#1E1E1E] py-12 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-josefin font-light text-white mb-6">
            What happens next?
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-josefin font-bold text-white">1</span>
              </div>
              <h3 className="text-xl font-raleway font-semibold text-white mb-2">Review</h3>
              <p className="text-white/80 font-raleway">
                Our team will carefully review your message and requirements
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-josefin font-bold text-white">2</span>
              </div>
              <h3 className="text-xl font-raleway font-semibold text-white mb-2">Contact</h3>
              <p className="text-white/80 font-raleway">
                We'll reach out to you with a personalized response
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-josefin font-bold text-white">3</span>
              </div>
              <h3 className="text-xl font-raleway font-semibold text-white mb-2">Solution</h3>
              <p className="text-white/80 font-raleway">
                Together, we'll find the perfect marble solution for your project
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
