import { useEffect, useState } from "react";
import "../../assets/styles.css";
import ListAddItems from "./itemsAddedList";
import LOGICAL from "./sendForm";
import CategoriesModified from "./MostrarCategorias";
import GraphicTotal from "./GraficChart";

export default function HomePrincipal({ gastoTotal }: { gastoTotal: number }) {
  const [contenedorTotal, setContenedorTotal] = useState<{
    [x: string]: { date: string; value: string; description: string };
  }>(() => {
    const storedContenedorTotal = localStorage.getItem("contenedorDeGastos");
    return storedContenedorTotal ? JSON.parse(storedContenedorTotal) : {};
  });
  const [open, setOpen] = useState(false);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [openCategory, setOpenCategory] = useState(false);
  const [mostrarMasCategorias, setMostrarMasCategorias] = useState(false);

  useEffect(() => {
    localStorage.setItem("contenedorDeGastos", JSON.stringify(contenedorTotal));
  }, [contenedorTotal]);

  const sendCategories = (categorias: string) => {
    setSelectCategory(categorias);
    setOpen(true);
  };

  const deleteGasto = (data: string) => {
    setContenedorTotal((prevState) => {
      const updatedState = Object.fromEntries(
        Object.entries(prevState).filter(([key]) => key !== data)
      );
      return updatedState;
    });
  };

  const sendOpenCategory = () => setOpenCategory(!openCategory);

  const restaDelTotal = Object.values(contenedorTotal).reduce(
    (acc, { value }) => {
      return acc + parseInt(value);
    },
    0
  );

  const mostrarMas = () => setMostrarMasCategorias(!mostrarMasCategorias);

  return (
    <>
      <CategoriesModified
        mostrarMasCategorias={mostrarMasCategorias}
        mostrarMas={mostrarMas}
        openCategory={openCategory}
        sendCategories={sendCategories}
        sendOpenCategory={sendOpenCategory}
      />

      <LOGICAL
        open={open}
        setOpen={setOpen}
        setContenedorTotal={setContenedorTotal}
        selectCategory={selectCategory}
      />

      <article className="contenedorgastos">
        {Object.entries(contenedorTotal).map(
          ([key, { date, value, description }]) => (
            <ListAddItems
              categoria={key}
              key={key}
              date={date}
              value={value}
              description={description}
              deleteGasto={deleteGasto}
            />
          )
        )}
      </article>

      {gastoTotal && restaDelTotal > 0 && (
        <section className="restadeltotal">
          Gastos Totales: {gastoTotal - restaDelTotal}$.
        </section>
      )}

      <GraphicTotal contenedorTotal={contenedorTotal} />
    </>
  );
}
