import React, { useRef, useState } from "react"; 
import { Card, Form, InputGroup, Col } from "react-bootstrap"; //Elementos de Boostrap

//El componente buscador consume la api desde "https://api.lyrics.ovh"
export const Buscador = () => {
  const [resultadoBusquedaCanciones, setResultadoBusquedaCanciones] =
    useState();
  
  //API
  const API_URL = "https://api.lyrics.ovh";

  const valorInputBusqueda = useRef();
  // usamos fetch para consumir la api
  const getLyrics = async (artist, songTilte) => {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(`${API_URL}/v1/${artist}/${songTilte}`);
        const data = await res.json();
        resolve(data);
      } catch (error) {
        reject(error);
      }
    });
  };
  // usamos fetch para traer las canciones
  const searchSongs = async (value) => {
    const res = await fetch(`${API_URL}/suggest/${value}`);
    const data = await res.json();
    setResultadoBusquedaCanciones(data.data);

    console.log(resultadoBusquedaCanciones);
  };
  //Dibujamos el fomulario donde se escriba la canción que buscamos
  return (
    <>
      <InputGroup size="lg" className="mb-3 mt-5">
        <Form.Control
          placeholder="Escribe el nombre del artista o la canción que buscas"
          aria-label="Nombre de la cancion"
          aria-describedby="basic-addon2"
          ref={valorInputBusqueda}
          onKeyUp={() => {
            searchSongs(valorInputBusqueda.current.value); //Mientras se escriba en el input se ejecuta la funcion "searchSongs".
          }}
        />
      </InputGroup>

      {resultadoBusquedaCanciones &&
        resultadoBusquedaCanciones.map((item) => {
          return (
            //Mostramos en formato tarjeta las canciones: El título, autor, preview y el link hacia la cancion completa.
            <Col sm={12}>
              <Card
                key={item.id}
                className="shadow my-2"
                bg="dark"
                text="white"
              >
                <Card.Header as={"h5"} style={{ height: "3.7rem" }}>
                    {item.title} - {item.artist.name}
                </Card.Header>
                <Card.Body>
                  <Card.Text className="blockquote mb-0 row">
                    <img
                      src={item.album.cover}
                      alt={item.album.title}
                      className="col-4 mb-2"
                    />
                    <div className="col-8">
                      <p className="col-12" style={{ textAlign: "center" }}>
                        Escuchar preview
                      </p>
                      <audio id="audio" controls className="col-12">
                        <source type="audio/wav" src={item.preview} />
                      </audio>
                    </div>
                  </Card.Text>
                </Card.Body>
                <Card.Footer className="col-12">
                  <Card.Link href={item.link} target="_blank" rel="noreferrer">
                    Escucha la canción
                    <cite title={item.title}> Completa</cite>
                  </Card.Link>
                </Card.Footer>
              </Card>
            </Col>
          );
        })}
    </>
  );
};
