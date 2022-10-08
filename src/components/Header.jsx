import React from "react";
import { Link } from "react-router-dom";
import Search from "./Search";

const Header = (props) => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            ALKEFLIX
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarColor02"
            aria-controls="navbarColor02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarColor02">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to={"/movie-list"}>
                  Listado
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link active" to={"/favorites"}>
                  Favoritos: {props.favorites.length}
                </Link>
              </li>
            </ul>
            <Search />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
