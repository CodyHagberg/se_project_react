import "./ItemModal.css"
import closeIcon from "../../assets/white-close.png";

function ItemModal({activeModal, handleCloseClick, card, onDelete}) {
return(
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
        <div className="modal__content modal__content_type_image">
             <button onClick={handleCloseClick} className="modal__close" type="button"><img src={closeIcon} alt="Close" className="modal__close-icon-white" />
        </button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
            <h2 className="modal__caption">{card.name}</h2>
            <p className="modal__weather">Weather: {card.weather}</p>
            <button className="modal__delete-button" onClick={() => onDelete(card._id)} type="button">
                Delete Item
            </button>
        </div>
        </div>
    </div>
)
}
export default ItemModal