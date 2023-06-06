import React from "react";
import { Context } from "../context";
import { useContext } from "react";

function DeleteTask({ platformIndex }) {
  const {
    deleteTaskVisible,
    setDeleteTaskVisible,
    setCheckVisible,
    boards,
    setBoards,
    clickedColumn,
    check,
    checkIndex,
  } = useContext(Context);

  const handleDeleteTask = () => {
    setDeleteTaskVisible(false);
    setCheckVisible(false);
    const clone = boards;
    clone[platformIndex].columns[clickedColumn].tasks.splice(checkIndex, 1);
    localStorage.setItem("storedBoards", JSON.stringify(clone));
    setBoards(clone);
  };
  return (
    <div
      className="overlay"
      style={{ display: deleteTaskVisible ? "block" : "none" }}
    >
      <div className="delete">
        <h3 style={{ color: "#ea5555" }}>Delete this task?</h3>
        <p>
          Are you sure you want to delete the ‘{check?.title}’ task and its
          subtasks? This action cannot be reversed.
        </p>
        <div className="delete-cancel">
          <button className="button-red" onClick={handleDeleteTask}>
            Delete
          </button>
          <button
            onClick={() => {
              setDeleteTaskVisible(false);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTask;
