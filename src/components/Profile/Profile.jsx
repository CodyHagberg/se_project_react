import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";

export default function Profile({
  clothingItems,
  onCardClick,
  handleAddClick,
  onEditProfile,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfile={onEditProfile}/>
      <ClothesSection
        onCardClick={onCardClick}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
