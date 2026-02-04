import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm.js";
import "./LoginModal.css";
import { login, getCurrentUser } from "../../utils/api.js";

function LoginModal({ isOpen, onClose, setCurrentUser, setIsLoggedIn }) {
  const { values, handleChange } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    login(values)
      .then((data) => {
        localStorage.setItem("jwt", data.token);
        setIsLoggedIn(true);
        return getCurrentUser(data.token);
      })
      .then((userData) => {
        setCurrentUser(userData);
        setIsLoggedIn(true);
        onClose();
      })
      .catch((err) => {
        console.error(err);
        alert("Login failed. Please check your credentials and try again.");
      });
  }

    return (
    <ModalWithForm
      title="Login"
      name="login"
      buttonText="Log In"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      secondaryAction={
    <button
      type="button"
      className="modal__secondary-button"
      onClick={() => {
        onClose();
      }}
    >   
   Sign up
    </button>
       }
    >
      <label htmlFor="login-email" className="modal__label">
        <input
        type="email"
        className="modal__input"
        id="login-email"
        name="email"
        required
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        />
      </label>

      <label htmlFor="login-password" className="modal__label">
        <input
        type="password"
        className="modal__input"
        id="login-password"
        name="password"
        required
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        />
      </label>
    </ModalWithForm>
    );
}

export default LoginModal;