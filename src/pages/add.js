import React from "react";
import Body from "../components/body";

import Navbar from "../components/navbar";
import AddBoard from "../components/addBoard";
import Header from "../components/header";
import Launch from "../components/launch";

function Add() {
  return (
    <div className="add">
      <Header />

      <Body />
      <Navbar />
      <AddBoard />
      <Launch />
    </div>
  );
}

export default Add;
