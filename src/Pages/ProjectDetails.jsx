import React, { useEffect, useState } from "react";
import Dashboard from "../Components/Dashboard";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import Dropdown from "../Components/Dropdown";
import Select, { components } from "react-select";
import { IoIosSend } from "react-icons/io";
import '../index.css'
import WithAuth from "../Components/WithAuth";
import api from "../Components/Api";

const ProjectDetails = () => {
  const { id } = useParams();

  const [projectNature, setProjectNature] = useState([{ label: "", value: "" }]);
  const [platform, setPlatform] = useState([{ label: "", value: "" }]);
  const [department, setDepartment] = useState([{ label: "", value: "" }]);
  const [formData, setFormData] = useState({
    title: "",
    id: "",
    startDate: "",
    deliveryDate: "",
    plat: "",
    depart: "",
    nature: "",
    profile: "",
    salesPerson: "",
    amount: "",
    clientName: "",
    description: "",
    attachments: "",
  });
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getProjectNature = async () => {
    try {
      const response = await axios.get(`${api}/dropdown/getProjectNature`);
      setProjectNature(response.data.data[0])
      console.log("Response", response.data.data[0])
    } catch (error) {
      console.log("Error in fetching Project Nature", error)
    }
  };

  const getPlatform = async () => {
    try {
      const response = await axios.get(`${api}/dropdown/getPlatform`);
      setPlatform(response.data.data[0])
      console.log("Response", response.data.data[0])
    } catch (error) {
      console.log("Error in fetching Project Nature", error)
    }
  };

  const getDepartment = async () => {
    try {
      const response = await axios.get(`${api}/dropdown/getDepartment`);
      setDepartment(response.data.data[0])
      console.log("Response", response.data.data[0])
    } catch (error) {
      console.log("Error in fetching Project Nature", error)
    }
  };

  const getProjectByID = async () => {
    try {
      const response = await axios.get(`${api}/api/projects/search/${id}`);
      if (response) {
        const responseData = response.data.data[0];
        setFormData({
          title: responseData.title,
          startDate: responseData.startDate,
          deliveryDate: responseData.deliveryDate,
          plat: responseData.platform,
          depart: responseData.department,
          nature: responseData.nature,
          profile: responseData.profile,
          salesPerson: responseData.salesPerson,
          amount: responseData.amount,
          clientName: responseData.clientName,
          description: responseData.description,
          attachments: responseData.attachments
        })
      }
    } catch (error) {
      console.log("Error fetching project:", error);
    }
  };

  useEffect(() => {
    getProjectByID();
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
            <div className='py-5 px-5'>
              <div className='grid grid-cols-1 md:grid-cols-2'>
                <h1 className='text-2xl md:text-3xl lg:text-4xl lg:font-semibold text-slate-500 my-5'>Project Details</h1>
                <div className='text-end my-auto'>
                  <Link to={`/SalesProjectEdit/${id}`}>
                    <button className="text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                      Edit
                    </button>
                  </Link>
                </div>
              </div>
              <div className=''>
                {/* form start */}
                <form>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-center lg:text-start">
                    {
                      id ? (
                        <div className="mb-3">
                          <label
                            htmlFor="ID"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ID:
                          </label>
                          <input
                            type="number"
                            className={"block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none border-b placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="ID"
                            name="id"
                            value={id}
                            readOnly={true}
                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label
                            htmlFor="ID"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            ID:
                          </label>
                          <input
                            type="number"
                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="ID"
                            name="id"
                            value={id}
                            onChange={handleInputChange}

                          />
                        </div>
                      )
                    }

                    {
                      id ? (
                        <div className="mb-3">
                          <label
                            htmlFor="startDate"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Start Date:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none border-b placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="startDate"
                            name="startDate"
                            placeholder='YYYY-MM-DD'
                            value={formData.startDate}
                            readOnly={true}

                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label
                            htmlFor="startDate"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Start Date:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="startDate"
                            name="startDate"
                            placeholder='YYYY-MM-DD'
                            value={formData.startDate}
                            onChange={handleInputChange}

                          />
                        </div>
                      )
                    }

                    {
                      id ? (
                        <div className="mb-3">
                          <label
                            htmlFor="clientName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Client Name:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none border-b placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="clientName"
                            name="clientName"
                            value={formData.clientName}
                            readOnly={true}

                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label
                            htmlFor="clientName"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Client Name:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="clientName"
                            name="clientName"
                            value={formData.clientName}
                            onChange={handleInputChange}

                          />
                        </div>
                      )
                    }

                    {
                      id ? (
                        <div className="mb-3">
                          <label
                            htmlFor="plat"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Platform
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none border-b placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="plat"
                            name="plat"
                            value={formData.plat}
                            readOnly={true}
                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label htmlFor="platform" className="block text-sm font-medium leading-6 text-gray-900">Platform:</label>
                          <select id="platform" className='w-full border p-2 rounded' name='plat' value={formData.plat} onChange={handleInputChange}>
                            <option className='m-5' value="">Select</option>
                            {
                              platform.map((item, index) => (
                                <option key={index} className='m-5' value={item.label}>{item.label}</option>
                              ))
                            }
                          </select>
                        </div>
                      )
                    }

                    {
                      id ? (
                        <div className="mb-3">
                          <label
                            htmlFor="salesPerson"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Sales Person:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none border-b placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="salesPerson"
                            name="salesPerson"
                            value={formData.salesPerson}
                            readOnly={true}

                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label
                            htmlFor="salesPerson"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Sales Person:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="salesPerson"
                            name="salesPerson"
                            value={formData.salesPerson}
                            onChange={handleInputChange}

                          />
                        </div>
                      )
                    }

                    {
                      id ? (
                        <div className="mb-3">
                          <label
                            htmlFor="attachments"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Attachments:
                          </label>
                          {/* <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none border-b placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="attachments"
                            name="attachments"
                            value={formData.attachments}
                            readOnly={true}
                          /> */}
                          <a href={formData.attachments} className="text-md text-blue-600 hover:text-blue-800 border-b py-3" >{formData.attachments}</a>
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label
                            htmlFor="attachments"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Attachments:
                          </label>
                          <input
                            type="file"
                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="attachments"
                            name="attachments"
                            value={formData.attachments}
                            onChange={handleInputChange}
                          />
                        </div>
                      )
                    }

                    {
                      id ? (
                        <div className="mb-3">
                          <label
                            htmlFor="deliveryDate"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Delievery Date:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none border-b placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="deliveryDate"
                            name="deliveryDate"
                            value={formData.deliveryDate}
                            readOnly={true}

                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label
                            htmlFor="delieveryDate"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Delievery Date:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="delieveryDate"
                            name="delieveryDate"
                            placeholder='YYYY-MM-DD'
                            value={formData.deleiveryDate}
                            onChange={handleInputChange}

                          />
                        </div>
                      )
                    }

                    {
                      id ? (
                        <div className="mb-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Title:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none border-b placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="title"
                            name="title"
                            value={formData.title}
                            readOnly={true}
                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Title:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}

                          />
                        </div>
                      )
                    }

                    {
                      id ? (
                        <div className="mb-3">
                          <label
                            htmlFor="depart"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Department:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none border-b placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="depart"
                            name="depart"
                            value={formData.depart}
                            readOnly={true}
                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label htmlFor="depart" className="block text-sm font-medium leading-6 text-gray-900">Department:</label>
                          <select id="depart" className='w-full border p-2 rounded' name='depart' value={formData.depart} onChange={handleInputChange}>
                            <option className='m-5' value="">Select</option>
                            {
                              department.map((item, index) => (
                                <option key={index} className='m-5' value={item.label}>{item.label}</option>
                              ))
                            }
                          </select>
                        </div>
                      )
                    }

                    {
                      id ? (
                        <div className="mb-3">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Amount:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none border-b placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            readOnly={true}
                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label
                            htmlFor="amount"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Amount:
                          </label>
                          <input
                            type="number"
                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleInputChange}

                          />
                        </div>
                      )
                    }

                    {
                      id ? (
                        <div className="mb-3">
                          <label
                            htmlFor="nature"
                            className="block text-sm font-medium leading-6 text-gray-900"
                          >
                            Project Nature:
                          </label>
                          <input
                            type="text"
                            className={"block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none border-b placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                            id="nature"
                            name="nature"
                            value={formData.nature}
                            readOnly={true}
                          />
                        </div>
                      ) : (
                        <div className="mb-3">
                          <label htmlFor="nature" className="block text-sm font-medium leading-6 text-gray-900">Project Nature:</label>
                          <select id="nature" className='w-full border p-2 rounded' name='nature' value={formData.nature} onChange={handleInputChange}>
                            <option className='m-5' value="">Select</option>
                            {
                              projectNature.map((item, index) => (
                                <option key={index} className='m-5' value={item.label}>{item.label}</option>
                              ))
                            }
                          </select>
                        </div>
                      )
                    }

                    {/* check boxes */}
                    {/* <div className="mb-3">
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
                                        </div> */}
                  </div>
                  {/* description */}

                  {
                    id ? (
                      <div className="mb-3">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Description:
                        </label>
                        <input
                          type="text"
                          className={"block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none border-b placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                          id="description"
                          name="description"
                          value={formData.description}
                          readOnly={true}
                        />
                      </div>
                    ) : (
                      <div className="mb-3">
                        <label
                          htmlFor="description"
                          className="block text-sm font-medium leading-6 text-gray-900"
                        >
                          Description:
                        </label>
                        <textarea
                          className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                          name="description"
                          id="description"
                          value={formData.description}
                          onChange={handleInputChange}

                        ></textarea>
                      </div>
                    )
                  }


                  {/* submit button */}
                  {/* <div className="flex justify-center my-10">
                                        <button className="text-white w-full lg:w-1/3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                            Submit
                                        </button>
                                    </div> */}
                </form>
                {/* form end */}

                {/* chat start */}
                {/* <div>
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
                                </div> */}
                {/* chat end */}
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

export default WithAuth(ProjectDetails);
