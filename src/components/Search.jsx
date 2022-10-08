import React from "react";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useNavigate } from "react-router-dom";

const MySwal = withReactContent(Swal);

const Search = () => {
  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const keyword = e.target.search.value.trim();

    if (keyword === "") {
      MySwal.fire({
        icon: "error",
        title: "Debes escribir algo",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "De acuerdo",
      });
      return;
    } else if (keyword.length < 4) {
      MySwal.fire({
        icon: "error",
        title: "Debes escribir al menos 4 caracteres",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "De acuerdo",
      });
      return;
    }

    return navigate(`/results?keyword=${keyword}`);
  };

  return (
    <form className="d-flex" role="search" onSubmit={submitHandler}>
      <input
        className="form-control me-2"
        type="search"
        placeholder="Search"
        aria-label="Search"
        name="search"
      ></input>
      <button className="btn btn-outline-light" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
