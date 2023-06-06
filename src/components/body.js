import React from "react";
import { Context } from "../context";
import { useContext } from "react";

import Swwiper from "./swiper";

function Body({ platform }) {
  const { navbarVisible, boards, mobile } = useContext(Context);

  return platform ? (
    <Swwiper platform={platform} />
  ) : (
    <div
      className="body"
      style={{ left: navbarVisible && !mobile ? "calc(50% + 300px)" : "50%" }}
    >
      <h1>Please {boards.length > 0 ? "Choose" : "Add"} Platform</h1>
    </div>
  );
}

export default Body;
