import formatDate from "../helpers/formatDate";

export default function ListAddItems({
  key,
  categoria,
  date,
  value,
  description,
  deleteGasto,
}: {
  key: string;
  categoria: string;
  date: string;
  value: string;
  description: string;
  deleteGasto: (categoria: string) => void;
}) {
  return (
    <section className="contenedortotal-gastos" key={key}>
      <p className="categorias-guardadas">Categoria: {categoria}</p>
      <img
        alt={categoria}
        title={categoria}
        width="45"
        height="45"
        src={categoria ? categoria + ".png" : undefined}
      ></img>
      <p className="categorias-guardadas">Fecha: {formatDate(date)}</p>
      <p className="categorias-guardadas">{value}$</p>
      <p className="categorias-guardadas">{description}</p>
      <button
        className="buttonimagetrash"
        onClick={() => deleteGasto(categoria)}
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
  );
}
