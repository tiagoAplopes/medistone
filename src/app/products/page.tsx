import Image from 'next/image';
import TravertineCarousel from './TravertineCarousel';

export default function Products() {
  return (
    <div className="relative w-full min-h-screen">
      {/* Navbar */}
      <nav className="absolute top-0 left-0 w-full z-20 flex justify-end items-center px-8 py-6">
        <div className="flex gap-8">
          <a href="/" className="text-gold hover:text-goldLight transition-colors font-medium">Home</a>
          <a href="/products" className="text-gold hover:text-goldLight transition-colors font-medium">Products</a>
          <a href="/contacts" className="text-gold hover:text-goldLight transition-colors font-medium">Contacts</a>
        </div>
      </nav>
      {/* Seção inicial fixa */}
      <section
        className="w-full min-h-screen flex flex-col items-center justify-center text-center px-4 py-20 overflow-hidden relative z-10"
        style={{ minHeight: '100vh', minWidth: '100vw' }}
      >
        {/* Imagem de fundo responsiva com Next Image */}
        <div className="absolute inset-0 w-full h-full -z-10">
          <Image
            src="/assets/PG-02_SEC-01_BACKGROUND.avif"
            alt="Background marble"
            fill
            priority
            quality={100}
            className="object-cover object-center w-full h-full"
            sizes="100vw"
          />
          {/* Overlay para leitura */}
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <h1
            className="text-4xl md:text-6xl font-bold mb-6"
            style={{ color: '#D6A848', textShadow: '0 2px 16px rgba(0,0,0,0.18)' }}
          >
            Our Products
          </h1>
          <p
            className="text-lg md:text-xl font-medium"
            style={{ color: '#F5E7B2', textShadow: '0 1px 8px rgba(0,0,0,0.12)' }}
          >
            Discover our refined selection of high-quality marble, combining natural beauty and authenticity to enhance any project. Explore our variety of colors, textures, and finishes to find the perfect material for your space. Experience nature’s elegance in every detail.
          </p>
        </div>
      </section>
      {/* Nova seção do carrossel */}
      <section className="relative w-full min-h-screen flex items-center justify-center z-20 p-0 m-0 bg-[#e7dccb]" style={{ minHeight: '100vh', minWidth: '100vw', background: '#e7dccb' }}>
        <TravertineCarousel />
      </section>
    </div>
  );
}
