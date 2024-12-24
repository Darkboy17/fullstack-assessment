"use client";

import Sidebar from "./frontend/Sidebar";
import Top from "./frontend/Top";
import StudentTable from "./frontend/StudentTable";

export default function Home() {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Top />
        <StudentTable />
      </div>
    </div>
  );
}
