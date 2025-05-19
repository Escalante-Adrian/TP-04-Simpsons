function App() {
  const [datos, setDatos] = React.useState([]);

  React.useEffect(() => {
    fetch("https://thesimpsonsquoteapi.glitch.me/quotes?count=5")
      .then(res => res.json())
      .then(data => setDatos(data));
  }, []);

  return (
    <div>
      <h1>Conecta la foto con el nombre</h1>
      <h6>Aun me falta hacerlo funcional profe no me bajes puntos</h6>
      <div className="contenedor">

        <div className="columna">
          {datos.map((item, i) => (
            <div className="foto" key={i}>
              <img src={item.image} alt="foto" />
            </div>
          ))}
        </div>

        <div className="columna">
          {datos.map((item, i) => (
            <div className="nombre" key={i}>
              {item.character}
            </div>
          ))}
        </div>
      </div>

      <button style={{ marginTop: "20px", padding: "10px" }}>Verificar</button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
