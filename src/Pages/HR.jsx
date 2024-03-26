import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Table } from "@mui/material";
import Tables from "../Components/Tables";
import Buttons from "../Components/Buttons";
import { Link } from "react-router-dom";
import axios from "axios";
import WithAuth from "../Components/WithAuth";
import api from "../Components/Api";

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
          `${api}/api/employee/fetch`
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

  // const handleUsersDelete = async (department, username) => {
  //   try {
  //     let endpoint;
  //     switch (department) {
  //       case "Administration":
  //         endpoint = `${api}/api/user/delete/${username}`;
  //         break;
  //       case "Sales":
  //         endpoint = `${api}/api/salesuser/delete/${username}`;
  //         break;
  //       // case "Production-Graphics":
  //       case "Production-Development" || "Production-Graphics":
  //         endpoint = `${api}/api/productionUser/delete/${username}`;
  //         break;
  //       default:
  //         throw new Error("Invalid department");
  //     }
  //     const response = await axios.delete(endpoint);
  //     if (response) {
  //       console.log(`Deleted user from ${department} department`, response);
  //       return true;
  //     }
  //     return false;
  //   } catch (error) {
  //     console.error(`Error deleting user from ${department} department:`, error);
  //     throw error;
  //   }
  // };

  const handleUsersDelete = async (username, department) => {
    try {
      if (department === "Administration") {
        const adminDelete = await axios.delete(`${api}/api/user/delete/${username}`);
        if (adminDelete.status === 200 && adminDelete.data.success) {
          console.log("User deleted successfully from Administration department");
        }
      } else if (department === "Sales") {
        const salesDelete = await axios.delete(`${api}/api/salesuser/delete/${username}`);
        if (salesDelete.status === 200 && salesDelete.data.success) {
          console.log("User deleted successfully from Sales department");
        }
      } else if (department === "Production-Graphics" || department === "Production-Development") {
        const prodDelete = await axios.delete(`${api}/api/productionUser/delete/${username}`);
        if (prodDelete.status === 200 && prodDelete.data.success) {
          console.log("User deleted successfully from Production department");
        }
      }
    } catch (error) {
      console.log("Error in deleting user:", error);
      throw error;
    }
  };

  const handleDelete = async (id, username) => {
    try {
      const deleteResponse = await axios.delete(`${api}/api/employee/delete/${id}`);
      console.log("Delete employee response: ", deleteResponse);

      if (deleteResponse.status === 200 && deleteResponse.data.success) {
        const response = await axios.get(`${api}/api/employee/search/${id}`);

        if (response.status === 200 && response.data.success) {
          const employeeDepartment = response.data.data[0].history[response.data.data[0].history.length - 1].department;

          handleUsersDelete(username, employeeDepartment);

          alert(`Employee with id: ${id} and associated user deleted successfully`);
        } else {
          alert("Failed to retrieve employee data");
        }
      } else {
        alert("Failed to delete employee");
      }
    } catch (error) {
      console.error("Error in deleting employee:", error);
      alert(error.message);
    }
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
                              title={"View"}
                              background={"bg-indigo-900"}
                            />
                          </Link>
                          <Link to={`/HR/EmployeeHistory/${item.id}`}>
                            <Buttons
                              title={"More Info"}
                              background={"bg-green-500"}
                            />
                          </Link>
                          {/* <button onClick={() => handleDelete(item.id, item.name)} className={"text-white bg-red-500 border-0 py-2 px-5 text-[12px] focus:outline-none rounded flex items-center me-5"}>
                            Delete
                          </button> */}
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

export default WithAuth(HR);
