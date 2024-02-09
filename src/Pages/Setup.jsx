import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";

const Setup = () => {
  const initialFormData = {
    id: "",
    id2: "",
    nature: "",
    platform: "",
  };

  const nature = [
    { id: "", nature: "" },
  ];
  const platform = [
    { id2: "", plat: "" },
  ];
  const department = [
    { id3: "", depart: "" },
  ];

  const [formData, setFormData] = useState(initialFormData);
  const [saveFormData, setSaveFormData] = useState([]);

  const [projectPlatform, setProjectPlatform] = useState(platform);
  const [projectNature, setProjectNature] = useState(nature);
  const [departmentData, setDepartmentData] = useState(department);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

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

  const handleAdd = () => {
    setProjectNature((prevData) => ({
      ...prevData,
      [prevData.id]: prevData.nature
    }));
    console.log("Project nature data updated: ", projectNature);
  };

  const handleAdd2 = () => {
    setProjectPlatform((prevData) => ({
      ...prevData,
      [prevData.id2]: prevData.plat
    }));
    console.log("Project platform data updated: ", projectPlatform);
  };

  const handleAdd3 = () => {
    setDepartmentData((prevData) => ({
      ...prevData,
      [prevData.id3]: prevData.depart
    }));
    console.log("Department data updated: ", departmentData);
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
              <div className="my-7 grid grid-cols-2 lg:grid-cols-3 gap-2">
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
                    htmlFor="projectNature"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Nature:
                  </label>
                  <input
                    type="text"
                    className={
                      "block w-[50%] rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="projectNature"
                    name="nature"
                    value={projectNature.nature}
                    onChange={handleNature}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleAdd}
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* project nature end */}

              {/* Platform start */}
              <h1 className="text-3xl font-semibold">Platform</h1>
              <div className="my-7 grid grid-cols-2 lg:grid-cols-3 gap-2">
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
                    htmlFor="platform"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Platform:
                  </label>
                  <input
                    type="text"
                    className={
                      "block w-[50%] rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="platform"
                    name="plat"
                    value={projectPlatform.plat}
                    onChange={handlePlatform}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleAdd2}
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  >
                    Add
                  </button>
                </div>
              </div>
              {/* Platform end */}

              {/* Department start */}
              <h1 className="text-3xl font-semibold">Department</h1>
              <div className="my-7 grid grid-cols-2 lg:grid-cols-3 gap-2">
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
                    htmlFor="depart"
                    className="block text-sm font-medium leading-6 text-gray-900"
                  >
                    Department:
                  </label>
                  <input
                    type="text"
                    className={
                      "block w-[50%] rounded-md border-0 w-full py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"
                    }
                    id="depart"
                    name="depart"
                    value={departmentData.depart}
                    onChange={handleDepart}
                  />
                </div>
                <div className="text-center">
                  <button
                    onClick={handleAdd3}
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
