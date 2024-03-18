import { Dispatch, SetStateAction, useState } from "react";

export default function LOGICAL({
  selectCategory,
  setContenedorTotal,
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setContenedorTotal: Dispatch<
    SetStateAction<{
      [x: string]: { date: string; value: string; description: string };
    }>
  >;
  selectCategory: string;
}) {
  const [valueCategory, setValueCategory] = useState<string>("");
  const [dateCategory, setDateCategory] = useState<string>("");
  const [descriptionCategory, setDescriptionCategory] = useState<string>("");

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
      setContenedorTotal(
        (prevState: {
          [x: string]: { date: string; description: string; value: string };
        }) => {
          const updatedState = { ...prevState };
          // Si existe categoria ya seleccionada se suman los valores - los values
          if (prevState[selectCategory]) {
            const newValue =
              parseInt(prevState[selectCategory].value) +
              parseInt(valueCategory);

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
        }
      );
    }
    setDateCategory("");
    setValueCategory("");
    setDescriptionCategory("");
    setOpen(false);
  };

  return (
    <>
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
    </>
  );
}
