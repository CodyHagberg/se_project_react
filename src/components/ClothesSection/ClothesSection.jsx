import "./ClothesSection.css"
import ItemCard from '../ItemCard/ItemCard.jsx';



export default function ClothesSection({clothingItems, onCardClick, handleAddClick }) {
    return (
    <div className="clothes-section">
        <div className="clothes-section__row">
            <p className="clothes-section__title">Your Items</p>
            <button onClick={handleAddClick} className="clothes-section__button">+ Add new</button>
        </div>
          <ul className="clothes-section__items">
                    {clothingItems.map((item) => {
                        return (
                            <ItemCard key={item._id || item.name} item={item} onCardClick={onCardClick} />
                        )
                    })}
                </ul>
    </div>
    );
}