"use client";

import React, { useState } from 'react';
import Image from "next/image";
import { FaGlobe } from "react-icons/fa6";
import Navigation from '@/components/Navigation';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [showCodes, setShowCodes] = useState(false);
  const [selectedCode, setSelectedCode] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');

  const handleCodeSelect = (code: string) => {
    setSelectedCode(code);
    setShowCodes(false);
    setPhone(code + ' ');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');
    setSubmitError('');

    const formData = new FormData(e.currentTarget);
    const data = {
      firstName: formData.get('firstName') as string,
      lastName: formData.get('lastName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    };

    try {
      const response = await fetch('/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitMessage(result.message);
        // Redirecionar para página de agradecimento após 2 segundos
        setTimeout(() => {
          router.push('/thank-you');
        }, 2000);
      } else {
        setSubmitError(result.error || 'Erro ao enviar mensagem. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitError('Erro de conexão. Verifique sua internet e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-black">
      {/* Navbar */}
      <Navigation showLogo={false} variant="default" />
      {/* Main Content */}
      <main className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center relative" style={{ backgroundImage: "url('/assets/PG-03_SEC-01_BACKGROUND.avif')" }}>
        {/* Overlay escuro */}
        <div className="absolute inset-0 bg-black/40 z-0"></div>
        <div className="w-full max-w-4xl px-6 py-16 flex flex-col items-center justify-center relative z-10 min-h-[60vh]">
          <h1 className="text-4xl md:text-6xl font-josefin font-bold text-white mb-8 text-center" style={{letterSpacing: '0.01em'}}>Let's get in touch</h1>
          <p className="text-2xl md:text-2xl text-white text-center font-josefin font-light max-w-3xl">
            Looking for high-quality marble products? Whether you have a question, need a quote, or want to discuss a custom project, we’re here to help. Reach out to us, and we’ll be happy to assist you.
          </p>
        </div>
      </main>
      {/* Legal Office & Social Media Section */}
      <section className="w-full min-h-screen bg-[#f1f1f1] py-16 px-4 flex flex-col items-center justify-center">
        <div className="max-w-6xl w-full flex flex-col md:flex-row items-start justify-center gap-16 md:gap-32 mx-auto min-h-[70vh]">
          {/* Legal Office */}
          <div className="flex-1 flex flex-col items-center md:items-start">
            <h2 className="text-4xl md:text-5xl font-josefin font-light text-zinc-800 mb-8 text-center md:text-left">Legal office</h2>
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
            <h2 className="text-4xl md:text-5xl font-josefin font-light text-zinc-800 mb-8 text-center md:text-left">Social Media</h2>
            <ul className="space-y-7 w-full">
              <li className="flex items-center gap-5">
                <img src="/icons/whatsapp.svg" alt="WhatsApp" className="w-10 h-10" />
                <span className="text-2xl text-zinc-700 font-raleway font-light">+ 39 366 233 0000</span>
              </li>
              <li className="flex items-center gap-5">
                <img src="/icons/mail.svg" alt="Email" className="w-10 h-10" />
                <span className="text-2xl text-zinc-700 font-raleway font-light">contact@travertino.com</span>
              </li>
              <li className="flex items-center gap-5">
                <img src="/icons/instagram.svg" alt="Instagram" className="w-10 h-10" />
                <span className="text-2xl text-zinc-700 font-raleway font-light">@medistoneitaly</span>
              </li>
              <li className="flex items-center gap-5">
                <img src="/icons/facebook.svg" alt="Facebook" className="w-10 h-10" />
                <span className="text-2xl text-zinc-700 font-raleway font-light">@medistones</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* Contact Form Section */}
      <section className="w-full min-h-screen flex items-center justify-center py-20 px-2">
        <div className="bg-[#1E1E1E] rounded-3xl shadow-2xl max-w-2xl w-full mx-auto p-10 flex flex-col gap-8">
          <h1 className="text-5xl md:text-6xl font-josefin font-light text-white mb-6 text-left">Contact us</h1>

          {/* Mensagens de feedback */}
          {submitMessage && (
            <div className="bg-green-600 text-white p-4 rounded-2xl font-raleway">
              {submitMessage}
            </div>
          )}
          {submitError && (
            <div className="bg-red-600 text-white p-4 rounded-2xl font-raleway">
              {submitError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="firstName" className="text-white font-raleway font-semibold text-lg">First name</label>
                <input id="firstName" name="firstName" type="text" placeholder="First name" className="rounded-2xl bg-transparent border border-gray-400 text-white px-5 py-3 focus:outline-none focus:border-gold placeholder-gray-400 font-raleway" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="lastName" className="text-white font-raleway font-semibold text-lg">Last name</label>
                <input id="lastName" name="lastName" type="text" placeholder="Last name" className="rounded-2xl bg-transparent border border-gray-400 text-white px-5 py-3 focus:outline-none focus:border-gold placeholder-gray-400 font-raleway" />
              </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="email" className="text-white font-raleway font-semibold text-lg">Email<span className="text-gold">*</span></label>
                <input id="email" name="email" type="email" required placeholder="Email" className="rounded-2xl bg-transparent border border-gray-400 text-white px-5 py-3 focus:outline-none focus:border-gold placeholder-gray-400 font-raleway" />
              </div>
              <div className="flex-1 flex flex-col gap-2">
                <label htmlFor="phone" className="text-white font-raleway font-semibold text-lg">Phone</label>
                <div className="relative flex items-center">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer" onClick={() => setShowCodes((v) => !v)}>
                    {/* Ícone de globo inline SVG */}
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="#aaa" strokeWidth="2"/><path d="M2 12h20M12 2c2.5 2.5 2.5 17.5 0 20M12 2c-2.5 2.5-2.5 17.5 0 20" stroke="#aaa" strokeWidth="2"/></svg>
                  </span>
                  {showCodes && (
                    <ul className="absolute left-0 top-12 bg-zinc-900 border border-zinc-700 rounded-xl shadow-lg z-50 w-40 max-h-60 overflow-y-auto">
                      {countryCodes.map((c) => (
                        <li key={c.code} className="px-4 py-2 hover:bg-zinc-800 text-white cursor-pointer flex items-center gap-2 font-raleway" onClick={() => handleCodeSelect(c.code)}>
                          <span className="font-semibold">{c.code}</span>
                          <span className="text-xs text-zinc-300">{c.country}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                  <input id="phone" name="phone" type="tel" placeholder="Phone" value={phone} onChange={e => setPhone(e.target.value)} className="rounded-2xl bg-transparent border border-gray-400 text-white px-10 py-3 w-full focus:outline-none focus:border-gold placeholder-gray-400 font-raleway" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="message" className="text-white font-raleway font-semibold text-lg">Message<span className="text-gold">*</span></label>
              <textarea id="message" name="message" required placeholder="Message" rows={4} className="rounded-2xl bg-transparent border border-gray-400 text-white px-5 py-3 focus:outline-none focus:border-gold placeholder-gray-400 resize-none font-raleway" />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 w-full rounded-2xl text-white text-2xl font-raleway font-semibold py-3 transition-colors ${
                isSubmitting
                  ? 'bg-gray-600 cursor-not-allowed'
                  : 'bg-[#333] hover:bg-zinc-700'
              }`}
            >
              {isSubmitting ? 'Enviando...' : 'Submit'}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
