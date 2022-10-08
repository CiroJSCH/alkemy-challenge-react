import { Link } from "react-router-dom";

const Favs = (props) => {
  const ratingAverage = (
    props.favorites
      .map((favorite) => {
        return favorite.rating;
      })
      .reduce((previousValue, currentValue) => {
        return parseFloat(previousValue) + parseFloat(currentValue);
      }, 0) / props.favorites.length
  ).toFixed(2);

  console.log(ratingAverage)

  return (
    <>
      <h4>
        {
          isNaN(ratingAverage) ?
          `El rating de tus favoritos es ${ratingAverage}`
          :
          "Aún no tienes películas agregadas a favoritos"
        }
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
                  style={{height:"28rem"}}
                ></img>
                <button
                  onClick={props.favFunction}
                  className="favourite-btn"
                  data-movie-id={favorite.id}
                  data-movie-average={favorite.vote_average}
                >
                  🖤
                </button>
                <div className="card-body" style={{height:"14rem"}}>
                  <h5 className="card-title">{favorite.title}</h5>
                  <p className="card-text">{favorite.description}...</p>
                  <Link
                    to={`/detail?favoriteID=${favorite.id}`}
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

export default Favs;
