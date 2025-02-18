// app/page.js
import MainLayout from './layouts/MainLayout'


export default function Home() {
  return (
    <MainLayout>
      <div className="homepage">
        <h2 className="title">Bem-vindo à AMAVI!</h2>
        <p className="description">
          Este é o site oficial da AMAVI, criado por Letisia S.A, Marcos Casimiro, João Oliveira, Alini Perroni e Luana Vitória.
        </p>
        <p className="description">
          Aqui você pode encontrar informações sobre nossos projetos, equipe e muito mais.
        </p>
      </div>
    </MainLayout>
  );
}