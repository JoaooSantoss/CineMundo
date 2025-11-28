"use client";


import { useState, useEffect } from "react";

export default function Banner() {
  const imagens = [
    "/banner1.jpg",
    "/banner2.jpg",
    "/banner4.jpg"
  ];

  const [index, setIndex] = useState(0);

  
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % imagens.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  const proximo = () => {
    setIndex((prev) => (prev + 1) % imagens.length);
  };

  const anterior = () => {
    setIndex((prev) => (prev - 1 + imagens.length) % imagens.length);
  };

  return (
    <section className="banner">
      <div className="carousel-container">
        <img src={imagens[index]} alt="Banner de filme" className="carousel-img" />

        <button className="btn prev" onClick={anterior}>❮</button>
        <button className="btn next" onClick={proximo}>❯</button>
      </div>

      <button className="comprar">Comprar Ingresso</button>
    </section>
  );
}
