import { useEffect, useState } from "react";
import { INITIAL_STATE } from "../db/initial-state";
import "../../assets/styles.css";
import ListAddItems from "./listAddItems";

export default function CategoriesSelect({
  gastoTotal,
}: {
  gastoTotal: number;
}) {
  const [openCategory, setOpenCategory] = useState(false);
  const [contenedorTotal, setContenedorTotal] = useState<{
    [x: string]: { date: string; value: string; description: string };
  }>(() => {
    const storedContenedorTotal = localStorage.getItem("contenedorDeGastos");
    return storedContenedorTotal ? JSON.parse(storedContenedorTotal) : {};
  });

  const [open, setOpen] = useState(false);
  const [mostrarMasCategorias, setMostrarMasCategorias] = useState(false);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [valueCategory, setValueCategory] = useState<string>("");
  const [dateCategory, setDateCategory] = useState<string>("");
  const [descriptionCategory, setDescriptionCategory] = useState<string>("");

  useEffect(() => {
    localStorage.setItem("contenedorDeGastos", JSON.stringify(contenedorTotal));
  }, [contenedorTotal]);

  const sendCategories = (categorias: string) => () => {
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

  const sendOpenCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueCategory(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateCategory(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionCategory(event.target.value);
  };

  const sendForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (dateCategory && Number(valueCategory) > 0 && selectCategory) {
      setContenedorTotal((prevState) => {
        const updatedState = { ...prevState };
        // Si existe categoria ya seleccionada se suman los valores - los values
        if (prevState[selectCategory]) {
          const newValue =
            parseInt(prevState[selectCategory].value) + parseInt(valueCategory);

          updatedState[selectCategory] = {
            date: dateCategory,
            value: String(newValue),
            description: descriptionCategory,
          };
        } else {
          // si no crean uno nuevo:
          updatedState[selectCategory] = {
            date: dateCategory,
            value: valueCategory,
            description: descriptionCategory,
          };
        }
        return updatedState;
      });
    }
    setDateCategory("");
    setValueCategory("");
    setDescriptionCategory("");
    setOpen(false);
  };

  const restaDelTotal = Object.values(contenedorTotal).reduce(
    (acc, { value }) => {
      return acc + parseInt(value);
    },
    0
  );

  const MostrarMas = () => {
    setMostrarMasCategorias(!mostrarMasCategorias);
  };

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
                  onClick={sendCategories(categorias)}
                >
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

        {openCategory && (
          <button onClick={MostrarMas} className="boton-categorias">
            <p>{mostrarMasCategorias ? "Ocultar" : "Mostrar Mas"}</p>
            <img width="65" height="65" src="/Otros.png"></img>
          </button>
        )}
      </section>

      {open && (
        <form onSubmit={sendForm} className="selectcategory">
          <label htmlFor="categoryValue">
            Ingrese el valor para {selectCategory}:
          </label>
          <input
            type="date"
            name="date"
            onChange={handleDateChange}
            value={dateCategory}
          />
          <input
            type="number"
            id="categoryValue"
            name="categoryValue"
            onChange={handleChange}
            value={valueCategory}
          />
          <input
            type="text"
            id="descriptionValue"
            name="descriptionValue"
            onChange={handleDescriptionChange}
            value={descriptionCategory}
          />

          <button>Enviar</button>
        </form>
      )}

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

      <section className="restadeltotal">
        {gastoTotal && restaDelTotal > 0 && (
          <div>Resta de Gastos Totales: {gastoTotal - restaDelTotal}$.</div>
        )}
      </section>
    </>
  );
}

