import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Buttons = ({ title, background }) => {
  return (
    <div>
      <button className={`text-white ${background} border-0 py-2 px-5 focus:outline-none rounded flex items-center me-5`}>
        {title === "More Info" ? '' : <IoMdInformationCircleOutline className="me-2" />} {title}
      </button>
    </div>
  );
};

export default Buttons;
