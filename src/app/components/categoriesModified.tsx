import { INITIAL_STATE } from "../db/initial-state";

export default function CategoriesModified({
  mostrarMasCategorias,
  sendCategories,
  openCategory,
  MostrarMas,
}: {
  mostrarMasCategorias: boolean;
  MostrarMas: any;
  openCategory: boolean;
  sendCategories: (categorias: string) => void;
}) {
  const categoriesModified =
    mostrarMasCategorias === true ? INITIAL_STATE : INITIAL_STATE.slice(0, 5);

  console.log("Desde Otro Componente: ", categoriesModified);

  return (
    <>
      <section className="categories">
        {openCategory &&
          categoriesModified.map((data, index) => {
            const { url, categorias } = data;

            const handleClick = () => {
              sendCategories(categorias);
            };

            return (
              <article key={index}>
                <button className="boton-categorias" onClick={handleClick}>
                  <p>{categorias}</p>
                  <img
                    src={url}
                    alt={categorias}
                    title={categorias}
                    width="65"
                    height="65"
                  />
                </button>
              </article>
            );
          })}
      </section>

      {openCategory && (
        <button onClick={MostrarMas} className="boton-categorias">
          <p>{mostrarMasCategorias ? "Ocultar" : "Mostrar Mas"}</p>
          <img width="65" height="65" src="/Otros.png"></img>
        </button>
      )}
    </>
  );
}
