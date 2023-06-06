import React from "react";
import cross from "../assets/icon-cross.svg";
import { useContext, useState, useEffect } from "react";
import { Context } from "../context";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

function EditBoard({ platformIndex }) {
  const {
    editBoardVisible,
    setEditBoardVisible,
    boards,
    setBoards,
    setPlatform,
  } = useContext(Context);

  const navigate = useNavigate();

  const {
    register,
    setValue,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
  } = useForm({ mode: "all" });

  useEffect(() => {
    setValue("name", boards[platformIndex]?.name);
    boards[platformIndex]?.columns?.map((item) =>
      setValue(`column${item.id}`, item.name)
    );
    setNewBoard({
      name: boards[platformIndex]?.name,
      slug: boards[platformIndex]?.slug,
      columns: boards[platformIndex]?.columns,
    });
  }, [editBoardVisible]);

  const [newBoard, setNewBoard] = useState({
    name: boards[platformIndex]?.name,
    slug: boards[platformIndex]?.slug,
    columns: boards[platformIndex]?.columns,
  });

  const addColumn = () => {
    const clone = newBoard;
    clone?.columns?.push({
      name: "",
      tasks: [],
      id: (Math.random() * 100000).toFixed(0),
    });
    setNewBoard({ ...clone });
  };

  const onSubmit = (data) => {
    const clone = boards;

    if (
      boards.every(
        (item, index) =>
          item.name.toLocaleLowerCase() != newBoard.name?.toLocaleLowerCase() ||
          index == platformIndex
      )
    ) {
      clone[platformIndex] = newBoard;
      setBoards(clone);
      setPlatform(data.name);
      localStorage.setItem("storedBoards", JSON.stringify(clone));
      navigate(`/${newBoard.slug}`);
      setEditBoardVisible(false);
    } else {
      setError("name", { type: "value", message: "Already exists" });
    }
  };

  return (
    <div
      className="overlay"
      style={{ display: editBoardVisible ? "block" : "none" }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="board"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>Edit Board</h3>
        <h5>Board Name</h5>
        <input
          style={
            errors.name != undefined
              ? { border: "1px solid #EA5555" }
              : { border: "" }
          }
          placeholder="e.g. Web Design"
          {...register("name", {
            required: { value: true, message: "Can’t be empty" },
          })}
          onChange={(e) => {
            const clone = { ...newBoard };
            clone.name = e.target.value;
            clone.slug = e.target.value.toLocaleLowerCase().replace(" ", "-");
            clearErrors("name");
            setNewBoard(clone);
          }}
          type="text"
        ></input>
        {errors.name?.message && (
          <span style={{ width: "96px", left: "70%" }}>
            {errors.name?.message.toString()}
          </span>
        )}
        <h5 style={{ marginBottom: "0" }}>Board Columns</h5>
        <div className="board-form">
          {newBoard?.columns?.map((item, index) => {
            return (
              <div className="board-form-flex" key={item.id}>
                <input
                  style={
                    errors[`column${item.id}`] != undefined
                      ? { border: "1px solid #EA5555" }
                      : { border: "" }
                  }
                  type="text"
                  {...register(`column${item.id}`, {
                    required: { value: true, message: "Can’t be empty" },
                  })}
                  onChange={(e) => {
                    if (newBoard?.columns) {
                      newBoard.columns[index].name = e.target.value;
                    }
                  }}
                ></input>
                <img
                  className="cross"
                  src={cross}
                  onClick={() => {
                    const clone = newBoard;
                    clone.columns.splice(index, 1);
                    setNewBoard({ ...clone });
                  }}
                ></img>
                {errors[`column${item.id}`]?.message && (
                  <span style={{ top: "12px" }}>Can’t be empty</span>
                )}
              </div>
            );
          })}
        </div>
        <div>
          <button className="button-white" onClick={addColumn}>
            + Add New Column
          </button>
          <button className="button-blue" type="submit">
            Save Changes
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditBoard;
