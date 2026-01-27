import ModalWithForm from "./ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../hooks/useForm";

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
      onClose={onClose}
      onSubmit={handleSubmit}
    >
        <input
        type="email"
        name="email"
        required
        placeholder="Email"
        value={values.email}
        onChange={handleChange}
        />

        <input
        type="password"
        name="password"
        required
        placeholder="Password"
        value={values.password}
        onChange={handleChange}
        />
    </ModalWithForm>
    );
}

export default LoginModal;