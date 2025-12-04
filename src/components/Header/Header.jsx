import './Header.css'
import logo from '../../assets/wtwr logo.svg'
import avatar from '../../assets/Ellipse.svg'


function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo}/>
      <p className="header__date-and-location">Date, Location</p>
      <button className="header__add-clothes-btn">+ Add clothes</button>
      <div className="header__user-container">
        <p className="header__username">Terrence Tegegne</p>
        <img className="header__avatar" alt="Terrence Tegegne" src={avatar}/>
      </div>
    </header>
  );
}
export default Header;