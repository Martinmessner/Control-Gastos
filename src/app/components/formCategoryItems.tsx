import { useState } from "react";

export default function FormItemsCategory({
  setContenedorTotal,
  categoria,
}: {
  setContenedorTotal: (prevState: any) => void;
  contenedorTotal: string;
  categoria: string;
}) {
  const [valueCategory, setValueCategory] = useState<string>("");
  const [dateCategory, setDateCategory] = useState<string>("");
  const [descriptionCategory, setDescriptionCategory] = useState<string>("");

  const sendForm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (dateCategory && Number(valueCategory) > 0) {
      setContenedorTotal((prevState) => {
        const updatedState = { ...prevState };
        const newValue =
          parseInt(prevState[categoria]?.value || 0) + parseInt(valueCategory);

        updatedState[categoria] = {
          date: dateCategory,
          value: String(newValue),
          description: descriptionCategory,
        };

        return updatedState;
      });

      setDateCategory("");
      setValueCategory("");
      setDescriptionCategory("");
    }
  };

  return (
    <form onSubmit={sendForm} className="selectcategory">
      <label htmlFor="categoryValue">Ingrese el valor para {categoria}:</label>
      <input
        type="date"
        name="date"
        onChange={(e) => setDateCategory(e.target.value)}
        value={dateCategory}
      />
      <input
        type="number"
        id="categoryValue"
        name="categoryValue"
        onChange={(e) => setValueCategory(e.target.value)}
        value={valueCategory}
      />
      <input
        type="text"
        id="descriptionValue"
        name="descriptionValue"
        onChange={(e) => setDescriptionCategory(e.target.value)}
        value={descriptionCategory}
      />

      <button>Enviar</button>
    </form>
  );
}
