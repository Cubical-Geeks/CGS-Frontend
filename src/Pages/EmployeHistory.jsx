import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import WithAuth from "../Components/WithAuth";
import api from "../Components/Api";


const EmployeHistory = () => {

  const { id } = useParams();
  const location = useLocation();
  const name = new URLSearchParams(location.search).get("name");

  const table_head = [
    "Department",
    "Designation",
    "Salary",
    "Shift",
    "Bank",
    "Account"
  ];

  const [shift, setShift] = useState([]);
  const [designation, setDesignation] = useState([]);
  const [department, setDepartment] = useState([]);
  const [bank, setBank] = useState([]);
  const [formData, setFormData] = useState({
    id: "",
    Name: "",
    depart: "",
    desg: "",
    salary: "",
    shift: "",
    bankName: "",
    accountNum: ""
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const [employeeData, setEmployeeData] = useState([]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const response = await axios.get(
          `${api}/api/employee/search/${id}`
        );
        setEmployeeData(response.data.data[0]);
        console.log(`fetching employee history of id : ${id}`, response.data.data[0]);
        setFormData(prevState => ({
          ...prevState,
          // Name: response.data.data[0].name,
          // joinDate: response.data.data[0].joiningDate,
          // FathName: response.data.data[0].fathersName,
          // phone: response.data.data[0].phone,
          // cnic: response.data.data[0].cnic,
          // email: response.data.data[0].email,
          // emergencyPhone: response.data.data[0].emergencyPhone,
          // reference: response.data.data[0].reference,
          // address: response.data.data[0].address,
          // userName: response.data.data[0].username,
          // password: response.data.data[0].password,
          depart: response.data.data[0].history[response.data.data[0].history.length - 1].department,
          desg: response.data.data[0].history[response.data.data[0].history.length - 1].designation,
          salary: response.data.data[0].history[response.data.data[0].history.length - 1].salary,
          shift: response.data.data[0].history[response.data.data[0].history.length - 1].shift,
          bankName: response.data.data[0].history[response.data.data[0].history.length - 1].bank,
          accountNum: response.data.data[0].history[response.data.data[0].history.length - 1].accountNumber,
        }));
      } catch (error) {
        console.log("Error fetching employee data :", error);
      }
    };

    const shiftFetch = async () => {
      try {
        const response = await axios.get(`${api}/dropdown/getShift`);
        if (response.status === 200 && response.data.success) {
          setShift(response.data.data[0])
        }
      } catch (error) {
        console.log("Error in shift fetching", error)
      }
    }

    const designationFetch = async () => {
      try {
        const response = await axios.get(`${api}/dropdown/getDesignation`);
        if (response.status === 200 && response.data.success) {
          setDesignation(response.data.data[0])
        }
      } catch (error) {
        console.log("Error in designation fetching", error)
      }
    }

    const getDepartment = async () => {
      try {
        const response = await axios.get(`${api}/dropdown/getDepartment`);
        setDepartment(response.data.data[0]);
        console.log("Response", response.data.data[0]);
      } catch (error) {
        console.log("Error in fetching Project Nature", error)
      }
    };

    const bankFetch = async () => {
      try {
        const response = await axios.get(`${api}/dropdown/getBank`);
        setBank(response.data.data[0]);
        console.log("Response", response.data.data[0]);
      } catch (error) {
        console.log("Error in fetching Bank", error)
      }
    };

    fetchEmployeeData();
    shiftFetch();
    designationFetch();
    getDepartment();
    bankFetch();
  }, []);


  const handleRecord = async () => {
    console.log(formData)
    try {
      const response = await axios.post(`${api}/api/employee/addRecord/${id}`, {
        department: formData.depart,
        designation: formData.desg,
        salary: formData.salary,
        shift: formData.shift,
        bank: formData.bankName,
        accountNumber: formData.accountNum
      });
      if (response.status === 200 && response.data.success) {
        console.log("Employee History posted successfully!")
        console.log(response)
        alert("Employee History posted successfully!")
        setFormData({
          depart: "",
          desg: "",
          salary: "",
          shift: "",
          bankName: "",
          accountNum: ""
        });
      }
    } catch (error) {
      console.log("Error", error);
      alert("Error in adding record : ", error.message)
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
                            {item.salary}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.shift}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.bank}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.accountNumber}
                          </td>
                        </tr>
                      ))}
                    </tbody>

                  </table>
                </div>

                {/* form start */}
                <div className="shadow-lg rounded-lg p-4 my-10 bg-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 text-center lg:text-start">
                    <div className="mb-3">
                      <label
                        htmlFor="depart"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Department: <span className='text-red-500'>*</span>
                      </label>
                      <select id="depart" className='w-full border p-2 rounded' name='depart' value={formData.depart} onChange={handleInputChange}>
                        <option className='m-5' value="">Select</option>
                        {
                          department.map((item, index) => (
                            <option key={index} className='m-5' value={item.label}>{item.label}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="desg"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Designation: <span className='text-red-500'>*</span>
                      </label>
                      <select id="desg" className='w-full border p-2 rounded' name='desg' value={formData.desg} onChange={handleInputChange}>
                        <option className='m-5' value="">Select</option>
                        {
                          designation.map((item, index) => (
                            <option key={index} className='m-5' value={item.label}>{item.label}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="salary"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Salary: <span className='text-red-500'>*</span>
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
                        Shift: <span className='text-red-500'>*</span>
                      </label>
                      <select id="shift" className='w-full border p-2 rounded' name='shift' value={formData.shift} onChange={handleInputChange}>
                        <option className='m-5' value="">Select</option>
                        {
                          shift.map((item, index) => (
                            <option key={index} className='m-5' value={item.label}>{item.label}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="bankName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Bank: <span className='text-red-500'>*</span>
                      </label>
                      <select id="bankName" className='w-full border p-2 rounded' name='bankName' value={formData.bankName} onChange={handleInputChange}>
                        <option className='m-5' value="">Select</option>
                        {
                          bank.map((item, index) => (
                            <option key={index} className='m-5' value={item.label}>{item.label}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="accountNum"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Account: <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type="text"
                        className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                        id="accountNum"
                        name="accountNum"
                        value={formData.accountNum}
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

export default WithAuth(EmployeHistory);
