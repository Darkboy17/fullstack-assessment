import React from "react";
import Search from "./Search";

const Top = () => {
  return (
    <header className="p-5 flex flex-row justify-between bg-transparent items-center pt-5 -mb-5 gap-8">
      <Search />
      <div className="flex gap-10">
        <span
          className="w-5 h-5 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: "url(/icons/help.svg)" }}
        />
        <span
          className="w-6 h-5 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: "url(/icons/message.svg)" }}
        />
        <span
          className="w-5 h-5 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: "url(/icons/settings_icon.svg)" }}
        />
        <span
          className="w-5 h-5 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: "url(/icons/notification.svg)" }}
        />
      </div>

      <div className="flex items-center gap-4">
        <span
          className="w-9 h-9 bg-no-repeat bg-center bg-contain"
          style={{ backgroundImage: "url(/icons/avatar.png)" }}
        />
        <div className="font-bold text-gray-700">Adeline H. Dancy</div>
      </div>
    </header>
  );
};

export default Top;
