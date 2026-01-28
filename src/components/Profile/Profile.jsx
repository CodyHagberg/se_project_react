import "./Profile.css";
import ClothesSection from "../ClothesSection/ClothesSection.jsx";
import SideBar from "../SideBar/SideBar.jsx";

export default function Profile({
  clothingItems,
  onCardClick,
  onCardLike,
  handleAddClick,
  onEditProfile,
  onSignOut,
}) {
  return (
    <section className="profile">
      <SideBar onEditProfile={onEditProfile} onSignOut={onSignOut} />
      <ClothesSection
        onCardClick={onCardClick}
        onCardLike={onCardLike}
        clothingItems={clothingItems}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
