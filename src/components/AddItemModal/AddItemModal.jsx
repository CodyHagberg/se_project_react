import ModalWithForm from "../ModalWithForm/ModalWithForm";

const AddItemModal = ({ activeModal, handleSubmit, handleCloseClick, buttonText}) => {
  
    
  return (
    
    <ModalWithForm title="New Garment" name="new-card" handleCloseClick={handleCloseClick} onSubmit={handleSubmit} activeModal={activeModal} buttonText={buttonText}>
      <label htmlFor="name" className="modal__label">
            Name {""}
            <input type="text"
             className="modal__input"
              id="name" 
              placeholder="Name"
              required />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
            Image {""}
            <input type="url"
             className="modal__input"
              id="imageUrl" 
              placeholder="Image URL"
              required/>
        </label>
        <fieldset className="modal__radio-buttons">
            <legend className="modal__legend">Select the weather type:</legend>
            <label htmlFor="hot" className="modal__label modal__label_type_radio">
              <input id="hot" type="radio" name="weather" className="modal__radio-input" /> <span>Hot</span>
            </label>
            <label htmlFor="warm" className="modal__label modal__label_type_radio">
              <input id="warm" type="radio" name="weather"  className="modal__radio-input" /> <span>Warm</span>
            </label>
            <label htmlFor="cold" className="modal__label modal__label_type_radio">
              <input id="cold" type="radio" name="weather" className="modal__radio-input" /> <span>Cold</span>
            </label>
        </fieldset>
    </ModalWithForm>
  );
};

export default AddItemModal;