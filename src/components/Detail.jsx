import React, { useState, useEffect } from "react";
import axios from "axios";

const Detail = () => {
  const [movie, setMovie] = useState({});

  const query = new URLSearchParams(window.location.search);
  const movieID = query.get("movieID");

  const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=9ff3ac9ca47974515307cf24aff660fb&language=es-ES`;

  useEffect(() => {
    axios
      .get(endPoint)
      .then((response) => {
        console.log(response.data);
        setMovie(response.data);
      })
      .catch((error) => console.log(error));
  }, [endPoint]);

  return (
    <>
      <h2>Título: {movie.original_title}</h2>
      <div className="row">
        <div className="col-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="img-fluid"
            alt="..."
          ></img>
        </div>
        <div className="col-8">
          <h5>Fecha de estreno: {movie.release_date}</h5>
          <h4>Descripción</h4>
          <p>{movie.overview}</p>
          <h5>Géneros:</h5>
          <ul>
            {movie.genres?.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))}
          </ul>
          <div>
            <h3>Voto promedio: {movie.vote_average}</h3>
            <h4>Total de votos: {movie.vote_count}</h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
