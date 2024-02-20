import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import axios from "axios";

const Setup = () => {

  // const [formData, setFormData] = useState(initialFormData);
  const nature = { id: "", nature: "" };

  const [projectNature, setProjectNature] = useState({ id: "", label: "", value: "" });
  const [projectPlatform, setProjectPlatform] = useState({ id2: "", label2: "", value2: "" });
  const [departmentData, setDepartmentData] = useState({ id3: "", label3: "", value3: "" });

  // const handleInputChange = (e) => {
  //   setFormData({ ...formData, [e.target.name]: e.target.value });
  // };

  // const handleAdd = () => {
  //   // console.log("Form data: ", saveFormData);
  //   setSaveFormData([...saveFormData, formData]); // Save current form data
  //   setFormData(initialFormData); // Reset form data to initial state
  // };

  const handleNature = (e) => {
    setProjectNature((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }

  const handlePlatform = (e) => {
    setProjectPlatform((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }

  const handleDepart = (e) => {
    setDepartmentData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  };

  const handleProjNatureSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/dropdown/projectNature", {
        id: projectNature.id,
        label: projectNature.label,
        value: projectNature.value
      });
      if (response.status === 200 && response.data.success) {
        console.log('Data posted successfully')
        console.log(response)
      }
      setProjectNature({ id: projectNature.id, label: projectNature.label })
    } catch (error) {
      console.log("Error", error)
    }
  };

  const handleProjPlatSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/dropdown/platform", {
        id: projectPlatform.id2,
        label: projectPlatform.label2,
        value: projectPlatform.value2
      });
      if (response.status === 200 && response.data.success) {
        console.log('Data posted successfully')
        console.log(response)
      }
      setProjectPlatform({ id: projectPlatform.id2, label: projectPlatform.label2 })
    } catch (error) {
      console.log("Error", error)
    }
  };

  const handleProjDepartSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:4000/dropdown/department", {
        id: departmentData.id3,
        label: departmentData.label3,
        value: departmentData.value3
      });
      if (response.status === 200 && response.data.success) {
        console.log('Data posted successfully')
        console.log(response)
      }
      setDepartmentData({ id: departmentData.id, label: departmentData.label3 })
    } catch (error) {
      console.log("Error", error)
    }
  };

  // useEffect(() => {
  //   console.log("Department data updated: ", departmentData);
  // }, []);

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
                      "block w-[50%] rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                      "block w-[50%] rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                      "block w-[50%] rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                      "block w-[50%] rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                      "block w-[50%] rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                      "block w-[50%] rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                      "block w-[50%] rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                      "block w-[50%] rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
                      "block w-[50%] rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
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
              {/* Department end */}
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

export default Setup;
