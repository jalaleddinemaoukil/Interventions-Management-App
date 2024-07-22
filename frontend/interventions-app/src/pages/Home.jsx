import React from "react";

export const Home = () => {
  return (
    <section className="bg-gray-50">
      <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-screen lg:items-center">
        <div className="mx-auto max-w-xl text-center">
          <h1 className="text-3xl font-extrabold sm:text-5xl">
          Simplifiez la Gestion de 
            <strong className="font-extrabold text-gray-700 sm:block">
            Vos  Interventions de Manière Efficace et Rapide.
            </strong>
          </h1>

          <p className="mt-4 sm:text-xl/relaxed">
          Rationalisez Votre Flux de Travail avec Notre Application Web Intuitive de Gestion des Interventions
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <a
              className="block w-full rounded bg-gray-600 px-12 py-3 text-sm font-medium text-white shadow hover:bg-gray-700 focus:outline-none focus:ring  sm:w-auto"
              href="/login"
            >
              Commencer
            </a>

            <a
              className="block w-full rounded px-12 py-3 text-sm font-medium text-gray-600 shadow hover:text-gray-700 focus:outline-none focus:ring  sm:w-auto"
              href="/"
            >
              En savoir plus
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
