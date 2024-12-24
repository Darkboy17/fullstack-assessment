import React from "react";

const SearchBar = () => {
  return (
    <div className=" bg-white w-3/5 flex flex-row items-center rounded-xl p-3 gap-2">
      <span
        className="w-4 h-4 bg-no-repeat bg-center bg-contain"
        style={{ backgroundImage: "url(/icons/search.svg)" }}
        aria-label="Dashboard Icon"
      />
      <input
        type="text"
        placeholder="Search your course"
        className="flex-1 outline-none bg-transparent text-gray-700"
      />
    </div>
  );
};

export default SearchBar;
