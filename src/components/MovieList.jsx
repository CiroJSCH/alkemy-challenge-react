import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { Link, Navigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const MovieList = (props) => {

  const token = sessionStorage.getItem("token");

  const [movies, setMovies] = useState([]);

  useEffect(() => {
  
    axios
      .get(
        "https://api.themoviedb.org/3/discover/movie?api_key=9ff3ac9ca47974515307cf24aff660fb&language=es-ES"
      )
      .then((response) => {
        setMovies(response.data.results);
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: <h1>Algo salió mal</h1>,
          html: <h3>Intenta de nuevo más tarde</h3>,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "De acuerdo",
        });
      });
  }, []);

  return (
    <>
      { !token && <Navigate to="/"/> }
      <div className="row">
        {movies.map((movie, index) => {
          return (
            <div className="col-3" key={index}>
              <div className="card mb-3">
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  className="card-img-top"
                  alt={`${movie.original_title} poster`}
                  style={{height:"28rem"}}
                ></img>
                 <button onClick={props.favFunction} className="favourite-btn" data-movie-id={movie.id} data-movie-average={movie.vote_average}>🖤</button>
                <div className="card-body" style={{height:"14rem"}}>
                  <h5 className="card-title">{movie.original_title}</h5>
                  <p className="card-text">
                    {movie.overview.substring(0, 100)}...
                  </p>
                  <Link
                    to={`/detail?movieID=${movie.id}`}
                    className="btn btn-primary"
                    style={{position:"absolute", bottom:"30px"}}
                  >
                    Ver detalle
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default MovieList;
