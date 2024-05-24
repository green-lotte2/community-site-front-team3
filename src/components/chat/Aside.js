import React from "react";
import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <aside className="chatAside">
      <ul>
        <li>
          <Link to="#">menu1</Link>
        </li>
        <li>
          <Link to="#">menu2</Link>
        </li>
        <li>
          <Link to="#">menu3</Link>
        </li>
        <li>
          <Link to="#">menu4</Link>
        </li>
        <li>
          <Link to="#">menu5</Link>
        </li>
        <li>
          <Link to="#">menu6</Link>
        </li>
        <li>
          <Link to="#">menu7</Link>
        </li>
        <li>
          <Link to="#">menu8</Link>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
