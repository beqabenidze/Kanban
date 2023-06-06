import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Context } from "./context";
import Home from "./pages/home";
import Add from "./pages/add";
import useLocalStorage from "use-local-storage";
import Header from "./components/header";

function App() {
  const [theme, setTheme] = useLocalStorage("theme" ? "dark" : "light");
  const [mobile, setMobile] = useState(window.innerWidth > 768 ? false : true);
  const [navbarVisible, setNavbarVisible] = useState(false);
  const [launchVisible, setLaunchVisible] = useState(false);
  const [popVisible, setPopVisible] = useState(false);
  const [popCheckVisible, setPopCheckVisible] = useState(false);
  const [addBoardVisible, setAddBoardVisible] = useState(false);
  const [addTaskVisible, setAddTaskVisible] = useState(false);
  const [deleteBoardVisible, setDeleteBoardVisible] = useState(false);
  const [editBoardVisible, setEditBoardVisible] = useState(false);
  const [checkVisible, setCheckVisible] = useState(false);
  const [deleteTaskVisible, setDeleteTaskVisible] = useState(false);
  const [editTaskVisible, setEditTaskVisible] = useState(false);
  const [boards, setBoards] = useState([]);
  const [platform, setPlatform] = useState("");
  const [check, setCheck] = useState(null);
  const [checkIndex, setCheckIndex] = useState(0);
  const [clickedColumn, setClickedColumn] = useState(0);
  useEffect(() => {
    if (platform) {
      localStorage.setItem("platform", platform);
    } else {
      localStorage.setItem("platform", "");
    }
  }, [platform]);

  useEffect(() => {
    const storedBoards = localStorage.getItem("storedBoards");
    if (storedBoards) {
      setBoards(JSON.parse(storedBoards));
    }
  }, []);
  useEffect(() => {
    const handleSize = () => {
      window.innerWidth > 768 ? setMobile(false) : setMobile(true);
    };

    window.addEventListener("resize", handleSize);
    return () => window.removeEventListener("resize", handleSize);
  }, []);

  return (
    <Context.Provider
      value={{
        mobile,
        launchVisible,
        setLaunchVisible,
        theme,
        setTheme,
        popVisible,
        setPopVisible,
        navbarVisible,
        setNavbarVisible,
        popCheckVisible,
        setPopCheckVisible,
        addBoardVisible,
        setAddBoardVisible,
        addTaskVisible,
        setAddTaskVisible,
        deleteBoardVisible,
        setDeleteBoardVisible,
        editBoardVisible,
        setEditBoardVisible,
        checkVisible,
        setCheckVisible,
        deleteTaskVisible,
        setDeleteTaskVisible,
        editTaskVisible,
        setEditTaskVisible,
        boards,
        setBoards,
        platform,
        setPlatform,
        check,
        setCheck,
        checkIndex,
        setCheckIndex,
        clickedColumn,
        setClickedColumn,
      }}
    >
      <div className="backbone" data-theme={theme}>
        <Routes>
          <Route path="/:platform" element={<Home />} />
          <Route path="/" element={<Add />} />
        </Routes>
      </div>
    </Context.Provider>
  );
}

export default App;
