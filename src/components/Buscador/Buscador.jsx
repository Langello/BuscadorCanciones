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
    if (value.trim() !== "") {
      const res = await fetch(`${API_URL}/suggest/${value}`);
      const data = await res.json();
      setResultadoBusquedaCanciones(data.data);
    } else {
      setResultadoBusquedaCanciones(null); // Reinicia los resultados de búsqueda si no hay contenido
    }
  };
  
  //Dibujamos el fomulario donde se escriba la canción que buscamos
  return (
    <>
      <InputGroup size="lg" className="mb-3 mt-5">

      <Form.Control
        autoFocus
        placeholder="Escribe el nombre del artista o la canción que buscas"
        aria-label="Nombre de la canción"
        aria-describedby="basic-addon2"
        ref={valorInputBusqueda}
        onInput={() => {
          const inputValue = valorInputBusqueda.current.value;
          if (inputValue.trim() !== "") {
            searchSongs(inputValue);
          } else {
            setResultadoBusquedaCanciones(null); // Reinicia los resultados de búsqueda si no hay contenido
          }
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
                      className="col-6 mb-2"
                    />
                    <Card.Link className="col-6 text-reset" href={item.link} target="_blank" rel="noreferrer">
                    Escucha la canción
                    <cite title={item.title}>  {item.title}  completa.</cite>
                  </Card.Link>
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
    </>
  );
};
