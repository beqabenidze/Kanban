import React from "react";
import { Context } from "../context";
import { useContext } from "react";
import light from "../assets/icon-light-theme.svg";
import dark from "../assets/icon-dark-theme.svg";
import { Link } from "react-router-dom";

function Launch({ platform }) {
  const {
    launchVisible,
    setLaunchVisible,
    addBoardVisible,
    setAddBoardVisible,
    navbarVisible,
    theme,
    setTheme,
    mobile,
    boards,
  } = useContext(Context);

  const handleTheme = () => {
    setTheme(theme == "dark" ? "light" : "dark");
  };

  return (
    <div
      className="overlay-launch"
      onClick={() => setLaunchVisible(!launchVisible)}
      style={{
        display:
          (launchVisible && mobile) ||
          (navbarVisible && mobile && launchVisible)
            ? "block"
            : "none",
      }}
    >
      <div
        className="launch"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="launch-div">
          <h6>ALL BOARDS({boards.length})</h6>
          <div>
            {boards.map((board) => {
              return (
                <Link
                  onClick={() => setLaunchVisible(false)}
                  to={"/" + board.slug}
                  className={
                    platform?.name == board?.name
                      ? "active-launch-box "
                      : "launch-box"
                  }
                  key={(Math.random() * 100000).toFixed(0)}
                >
                  <svg
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                      fill={platform?.name == board?.name ? "#FFF" : "grey"}
                    />
                  </svg>
                  <h6
                    style={{
                      color: platform?.name == board?.name ? "#FFF" : "grey",
                    }}
                  >
                    {board?.name}
                  </h6>
                </Link>
              );
            })}
          </div>
          <div
            className="launch-box"
            id="create"
            onClick={() => setLaunchVisible(false)}
          >
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                fill="#635fc7"
              />
            </svg>
            <h6
              onClick={() => setAddBoardVisible(!addBoardVisible)}
              id="create"
            >
              + Create New Board
            </h6>
          </div>
        </div>
        <div className="launch-theme-div">
          <img src={light}></img>
          <label className="toggler-wrapper">
            <input type="checkbox" className="checkbox" />
            <div className="toggler-slider">
              <div
                className="toggler-knob"
                style={{
                  left: theme === "dark" ? "calc(100% - 19px - 3px)" : "3px",
                }}
                onClick={handleTheme}
              ></div>
            </div>
          </label>
          <img src={dark}></img>
        </div>
      </div>
    </div>
  );
}

export default Launch;
