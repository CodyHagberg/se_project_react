import "./ModalWithForm.css";
import closeIcon from "../../assets/close_icon.png";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleCloseClick,
  onSubmit,
  secondaryAction,
}) {
  return (
    <div className={`modal ${isOpen && "modal_opened"}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          className="modal__close"
          type="button"
        >
          <img src={closeIcon} alt="Close" className="modal__close-icon" />
        </button>
        <form className="modal__form" onSubmit={onSubmit}>
          {children}
          <div className="modal__actions">
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
          {secondaryAction && secondaryAction}
          </div>
        </form>
      </div>
    </div>
  );
}
export default ModalWithForm;
