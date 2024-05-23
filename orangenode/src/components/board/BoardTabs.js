import React from "react";
import { Link } from "react-router-dom";

const BoardTabs = () => {
  return (
    <>
      <div className="BoardTabs">
        <Link to="#" className="active">Overview</Link>
        <Link to="#">Tasks</Link>
        <Link to="#">Documents</Link>
        <Link to="#">Team</Link>
        <Link to="#">Reports</Link>
        <Link to="#">Admin</Link>
      </div>
    </>
  );
};

export default BoardTabs;
