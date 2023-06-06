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
  const { launchVisible, setLaunchVisible } = useContext(Context);
  const { addTaskVisible, setAddTaskVisible } = useContext(Context);
  const { popVisible, setPopVisible } = useContext(Context);

  const { theme } = useContext(Context);
  const { mobile } = useContext(Context);

  const handleLaunch = () => {
    setLaunchVisible(!launchVisible);
  };

  const handlePop = () => {
    setPopVisible(!popVisible);
  };

  const handleAddTask = () => {
    setAddTaskVisible(!addTaskVisible);
  };

  return (
    <div className="header">
      <div className="header-logo-div">
        <img src={mobile ? logo : theme == "dark" ? logoLight : logoDark}></img>
        <div className="header-logo-div-flex" onClick={handleLaunch}>
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
            onClick={handleAddTask}
          ></img>
        ) : (
          <h1
            className={platform ? "plus" : "non-active-plus"}
            onClick={handleAddTask}
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
          onClick={handlePop}
        ></img>
      </div>
    </div>
  );
}

export default Header;
