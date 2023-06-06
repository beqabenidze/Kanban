import React from "react";
import "../Css/global.css";
import Navbar from "../components/navbar";
import Launch from "../components/launch";
import Pop from "../components/pop";
import DeleteTask from "../components/deleteTask";
import DeleteBoard from "../components/deleteBoard";
import EditBoard from "../components/editBoard";
import AddBoard from "../components/addBoard";
import EditTask from "../components/editTask";
import AddTask from "../components/addTask";
import Check from "../components/check";
import Body from "../components/body";
import Header from "../components/header";
import { useParams } from "react-router-dom";
import { useContext } from "react";
import { Context } from "../context";

function Home() {
  const params = useParams();
  const { boards } = useContext(Context);

  const platform = boards?.find((item) => item.slug == params.platform);

  let platformIndex = 0;
  boards.map((item, index) => {
    if (item.slug == params.platform) {
      platformIndex = index;
    }
  });

  return (
    <div className="home">
      <Header platform={platform} />
      <Pop />
      <Body platform={platform} />
      <Navbar platform={platform} />
      <Launch platform={platform} />
      <DeleteBoard platformIndex={platformIndex} platform={platform} />
      <EditBoard platformIndex={platformIndex} />
      <AddBoard />
      <AddTask platformIndex={platformIndex} />
      <Check platformIndex={platformIndex} />
      <DeleteTask platformIndex={platformIndex} />
      <EditTask platformIndex={platformIndex} />
    </div>
  );
}

export default Home;
