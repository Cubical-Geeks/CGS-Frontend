import React from "react";
import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Tables from "../Components/Tables";
import { IoAddCircleOutline } from "react-icons/io5";

const Alloted = () => {
  const table_head = [
    "S.NO.",
    "Start Date",
    "Delievery Date",
    "Sales Person",
    "Platform ID",
    "Title",
    "Client",
    "Project Nature ID",
    "Amount",
  ];

  const table_body = [
    {
      count: "1",
      startDate: "02 Feb 2024",
      delieveryDate: "04 Feb 2024",
      salesPerson: "Barhat",
      platID: "05",
      title: "XYZ",
      client: "John",
      projNatureID: "889",
      amount: "$ 400",
    },
    {
      count: "2",
      startDate: "02 Feb 2024",
      delieveryDate: "04 Feb 2024",
      salesPerson: "Barhat",
      platID: "05",
      title: "XYZ",
      client: "John",
      projNatureID: "889",
      amount: "$ 400",
    },
    {
      count: "3",
      startDate: "02 Feb 2024",
      delieveryDate: "04 Feb 2024",
      salesPerson: "Barhat",
      platID: "05",
      title: "XYZ",
      client: "John",
      projNatureID: "889",
      amount: "$ 400",
    },
  ];

  return (
    <>
      <div className="flex">
        <div>
          <Dashboard />
        </div>
        <div className="container flex flex-col justify-between">
          <div>
            <Navbar />
            <div className="pt-10 px-5">
              <h1 className="text-xl lg:text-4xl shadow-lg p-3">
                Projects to be alloted
              </h1>
              
              {/* table */}
              <div className="py-5">
                <Tables table_head={table_head} table_body={table_body} />
              </div>

              {/* add button */}
              <div className="flex justify-end py-5">
                <button className="text-white flex items-center bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                  <IoAddCircleOutline className="me-2" /> Add
                </button>
              </div>
            </div>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default Alloted;
