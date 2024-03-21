import { MouseEventHandler } from "react";
import { INITIAL_STATE } from "../db/initial-state";

export default function CategoriesModified({
  mostrarMasCategorias,
  sendCategories,
  openCategory,
  sendOpenCategory,
  mostrarMas,
}: {
  mostrarMasCategorias: boolean;
  sendOpenCategory: MouseEventHandler<HTMLButtonElement>;
  mostrarMas: MouseEventHandler<HTMLButtonElement>;
  openCategory: boolean;
  sendCategories: (categorias: string) => void;
}) {
  const categoriesModified =
    mostrarMasCategorias === true ? INITIAL_STATE : INITIAL_STATE.slice(0, 5);

  return (
    <>
      <button onClick={sendOpenCategory} className="categoriesh2">
        {openCategory === true ? "Ocultar Categorias" : "Elige una categoria"}
      </button>

      <section className="categories">
        {openCategory &&
          categoriesModified.map((data, index) => {
            const { url, categorias } = data;

            return (
              <article key={index}>
                <button
                  className="boton-categorias"
                  onClick={() => sendCategories(categorias)}
                >
                  <p>{categorias}</p>
                  <img
                    src={url}
                    alt={categorias}
                    title={categorias}
                    loading="lazy"
                    width="65"
                    height="65"
                  />
                </button>
              </article>
            );
          })}

        {openCategory && (
          <button onClick={mostrarMas} className="boton-categorias">
            <p>{mostrarMasCategorias ? "Ocultar" : "Mostrar Mas"}</p>
            <img width="65" height="65" src="/Otros.png"></img>
          </button>
        )}
      </section>
    </>
  );
}
