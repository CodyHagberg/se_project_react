import "./ClothesSection.css"
import ItemCard from '../ItemCard/ItemCard.jsx';



export default function ClothesSection({clothingItems, handleCardClick, }) {
    return (
    <div className="clothes-section">
        <div className="clothes-section__row">
            <p>text</p>
            <button>Button</button>
        </div>
          <ul className="clothes-section__items">
                    {clothingItems.map((item) => {
                        return (
                            <ItemCard key={item._id || item.name} item={item} onCardClick={handleCardClick} />
                        )
                    })}
                </ul>
    </div>
    );
}