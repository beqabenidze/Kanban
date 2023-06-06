import React from "react";
import { useContext } from "react";
import { Context } from "../context";
import { useNavigate } from "react-router-dom";

function DeleteBoard({ platformIndex, platform }) {
  const { deleteBoardVisible, setDeleteBoardVisible } = useContext(Context);
  const { boards, setBoards, setPlatform } = useContext(Context);

  const navigate = useNavigate();

  const handleDeleteBoard = () => {
    if (boards[boards.indexOf(platform) - 1]) {
      navigate(`/${boards[boards.indexOf(platform) - 1]?.slug}`);
      setPlatform(boards[boards.indexOf(platform) - 1]?.name);
    } else if (boards[boards.indexOf(platform) + 1]) {
      navigate(`/$boardsboards.indexOf(platform) + 1].slug}`);

      setPlatform(boards[boards.indexOf(platform) + 1]?.name);
    } else {
      navigate("/");
      setPlatform("");
    }
    const clone = boards;
    clone.splice(platformIndex, 1);
    setBoards(clone);
    localStorage.setItem("storedBoards", JSON.stringify(clone));
    setDeleteBoardVisible(false);
  };

  return (
    <div
      className="overlay"
      style={{ display: deleteBoardVisible ? "block" : "none" }}
    >
      <div className="delete">
        <h3 style={{ color: "#ea5555" }}>Delete this board?</h3>
        <p>
          Are you sure you want to delete the ‘{platform?.name}’ board? This
          action will remove all columns and tasks and cannot be reversed.
        </p>
        <div className="delete-cancel">
          <button className="button-red" onClick={handleDeleteBoard}>
            Delete
          </button>
          <button onClick={() => setDeleteBoardVisible(false)}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default DeleteBoard;
