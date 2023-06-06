import React from "react";
import { Context } from "../context";
import { useContext } from "react";

function PopCheck() {
  const {
    popCheckVisible,
    setPopCheckVisible,
    deleteTaskVisible,
    setDeleteTaskVisible,
    editTaskVisible,
    setEditTaskVisible,
  } = useContext(Context);

  const handleDeleteTask = () => {
    setDeleteTaskVisible(!deleteTaskVisible);
    setPopCheckVisible(!popCheckVisible);
  };
  const handleEditTask = () => {
    setEditTaskVisible(!editTaskVisible);
    setPopCheckVisible(!popCheckVisible);
  };
  return (
    <div
      className="pop-check"
      style={{ display: popCheckVisible ? "block" : "none" }}
    >
      <p onClick={handleEditTask}>Edit Task</p>
      <p style={{ color: "#EA5555" }} onClick={handleDeleteTask}>
        Delete Task
      </p>
    </div>
  );
}

export default PopCheck;