/*
      FORMA NORMAL SIN USAR EL MAS OTROS

      import { useEffect, useState } from "react";
import { INITIAL_STATE } from "../db/initial-state";
import formatDate from "../helpers/formatDate";
import "../../assets/styles.css";

export default function CategoriesSelect({
  gastoTotal,
}: {
  gastoTotal: number;
}) {
  const [open, setOpen] = useState(false);
  const [mostrarMasCategorias, setMostrarMasCategorias] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [valueCategory, setValueCategory] = useState<string>("");
  const [dateCategory, setDateCategory] = useState<string>("");
  const [descriptionCategory, setDescriptionCategory] = useState<string>("");
  const [contenedorTotal, setContenedorTotal] = useState<{
    [x: string]: { date: string; value: string; description: string };
  }>(() => {
    const storedContenedorTotal = localStorage.getItem("contenedorDeGastos");
    return storedContenedorTotal ? JSON.parse(storedContenedorTotal) : {};
  });

  useEffect(() => {
    localStorage.setItem("contenedorDeGastos", JSON.stringify(contenedorTotal));
  }, [contenedorTotal]);

  const sendCategories = (categorias: string) => () => {
    setSelectCategory(categorias);
    setOpen(true);
  };

  const sendOpenCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueCategory(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateCategory(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionCategory(event.target.value);
  };

  const sendForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (dateCategory && Number(valueCategory) > 0 && selectCategory) {
      setContenedorTotal((prevState) => {
        const updatedState = { ...prevState };
        // Si existe categoria ya seleccionada se suman los valores - los values
        if (prevState[selectCategory]) {
          const newValue =
            parseInt(prevState[selectCategory].value) + parseInt(valueCategory);

          updatedState[selectCategory] = {
            date: dateCategory,
            value: String(newValue),
            description: descriptionCategory,
          };
        } else {
          // si no crean uno nuevo:
          updatedState[selectCategory] = {
            date: dateCategory,
            value: valueCategory,
            description: descriptionCategory,
          };
        }
        return updatedState;
      });
    }
    setDateCategory("");
    setValueCategory("");
    setOpen(false);
  };

  const restaDelTotal = Object.values(contenedorTotal).reduce(
    (acc, { value }) => {
      return acc + parseInt(value);
    },
    0
  );

  const MostrarMas = () => {
    setMostrarMasCategorias(!mostrarMasCategorias);
  };

  const deleteGasto = (data: string) => {
    setContenedorTotal((prevState) => {
      const updatedState = Object.fromEntries(
        Object.entries(prevState).filter(([key]) => key !== data)
      );
      return updatedState;
    });
  };

  return (
    <>
      <button onClick={sendOpenCategory} className="categoriesh2">
        {openCategory === true ? "Ocultar Categorias" : "Elige una categoria"}
      </button>

      <section className="categories">
        {openCategory &&
          INITIAL_STATE.map((data, index) => {
            const { url, categorias } = data;

            return (
              <div key={index}>
                <button
                  className="boton-categorias"
                  onClick={sendCategories(categorias)}
                >
                  <p>{categorias}</p>
                  <img
                    src={url}
                    alt={categorias}
                    title={categorias}
                    width="65"
                    height="65"
                  />
                </button>
              </div>
            );
          })}

        <button onClick={MostrarMas} className="boton-categorias">
          <p>Test</p>
          <img width="65" height="65" src="/Otros.png"></img>
        </button>
      </section>

      {open && (
        <form onSubmit={sendForm} className="selectcategory">
          <label htmlFor="categoryValue">
            Ingrese el valor para {selectCategory}:
          </label>
          <input
            type="date"
            name="date"
            onChange={handleDateChange}
            value={dateCategory}
          />
          <input
            type="number"
            id="categoryValue"
            name="categoryValue"
            onChange={handleChange}
            value={valueCategory}
          />
          <input
            type="text"
            id="descriptionValue"
            name="descriptionValue"
            onChange={handleDescriptionChange}
            value={descriptionCategory}
          />

          <button>Enviar</button>
        </form>
      )}

      <article className="contenedorgastos">
        {Object.entries(contenedorTotal).map(
          ([key, { date, value, description }]) => (
            <section className="contenedortotal-gastos" key={key}>
              <p className="categorias-guardadas">Categoria: {key}</p>
              <img
                alt={key}
                title={key}
                width="45"
                height="45"
                src={key ? key + ".png" : undefined}
              ></img>
              <p className="categorias-guardadas">Fecha: {formatDate(date)}</p>
              <p className="categorias-guardadas">{value}$</p>
              <p>{description}</p>
              <button
                className="buttonimagetrash"
                onClick={() => deleteGasto(key)}
              >
                <img
                  alt="Eliminar"
                  title="Eliminar"
                  width="45"
                  height="45"
                  src="/trash.webp"
                />
              </button>
            </section>
          )
        )}
      </article>

      <section className="restadeltotal">
        {gastoTotal && restaDelTotal > 0 && (
          <div>Resta de Gastos Totales: {gastoTotal - restaDelTotal}$.</div>
        )}
      </section>
    </>
  );
}









 FORMA QUE NO ME GUSTA MUCHO PERO ES FUNCIONAL AL MENOS POR AHORA, CAMBIAR 


import { useEffect, useState } from "react";
import { INITIAL_STATE } from "../db/initial-state";
import formatDate from "../helpers/formatDate";
import "../../assets/styles.css";

export default function CategoriesSelect({
  gastoTotal,
}: {
  gastoTotal: number;
}) {
  const [open, setOpen] = useState(false);
  const [mostrarMasCategorias, setMostrarMasCategorias] = useState(false);
  const [openCategory, setOpenCategory] = useState(false);
  const [selectCategory, setSelectCategory] = useState<string>("");
  const [valueCategory, setValueCategory] = useState<string>("");
  const [dateCategory, setDateCategory] = useState<string>("");
  const [descriptionCategory, setDescriptionCategory] = useState<string>("");
  const [contenedorTotal, setContenedorTotal] = useState<{
    [x: string]: { date: string; value: string; description: string };
  }>(() => {
    const storedContenedorTotal = localStorage.getItem("contenedorDeGastos");
    return storedContenedorTotal ? JSON.parse(storedContenedorTotal) : {};
  });

  useEffect(() => {
    localStorage.setItem("contenedorDeGastos", JSON.stringify(contenedorTotal));
  }, [contenedorTotal]);

  const sendCategories = (categorias: string) => () => {
    setSelectCategory(categorias);
    setOpen(true);
  };

  const sendOpenCategory = () => {
    setOpenCategory(!openCategory);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValueCategory(event.target.value);
  };

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDateCategory(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescriptionCategory(event.target.value);
  };

  const sendForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (dateCategory && Number(valueCategory) > 0 && selectCategory) {
      setContenedorTotal((prevState) => {
        const updatedState = { ...prevState };
        // Si existe categoria ya seleccionada se suman los valores - los values
        if (prevState[selectCategory]) {
          const newValue =
            parseInt(prevState[selectCategory].value) + parseInt(valueCategory);

          updatedState[selectCategory] = {
            date: dateCategory,
            value: String(newValue),
            description: descriptionCategory,
          };
        } else {
          // si no crean uno nuevo:
          updatedState[selectCategory] = {
            date: dateCategory,
            value: valueCategory,
            description: descriptionCategory,
          };
        }
        return updatedState;
      });
    }
    setDateCategory("");
    setValueCategory("");
    setOpen(false);
  };

  const restaDelTotal = Object.values(contenedorTotal).reduce(
    (acc, { value }) => {
      return acc + parseInt(value);
    },
    0
  );

  const MostrarMas = () => {
    setMostrarMasCategorias(!mostrarMasCategorias);
  };

  const deleteGasto = (data: string) => {
    setContenedorTotal((prevState) => {
      const updatedState = Object.fromEntries(
        Object.entries(prevState).filter(([key]) => key !== data)
      );
      return updatedState;
    });
  };

  return (
    <>
      <button onClick={sendOpenCategory} className="categoriesh2">
        {openCategory === true ? "Ocultar Categorias" : "Elige una categoria"}
      </button>

      <section className="categories">
        {openCategory &&
          INITIAL_STATE.slice(0, 5).map((data, index) => {
            const { url, categorias } = data;

            return (
              <div key={index}>
                <button
                  className="boton-categorias"
                  onClick={sendCategories(categorias)}
                >
                  <p>{categorias}</p>
                  <img
                    src={url}
                    alt={categorias}
                    title={categorias}
                    width="65"
                    height="65"
                  />
                </button>
              </div>
            );
          })}
        {mostrarMasCategorias &&
          INITIAL_STATE.map((data, index) => {
            const { url, categorias } = data;

            return (
              <div key={index}>
                <button
                  className="boton-categorias"
                  onClick={sendCategories(categorias)}
                >
                  <p>{categorias}</p>
                  <img
                    src={url}
                    alt={categorias}
                    title={categorias}
                    width="65"
                    height="65"
                  />
                </button>
              </div>
            );
          })}
        <button onClick={MostrarMas} className="boton-categorias">
          <p>Test</p>
          <img width="65" height="65" src="/Otros.png"></img>
        </button>
      </section>

      {open && (
        <form onSubmit={sendForm} className="selectcategory">
          <label htmlFor="categoryValue">
            Ingrese el valor para {selectCategory}:
          </label>
          <input
            type="date"
            name="date"
            onChange={handleDateChange}
            value={dateCategory}
          />
          <input
            type="number"
            id="categoryValue"
            name="categoryValue"
            onChange={handleChange}
            value={valueCategory}
          />
          <input
            type="text"
            id="descriptionValue"
            name="descriptionValue"
            onChange={handleDescriptionChange}
            value={descriptionCategory}
          />

          <button>Enviar</button>
        </form>
      )}

      <article className="contenedorgastos">
        {Object.entries(contenedorTotal).map(
          ([key, { date, value, description }]) => (
            <section className="contenedortotal-gastos" key={key}>
              <p className="categorias-guardadas">Categoria: {key}</p>
              <img
                alt={key}
                title={key}
                width="45"
                height="45"
                src={key ? key + ".png" : undefined}
              ></img>
              <p className="categorias-guardadas">Fecha: {formatDate(date)}</p>
              <p className="categorias-guardadas">{value}$</p>
              <p>{description}</p>
              <button
                className="buttonimagetrash"
                onClick={() => deleteGasto(key)}
              >
                <img
                  alt="Eliminar"
                  title="Eliminar"
                  width="45"
                  height="45"
                  src="/trash.webp"
                />
              </button>
            </section>
          )
        )}
      </article>

      <section className="restadeltotal">
        {gastoTotal && restaDelTotal > 0 && (
          <div>Resta de Gastos Totales: {gastoTotal - restaDelTotal}$.</div>
        )}
      </section>
    </>
  );
}


*/
