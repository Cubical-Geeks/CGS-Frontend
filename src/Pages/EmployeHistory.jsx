import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";

const EmployeHistory = () => {

  const { id } = useParams();
  const location = useLocation();
  const name = new URLSearchParams(location.search).get("name");

  const table_head = [
    "Department",
    "Designation",
    "Start Date",
    "End Date",
    "Salary",
    "Shift",
  ];

  const emptyFromData = {
    id: "",
    Name: "", // Changed from "Name" to "name"
    depart: "",
    desg: "",
    startDate: "",
    endDate: "",
    salary: "",
    shift: "",
  }

  const [formData, setFormData] = useState({
    id: "",
    Name: "", // Change from "name" to "Name"
    depart: "",
    desg: "",
    startDate: "",
    endDate: "",
    salary: "",
    shift: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/employee/search/${id}`
        );
        alert("Data fetched successfully!")
        setEmployeeData(response.data.data[0]);
        console.log(response.data.data[0]);
      } catch (error) {
        console.log("Error fetching employee data :", error);
      }
    };

    fetchEmployeeData();
  }, []);


  const handleRecord = async () => {
    try {
      const response = await axios.post(`http://localhost:4000/api/employee/addRecord/${id}`, {
        department: formData.depart,
        designation: formData.desg,
        StartDate: formData.startDate,
        EndDate: formData.endDate,
        salary: formData.salary,
        shift: formData.shift
      });
      if (response.status === 200 && response.data.success) {
        console.log("Employee History posted successfully!")
        console.log(response)
        alert("Employee History posted successfully!")
      }
    } catch (error) {
      console.log("Error", error);
    }
  }

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
                <span className="text-gray-400">Employee History</span> <br />
              </h1>
              <div className="my-5">
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
                      {employeeData.history && employeeData.history.map((item, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                        >
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.department}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.designation}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.StartDate}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.EndDate}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.salary}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.shift}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>

                {/* form start */}
                <div className="shadow-lg rounded-lg p-4 my-10 bg-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center lg:text-start">
                    {/* <div className="mb-3">
                      <label
                        htmlFor="id"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Id:
                      </label>
                      <input
                        type="number"
                        className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                        id="id"
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="Name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Name:
                      </label>
                      <input
                        type="text"
                        className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                        id="Name"
                        name="Name"
                        value={formData.Name}
                        onChange={handleInputChange}
                      />
                    </div> */}
                    <div className="mb-3">
                      <label
                        htmlFor="depart"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Department:
                      </label>
                      <input
                        type="text"
                        className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                        id="depart"
                        name="depart"
                        value={formData.depart}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="desg"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Designation:
                      </label>
                      <input
                        type="text"
                        className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                        id="desg"
                        name="desg"
                        value={formData.desg}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Start Date:
                      </label>
                      <input
                        type="text"
                        className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                        id="startDate"
                        name="startDate"
                        value={formData.startDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="endDate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        End Date:
                      </label>
                      <input
                        type="text"
                        className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                        id="endDate"
                        name="endDate"
                        value={formData.endDate}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="salary"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Salary:
                      </label>
                      <input
                        type="number"
                        className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                        id="salary"
                        name="salary"
                        value={formData.salary}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="shift"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Shift:
                      </label>
                      <input
                        type="text"
                        className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                        id="shift"
                        name="shift"
                        value={formData.shift}
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                  <div className="text-center">
                    <button onClick={handleRecord} className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                      Add New Record
                    </button>
                  </div>
                </div>
                {/* form end */}
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

export default EmployeHistory;
