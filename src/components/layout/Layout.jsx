import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

export default function Layout() {

  return (
    <div className="app-container [--header-height:60px]">
      <Header />
      <div className={`flex`}>
        <Sidebar />
        <main className="flex-1 overflow-auto bg-white no-scrollbar  h-[calc(100dvh-(var(--header-height)))] ">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
