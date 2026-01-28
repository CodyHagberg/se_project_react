import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm.js";
import "./RegisterModal.css";

function RegisterModal({ isOpen, onClose, onRegister }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    name: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
    resetForm();
  }

    return (
    <ModalWithForm
      title="Register"
      buttonText="Sign Up"
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
    Log in 
    </button>
       }
       >

      <label htmlFor="register-email" className="modal__label">
        Email* {""}
        <input
        type="email"
        className="modal__input"
        id="register-email"
        name="email"
        placeholder="Email"
        required
        value={values.email}
        onChange={handleChange}
        />
      </label>

      <label htmlFor="register-password" className="modal__label">
        Password* {""}
        <input
        type="password"
        className="modal__input"
        id="register-password"
        name="password"
        placeholder="Password"
        required
        value={values.password}
        onChange={handleChange}
        />
      </label>

      <label htmlFor="register-name" className="modal__label">
        Name * {""}
        <input
        type="text"
        className="modal__input"
        id="register-name"
        name="name"
        placeholder="Name"
        required
        value={values.name}
        onChange={handleChange}
        />
      </label>

      <label htmlFor="register-avatar" className="modal__label">
        Avatar URL * {""}
        <input
        type="url"
        className="modal__input"
        id="register-avatar"
        name="avatar"
        placeholder="Avatar URL"
        required
        value={values.avatar}
        onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}

export default RegisterModal;