import ModalWithForm from "./ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../hooks/useForm";

function RegisterModal({ isOpen, onClose, onRegister }) {
  const { values, handleChange, resetForm } = useForm({
    email: "",
    password: "",
    name: "",
  });

  function handleSubmit(e) {
    e.preventDefault();
    onRegister(values);
  }

    return (
    <ModalWithForm
      title="Register"
      buttonText="Sign Up"
      ButtonText="Sign Up"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >   
        <input
        type="text"
        name="name"
        placeholder="Name"
        required
        value={values.name}
        onChange={handleChange}
        />

        <input
        type="url"
        name="avatar"
        placeholder="Avatar URL"
        required
        value={values.avatar}
        onChange={handleChange}
        />

        <input
        type="email"
        name="email"
        placeholder="Email"
        required
        value={values.email}
        onChange={handleChange}
        />

        <input
        type="password"
        name="password"
        placeholder="Password"
        required
        value={values.password}
        onChange={handleChange}
        />
    </ModalWithForm>
  );
}

export default RegisterModal;