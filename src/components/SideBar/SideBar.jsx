import "./SideBar.css";
import avatar from "../../assets/Ellipse.svg";

export default function SideBar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__user-container">
        <p className="sidebar__username">Terrence Tegegne</p>
        <img className="sidebar__avatar" alt="Terrence Tegegne" src={avatar} />
      </div>
    </aside>
  );
}
