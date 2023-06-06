import React from "react";
import { Context } from "../context";
import { useContext } from "react";

function Swwiper({ platform }) {
  const {
    navbarVisible,
    mobile,
    editBoardVisible,
    setEditBoardVisible,
    checkVisible,
    setCheckVisible,
    setCheck,
    setCheckIndex,
    setClickedColumn,
  } = useContext(Context);

  return platform?.columns?.length != 0 ? (
    <div
      className="wrapper"
      style={{ marginLeft: navbarVisible && !mobile ? "300px" : "0px" }}
    >
      {platform?.columns?.map((column, index) => {
        return (
          <div className="column" key={column.id}>
            <div className="task-name">
              <div
                className="circle"
                style={{
                  backgroundColor: `rgb(${column?.id / 4},${column?.id / 3},${
                    column?.id / 2
                  })`,
                }}
              ></div>
              <p>
                {column?.name} ({column?.tasks.length})
              </p>
            </div>
            {column?.tasks.map((task, index2) => {
              return (
                <div
                  className="task-div"
                  onClick={() => {
                    setCheck(task);
                    setCheckIndex(index2);
                    setClickedColumn(index);
                    setCheckVisible(!checkVisible);
                  }}
                  key={(Math.random() * 1000).toFixed(0)}
                >
                  <h1>{task?.title}</h1>
                  <p>
                    {task?.subtasks?.filter(
                      (subtask) => subtask.isCompleted == true
                    ).length + " "}
                    out of {task?.subtasks?.length} subtasks
                  </p>
                </div>
              );
            })}
          </div>
        );
      })}

      <div
        className="new-column"
        onClick={() => setEditBoardVisible(!editBoardVisible)}
      >
        <h1>+ New Column</h1>
      </div>
    </div>
  ) : (
    <div
      className="body"
      style={{ left: navbarVisible ? "calc(50% + 300px)" : "50%" }}
    >
      <h1>This board is empty. Create a new column to get started.</h1>
      <button
        onClick={() => {
          setEditBoardVisible(true);
        }}
      >
        + Add New Column
      </button>
    </div>
  );
}

export default Swwiper;
