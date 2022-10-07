import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from 'sweetalert2-react-content'

const MySwal = withReactContent(Swal)

const Login = () => {
  const submitHandler = (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    const re =
      /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

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
      })
      .catch((error) => {
        MySwal.fire({
          icon: "error",
          title: <h1>Algo salió mal</h1>,
          html: <h3>Intenta de nuevo más tarde</h3>,
          confirmButtonColor: "#3085d6",
          confirmButtonText: "De acuerdo",
        })
      });
  };

  return (
    <div>
      <h1>Iniciar sesión</h1>
      <form onSubmit={submitHandler}>
        <input type="text" name="email" />
        <input type="password" name="password" />
        <button type="submit">Ingresar</button>
      </form>
    </div>
  );
};

export default Login;
