import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";
import WithAuth from "../Components/WithAuth";
import api from "../Components/Api";

const Setup = () => {
  // const [formData, setFormData] = useState(initialFormData);
  const nature = { id: "", nature: "" };

  const [projectNature, setProjectNature] = useState({
    id: "",
    label: "",
  });
  const [projectPlatform, setProjectPlatform] = useState({
    id2: "",
    label2: "",
  });
  const [departmentData, setDepartmentData] = useState({
    id3: "",
    label3: "",
  });
  const [shiftData, setShiftData] = useState({
    id4: "",
    label4: "",
  });
  const [designationData, setDesignationData] = useState({
    id5: "",
    label5: "",
  });
  const [bankData, setBankData] = useState({
    id6: "",
    label6: "",
    value6: ""
  });
  const [projectNatureTable, setProjectNatureTable] = useState([]);
  const [projectPlatformTable, setProjectPlatformTable] = useState([]);
  const [departmentTable, setDepartmentTable] = useState([]);
  const [shiftTable, setShiftTable] = useState([]);
  const [designationTable, setDesignationTable] = useState([]);
  const [bankTable, setBankTable] = useState([]);
  const table_head = ["ID", "Label", "Value"];

  const handleNature = (e) => {
    setProjectNature((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handlePlatform = (e) => {
    setProjectPlatform((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDepart = (e) => {
    setDepartmentData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleShift = (e) => {
    setShiftData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleDesignation = (e) => {
    setDesignationData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleBank = (e) => {
    setBankData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleProjNatureSubmit = async () => {
    try {
      const response = await axios.post(
        `${api}/dropdown/projectNature`,
        {
          id: projectNature.id,
          label: projectNature.label,
          value: projectNature.value,
        }
      );
      if (response.status === 200 && response.data.success) {
        alert("Data posted successfully")
        console.log("Data posted successfully");
        console.log(response);
        setProjectNature({
          id: "",
          label: "",
          value: ""
        })
      }
      setProjectNature({ id: projectNature.id, label: projectNature.label });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleProjPlatSubmit = async () => {
    try {
      const response = await axios.post(
        `${api}/dropdown/platform`,
        {
          id: projectPlatform.id2,
          label: projectPlatform.label2,
          value: projectPlatform.value2,
        }
      );
      if (response.status === 200 && response.data.success) {
        alert("Data posted successfully")
        console.log("Data posted successfully");
        console.log(response);
        setProjectPlatform({
          id2: "",
          label2: "",
          value2: ""
        })
      }
      setProjectPlatform({
        id: projectPlatform.id2,
        label: projectPlatform.label2,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleProjDepartSubmit = async () => {
    try {
      const response = await axios.post(
        `${api}/dropdown/department`,
        {
          id: departmentData.id3,
          label: departmentData.label3,
          value: departmentData.value3,
        }
      );
      if (response.status === 200 && response.data.success) {
        alert("Department posted successfully")
        console.log("Data posted successfully");
        console.log(response);
        setDepartmentData({
          id3: "",
          label3: "",
          value3: ""
        })
      }
      setDepartmentData({
        id: departmentData.id3,
        label: departmentData.label3,
      });
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleShiftSubmit = async () => {
    try {
      const response = await axios.post(`${api}/dropdown/shift`, {
        id: shiftData.id4,
        label: shiftData.label4,
        value: shiftData.value4
      })
      if (response.status === 200 && response.data.success) {
        alert("Shift posted successfully")
        console.log("Data posted successfully");
        console.log(response);
        setShiftData({
          id4: "",
          label4: "",
          value4: ""
        })
      }
      setShiftData({
        id: shiftData.id4,
        label: shiftData.label4
      })
    } catch (error) {
      console.log("Error ", error)
    }
  }

  const handleDesignationSubmit = async () => {
    try {
      const response = await axios.post(`${api}/dropdown/designation`, {
        id: designationData.id5,
        label: designationData.label5,
        value: designationData.value5
      })
      if (response.status === 200 && response.data.success) {
        alert("Designation posted successfully")
        console.log("Data posted successfully");
        console.log(response);
        setDesignationData({
          id5: "",
          label5: "",
          value5: ""
        })
      }
      setDesignationData({
        id: designationData.id5,
        label: designationData.label5
      })
    } catch (error) {
      console.log("Error ", error)
    }
  }

  const handleBankSubmit = async () => {
    try {
      const response = await axios.post(`${api}/dropdown/bank`, {
        id: bankData.id6,
        label: bankData.label6,
        value: bankData.value6
      });
      if (response.status === 200 && response.data.success) {
        alert("Bank posted successfully");
        setBankData({
          id6: "",
          label6: "",
          value6: ""
        });
        console.log("Data posted successfully");
        console.log(response);
      }
    } catch (error) {
      console.log("Error ", error);
    }
  };

  useEffect(() => {
    const projectNatureFetch = async () => {
      try {
        const response = await axios.get(`${api}/dropdown/getProjectNature`);
        if (response.status === 200 && response.data.success) {
          setProjectNatureTable(response.data.data[0])
        }
      } catch (error) {
        console.log("Error in project nature fetching", error)
      }
    }

    const projectPlatformFetch = async () => {
      try {
        const response = await axios.get(`${api}/dropdown/getPlatform`);
        if (response.status === 200 && response.data.success) {
          setProjectPlatformTable(response.data.data[0])
        }
      } catch (error) {
        console.log("Error in project Platform fetching", error)
      }
    }

    const departmentFetch = async () => {
      try {
        const response = await axios.get(`${api}/dropdown/getDepartment`);
        if (response.status === 200 && response.data.success) {
          setDepartmentTable(response.data.data[0])
        }
      } catch (error) {
        console.log("Error in depatment fetching", error)
      }
    }

    const shiftFetch = async () => {
      try {
        const response = await axios.get(`${api}/dropdown/getShift`);
        if (response.status === 200 && response.data.success) {
          setShiftTable(response.data.data[0])
        }
      } catch (error) {
        console.log("Error in shift fetching", error)
      }
    }

    const designationFetch = async () => {
      try {
        const response = await axios.get(`${api}/dropdown/getDesignation`);
        if (response.status === 200 && response.data.success) {
          setDesignationTable(response.data.data[0])
        }
      } catch (error) {
        console.log("Error in designation fetching", error)
      }
    }

    const bankFetch = async () => {
      try {
        const response = await axios.get(`${api}/dropdown/getBank`);
        if (response.status === 200 && response.data.success) {
          setBankTable(response.data.data[0])
        }
      } catch (error) {
        console.log("Error in designation fetching", error)
      }
    }

    projectNatureFetch();
    projectPlatformFetch();
    departmentFetch();
    shiftFetch();
    designationFetch();
    bankFetch();
  }, [])

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
              {/* project nature start */}
              <h1 className="text-3xl font-semibold">Project Nature</h1>
              <div className="my-7 grid grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="mb-3">
                  <label
                    htmlFor="ID"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ID:
                  </label>
                  <input
                    type="number"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="ID"
                    name="id"
                    value={projectNature.id}
                    onChange={handleNature}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="label"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Label:
                  </label>
                  <input
                    type="text"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="label"
                    name="label"
                    value={projectNature.label}
                    onChange={handleNature}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="value"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Value:
                  </label>
                  <input
                    type="text"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="value"
                    name="value"
                    value={projectNature.value}
                    onChange={handleNature}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleProjNatureSubmit}
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="my-5 mb-10">
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
                      {projectNatureTable.map((item, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                        >
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.id}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.label}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* project nature end */}

              {/* Platform start */}
              <h1 className="text-3xl font-semibold">Platform</h1>
              <div className="my-7 grid grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="mb-3">
                  <label
                    htmlFor="id2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ID:
                  </label>
                  <input
                    type="number"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="id2"
                    name="id2"
                    value={projectPlatform.id2}
                    onChange={handlePlatform}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="label2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Label:
                  </label>
                  <input
                    type="text"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="label2"
                    name="label2"
                    value={projectPlatform.label2}
                    onChange={handlePlatform}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="value2"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Value:
                  </label>
                  <input
                    type="text"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="value2"
                    name="value2"
                    value={projectPlatform.value2}
                    onChange={handlePlatform}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleProjPlatSubmit}
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="my-5 mb-10">
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
                      {projectPlatformTable.map((item, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                        >
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.id}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.label}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Platform end */}

              {/* Department start */}
              <h1 className="text-3xl font-semibold">Department</h1>
              <div className="my-7 grid grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="mb-3">
                  <label
                    htmlFor="id3"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ID:
                  </label>
                  <input
                    type="number"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="id3"
                    name="id3"
                    value={departmentData.id3}
                    onChange={handleDepart}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="label3"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Label:
                  </label>
                  <input
                    type="text"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="label3"
                    name="label3"
                    value={departmentData.label3}
                    onChange={handleDepart}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="value3"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Value:
                  </label>
                  <input
                    type="text"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="value3"
                    name="value3"
                    value={departmentData.value3}
                    onChange={handleDepart}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleProjDepartSubmit}
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="my-5 mb-10">
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
                      {departmentTable.map((item, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                        >
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.id}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.label}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Department end */}

              {/* Shift start */}
              <h1 className="text-3xl font-semibold">Shift</h1>
              <div className="my-7 grid grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="mb-3">
                  <label
                    htmlFor="id4"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ID:
                  </label>
                  <input
                    type="number"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="id4"
                    name="id4"
                    value={shiftData.id4}
                    onChange={handleShift}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="label4"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Label:
                  </label>
                  <input
                    type="text"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="label4"
                    name="label4"
                    value={shiftData.label4}
                    onChange={handleShift}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="value"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Value:
                  </label>
                  <input
                    type="text"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="value"
                    name="value4"
                    value={shiftData.value4}
                    onChange={handleShift}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleShiftSubmit}
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="my-5 mb-10">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border-collapse border rounded-lg">
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
                      {shiftTable.map((item, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                        >
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.id}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.label}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Shift end */}

              {/* Designation start */}
              <h1 className="text-3xl font-semibold">Designation </h1>
              <div className="my-7 grid grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="mb-3">
                  <label
                    htmlFor="id5"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ID:
                  </label>
                  <input
                    type="number"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="id5"
                    name="id5"
                    value={designationData.id5}
                    onChange={handleDesignation}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="label5"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Label:
                  </label>
                  <input
                    type="text"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="label5"
                    name="label5"
                    value={designationData.label5}
                    onChange={handleDesignation}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="value5"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Value:
                  </label>
                  <input
                    type="text"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="value5"
                    name="value5"
                    value={designationData.value5}
                    onChange={handleDesignation}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleDesignationSubmit}
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="my-5 mb-10">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border-collapse border rounded-lg">
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
                      {designationTable.map((item, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                        >
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.id}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.label}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Designation end */}

              {/* Bank start */}
              <h1 className="text-3xl font-semibold">Bank </h1>
              <div className="my-7 grid grid-cols-2 lg:grid-cols-4 gap-2">
                <div className="mb-3">
                  <label
                    htmlFor="id6"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    ID:
                  </label>
                  <input
                    type="number"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="id6"
                    name="id6"
                    value={bankData.id6}
                    onChange={handleBank}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="label6"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Label:
                  </label>
                  <input
                    type="text"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="label6"
                    name="label6"
                    value={bankData.label6}
                    onChange={handleBank}
                  />
                </div>
                <div className="mb-3">
                  <label
                    htmlFor="value6"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Value:
                  </label>
                  <input
                    type="text"
                    className={
                      "block rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="value6"
                    name="value6"
                    value={bankData.value6}
                    onChange={handleBank}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleBankSubmit}
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              <div className="my-5 mb-10">
                <div className="overflow-x-auto">
                  <table className="table-auto w-full border-collapse border rounded-lg">
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
                      {bankTable.map((item, index) => (
                        <tr
                          key={index}
                          className={index % 2 === 0 ? "bg-gray-100" : ""}
                        >
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.id}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.label}
                          </td>
                          <td className="p-2 text-start border-b border-gray-300">
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Bank end */}
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

export default WithAuth(Setup);


