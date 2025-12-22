import "./Profile.css"
import ClothesSection from "../ClothesSection/ClothesSection.jsx"
import SideBar from "../SideBar/SideBar.jsx"

export default function Profile({ clothingItems, handleCardClick,}) {
    return (
    <section className="profile">
        <SideBar/>
        <ClothesSection onCardClick={handleCardClick} clothingItems={clothingItems}/>

    </section>
    );
}