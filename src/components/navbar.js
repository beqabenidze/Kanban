import React from "react";
import logoLight from "../assets/logo-light.svg";
import logoDark from "../assets/logo-dark.svg";
import light from "../assets/icon-light-theme.svg";
import dark from "../assets/icon-dark-theme.svg";
import hideSidebar from "../assets/icon-hide-sidebar.svg";
import show from "../assets/icon-show-sidebar.svg";
import { Context } from "../context";
import { useContext } from "react";
import { Link } from "react-router-dom";

function Navbar({ platform }) {
  const { theme, setTheme } = useContext(Context);
  const { navbarVisible, setNavbarVisible } = useContext(Context);
  const { addBoardVisible, setAddBoardVisible } = useContext(Context);
  const { boards } = useContext(Context);
  const { mobile } = useContext(Context);

  const handleTheme = () => {
    setTheme(theme == "light" ? "dark" : "light");
  };

  const handleNavbar = () => {
    setNavbarVisible(!navbarVisible);
  };

  const handleAddBoard = () => {
    setAddBoardVisible(!addBoardVisible);
  };

  return (
    <>
      <div
        className="navbar"
        style={{
          left: navbarVisible && !mobile ? "0" : "-300px",
        }}
      >
        <img
          src={theme == "dark" ? logoLight : logoDark}
          style={{ margin: "0px 20px" }}
        ></img>
        <div className="navbar-launch">
          <h6>ALL BOARDS ({boards.length})</h6>
          <div style={{ margin: "20px 0" }}>
            {boards.map((board) => {
              return (
                <Link
                  to={"/" + board.slug}
                  className={
                    platform?.name == board?.name
                      ? "active-navbar-launch-div"
                      : "navbar-launch-div"
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

            <div className="navbar-launch-div" id="create">
              <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
                  fill="#635fc7"
                />
              </svg>
              <h6 onClick={handleAddBoard} id="create">
                + Create New Board
              </h6>
            </div>
          </div>
        </div>
        <div className="navbar-theme-div">
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
        <div className="hide" onClick={handleNavbar}>
          <img src={hideSidebar}></img>
          <p>Hide Sidebar</p>
        </div>
      </div>
      <div
        className="show-div"
        onClick={handleNavbar}
        style={{ display: navbarVisible || mobile ? "none" : "block" }}
      >
        <img src={show}></img>
      </div>
    </>
  );
}

export default Navbar;
