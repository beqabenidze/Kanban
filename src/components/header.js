import React from "react";
import logo from "../assets/logo-mobile.svg";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import chevronDown from "../assets/icon-chevron-down.svg";
import plus from "../assets/icon-add-task-mobile.svg";
import board from "../assets/icon-vertical-ellipsis.svg";
import { Context } from "../context";
import { useContext } from "react";

function Header({ platform }) {
  const {
    launchVisible,
    setLaunchVisible,
    mobile,
    theme,
    popVisible,
    setPopVisible,
    addTaskVisible,
    setAddTaskVisible,
  } = useContext(Context);

  return (
    <div className="header">
      <div className="header-logo-div">
        <img src={mobile ? logo : theme == "dark" ? logoLight : logoDark}></img>
        <div
          className="header-logo-div-flex"
          onClick={() => setLaunchVisible(!launchVisible)}
        >
          <img
            style={{
              display: mobile ? "block" : "none",
              transform: launchVisible ? "rotate(180deg)" : "none",
              transition: "transform 0.5s",
            }}
            src={chevronDown}
          ></img>
        </div>
      </div>
      <div className="header-settings-div">
        {mobile ? (
          <img
            className={platform ? "plus" : "non-active-plus"}
            src={plus}
            onClick={() => setAddTaskVisible(!addTaskVisible)}
          ></img>
        ) : (
          <h1
            className={platform ? "plus" : "non-active-plus"}
            onClick={() => setAddTaskVisible(!addTaskVisible)}
          >
            + Add New Task
          </h1>
        )}

        <img
          src={board}
          style={{
            width: "30px",
            height: "30px",
            padding: "5px 12px",
            cursor: "pointer",
            pointerEvents: platform ? "all" : "none",
          }}
          onClick={() => setPopVisible(!popVisible)}
        ></img>
      </div>
    </div>
  );
}

export default Header;
