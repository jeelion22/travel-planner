import "../styles/Sidebar.css";
import { useState } from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ userType }) => {
  const [active, setActive] = useState("Dashboard");

  let items;
  if (userType === "reuniteSeeker") {
    items = ["Dashboard", "Profile"];
  } else {
    items = ["Dashboard", "Profile", "Contributions"];
  }

  return (
    <div className="list-group mb-2">
      {items.map((item, index) => (
        <Link
          id={item.toLowerCase()}
          key={index}
          to={`${item.toLowerCase()}`}
          className={`list-group-item list-group-item-action ${
            active === item ? "active" : ""
          }`}
          onClick={() => setActive(item)}
        >
          {item}
        </Link>
      ))}
    </div>
  );
};

export default Sidebar;
