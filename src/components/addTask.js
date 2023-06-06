import React from "react";
import cross from "../assets/icon-cross.svg";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import { useForm } from "react-hook-form";

function AddTask({ platformIndex }) {
  const { addTaskVisible, setAddTaskVisible } = useContext(Context);
  const { boards, setBoards } = useContext(Context);

  useEffect(() => {
    setValue("title", "");
    subTasks.map((item) => setValue(`subtask${item.id}`, ""));
    setValue("description", "");
    setValue("status", null);
    setSubTasks([
      {
        title: "",
        isCompleted: false,
        id: (Math.random() * 100000).toFixed(0),
      },
      {
        title: "",
        isCompleted: false,
        id: (Math.random() * 100000).toFixed(0),
      },
    ]);
  }, [addTaskVisible]);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [subTasks, setSubTasks] = useState([
    { title: "", isCompleted: false, id: (Math.random() * 100000).toFixed(0) },
    { title: "", isCompleted: false, id: (Math.random() * 100000).toFixed(0) },
  ]);

  const addSubTask = () => {
    const clone = [...subTasks];
    setSubTasks([
      ...clone,
      {
        title: "",
        isCompleted: false,
        id: (Math.random() * 100000).toFixed(0),
      },
    ]);
  };

  const onSubmit = (data) => {
    if (subTasks.every((obj) => obj.title !== "")) {
      const newTask = {
        title: "",
        description: "",
        subtasks: [],
        status: "",
      };

      newTask.title = data.title;
      newTask.description = data.description;
      newTask.subtasks = subTasks;
      newTask.status = data.status;

      const bigClone = boards;

      bigClone[platformIndex]?.columns
        .find((item) => item.name == data.status)
        ?.tasks.push(newTask);

      localStorage.setItem("storedBoards", JSON.stringify(bigClone));
      setBoards(bigClone);
      setAddTaskVisible(false);
    }
  };

  return (
    <div
      className="overlay"
      onClick={() => setAddTaskVisible(false)}
      style={{ display: addTaskVisible ? "block" : "none" }}
    >
      <form
        className="task"
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>Add New Task</h3>
        <h5>Title</h5>
        <input
          type="text"
          placeholder="e.g. Take coffee break"
          style={
            errors.title != undefined
              ? { border: "1px solid #EA5555" }
              : { border: "" }
          }
          {...register("title", {
            required: { value: true, message: "Can’t be empty" },
          })}
        ></input>
        {errors.title?.message && (
          <span style={{ left: "70%", top: "100px" }}>Can’t be empty</span>
        )}
        <h5>Description</h5>
        <textarea
          placeholder=" e.g. It’s always good to take a break. This 15 minute break will 
          recharge the batteries a little."
          {...register("description")}
        ></textarea>
        <h5 style={{ marginBottom: "0" }}>Subtasks</h5>
        <div className="board-form">
          {subTasks.map((item, index) => {
            return (
              <div className="board-form-flex" key={item.id}>
                <input
                  type="text"
                  placeholder="e.g. Make coffee"
                  style={
                    errors[`subtask${item.id}`] != undefined
                      ? { border: "1px solid #EA5555" }
                      : { border: "" }
                  }
                  {...register(`subtask${item.id}`, {
                    required: { value: true, message: "Can’t be empty" },
                  })}
                  onChange={(e) => {
                    const clone = subTasks;
                    clone[index].title = e.target.value;
                    setSubTasks(clone);
                  }}
                ></input>
                <img
                  src={cross}
                  onClick={() => {
                    const clone = [...subTasks];
                    clone.splice(index, 1);
                    setSubTasks(clone);
                  }}
                ></img>
                {errors[`subtask${item.id}`]?.message && (
                  <span style={{ top: "10px" }}>Can’t be empty</span>
                )}
              </div>
            );
          })}
        </div>
        <div>
          <button className="button-white" onClick={addSubTask}>
            + Add New Subtask
          </button>
          <h5>Status</h5>
          <select
            {...register("status", { required: { value: true } })}
            style={
              errors["status"] != undefined
                ? { border: "1px solid #EA5555" }
                : { border: "" }
            }
          >
            {boards[platformIndex]?.columns?.map((column) => (
              <option
                value={column?.name}
                key={(Math.random() * 100000).toFixed(0)}
              >
                {column?.name}
              </option>
            ))}
          </select>
          <button
            className="button-blue"
            style={{
              margin: "20px 0",
            }}
            type="submit"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddTask;
