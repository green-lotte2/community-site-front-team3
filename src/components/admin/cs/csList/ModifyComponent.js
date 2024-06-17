import axios from "axios";
import React from "react";
import { globalPath } from "globalPaths";

const url = globalPath.path;

const ModifyComponent = ({ selectedRows }) => {
  axios
    .get(`${url}/cs/select`)
    .then((response) => {
      console.log(response.data);
    })
    .catch((err) => {
      console.log(err);
    });
  return <div>ModifyComponent</div>;
};

export default ModifyComponent;
