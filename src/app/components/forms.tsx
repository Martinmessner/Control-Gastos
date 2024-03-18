import { useState } from "react";

export default function FormInputs({
  sendForm,
  selectCategory,
}: {
  sendForm: (event: React.FormEvent<HTMLFormElement>) => void;
  selectCategory: string;
}) {
  const [valueCategory, setValueCategory] = useState<string>("");
  const [dateCategory, setDateCategory] = useState<string>("");
  const [descriptionCategory, setDescriptionCategory] = useState<string>("");

  return (
    <form onSubmit={sendForm} className="selectcategory">
      <label htmlFor="categoryValue">
        Ingrese el valor para {selectCategory}:
      </label>
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
