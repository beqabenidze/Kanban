import React from "react";
import cross from "../assets/icon-cross.svg";
import { useContext } from "react";
import { Context } from "../context";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

function AddBoard() {
  const { addBoardVisible, setAddBoardVisible } = useContext(Context);
  const { boards, setBoards } = useContext(Context);
  const { platform, setPlatform } = useContext(Context);

  const navigate = useNavigate();

  useEffect(() => {
    setValue("name", "");
  }, [addBoardVisible]);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useForm({ mode: "all" });

  const [newBoard, setNewBoard] = useState({
    name: "",
    slug: "",

    columns: [
      {
        name: "",
        tasks: [],

        id: Math.floor(Math.random() * 1000),
      },
    ],
  });

  const addColumn = () => {
    const clone = newBoard;
    clone.columns.push({
      name: "",
      tasks: [],
      color: "",
      id: (Math.random() * 100000).toFixed(0),
    });
    setNewBoard({ ...clone });
  };

  const onSubmit = (data) => {
    const clone = boards;
    if (
      clone &&
      boards.every(
        (item) =>
          item.name.toLocaleLowerCase() != newBoard.name.toLocaleLowerCase()
      )
    ) {
      clone?.push(newBoard);
      localStorage.setItem("storedBoards", JSON.stringify(clone));
      setBoards(clone);
      setAddBoardVisible(false);
      setPlatform(data.name);
      navigate(`/${newBoard.slug}`);
      setNewBoard({
        name: "",
        slug: "",

        columns: [
          {
            name: "",
            tasks: [],

            id: Math.floor(Math.random() * 1000),
          },
        ],
      });
    } else {
      setError("name", { type: "value", message: "Already exists" });
    }
  };

  return (
    <div
      className="overlay"
      style={{ display: addBoardVisible ? "block" : "none" }}
    >
      <form
        className="board"
        onSubmit={handleSubmit(onSubmit)}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h3>Add New Board</h3>
        <h5>Board Name</h5>

        <input
          type="text"
          placeholder="e.g. Web Design"
          {...register("name", {
            required: { value: true, message: "Can’t be empty" },
          })}
          onChange={(e) => {
            const clone = { ...newBoard };
            clone.name = e.target.value;
            clone.slug = e.target.value.toLocaleLowerCase().replace(" ", "-");
            setNewBoard(clone);
          }}
          style={
            errors.name != undefined
              ? { border: "1px solid #EA5555" }
              : { border: "" }
          }
        ></input>
        {errors.name?.message && (
          <span style={{ width: "96px", left: "70%" }}>
            {errors.name?.message.toString()}
          </span>
        )}
        <h5 style={{ marginBottom: "0" }}>Board Columns</h5>
        <div className="board-form">
          {newBoard.columns.map((item, index) => {
            return (
              <div className="board-form-flex" key={item.id}>
                <span className="form-span">
                  {item.valid == false ? "Can't be empty" : ""}
                </span>
                <input
                  type="text"
                  placeholder="ToDo"
                  {...register(`column${item.id}`, {
                    required: { value: true, message: "Can’t be empty" },
                  })}
                  onChange={(e) => {
                    const clone = newBoard;
                    clone.columns[index].name = e.target.value;
                    setNewBoard(clone);
                  }}
                  style={
                    errors[`column${item.id}`] != undefined
                      ? { border: "1px solid #EA5555" }
                      : { border: "" }
                  }
                ></input>
                {errors[`column${item.id}`]?.message && (
                  <span style={{ top: "10px", right: "50px" }}>
                    Can’t be empty
                  </span>
                )}
                <img
                  src={cross}
                  className="cross"
                  onClick={() => {
                    const clone = newBoard;
                    clone.columns.splice(index, 1);
                    setNewBoard({ ...clone });
                  }}
                ></img>
              </div>
            );
          })}
        </div>
        <div>
          <button className="button-white" onClick={addColumn}>
            + Add New Column
          </button>
          <button className="button-blue" type="submit">
            Create New Board
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddBoard;
