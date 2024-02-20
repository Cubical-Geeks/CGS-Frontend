import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import Dropdown from "../Components/Dropdown";
import Select, { components } from "react-select";
import { IoIosSend } from "react-icons/io";
import '../index.css'

const Input = (props) => (
  <components.Input {...props} readOnly={props.selectProps.isReadOnly} />
);

const MySelect = (props) => {
  const menuIsOpen = props.isReadOnly ? false : props.menuIsOpen;
  return <Select components={{ Input }} {...props} menuIsOpen={menuIsOpen} />;
};

const ProjectDetails = () => {
  const [projectNature, setProjectNature] = useState([{ label: "", value: "" }]);
  const [platform, setPlatform] = useState([{ label: "", value: "" }]);
  const [department, setDepartment] = useState([{ label: "", value: "" }]);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    id: "",
    startDate: "",
    deleiveryDate: "",
    platform: "",
    profile: "",
    salesPerson: "",
    amount: "",
    clientName: "",
    description: "",
    attachments: "",
  });

  const options = [
    { label: "Web Development", value: 1 },
    { label: "App Development", value: 2 },
    { label: "Graphic Designing", value: 3 },
    { label: "3D Animations", value: 3 },
  ];

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEditClick = () => {
    setEditMode(!editMode);
    console.log(editMode);
  };

  useEffect(() => {
    const getProjectNature = async () => {
      try {
        const response = await axios.get("http://localhost:4000/dropdown/getProjectNature");
        setProjectNature(response.data.data[0])
        console.log("Response", response.data.data[0])
      } catch (error) {
        console.log("Error in fetching Project Nature", error)
      }
    };

    const getPlatform = async () => {
      try {
        const response = await axios.get("http://localhost:4000/dropdown/getPlatform");
        setPlatform(response.data.data[0])
        console.log("Response", response.data.data[0])
      } catch (error) {
        console.log("Error in fetching Project Nature", error)
      }
    };

    const getDepartment = async () => {
      try {
        const response = await axios.get("http://localhost:4000/dropdown/getDepartment");
        setDepartment(response.data.data[0])
        console.log("Response", response.data.data[0])
      } catch (error) {
        console.log("Error in fetching Project Nature", error)
      }
    };

    getProjectNature();
    getPlatform();
    getDepartment();
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
              <div className="flex justify-between items-center">
                <div className="mb-4">
                  <h1 className="text-3xl font-semibold">Project Details</h1>
                </div>
                <div>
                  <button
                    className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                    onClick={handleEditClick}
                  >
                    {editMode ? "Save" : "Edit"}
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
                <div>
                  {/* form start */}
                  <form>
                    <div className="mb-3">
                      <label
                        htmlFor="ID"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ID:
                      </label>
                      <input
                        type="number"
                        className={`block w-[50%] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                          ? "ring-gray-300 ring-1 ring-inset"
                          : "border-b ps-0 font-semibold"
                          }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                        id="ID"
                        name="id"
                        value={formData.id}
                        onChange={handleInputChange}
                        readOnly={!editMode}
                      />
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-center lg:text-start">
                      {/* 1 */}
                      <div>
                        <div className="mb-3">
                          <label
                            htmlFor="startDate"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Start Date:
                          </label>
                          <input
                            type="date"
                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                              ? "ring-gray-300 ring-1 ring-inset"
                              : "border-b ps-0 font-semibold"
                              }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                            id="startDate"
                            name="startDate"
                            value={formData.startDate}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="clientName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Client Name:
                          </label>
                          <input
                            type="text"
                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                              ? "ring-gray-300 ring-1 ring-inset"
                              : "border-b ps-0 font-semibold"
                              }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                            id="clientName"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="platform"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Platform:
                          </label>
                          <MySelect
                            options={platform}
                            isReadOnly={!editMode}
                            defaultValue={"Select"}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="salesPerson"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Sales Person:
                          </label>
                          <input
                            type="text"
                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                              ? "ring-gray-300 ring-1 ring-inset"
                              : "border-b ps-0 font-semibold"
                              }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                            id="salesPerson"
                            name="salesPerson"
                            value={formData.salesPerson}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="attachments"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Attachments:
                          </label>
                          <input
                            type="file"
                            className={`block w-full rounded-md border-0 pl-2 py-1.5 text-gray-900 focus:outline-none ${editMode
                              ? "ring-gray-300 ring-1 ring-inset"
                              : "border-b ps-0 font-semibold"
                              }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                            id="attachments"
                            name="attachments"
                            value={formData.attachments}
                            onChange={handleInputChange}
                            disabled={!editMode}
                          />
                        </div>
                      </div>

                      {/* 2 */}
                      <div>
                        <div className="mb-3">
                          <label
                            htmlFor="delieveryDate"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Delievery Date:
                          </label>
                          <input
                            type="date"
                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                              ? "ring-gray-300 ring-1 ring-inset"
                              : "border-b ps-0 font-semibold"
                              }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                            id="delieveryDate"
                            name="delieveryDate"
                            value={formData.deleiveryDate}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Title:
                          </label>
                          <input
                            type="text"
                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                              ? "ring-gray-300 ring-1 ring-inset"
                              : "border-b ps-0 font-semibold"
                              }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="department"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Department:
                          </label>
                          <MySelect
                            options={department}
                            isReadOnly={!editMode}
                            defaultValue={"Select"}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Amount:
                          </label>
                          <input
                            type="number"
                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                              ? "ring-gray-300 ring-1 ring-inset"
                              : "border-b ps-0 font-semibold"
                              }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}
                            readOnly={!editMode}
                          />
                        </div>
                        <div className="mb-3">
                          <label
                            htmlFor="nature"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Nature of Work:
                          </label>
                          <MySelect
                            options={projectNature}
                            isReadOnly={!editMode}
                            defaultValue={"Select"}
                          />
                        </div>
                      </div>

                      {/* check boxes */}
                      <div className="mb-3">
                        <div className="mb-2 flex items-center">
                          <input
                            type="checkbox"
                            className="appearance-none w-6 h-6 border-2 border-indigo-500 rounded-md checked:bg-indigo-500 checked:text-white checked:border-transparent mr-3"
                            id="check1"
                          />
                          <label htmlFor="check1">Talha</label>
                        </div>
                        <div className="mb-2 flex items-center">
                          <input
                            type="checkbox"
                            className="appearance-none w-6 h-6 border-2 border-indigo-500 rounded-md checked:bg-indigo-500 checked:text-white checked:border-transparent mr-3"
                            id="check2"
                          />
                          <label htmlFor="check2">Waqar</label>
                        </div>
                        <div className="mb-2 flex items-center">
                          <input
                            type="checkbox"
                            className="appearance-none w-6 h-6 border-2 border-indigo-500 rounded-md checked:bg-indigo-500 checked:text-white checked:border-transparent mr-3"
                            id="check3"
                          />
                          <label htmlFor="check3">
                            All as per nature of work
                          </label>
                        </div>
                      </div>
                    </div>
                    {/* description */}
                    <div className="mb-3">
                      <label
                        htmlFor="description"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Description:
                      </label>
                      <textarea
                        className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                          ? "ring-gray-300 ring-1 ring-inset"
                          : "border-b ps-0 font-semibold"
                          }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                        name="description"
                        id="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        readOnly={!editMode}
                      ></textarea>
                    </div>

                    {/* submit button */}
                    <div className="flex justify-center my-10">
                      <button className="text-white w-full lg:w-1/3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                        Submit
                      </button>
                    </div>
                  </form>
                  {/* form end */}
                </div>
                <div>
                  <div className="px-5 py-3">
                    <h1 className="text-3xl my-3 font-semibold text-indigo-500">
                      Chat
                    </h1>
                    <div className="border shadow rounded-lg h-[500px]">
                      <div className="p-3 h-full">
                        <div className="overflow-y-auto">
                          <div className="w-3/4 my-3">
                            <small className="text-gray-400 mb-3">User</small>
                            <div className="text-sm">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Cras odio magna, tempor sed eleifend ut,
                              consectetur vel nunc.
                            </div>
                          </div>
                          <div className="w-3/4 my-3 ml-auto">
                            <div className="text-end">
                              <small className="text-gray-400 mb-3">
                                You
                              </small>
                            </div>
                            <div className="text-sm">
                              Lorem ipsum dolor sit amet, consectetur adipiscing
                              elit. Cras odio magna, tempor sed eleifend ut,
                              consectetur vel nunc.
                            </div>
                          </div>
                        </div>
                      </div>
                      <hr />

                      {/* message area */}
                      <div className="p-3 border rounded-lg shadow flex justify-between items-center">
                        <div>
                          <input
                            type="text"
                            placeholder="Write a message"
                            name="message"
                            className="border-0 focus:outline-none"
                          />
                        </div>
                        <div>
                          <button>
                            <IoIosSend size={28} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
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

export default ProjectDetails;
