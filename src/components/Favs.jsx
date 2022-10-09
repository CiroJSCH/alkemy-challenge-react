import { useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Favs = (props) => {
  const token = sessionStorage.getItem("token");

  const [averageFav, setAverageFav] = useState(0.0);

  const familyCategory = props.favorites
    .map((favorite) => {
      return favorite.genres.split(",");
    })
    .flat()
    .indexOf("10751");

  useEffect(() => {
    const ratingAverage = (
      props.favorites
        .map((favorite) => {
          return favorite.rating;
        })
        .reduce((previousValue, currentValue) => {
          return parseFloat(previousValue) + parseFloat(currentValue);
        }, 0) / props.favorites.length
    ).toFixed(2);

    if (isNaN(ratingAverage)) {
      setAverageFav(0.0);
    } else {
      setAverageFav(ratingAverage);
    }
  }, [props.favorites]);

  return (
    <>
      {!token && <Navigate to="/" />}
      {familyCategory === -1 ? (
        <h3>Agrega una película de categoría familia para ver tus favoritos</h3>
      ) : (
        <>
          <h4>
            {averageFav !== 0
              ? `El rating de tus favoritos es ${averageFav}`
              : "Aún no tienes películas agregadas a favoritos"}
          </h4>
          <div className="row">
            {props.favorites.map((favorite, index) => {
              return (
                <div className="col-3" key={index}>
                  <div className="card">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${favorite.img}`}
                      className="card-img-top"
                      alt={`${favorite.title} poster`}
                      style={{ height: "28rem" }}
                    ></img>
                    <button
                      onClick={props.favFunction}
                      className="favourite-btn"
                      data-movie-id={favorite.id}
                      data-movie-average={favorite.vote_average}
                      data-movie-genres={favorite.genres}
                    >
                      🖤
                    </button>
                    <div className="card-body" style={{ height: "14rem" }}>
                      <h5 className="card-title">{favorite.title}</h5>
                      <p className="card-text">{favorite.description}...</p>
                      <Link
                        to={`/detail?movieID=${favorite.id}`}
                        className="btn btn-primary"
                        style={{ position: "absolute", bottom: "30px" }}
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
      )}
    </>
  );
};

export default Favs;
