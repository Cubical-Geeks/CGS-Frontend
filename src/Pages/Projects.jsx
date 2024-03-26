import React, { useEffect, useState } from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import SalesDashboard from '../Components/SalesDashboard'
import axios from 'axios';
import api from '../Components/Api';

const Projects = () => {

  const projectStatus = ["To be Alloted", "In Progress", "In Review", "Completed"];
  const [projectNature, setProjectNature] = useState([{ label: "", value: "" }]);
  const [platform, setPlatform] = useState([{ label: "", value: "" }]);
  const [department, setDepartment] = useState([{ label: "", value: "" }]);
  const [randomNumber, setRandomNumber] = useState("");
  const [id, setId] = useState(randomNumber);
  const [title, setTitle] = useState(null);
  const [startDate, setStartDate] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [plat, setPlat] = useState(null);
  const [depart, setDepart] = useState(null);
  const [nature, setNature] = useState(null);
  const [status, setStatus] = useState('');
  const [profile, setProfile] = useState(null);
  const [salesPerson, setSalesPerson] = useState(null);
  const [amount, setAmount] = useState(null);
  const [clientName, setClientName] = useState(null);
  const [description, setDescription] = useState(null);
  const [attachments, setAttachments] = useState(null);

  const generateRandomId = () => {
    return Math.floor(100000 + Math.random() * 900000);
  }

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

  useEffect(() => {
    setId(generateRandomId());
    getProjectNature();
    getPlatform();
    getDepartment();
  }, [])

  const isValidDateFormat = (date) => {
    const dateFormat = /^\d{4}-\d{2}-\d{2}$/;
    return dateFormat.test(date);
  };

  const handleSubmit = async () => {
    if (!isValidDateFormat(startDate) || !isValidDateFormat(deliveryDate)) {
      alert('Please enter dates in the format YYYY-MM-DD');
      return;
    }

    // Show loading indicator
    showLoadingIndicator();

    try {
      const formData = new FormData();
      formData.append("attachments", attachments);
      formData.append("id", id);
      formData.append("title", title);
      formData.append("startDate", startDate);
      formData.append("deliveryDate", deliveryDate);
      formData.append("platform", plat);
      formData.append("department", depart);
      formData.append("nature", nature);
      formData.append("status", status);
      formData.append("profile", profile);
      formData.append("salesPerson", salesPerson);
      formData.append("amount", amount);
      formData.append("clientName", clientName);
      formData.append("description", description);

      console.log(formData);

      const response = await axios.post(`${api}/api/projects/submit`, formData);
      hideLoadingIndicator();
      if (response.status === 200 && response.data.success) {
        alert("Project Uploaded Successflly!")
      }

    } catch (error) {

      alert("Error in posting Project: " + error.message);
      console.error("Error in posting Project", error);
    }
  }

  function showLoadingIndicator() {
    document.getElementById("loading-overlay").style.display = "block";
  }

  function hideLoadingIndicator() {
    document.getElementById("loading-overlay").style.display = "none";
  }




  return (
    <>
      <div className='flex'>
        <div>
          <SalesDashboard />
        </div>
        <div className='container flex flex-col justify-between'>
          <div>
            <Navbar />
            <div className='py-5 px-5'>
              <h1 className='text-2xl md:text-3xl lg:text-4xl lg:font-semibold text-slate-500 my-5'>Upload a Project</h1>
              <div>
                {/* form start */}
                <form enctype="multipart/form-data">

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 text-center lg:text-start">
                    <div className="mb-3">
                      <label
                        htmlFor="ID"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        ID <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type="number"
                        className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                        id="ID"
                        name="id"
                        value={id}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="name"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Title <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type="text"
                        className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                        id="title"
                        name="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="startDate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Start Date <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type="text"
                        className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                        id="startDate"
                        name="startDate"
                        placeholder='YYYY-MM-DD'
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                      />
                      {!isValidDateFormat(startDate) && <p className="text-red-500 text-xs mt-1">Please enter a valid date in the format YYYY-MM-DD</p>}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="delieveryDate"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Delievery Date <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type="text"
                        className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                        id="delieveryDate"
                        name="deliveryDate"
                        placeholder='YYYY-MM-DD'
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                      />
                      {!isValidDateFormat(deliveryDate) && <p className="text-red-500 text-xs mt-1">Please enter a valid date in the format YYYY-MM-DD</p>}
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="clientName"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Client Name <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type="text"
                        className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                        id="clientName"
                        name="clientName"
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}

                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="dropdown" className="block text-sm font-medium leading-6 text-gray-900">Project Nature <span className='text-red-500'>*</span></label>
                      <select id="dropdown" className='w-full border p-2 rounded' name='nature' value={nature} onChange={(e) => setNature(e.target.value)}>
                        <option className='m-5' value="">Select</option>
                        {
                          projectNature.map((item, index) => (
                            <option key={index} className='m-5' value={item.label}>{item.label}</option>
                          ))
                        }
                      </select>
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="salesPerson"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Sales Person <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type="text"
                        className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                        id="salesPerson"
                        name="salesPerson"
                        value={salesPerson}
                        onChange={(e) => setSalesPerson(e.target.value)}

                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="attachments"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Attachments
                      </label>
                      <input
                        type="file"
                        className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                        id="attachments"
                        name="attachments"
                        onChange={(e) => setAttachments(e.target.files[0])}
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="profile"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Profile <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type="text"
                        className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                        id="profile"
                        name="profile"
                        value={profile}
                        onChange={(e) => setProfile(e.target.value)}

                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="depart" className="block text-sm font-medium leading-6 text-gray-900">Department <span className='text-red-500'>*</span></label>
                      <select id="depart" className='w-full border p-2 rounded' name='depart' value={depart} onChange={(e) => setDepart(e.target.value)}>
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
                        htmlFor="amount"
                        className="block text-sm font-medium leading-6 text-gray-900"
                      >
                        Amount <span className='text-red-500'>*</span>
                      </label>
                      <input
                        type="number"
                        className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                        id="amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}

                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="plat" className="block text-sm font-medium leading-6 text-gray-900">Platform <span className='text-red-500'>*</span></label>
                      <select id="plat" className='w-full border p-2 rounded' name='plat' value={plat} onChange={(e) => setPlat(e.target.value)}>
                        <option className='m-5' value="">Select</option>
                        {
                          platform.map((item, index) => (
                            <option key={index} className='m-5' value={item.label}>{item.label}</option>
                          ))
                        }
                      </select>
                    </div>
                  </div>

                  <div className="mb-3">
                    <label htmlFor="status" className="block text-sm font-medium leading-6 text-gray-900">Project Status <span className='text-red-500'>*</span></label>
                    <select id="status" className='w-full border p-2 rounded' name='status' value={status} onChange={(e) => setStatus(e.target.value)}>
                      <option className='m-5' value="">Select</option>
                      {
                        projectStatus.map((item, index) => (
                          <option key={index} className='m-5' value={item}>{item}</option>
                        ))
                      }
                    </select>
                  </div>

                  <div className="mb-3">
                    <label
                      htmlFor="description"
                      className="block text-sm font-medium leading-6 text-gray-900"
                    >
                      Description <span className='text-red-500'>*</span>
                    </label>
                    <textarea
                      className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                      name="description"
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                  </div>

                </form>
                {/* form end */}

                {/* submit button */}
                <div className="flex justify-center mt-10">
                  <button type='submit' onClick={handleSubmit} className="text-white w-full lg:w-1/3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                    Submit
                  </button>
                  <br />
                </div>
                <div className='flex justify-center'>
                  <span className='text-red-500 text-[15px] hidden' id='loading-overlay'>Uploading...</span>
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
  )
}

export default Projects
