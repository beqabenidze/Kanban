import React from "react";
import cross from "../assets/icon-cross.svg";
import { Context } from "../context";
import { useContext, useState, useEffect } from "react";
import { useForm } from "react-hook-form";

function EditTask({ platformIndex }) {
  const {
    editTaskVisible,
    setEditTaskVisible,
    setCheckVisible,
    check,
    checkIndex,
    clickedColumn,
    boards,
    setBoards,
  } = useContext(Context);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    clearErrors,
  } = useForm({ mode: "all" });

  const handleEditTask = () => {
    setEditTaskVisible(!editTaskVisible);
  };

  useEffect(() => {
    setValue("title", check?.title);
    setValue("description", check?.description);
    check?.subtasks?.map((item) => setValue(`subtask${item.id}`, item.title));
    setValue("status", boards[platformIndex]?.columns[clickedColumn]?.name);
    setNewTask(check);
  }, [editTaskVisible]);

  const [newTask, setNewTask] = useState(check);

  const addSubTask = () => {
    const clone = newTask;
    clone?.subtasks?.push({
      title: "",
      description: "",
      isCompleted: false,
      id: (Math.random() * 100000).toFixed(0),
    });
    setNewTask({ ...clone });
  };

  const onSubmit = (data) => {
    if (check?.subtasks?.every((obj) => obj.title !== "")) {
      const clone = boards;
      newTask.status = data.status;
      newTask.description = data.description;
      newTask.title = data.title;
      check.description = newTask.description;
      check.status = newTask.status;
      check.title = newTask.title;

      clone[platformIndex].columns[clickedColumn].tasks[checkIndex] = newTask;

      const newColumn = clone[platformIndex].columns.find(
        (column) => column.name == data.status
      );
      newColumn.tasks.push(check);

      clone[platformIndex].columns[clickedColumn].tasks.splice(checkIndex, 1);

      localStorage.setItem("storedBoards", JSON.stringify(clone));
      setBoards([...clone]);
      setEditTaskVisible(false);
      setCheckVisible(false);
    }
  };

  return (
    <div
      className="overlay"
      style={{ display: editTaskVisible ? "block" : "none" }}
      onClick={handleEditTask}
    >
      <form
        className="task"
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>Edit Task</h3>
        <h5>Title</h5>
        <input
          style={
            errors.title != undefined
              ? { border: "1px solid #EA5555" }
              : { border: "" }
          }
          type="text"
          placeholder="Add authentication endpoints"
          {...register("title", {
            required: { value: true, message: "Can’t be empty" },
          })}
          onChange={(e) => {
            const clone = { ...newTask };
            clone.title = e.target.value;
            setNewTask(clone);
            clearErrors("title");
          }}
        ></input>
        {errors.title?.message && (
          <span style={{ left: "70%", top: "98px" }}>Can’t be empty</span>
        )}
        <h5>Description</h5>
        <textarea
          placeholder=" e.g. It’s always good to take a break. This 15 minute break will
          recharge the batteries a little."
          {...register("description")}
          onChange={(e) => {
            const clone = { ...newTask };
            clone.description = e.target.value;
            setNewTask(clone);
          }}
        ></textarea>
        <div className="board-form">
          <h5 style={{ marginBottom: "0" }}>Subtasks</h5>
          {newTask?.subtasks?.map((item, index) => {
            return (
              <div className="board-form-flex" key={item.id}>
                <input
                  type="text"
                  placeholder="ToDo"
                  {...register(`subtask${item.id}`, {
                    required: { value: true, message: "Can't be empty" },
                  })}
                  onChange={(e) => {
                    newTask.subtasks[index].title = e.target.value;
                  }}
                ></input>
                <img
                  src={cross}
                  onClick={() => {
                    const clone = newTask;
                    clone.subtasks?.splice(index, 1);
                    setNewTask({ ...clone });
                  }}
                ></img>
                {errors[`subtask${item.id}`]?.message && (
                  <span>Can’t be empty</span>
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
            {...register("status")}
            onChange={(e) => {
              const clone = { ...newTask };
              clone.status = e.target.value;
              setNewTask(clone);
            }}
            value={newTask?.status}
          >
            {boards[platformIndex]?.columns?.map((column) => (
              <option value={column.name} key={Math.random()}>
                {column?.name}
              </option>
            ))}
          </select>
          <button className="button-blue" style={{ margin: "20px 0" }}>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditTask;
