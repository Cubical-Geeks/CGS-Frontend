import React from "react";
import { IoMdInformationCircleOutline } from "react-icons/io";

const Buttons = ({ title, background }) => {
  return (
    <div>
      <button className={`text-white ${background} border-0 py-2 px-5 text-[12px] focus:outline-none rounded flex items-center me-5`}>
        {title}
      </button>
    </div>
  );
};

// {title === "More Info" ? '' : <IoMdInformationCircleOutline className="me-2" />}

export default Buttons;
