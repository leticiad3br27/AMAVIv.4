"use client";
import React from "react";
import MainLayout from "./layouts/MainLayout";
import style from "./styles/page.module.css";
import slide from "./styles/slider.module.css";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { register } from "swiper/element/bundle";

register();

// Importando os estilos do Swiper
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Home() {
  const data = [
    {
      id: "1",
      image: "/assets/img/AMAVI (36 x 24 in) (1).png",
    },
    {
      id: "2",
      image: "/assets/img/AMAVI (36 x 24 in) (2).png",
    },
    {
      id: "3",
      image: "/assets/img/AMAVI (36 x 24 in).png",
    },
    {
      id: "4",
      image: "/assets/img/AMAVI (36 x 24 in).png",
    },
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
                  <Image
                    src={item.image}
                    alt="Slider"
                    width={800}
                    height={450}
                    className={slide.slide_item}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Cartões */}
        <div className={style.div_box}>
          <a className={style.cartao} href="/eventos">
            <Image
              src="/assets/img/evento.jpg"
              alt="Imagem de um evento"
              width={500}
              height={300}
            />
            <h1>Eventos</h1>
            <h2>
              Fique por dentro dos nossos eventos, encontros e palestras voltados para a conscientização e apoio às famílias.
            </h2>
          </a>
          <a className={style.cartao} href="/Agendamento">
            <Image
              src="/assets/img/atendimento.jpg"
              alt="Imagem de um atendimento"
              width={500}
              height={300}
            />
            <h1>Atendimentos</h1>
            <h2>
              Conheça nossos serviços de atendimento especializado para pessoas autistas e suas famílias.
            </h2>
          </a>
          <a className={style.cartao} href="https://sobre-amavi.vercel.app/">
            <Image
              src="/assets/img/sobre.jpg"
              alt="Imagem institucional da AMAVI"
              width={500}
              height={300}
            />
            <h1>Nos Conheça</h1>
            <h2>
              Saiba mais sobre a AMAVI, nossa missão e como trabalhamos para apoiar a comunidade autista.
            </h2>
          </a>
          <a className={style.cartao} href="https://linktr.ee/amaviAssociacao">
            <Image
              src="/assets/img/outro.jpg"
              alt="Imagem de recursos adicionais"
              width={500}
              height={300}
            />
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
