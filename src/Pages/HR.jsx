import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Table } from "@mui/material";
import Tables from "../Components/Tables";
import Buttons from "../Components/Buttons";
import { Link } from "react-router-dom";
import axios from "axios";

const HR = () => {
  const table_head = [
    "ID",
    "Name",
    "Department",
    "Designation",
    "Phone",
    "Shift",
    "Info",
  ];

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/employee/fetch"
        );
        setEmployeeData(response.data.data[0]);
        console.log(response.data.data[0]);
      } catch (error) {
        console.log("Error fetching employee data :", error);
      }
    };

    fetchEmployeeData();
  }, []);

  // console.log("History : ", employeeData.history[-1].department)

  const handleSubmit = () => {
    console.log("clicked");
  };

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
              <h1 className="text-2xl lg:text-4xl font-semibold mb-5">
                Employees
              </h1>
              <div className="overflow-x-auto">
                <table className="table-auto w-full border-collapse border rounded-lg">
                  {/* head */}
                  <thead className="bg-indigo-500 text-white">
                    <tr>
                      {table_head.map((item, index) => (
                        <th
                          key={index}
                          className="p-2 text-start border-b border-gray-300"
                        >
                          {item}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {/* row */}
                    {employeeData.map((item, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        <td className="p-2 text-start border-b border-gray-300">
                          {item.id}
                        </td>
                        <td className="p-2 text-start border-b border-gray-300">
                          {item.name}
                        </td>
                        <td className="p-2 text-start border-b border-gray-300">
                          {item.history.length > 0 ? item.history[item.history.length - 1].department : "Nan"}
                        </td>
                        <td className="p-2 text-start border-b border-gray-300">
                          {item.history.length > 0 ? item.history[item.history.length - 1].designation : "Nan"}
                        </td>
                        <td className="p-2 text-start border-b border-gray-300">
                          {item.phone}
                        </td>
                        <td className="p-2 text-start border-b border-gray-300">
                          {item.history.length > 0 ? item.history[item.history.length - 1].shift : "Nan"}
                        </td>
                        <td className="p-2 text-center border-b border-gray-300 flex">
                          <Link to={`/HR/EmployeeDetails/${item.id}`}>
                            <Buttons
                              title={"Personal Info"}
                              background={"bg-red-500"}
                            />
                          </Link>
                          <Link to={`/HR/EmployeeHistory/${item.id}`}>
                            <Buttons
                              title={"More Info"}
                              background={"bg-green-500"}
                            />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="py-5 text-end">
                <Link to={"/HR/EmployeeDetails"}>
                  <button
                    onClick={handleSubmit}
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Add User
                  </button>
                </Link>
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

export default HR;
