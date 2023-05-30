import '../Estilos/Botones.css';

function Botones({ agregar, borrar }) {
  return (
    <div className="Botones">
      <button className="Agregar" onClick={agregar}>
        Agregar Ciudad
      </button>
      <button className="Borrar" onClick={borrar}>
        Borrar Ciudad
      </button>
    </div>
  );
}

export default Botones;
