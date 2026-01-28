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
      buttonText="Save changes"
      isOpen={isOpen}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
    >
    <label htmlFor="name" className="modal__label">
        Name * {""}
      <input
        type="text"
        className="modal__input"
        id="name"
        name="name"
        required
        value={values.name}
        onChange={handleChange}
        placeholder="Name"
      />
    </label>

    <label htmlFor="avatar" className="modal__label">
        Avatar * {""}
      <input
        type="url"
        className="modal__input"
        id="avatar"
        name="avatar"
        required
        value={values.avatar}
        onChange={handleChange}
        placeholder="Avatar URL"
      />
    </label>
    </ModalWithForm>
  );
}

export default EditProfileModal;