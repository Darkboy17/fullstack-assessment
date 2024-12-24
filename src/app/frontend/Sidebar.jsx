import React from "react";

const Sidebar = () => {
  return (
    <aside className="h-full w-[248px] bg-white flex flex-col justify-between p-5 ">
      <div>
        {/* Logo */}
        <div className="flex items-center mb-10">
          <img src="/icons/logo.svg" alt="Logo" />
        </div>

        <nav className="font-semibold flex flex-col gap-10 ml-2  text-gray-600">
          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: "url(/icons/dashboard.svg)" }}
              aria-label="Dashboard Icon"
            />

            <span className="">Dashboard</span>
          </div>

          <div className="flex items-center gap-2 text-black">
            <span
              className="w-6 h-6 bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: "url(/icons/students.svg)" }}
              aria-label="Students Icon"
            />

            <span>Students</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: "url(/icons/chapter.svg)" }}
              aria-label="Chapter Icon"
            />

            <span>Chapter</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: "url(/icons/help.svg)" }}
              aria-label="Help Icon"
            />

            <span>Help</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: "url(/icons/reports.svg)" }}
              aria-label="Reports Icon"
            />

            <span>Reports</span>
          </div>

          <div className="flex items-center gap-2">
            <span
              className="w-6 h-6 bg-no-repeat bg-center bg-contain"
              style={{ backgroundImage: "url(/icons/settings.svg)" }}
              aria-label="Settings Icon"
            />

            <span>Settings</span>
          </div>
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
