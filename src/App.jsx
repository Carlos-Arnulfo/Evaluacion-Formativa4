import './App.css';
import Botones from './componentes/Botones'
import Tarjeta from './componentes/Tarjeta';
import { useState, useRef, useEffect } from 'react';

const API_KEY = '7b17cf3099msh5c0e7c37f4e3a12p1df05bjsn39438fa2229b';
const API_HOST = 'weatherapi-com.p.rapidapi.com';

function App() {
  const [tarjetas, setTarjetas] = useState([]);
  const [data, setData] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      const ciudad = inputRef.current.value;
      const url = `https://${API_HOST}/current.json?q=${ciudad}`;
      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': API_KEY,
          'X-RapidAPI-Host': API_HOST
        }
      };

      try {
        const response = await fetch(url, options);
        const result = await response.json();
        setData(result.current);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const agregar = async () => {
    const ciudad = inputRef.current.value;
  
    try {
      const response = await fetch(
        `https://${API_HOST}/current.json?q=${ciudad}`,
        {
          method: 'GET',
          headers: {
            'X-RapidAPI-Key': API_KEY,
            'X-RapidAPI-Host': API_HOST
          }
        }
      );
  
      const result = await response.json();
      const datosClima = result.current;
  
      const nuevaTarjeta = {
        id: Math.random().toString(),
        ciudad,
        clima: {
          temp_c: datosClima.temp_c,
          text: datosClima.condition.text,
          icon: datosClima.condition.icon,
          wind_kph: datosClima.wind_kph,
          pressure_in: datosClima.pressure_in,
          humidity: datosClima.humidity,
          cloud: datosClima.cloud,
          vis_km: datosClima.vis_km
        },
        seleccionar: false
      };
  
      setTarjetas([...tarjetas, nuevaTarjeta]);
      inputRef.current.value = '';
    } catch (error) {
      console.error(error);
    }
  };
  

  const seleccionarTarjeta = (id) => {
    const nuevasTarjetas = tarjetas.map((tarjeta) => {
      if (tarjeta.id === id) {
        return { ...tarjeta, seleccionar: !tarjeta.seleccionar };
      }
      return tarjeta;
    });
    setTarjetas(nuevasTarjetas);
  };

  const borrar = () => {
    const nuevasTarjetas = tarjetas.filter((tarjeta) => !tarjeta.seleccionar);
    setTarjetas(nuevasTarjetas);
  };

  return (

    <div>

      <div className='contenedor-input'>

      <input
          className='text-ciudad'
          type='text'
          id='texto'
          placeholder='Ingresa una Ciudad'
          ref={inputRef}
        />
        
      </div>

        <Botones agregar={agregar} borrar={borrar} />

      <div className='contenedor-tarjeta'>
        {tarjetas.map((tarjeta) => (
          <Tarjeta
            key={tarjeta.id}
            ciudad={tarjeta.ciudad}
            clima={tarjeta.clima}
            seleccionar={tarjeta.seleccionar}
            Click={() => seleccionarTarjeta(tarjeta.id)}
          />
        ))}

      </div>

      {data && (
        
        <div className='clima-actual'>
          <h2>Clima Actual:</h2>
          <p>Temperatura: {data.temp_c}°C</p>
          <p>Descripción: {data.text}</p>
          <img src={data.icon} alt='Clima' />
          
        </div>
      )}
    </div>
  );
}

export default App;
