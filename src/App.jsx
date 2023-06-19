import "bootstrap/dist/css/bootstrap.min.css"; //importamos boostrap
import { Container, Navbar, Row } from "react-bootstrap"; //los elementos que usamos de boostrap
import { Buscador } from "./components/Buscador/Buscador"; //Nuestro buscador
import { BrowserRouter, Route, Routes } from "react-router-dom"; //Rutas
// import { DetalleLetra } from "./components/DetalleLetra/DetalleLetra"; // El componente que muestra las letras de las canciones

//App dibuja la barra de navegación y trae los compnentes Buscador y DetalleLetra
function App() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className="sticky-top titulo">
        <Container className="justify-content-center">
          <Navbar.Brand href="/" style={{fontSize: "1.8rem", fontFamily: 'Rubik'}} >
            <img
              alt="logo notas musicales"
              src="/nota-musical.png"
              width="35"
              height="35"
              className="d-inline-block align-top"
            />{' '}
            Buscador de Canciones
          </Navbar.Brand>
        </Container>
      </Navbar>
      <Container>
        <Row className="justify-content-center g-4" xs={1} md={2} lg={3}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Buscador />} />
            </Routes>
          </BrowserRouter>
        </Row>
      </Container>
    </>
  );
}

export default App;
