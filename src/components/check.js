import React from "react";
import board from "../assets/icon-vertical-ellipsis.svg";
import PopCheck from "./pop-check";
import { useContext } from "react";
import { Context } from "../context";

function Check({ platformIndex }) {
  const {
    popCheckVisible,
    setPopCheckVisible,
    checkVisible,
    setCheckVisible,
    boards,
    setBoards,
    clickedColumn,
    check,
    checkIndex,
  } = useContext(Context);

  const handleCheck = () => {
    setCheckVisible(!checkVisible);
    setPopCheckVisible(false);
  };

  const toggleSubtaskCompleted = (subtaskId) => {
    check?.subtasks?.map((subtask) => {
      if (subtask.id === subtaskId) {
        const clone = boards;
        clone[platformIndex].columns[clickedColumn].tasks[checkIndex].subtasks[
          clone[platformIndex].columns[clickedColumn].tasks[
            checkIndex
          ].subtasks.indexOf(subtask)
        ].isCompleted =
          !clone?.[platformIndex].columns[clickedColumn]?.tasks[checkIndex]
            .subtasks[
            clone[platformIndex]?.columns[clickedColumn]?.tasks[
              checkIndex
            ].subtasks.indexOf(subtask)
          ].isCompleted;
        localStorage.setItem("storedBoards", JSON.stringify(clone));
        setBoards([...clone]);
      }
    });
  };

  const handleSelectOption = (value) => {
    const clone = boards;

    const newColumn = clone[platformIndex].columns.find(
      (column) => column.name == value
    );
    newColumn.tasks.push(check);
    clone[platformIndex].columns[clickedColumn].tasks.splice(checkIndex, 1);

    check.status = value;

    setCheckVisible(false);
    localStorage.setItem("storedBoards", JSON.stringify(clone));
    setBoards([...clone]);
  };

  return (
    <div
      className="overlay"
      onClick={handleCheck}
      style={{ display: checkVisible ? "block" : "none" }}
    >
      <div
        className="check"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div className="check-board">
          <h3>{check?.title}</h3>
          <img
            src={board}
            onClick={() => setPopCheckVisible(!popCheckVisible)}
            style={{
              width: "30px",
              height: "30px",
              padding: "5px 12px",
              cursor: "pointer",
            }}
          ></img>
          <PopCheck />
        </div>
        <p>{check?.description}</p>
        <h5>
          Subtasks (
          {` ${
            check?.subtasks.filter((subtask) => subtask.isCompleted == true)
              .length
          } `}
          of {check?.subtasks.length + " "})
        </h5>
        <div className="check-form">
          {check?.subtasks.map((subtask) => {
            return (
              <div className="check-form-box" key={subtask.id}>
                <input
                  type="checkBox"
                  checked={subtask.isCompleted}
                  onChange={() => toggleSubtaskCompleted(subtask.id)}
                ></input>
                <p
                  style={
                    subtask.isCompleted == true
                      ? { opacity: 0.5, textDecoration: "line-through" }
                      : { opacity: 1, textDecoration: "none" }
                  }
                >
                  {subtask?.title}
                </p>
              </div>
            );
          })}
        </div>
        <h5>Current Status</h5>
        <select
          onChange={(e) => handleSelectOption(e.target.value)}
          value={boards[platformIndex]?.columns[clickedColumn]?.name}
        >
          {boards[platformIndex]?.columns?.map((column) => {
            return (
              <option
                value={column.name}
                key={(Math.random() * 100000).toFixed(0)}
              >
                {column.name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Check;
