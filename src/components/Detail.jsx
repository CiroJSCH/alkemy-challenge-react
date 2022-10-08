import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

const Detail = (props) => {

  const token = sessionStorage.getItem("token");

  const [movie, setMovie] = useState({});

  const query = new URLSearchParams(window.location.search);
  const movieID = query.get("movieID");

  const endPoint = `https://api.themoviedb.org/3/movie/${movieID}?api_key=9ff3ac9ca47974515307cf24aff660fb&language=es-ES`;

  useEffect(() => {
    axios
      .get(endPoint)
      .then((response) => {
        setMovie(response.data);
      })
      .catch((error) => console.log(error));
  }, [endPoint]);

  const inFav = props.favorites.filter((favorite) => {
    return favorite.id === movieID;
  });

  return (
    <>
      { !token && <Navigate to="/"/> }
      <h2 className="text-primary">{movie.original_title}</h2>
      <div className="row">
        <div className="col-4">
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            className="img-fluid border border-primary rounded-end border-3"
            alt="..."
          ></img>
        </div>
        <div className="col-8">
          <div className="d-flex align-items-center">
            <h5 className="text-primary">Fecha de estreno: </h5>
            <h5 className="px-2">{movie.release_date}</h5>
          </div>
          <h4 className="text-primary">Descripción</h4>
          <p>{movie.overview}</p>
          <h5 className="text-primary">Géneros:</h5>
          <ul>
            {movie.genres?.map((genre, index) => (
              <li key={index}>{genre.name}</li>
            ))}
          </ul>
          <div>
            <h3>Voto promedio<span className={`mx-2 badge bg-${movie.vote_average > 6 ? "success" : "danger"}`}>{movie.vote_average}</span></h3>
            <h3>Total de votos<span className={"mx-2 badge bg-warning"}>{movie.vote_count}</span></h3>
            <h3><span className="badge bg-info mt-5">{inFav.length === 0 ? "No está en favoritos" : "En favoritos"}</span></h3>
          </div>
        </div>
      </div>
    </>
  );
};

export default Detail;
