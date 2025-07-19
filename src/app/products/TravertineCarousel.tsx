"use client";
import Image from "next/image";
import React, { useRef, useState, useEffect } from "react";

const travertineTypes = [
	{
		name: "Beige Travertine",
		img: "/assets/PG-02_SEC-02_IMG-01.avif",
	},
	{
		name: "White Travertine",
		img: "/assets/PG-02_SEC-02_IMG-02.avif",
	},
	{
		name: "Silver Travertine",
		img: "/assets/PG-02_SEC-02_IMG-03.avif",
	},
	{
		name: "Nochi Travertine",
		img: "/assets/PG-02_SEC-02_IMG-04.avif",
	},
	{
		name: "Titanium Travertine",
		img: "/assets/PG-02_SEC-02_IMG-05.avif",
	},
	// Itens mockados adicionais
	{
		name: "Classic Travertine",
		img: "/assets/PG-02_SEC-02_IMG-03.avif",
	},
	{
		name: "Ivory Travertine",
		img: "/assets/PG-02_SEC-02_IMG-01.avif",
	},
	{
		name: "Gold Travertine",
		img: "/assets/PG-02_SEC-02_IMG-05.avif",
	},
	{
		name: "Desert Travertine",
		img: "/assets/PG-02_SEC-02_IMG-04.avif",
	},
	{
		name: "Pearl Travertine",
		img: "/assets/PG-02_SEC-02_IMG-02.avif",
	},
	// Adicione mais itens aqui futuramente
];

export default function TravertineCarousel() {
	const [scrollIndex, setScrollIndex] = useState(0);
	const [containerWidth, setContainerWidth] = useState(0);
	const [visibleCount, setVisibleCount] = useState(1); // Inicializa com 1 para evitar mismatch SSR/CSR
	const [isClient, setIsClient] = useState(false); // Novo estado para saber se está no client
	const carouselRef = useRef<HTMLDivElement>(null);

	// Responsivo: 5 no desktop, 3 no tablet, 1 no mobile
	const getVisibleCount = () => {
		if (typeof window === "undefined") return 1;
		if (window.innerWidth >= 1280) return Math.min(5, travertineTypes.length);
		if (window.innerWidth >= 768) return Math.min(3, travertineTypes.length);
		return 1;
	};

	// Atualiza o número de itens visíveis ao redimensionar (apenas client-side)
	useEffect(() => {
		setIsClient(true); // Marca que está no client
		const handleResize = () => {
			setVisibleCount(getVisibleCount());
			if (carouselRef.current) {
				setContainerWidth(carouselRef.current.offsetWidth);
			}
		};
		handleResize();
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	useEffect(() => {
		if (carouselRef.current) {
			setContainerWidth(carouselRef.current.offsetWidth);
		}
	}, [visibleCount]);

	const maxIndex = Math.max(0, travertineTypes.length - visibleCount);

	const scrollLeft = () => setScrollIndex((i) => Math.max(i - 1, 0));
	const scrollRight = () => setScrollIndex((i) => (i < maxIndex ? i + 1 : i));

	useEffect(() => {
		if (scrollIndex > maxIndex) setScrollIndex(maxIndex);
	}, [visibleCount, maxIndex]);

	if (!isClient) return null; // Só renderiza o carrossel no client

	return (
		<div className="w-full py-16 px-2 md:px-8 bg-[#e7dccb]">
			<h2 className="text-3xl md:text-5xl font-josefin font-bold text-[#a88c5f] mb-10 text-center">
				Travertine
			</h2>
			<div className="relative max-w-7xl mx-auto">
				{/* Setas laterais */}
				<button
					aria-label="Scroll left"
					onClick={scrollLeft}
					className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-[#d6a848] hover:bg-[#bfa03c] text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center transition-colors disabled:opacity-40"
					disabled={scrollIndex === 0}
				>
					<svg width="28" height="28" fill="none" viewBox="0 0 24 24">
						<path d="M15 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
				<button
					aria-label="Scroll right"
					onClick={scrollRight}
					className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-[#d6a848] hover:bg-[#bfa03c] text-white rounded-full shadow-lg w-12 h-12 flex items-center justify-center transition-colors disabled:opacity-40"
					disabled={scrollIndex === maxIndex}
				>
					<svg width="28" height="28" fill="none" viewBox="0 0 24 24">
						<path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</button>
				{/* Carrossel */}
				<div className="overflow-hidden">
					<div
						ref={carouselRef}
						className="flex gap-8 transition-transform duration-500"
						style={{
							transform: `translateX(-${scrollIndex * (containerWidth / visibleCount + 32)}px)`, // 32px = gap-8
						}}
					>
						{travertineTypes.map((item, idx) => (
							<div
								key={item.name}
								className="relative flex-shrink-0 rounded-3xl shadow-lg overflow-hidden bg-[#f5eee2]"
								style={{
									width: containerWidth / visibleCount - 32, // 32px = gap-8
									minWidth: 0,
									aspectRatio: "1/1",
									maxWidth: 340,
								}}
							>
								<Image
									src={item.img}
									alt={item.name}
									fill
									className="object-cover object-center w-full h-full"
									sizes="(max-width: 768px) 90vw, (max-width: 1280px) 33vw, 20vw"
									quality={100}
								/>
								<span className="absolute top-3 left-3 bg-[#e7dccb]/90 text-[#a88c5f] font-josefin font-semibold text-lg md:text-xl px-4 py-2 rounded-2xl shadow-md">
									{item.name}
								</span>
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
