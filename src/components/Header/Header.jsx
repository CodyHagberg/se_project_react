import { NavLink } from "react-router-dom";
import "./Header.css";
import logo from "../../assets/wtwr logo.svg";
import avatar from "../../assets/Ellipse.svg";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch.jsx";

function Header({ handleAddClick, weatherData }) {
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
      <button
        onClick={handleAddClick}
        type="button"
        className="header__add-clothes-btn"
      >
        + Add clothes
      </button>
      <NavLink className="header__nav-link" to="/profile">
        <div className="header__user-container">
          <p className="header__username">Terrence Tegegne</p>
          <img className="header__avatar" alt="Terrence Tegegne" src={avatar} />
        </div>
      </NavLink>
    </header>
  );
}
export default Header;
