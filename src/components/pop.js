import React from "react";
import { Context } from "../context";
import { useContext } from "react";

function Pop() {
  const {
    deleteBoardVisible,
    setDeleteBoardVisible,
    editBoardVisible,
    setEditBoardVisible,
    popVisible,
    setPopVisible,
  } = useContext(Context);

  const handleDeleteBoard = () => {
    setDeleteBoardVisible(!deleteBoardVisible);
    setPopVisible(!popVisible);
  };

  const handleEditBoard = () => {
    setEditBoardVisible(!editBoardVisible);
    setPopVisible(!popVisible);
  };
  return (
    <div
      className="pop"
      style={{
        display: !popVisible ? "none" : "block",
      }}
    >
      <p onClick={handleEditBoard}>Edit Board</p>
      <p style={{ color: "#EA5555" }} onClick={handleDeleteBoard}>
        Delete Board
      </p>
    </div>
  );
}

export default Pop;
