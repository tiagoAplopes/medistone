"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

export default function Home() {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <div className="relative min-h-screen">
        {/* Navbar */}
        <nav className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-4">
          <div className="flex items-center">
            <span className="text-white text-2xl font-bold">MEDSTONE</span>
          </div>
          
          <div className="flex gap-8">
            <a href="#sobre" className="text-white hover:text-gray-300 transition-colors">
              Sobre nós
            </a>
            <a href="#produtos" className="text-white hover:text-gray-300 transition-colors">
              Produtos
            </a>
            <a href="#contato" className="text-white hover:text-gray-300 transition-colors">
              Contato
            </a>
          </div>
        </nav>

        {/* Video background section */}
        <div className="absolute inset-0 w-full h-screen">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
          >
            <source src="/home.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Content overlay */}
        <div className="relative z-10 flex min-h-screen bg-black/30">
          <div className="absolute bottom-12 left-8">
            <a
              href="#produtos"
              className="rounded-full bg-white text-black px-8 py-3 text-lg font-semibold hover:bg-opacity-90 transition-all"
            >
              Ver produtos
            </a>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <section id="produtos" className="min-h-screen bg-white py-20 px-8">
        <h2 className="text-4xl font-bold text-center mb-16">Produtos</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {/* Product Cards */}
          <a href="/produto/1" className="h-64 w-64 mx-auto bg-gray-200 rounded-lg hover:shadow-xl transition-shadow cursor-pointer" />
          <a href="/produto/2" className="h-64 w-64 mx-auto bg-gray-200 rounded-lg hover:shadow-xl transition-shadow cursor-pointer" />
          <a href="/produto/3" className="h-64 w-64 mx-auto bg-gray-200 rounded-lg hover:shadow-xl transition-shadow cursor-pointer" />
          <a href="/produto/4" className="h-64 w-64 mx-auto bg-gray-200 rounded-lg hover:shadow-xl transition-shadow cursor-pointer" />
          <a href="/produto/5" className="h-64 w-64 mx-auto bg-gray-200 rounded-lg hover:shadow-xl transition-shadow cursor-pointer" />
          <a href="/produto/6" className="h-64 w-64 mx-auto bg-gray-200 rounded-lg hover:shadow-xl transition-shadow cursor-pointer" />
        </div>
      </section>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-black text-white p-4 rounded-full shadow-lg hover:bg-gray-800 transition-all z-50"
        >
          ↑
        </button>
      )}
    </>
  );
}
