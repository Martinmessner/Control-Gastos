import { type ChangeEvent, useState, FormEvent, useEffect } from "react";
import CategoriesSelect from "./app/components/categories";
import "./assets/styles.css";

export default function Home() {
  const [gastoTotal, SetgastoTotal] = useState<number>(() => {
    const storageGastoTotal = localStorage.getItem("gastoTotal");
    return storageGastoTotal ? JSON.parse(storageGastoTotal) : "";
  });
  const [open, Setopen] = useState(false);
  const [submit, Setsubmit] = useState(false);

  useEffect(() => {
    localStorage.setItem("gastoTotal", JSON.stringify(gastoTotal));
  }, [gastoTotal]);

  const changeTest = () => {
    Setopen(!open);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (Number(gastoTotal) > 0) {
      Setopen(!open);
      Setsubmit(true);
    }
  };

  return (
    <>
      <header className="hola">
        <h2>Bienvenidos a Controle sus Gastos 😎</h2>
      </header>

      <section>
        {open && (
          <form onSubmit={handleSubmit} className="addgastos">
            <label>Introduzca aqui el Gasto que desee: </label>
            <input
              type="number"
              name="gastoTotal"
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                SetgastoTotal(Number(event.target.value));
              }}
            ></input>
            <button className="button">Agregar</button>
          </form>
        )}
      </section>

      <div className="addgastos">
        {gastoTotal && <p className="gastototal">{gastoTotal}$</p>}

        <button type="submit" className="button" onClick={changeTest}>
          {gastoTotal ? "Editar Monto" : "Agregar Monto"}
        </button>
      </div>

      {submit && <CategoriesSelect gastoTotal={gastoTotal} />}
    </>
  );
}
