import { useContext, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import { useForm } from "../../hooks/useForm";

function EditProfileModal({ isOpen, onClose, onUpdateUser }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, setValues } = useForm({
    name: "",
    avatar: "",
  });

  // Pre-fill form with current user data
  useEffect(() => {
    if (currentUser && isOpen) {
      setValues({
        name: currentUser.name,
        avatar: currentUser.avatar,
      });
    }
  }, [currentUser, isOpen, setValues]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser(values);
  }

  return (
    <ModalWithForm
      title="Edit profile"
      buttonText="Save"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        name="name"
        required
        value={values.name}
        onChange={handleChange}
        className="modal__input"
        placeholder="Name"
      />

      <input
        type="url"
        name="avatar"
        required
        value={values.avatar}
        onChange={handleChange}
        className="modal__input"
        placeholder="Avatar URL"
      />
    </ModalWithForm>
  );
}

export default EditProfileModal;