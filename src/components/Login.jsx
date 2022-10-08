// Libraries
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Login = () => {

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (email === "" || password === "") {
      Swal.fire({
        icon: "error",
        title: "Los campos no pueden estar vacios",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "De acuerdo",
      });
      return;
    }

    if (!re.test(email)) {
      Swal.fire({
        icon: "error",
        title: "Debes ingresar un mail válido!",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "De acuerdo",
      });
      return;
    }

    if (email !== "challenge@alkemy.org" || password !== "react") {
      Swal.fire({
        icon: "error",
        title: "Credenciales no válidas",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "De acuerdo",
      });
      return;
    }

    axios
      .post("http://challenge-react.alkemy.org", {
        email,
        password,
      })
      .then((response) => {
        sessionStorage.setItem("token", response.data.token);
        navigate("/movie-list")
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
  };

  return (
    <div className="container">
    <div className="row">
      <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div className="card border-0 shadow rounded-3 my-5">
          <div className="card-body p-4 p-sm-5">
            <h5 className="card-title text-center mb-5 fw-light fs-5">Iniciar sesión</h5>
            <form onSubmit={submitHandler}>
              <div className="form-floating mb-3">
                <input type="text" className="form-control" id="floatingInput" name="email"></input>
                <label htmlFor="floatingInput">Email</label>
              </div>
              <div className="form-floating mb-3">
                <input type="password" className="form-control" id="floatingPassword" name="password"></input>
                <label htmlFor="floatingPassword">Contraseña</label>
              </div>             
              <div className="d-grid">
                <button className="btn btn-primary btn-login text-uppercase fw-bold" type="submit">Ingresar</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
  );
};

export default Login;
