"use client";
import React from "react";
import MainLayout from "./layouts/MainLayout";
import style from "./styles/page.module.css";
import slide from "./styles/slider.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";

register();

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Home() {
  const data = [
    { id: "1", image: "/assets/img/AMAVI1.png" },
    { id: "2", image: "/assets/img/caminhada.png" },
    { id: "3", image: "/assets/img/carterinha.png" },
    { id: "4", image: "/assets/img/AMAVI.png" },
  ];

  return (
    <MainLayout>
      <div className={style.body}>
        {/* Slider */}
        <div className={style.divslides}>
          <div className={slide.conteiner}>
            <Swiper slidesPerView={1} pagination={{ clickable: true }} navigation>
              {data.map((item) => (
                <SwiperSlide key={item.id}>
                  <div className={slide.slide_item}>
                  <Image
                  src={item.image}
                  alt="Slider"
                  fill
                  style={{ objectFit: "contain", objectPosition: "center" }}
                  className={slide.slide_item}
                />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Cartões */}
        <div className={style.div_box}>
          <a className={style.cartao} href="/eventos">
            <Image src="/assets/img/evento.jpg" alt="Imagem de um evento" width={500} height={300} />
            <h1>Eventos</h1>
            <h2>
              Fique por dentro dos nossos eventos, encontros e palestras voltados para a conscientização e apoio às famílias.
            </h2>
          </a>
          <a className={style.cartao} href="/Agendamento">
            <Image src="/assets/img/atendimento.jpg" alt="Imagem de um atendimento" width={500} height={300} />
            <h1>Atendimentos</h1>
            <h2>
              Conheça nossos serviços de atendimento especializado para pessoas autistas e suas famílias.
            </h2>
          </a>
          <a className={style.cartao} href="https://sobre-amavi.vercel.app/">
            <Image src="/assets/img/sobre.jpg" alt="Imagem institucional da AMAVI" width={500} height={300} />
            <h1>Nos Conheça</h1>
            <h2>
              Saiba mais sobre a AMAVI, nossa missão e como trabalhamos para apoiar a comunidade autista.
            </h2>
          </a>
          <a className={style.cartao} href="https://linktr.ee/amaviAssociacao">
            <Image src="/assets/img/outro.jpg" alt="Imagem de recursos adicionais" width={500} height={300} />
            <h1>Outros meios</h1>
            <h2>
              Descubra outras formas de apoio, grupos comunitários e informações úteis sobre o autismo.
            </h2>
          </a>
        </div>
      </div>
    </MainLayout>
  );
}
