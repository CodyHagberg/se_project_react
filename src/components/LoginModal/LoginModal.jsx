import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm.js";
import "./LoginModal.css";

function LoginModal({ isOpen, onClose, onLogin }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onLogin(values);
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
      <label htmlFor="email" className="modal__label">
        <input
        type="email"
        className="modal__input"
        id="email"
        name="email"
        required
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        />
      </label>

      <label htmlFor="password" className="modal__label">
        <input
        type="password"
        className="modal__input"
        id="password"
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