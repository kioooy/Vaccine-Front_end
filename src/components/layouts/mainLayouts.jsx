import React from "react";
import AppHeader from "../header";
import { Outlet } from "react-router-dom";

function ManinLayout() {
  return (
    <>
      <AppHeader />
      <main className="min-h-screen my-[80px]">
        <Outlet />
      </main>
      <div>
        <h1>footer</h1>
      </div>
    </>
  );
}

export default ManinLayout;
