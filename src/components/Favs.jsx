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

  return (
    <>
      <h2>El rating de tus favoritos: {ratingAverage}</h2>
      <div className="row">
        {props.favorites.map((favorite, index) => {
          return (
            <div className="col-3" key={index}>
              <div className="card">
                <img
                  src={`https://image.tmdb.org/t/p/w500${favorite.img}`}
                  className="card-img-top"
                  alt={`${favorite.title} poster`}
                ></img>
                <button
                  onClick={props.favFunction}
                  className="favourite-btn"
                  data-movie-id={favorite.id}
                >
                  🖤
                </button>
                <div className="card-body">
                  <h5 className="card-title">{favorite.title}</h5>
                  <p className="card-text">{favorite.description}...</p>
                  <Link
                    to={`/detail?favoriteID=${favorite.id}`}
                    className="btn btn-primary"
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
