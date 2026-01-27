import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import "./SideBar.css";

export default function SideBar({ onEditProfile }) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <div className="sidebar">
      <div className="sidebar__user">
        {currentUser?.avatar ? (
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="sidebar__avatar"
          />
        ) : (
          <div className="sidebar__avatar-placeholder">
            {currentUser?.name?.[0]}
          </div>
        )}
        <p className="sidebar__name">{currentUser?.name}</p>
      </div>

      <button
        type="button"
        className="sidebar__edit-button"
        onClick={onEditProfile}
      >
        Edit profile
      </button>
    </div>
  );
}