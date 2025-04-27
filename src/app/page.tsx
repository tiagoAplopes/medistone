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
        <nav className="absolute top-0 left-0 w-full z-20 flex justify-between items-center px-8 py-6">
          <div className="flex items-center">
            <Image
              src="/assets/LOGO-TRANSPARENT.png"
              alt="MEDSTONE Logo"
              width={320}
              height={80}
              quality={100}
              priority
              className="h-auto"
            />
          </div>

          <div className="flex gap-8">
            <a href="#sobre" className="text-gold hover:text-goldLight transition-colors font-medium">
              Home
            </a>
            <a href="#produtos" className="text-gold hover:text-goldLight transition-colors font-medium">
              Products
            </a>
            <a href="#contato" className="text-gold hover:text-goldLight transition-colors font-medium">
              Contact
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
            <source src="/assets/home.mp4" type="video/mp4" />
          </video>
        </div>
      </div>

      {/* Products Section */}
      <section id="produtos" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/PG-01_SEC-02_BACKGROUND.avif"
            alt="Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Overlay para melhorar a legibilidade do texto */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Product Image */}
          <div className="w-full md:w-1/2 flex justify-center">
            <Image
              src="/assets/PG-01_SEC-02.avif"
              alt="Luxury Stone Product"
              width={600}
              height={400}
              className="object-contain drop-shadow-2xl"
              priority
              quality={100}
            />
          </div>

          {/* Text Content */}
          <div className="w-full md:w-1/2 text-white flex flex-col items-start">
            <h2 className="text-3xl md:text-4xl font-light mb-4 leading-relaxed">
              Collect unique key pieces <br />
              for unforgettable <span className="font-medium text-white">luxury stones</span>
            </h2>

            <button className="mt-8 bg-white text-zinc-900 px-8 py-3 rounded-full hover:bg-gray-200 transition-colors text-sm font-medium">
              Discover all products
            </button>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-4 md:px-8 bg-stone-50">
        <div className="max-w-7xl mx-auto">
          {/* Main Container */}
          <div className="flex flex-col md:flex-row items-center">
            {/* Title Column */}
            <div className="md:w-1/3 flex items-center justify-start md:justify-center self-stretch mb-12 md:mb-0 pr-0 md:pr-12">
              <h2 className="text-3xl md:text-4xl font-light leading-tight md:leading-tight pl-0 md:pl-8 lg:pl-16" style={{ color: 'rgb(234, 88, 12)' }}>
                The art of<br />
                tailoring stones<br />
                to match any<br />
                style and budget
              </h2>
            </div>

            {/* Images Column */}
            <div className="md:w-2/3">
              {/* Grid Container */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-5 md:gap-7">
                {/* Top Row - 2 images */}
                <div className="col-span-2 rounded-[2.5rem] overflow-hidden h-[250px] md:h-[320px] shadow-sm">
                  <Image
                    src="/assets/PG-01_SEC-03_IMG-01.avif"
                    alt="Luxury stone products - decorative items"
                    width={1500}
                    height={1000}
                    className="w-full h-full object-cover"
                    priority
                    quality={100}
                  />
                </div>

                <div className="col-span-2 rounded-[2.5rem] overflow-hidden h-[250px] md:h-[320px] shadow-sm">
                  <Image
                    src="/assets/PG-01_SEC-03_IMG-05.avif"
                    alt="Luxury stone products - bathroom"
                    width={1500}
                    height={1000}
                    className="w-full h-full object-cover"
                    priority
                    quality={100}
                  />
                </div>

                {/* Bottom Row - 4 images */}
                <div className="rounded-[2.5rem] overflow-hidden h-[200px] md:h-[250px] shadow-sm">
                  <Image
                    src="/assets/PG-01_SEC-03_IMG-02.avif"
                    alt="Luxury stone products - vases"
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover"
                    quality={100}
                  />
                </div>

                <div className="rounded-[2.5rem] overflow-hidden h-[200px] md:h-[250px] shadow-sm">
                  <Image
                    src="/assets/PG-01_SEC-03_IMG-03.avif"
                    alt="Luxury stone products - door"
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover"
                    quality={100}
                  />
                </div>

                <div className="rounded-[2.5rem] overflow-hidden h-[200px] md:h-[250px] shadow-sm">
                  <Image
                    src="/assets/PG-01_SEC-03_IMG-04.avif"
                    alt="Luxury stone products - wall tiles"
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover"
                    quality={100}
                  />
                </div>

                <div className="rounded-[2.5rem] overflow-hidden h-[200px] md:h-[250px] shadow-sm">
                  <Image
                    src="/assets/PG-01_SEC-03_IMG-06.avif"
                    alt="Luxury stone products - table"
                    width={1200}
                    height={900}
                    className="w-full h-full object-cover"
                    quality={100}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/PG-01_SEC-04_BACKGROUND.png"
            alt="Stone quarry background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Overlay para melhorar a legibilidade do texto */}
          <div className="absolute inset-0 bg-black bg-opacity-5"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-4xl mx-auto px-8 py-16 md:py-20 bg-white bg-opacity-95 rounded-[2.5rem] shadow-md">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-light text-amber-600 mb-8">
              Any stone type, <span className="font-medium">anywhere.</span>
            </h2>
            <div className="max-w-3xl mx-auto text-gray-700 leading-relaxed text-sm md:text-base">
              <p className="mb-4">
                Medistone is a stone provider in any type and kind from Travertine to onyx we provide our clients in any style and figure,
                slabs, tiles and all other shapes based on what is demanded either from architect or retailer clients. The
                widespread multinational blockchain that Medistone supplies its clients from
              </p>
              <p className="mb-4">
                <span className="text-amber-700 font-medium">Europe, middle-east, Africa, China and almost all
                over the world</span> is one of the most outstanding characteristics of Medistone that made us proud of working for last 25 years in
                stone business based on Italy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Manufactured Stone Accessories Section */}
      <section className="relative py-24 md:py-32 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/assets/PG-01_SEC-05_BACKGROUND.avif"
            alt="Stone background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          {/* Overlay para melhorar a legibilidade do texto */}
          <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        </div>

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-8">
          {/* Section Header */}
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-light text-white mb-8 drop-shadow-md">
              <span className="font-semibold" style={{ color: 'rgb(180, 83, 9)' }}>Manufactured</span> stone accessories
            </h2>
            <p className="max-w-3xl mx-auto text-white leading-relaxed text-lg drop-shadow-sm">
              Custom-designed stone accessories crafted to your specifications. Our team works closely with you to create unique,
              high-quality stone products that perfectly match your vision and requirements.
            </p>
          </div>

          {/* Cards Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
            {/* Card 1 */}
            <div className="bg-white bg-opacity-95 rounded-t-[2.5rem] rounded-b-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="h-52 overflow-hidden">
                <Image
                  src="/assets/PG-01_SEC-05_IMG-01.avif"
                  alt="Stone Products"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  quality={100}
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-amber-700 mb-4">Stone Products</h3>
                <p className="text-gray-600 leading-relaxed">
                  We make a variety range of products, all stone based.
                </p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white bg-opacity-95 rounded-t-[2.5rem] rounded-b-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="h-52 overflow-hidden">
                <Image
                  src="/assets/PG-01_SEC-05_IMG-02.avif"
                  alt="Client Services"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  quality={100}
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-amber-700 mb-4">Client Services</h3>
                <p className="text-gray-600 leading-relaxed">
                  Visual order tracking for any step of preparation and shipping.
                </p>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white bg-opacity-95 rounded-t-[2.5rem] rounded-b-lg overflow-hidden shadow-xl transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
              <div className="h-52 overflow-hidden">
                <Image
                  src="/assets/PG-01_SEC-05_IMG-03.avif"
                  alt="Open design studio"
                  width={600}
                  height={400}
                  className="w-full h-full object-cover"
                  quality={100}
                />
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold text-amber-700 mb-4">Open design studio</h3>
                <p className="text-gray-600 leading-relaxed">
                  Open to collaborate with architects & designers for the best achievements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="bg-black py-24 md:py-32 flex flex-col items-center justify-center min-h-screen">
        <div className="container mx-auto px-4 text-center flex flex-col items-center justify-between h-full">
          <div className="flex-1"></div> {/* Spacer for vertical centering */}

          {/* Logo */}
          <div className="mb-12 flex justify-center w-full">
            <Image
              src="/assets/LOGO-TRANSPARENT.png"
              alt="MEDSTONE Logo"
              width={550}
              height={150}
              quality={100}
              priority
              className="h-auto w-auto md:w-2/3 lg:w-1/2"
            />
          </div>

          {/* Subtitle */}
          <p className="text-[#d4a24b] text-xl md:text-2xl font-light mb-16 max-w-2xl mx-auto tracking-wide">
            We connected art, industry and nature through stones.
          </p>

          {/* Button */}
          <button className="bg-[#d4a24b] text-black font-medium px-12 py-3 rounded-full shadow-lg hover:bg-[#c69544] hover:shadow-xl transition-all duration-300 mb-24 text-lg">
            Let's get in touch
          </button>

          <div className="flex-1"></div> {/* Spacer for vertical centering */}

          {/* Footer */}
          <p className="text-[#d4a24b] text-sm font-light tracking-wider">
            © 2025 by Medistones
          </p>
        </div>
      </section>

      {showButton && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 bg-black text-gold border border-gold p-4 rounded-full shadow-lg hover:bg-black/80 hover:text-goldLight transition-all z-50"
        >
          ↑
        </button>
      )}
    </>
  );
}
