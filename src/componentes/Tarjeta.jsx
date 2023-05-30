import '../Estilos/Tarjeta.css';

function Tarjeta({ ciudad, clima, seleccionar, Click }) {
  
  return (
    <div className={`Tarjeta ${seleccionar ? 'seleccionada' : ''}`} onClick={Click}>
      
      <div className="Texto-superior">
      <img src={`https:${clima.icon}`}/>
      
      <div className='Datos-texto'>
        <p>{clima.text}</p> 
        <h1>{clima.temp_c}°</h1>
        <p>{ciudad}</p>
      </div>

      </div>

      <div className="Texto-inferior">
        <p><span className="nombres">Viento:</span> {clima.wind_kph} km/h</p>
        <p><span className="nombres">Presion:</span> {clima.pressure_in} in</p>
        <p><span className="nombres">Humedad:</span> {clima.humidity}%</p>
        <p><span className="nombres">Nube:</span> {clima.cloud}%</p>
        <p><span className="nombres">Visibilidad:</span> {clima.vis_km} km</p>
      </div>
    </div>
  );
}

export default Tarjeta;
