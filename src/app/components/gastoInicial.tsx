import { type ChangeEvent, useState, FormEvent, useEffect } from "react";
import "../../assets/styles.css";
import CategoriesSelect from "./Homecategories";
import EditSvgIcon from "../helpers/edit";

export default function GastoInicial() {
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
      <header className="header">
        <h2>Controle sus Gastos</h2>
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
            <button className="button-addgastos">Agregar Monto</button>
          </form>
        )}
      </section>

      <div className="addgastos">
        {gastoTotal && <p className="gastototal">{gastoTotal}$</p>}

        <button type="submit" className="button-addgastos" onClick={changeTest}>
          <EditSvgIcon />
          {gastoTotal > 0 ? "Editar Monto" : "Agregar Monto"}
        </button>
      </div>

      {submit && <CategoriesSelect gastoTotal={gastoTotal} />}
    </>
  );
}
