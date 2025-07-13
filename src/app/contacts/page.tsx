"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { FaGlobe } from "react-icons/fa6";

const countryCodes = [
  { code: '+39', country: 'Italy' },
  { code: '+55', country: 'Brazil' },
  { code: '+1', country: 'USA' },
  { code: '+44', country: 'UK' },
  { code: '+33', country: 'France' },
  { code: '+49', country: 'Germany' },
  { code: '+34', country: 'Spain' },
  // Adicione outros países conforme necessário
];

export default function Contacts() {
  const [showCodes, setShowCodes] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const [phone, setPhone] = useState('');

  const handleCodeSelect = (code: string) => {
    setSelectedCode(code);
    setShowCodes(false);
    setPhone(code + ' ');
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-20 flex justify-end items-center px-8 py-6">
        <div className="flex gap-8">
          <a href="/" className="text-gold hover:text-goldLight transition-colors font-medium">Home</a>
          <a href="/products" className="text-gold hover:text-goldLight transition-colors font-medium">Products</a>
          <a href="/contacts" className="text-gold hover:text-goldLight transition-colors font-medium">Contacts</a>
        </div>
      </nav>
      {/* Main Content */}
      <main className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/assets/PG-03_SEC-01_BACKGROUND.avif')" }}>
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="w-full max-w-4xl px-6 py-16 flex flex-col items-center justify-center relative z-10 min-h-[60vh]">
          <h1 className="text-6xl md:text-7xl font-light text-white mb-8 text-center font-sans" style={{letterSpacing: '0.01em'}}>Let's get in touch</h1>
          <p className="text-2xl md:text-2xl text-white text-center font-light max-w-3xl" style={{fontFamily: 'inherit'}}>
            Looking for high-quality marble products? Whether you have a question, need a quote, or want to discuss a custom project, we’re here to help. Reach out to us, and we’ll be happy to assist you.
          </p>
        </div>
      </main>
      {/* Legal Office & Social Media Section */}
      <section className="w-full min-h-screen bg-[#f1f1f1] py-16 px-4 flex flex-col items-center justify-center">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-start justify-center gap-16 md:gap-32 mx-auto min-h-[70vh]">
          {/* Legal Office */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h2 className="text-4xl md:text-5xl font-light text-zinc-800 mb-8 text-center md:text-left font-sans">Legal office</h2>
            <div className="w-[320px] h-[320px] rounded-xl overflow-hidden shadow-lg bg-zinc-300">
              <iframe
                title="Legal Office Map"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2992.049073964479!2d12.44573407644213!3d41.87772697124309!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x132f61a2e2e2e2e3%3A0x0!2sQuartiere%20XII%20Gianicolense%2C%20Roma!5e0!3m2!1spt-BR!2sit!4v1718460000000!5m2!1spt-BR!2sit"
              ></iframe>
            </div>
          </div>
          {/* Social Media */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h2 className="text-4xl md:text-5xl font-light text-zinc-800 mb-8 text-center md:text-left font-sans">Social Media</h2>
            <ul className="space-y-7 w-full">
              <li className="flex items-center gap-5">
                <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-10 h-10" />
                <span className="text-2xl text-zinc-700 font-light">+ 39 366 233 0000</span>
              </li>
              <li className="flex items-center gap-5">
                <img src="/icons/mail.svg" alt="Email" className="w-10 h-10" />
                <span className="text-2xl text-zinc-700 font-light">contact@travertino.com</span>
              </li>
              <li className="flex items-center gap-5">
                <img src="/icons/instagram.svg" alt="Instagram" className="w-10 h-10" />
                <span className="text-2xl text-zinc-700 font-light">@medistoneitaly</span>
              </li>
              <li className="flex items-center gap-5">
                <img src="/icons/facebook.svg" alt="Facebook" className="w-10 h-10" />
                <span className="text-2xl text-zinc-700 font-light">@medistones</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Contact Form Section */}
      <section className="w-full min-h-screen flex items-center justify-center py-20 px-2">
        <div className="bg-[#1E1E1E] rounded-3xl shadow-2xl max-w-2xl w-full mx-auto p-10 flex flex-col gap-8">
          <h1 className="text-5xl md:text-6xl font-light text-white mb-6 text-left font-sans">Contact us</h1>
          <form className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="firstName" className="text-white font-semibold text-lg">First name</label>
                <input id="firstName" name="firstName" type="text" placeholder="First name" className="rounded-2xl bg-transparent border border-gray-400 text-white px-5 py-3 focus:outline-none focus:border-gold placeholder-gray-400" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="lastName" className="text-white font-semibold text-lg">Last name</label>
                <input id="lastName" name="lastName" type="text" placeholder="Last name" className="rounded-2xl bg-transparent border border-gray-400 text-white px-5 py-3 focus:outline-none focus:border-gold placeholder-gray-400" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="email" className="text-white font-semibold text-lg">Email<span className="text-gold">*</span></label>
                <input id="email" name="email" type="email" required placeholder="Email" className="rounded-2xl bg-transparent border border-gray-400 text-white px-5 py-3 focus:outline-none focus:border-gold placeholder-gray-400" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="phone" className="text-white font-semibold text-lg">Phone</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" onClick={() => setShowCodes((v) => !v)}>
                    {/* Ícone de globo inline SVG */}
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#aaa" strokeWidth="2"/><path d="M2 12h20M12 2c2.5 2.5 2.5 17.5 0 20M12 2c-2.5 2.5-2.5 17.5 0 20" stroke="#aaa" strokeWidth="2"/></svg>
                  </span>
                  {showCodes && (
                    <ul className="absolute left-0 top-12 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-50 w-40 max-h-60 overflow-y-auto">
                      {countryCodes.map((c) => (
                        <li key={c.code} className="px-4 py-2 hover:bg-zinc-800 text-white cursor-pointer flex items-center gap-2" onClick={() => handleCodeSelect(c.code)}>
                          <span className="font-semibold">{c.code}</span>
                          <span className="text-xs text-zinc-300">{c.country}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <input id="phone" name="phone" type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="rounded-2xl bg-transparent border border-gray-400 text-white px-10 py-3 w-full focus:outline-none focus:border-gold placeholder-gray-400" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-white font-semibold text-lg">Message<span className="text-gold">*</span></label>
              <textarea id="message" name="message" required placeholder="Message" rows={4} className="rounded-2xl bg-transparent border border-gray-400 text-white px-5 py-3 focus:outline-none focus:border-gold placeholder-gray-400 resize-none" />
            </div>
            <button type="submit" className="mt-4 w-full rounded-2xl bg-[#333] text-white text-2xl font-semibold py-3 hover:bg-zinc-700 transition-colors">Submit</button>
          </form>
        </div>
      </section>
    </div>
  );
}
