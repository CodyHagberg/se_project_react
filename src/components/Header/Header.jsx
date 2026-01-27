import { NavLink } from "react-router-dom";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext.jsx";
import "./Header.css";
import logo from "../../assets/wtwr logo.svg";
import avatar from "../../assets/Ellipse.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

function Header({ handleAddClick, weatherData, handleLoginClick, handleRegisterClick, isLoggedIn }) {
  const currentUser = useContext(CurrentUserContext);
  const currentDate = new Date().toLocaleDateString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <NavLink to="/">
        <img className="header__logo" src={logo} alt="logo" />
      </NavLink>
      <p className="header__date-and-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />
      {isLoggedIn && ( 
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      )}
      {isLoggedIn && currentUser ? ( 
      <NavLink className="header__nav-link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">{currentUser.name}</p>
          {currentUser.avater ? ( 
          <img className="header__avatar" alt={currentUser.name} src={currentUser.avatar} />
          ) : (
            <div className="header__avatar-placeholder">
              {currentUser.name[0].toUpperCase()}
            </div>
          )}
        </div>
      </NavLink>
      ) : ( 
        <div className="header__auth-buttons">
          <button onClick={handleRegisterClick} className="header__register-btn">
            Sign Up
          </button>
          <button onClick={handleLoginClick} className="header__login-btn">
            Log In
          </button>
        </div>
      )}
    </header>
  );
}
export default Header;
