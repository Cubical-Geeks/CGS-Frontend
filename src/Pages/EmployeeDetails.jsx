import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import Dashboard from '../Components/Dashboard';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';

const EmployeeDetails = () => {

    const { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [formData, setFormData] = useState({
        id: "",
        Name: "",
        joinDate: "",
        FathName: "",
        cnic: "",
        email: "",
        phone: "",
        emergencyPhone: "",
        reference: "",
        address: "",
        userName: "",
        password: "",
    });

    const handleSubmit = async () => {
        try {
            const response = await axios.post("http://localhost:4000/api/employee/submit", {
                id: formData.id,
                name: formData.Name,
                joiningDate: formData.joinDate,
                fathersName: formData.FathName,
                cnic: formData.cnic,
                email: formData.email,
                phone: formData.phone,
                reference: formData.reference,
                address: formData.address,
                emergencyPhone: formData.emergencyPhone,
                username: formData.userName,
                password: formData.password
            });
    
            if (response.status === 200 && response.data.success) {
                console.log(response);
                console.log("Data posted Successfully !");
            } else {
                console.log("Data posting FAILED!");
            }
        } catch (error) {
            if (error.response) {
                console.log("Server responded with an error status:");
                console.log("Status Code:", error.response.status);
                console.log("Response Data:", error.response.data);
                console.log("Response Headers:", error.response.headers);
            } else if (error.request) {
                console.log("No response received from the server:", error.request);
            } else {
                console.log("Error during request setup:", error.message);
            }
        }
    };
    

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    const handleEditMode = () => {
        setEditMode(!editMode)
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
                            <div className='flex justify-between'>
                                <h1 className='text-2xl lg:text-4xl font-semibold mb-5'>Employee Details</h1>
                                <div>
                                    <button onClick={handleEditMode} className="text-white bg-indigo-500 border-0 py-2 px-9 focus:outline-none hover:bg-indigo-600 rounded">
                                        {editMode ? 'Save' : 'Edit'}
                                    </button>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
                                {/* 1 */}
                                <div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="ID"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            ID:
                                        </label>
                                        <input
                                            type="number"
                                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
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
                                    <div className="mb-3">
                                        <label
                                            htmlFor="fatherName"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Father's Name:
                                        </label>
                                        <input
                                            type="text"
                                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                                                ? "ring-gray-300 ring-1 ring-inset"
                                                : "border-b ps-0 font-semibold"
                                                }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                            id="fatherName"
                                            name="FathName"
                                            value={formData.FathName}
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="phone"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Phone:
                                        </label>
                                        <input
                                            type="text"
                                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                                                ? "ring-gray-300 ring-1 ring-inset"
                                                : "border-b ps-0 font-semibold"
                                                }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="emerPhone"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Emergency Phone:
                                        </label>
                                        <input
                                            type="number"
                                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                                                ? "ring-gray-300 ring-1 ring-inset"
                                                : "border-b ps-0 font-semibold"
                                                }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                            id="emerPhone"
                                            name="emergencyPhone"
                                            value={formData.emergencyPhone}
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                        />
                                    </div>
                                </div>

                                {/* 2 */}
                                <div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="Name"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Name:
                                        </label>
                                        <input
                                            type="text"
                                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                                                ? "ring-gray-300 ring-1 ring-inset"
                                                : "border-b ps-0 font-semibold"
                                                }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                            id="Name"
                                            name="Name"
                                            value={formData.Name}
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="cnic"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            CNIC:
                                        </label>
                                        <input
                                            type="number"
                                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                                                ? "ring-gray-300 ring-1 ring-inset"
                                                : "border-b ps-0 font-semibold"
                                                }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                            id="cnic"
                                            name="cnic"
                                            value={formData.cnic}
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="reference"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Reference:
                                        </label>
                                        <input
                                            type="text"
                                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                                                ? "ring-gray-300 ring-1 ring-inset"
                                                : "border-b ps-0 font-semibold"
                                                }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                            id="reference"
                                            name="reference"
                                            value={formData.reference}
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="userID"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Username:
                                        </label>
                                        <input
                                            type="text"
                                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                                                ? "ring-gray-300 ring-1 ring-inset"
                                                : "border-b ps-0 font-semibold"
                                                }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                            id="userID"
                                            name="userName"
                                            value={formData.userName}
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                        />
                                    </div>
                                </div>

                                {/* 3 */}
                                <div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="joiningDate"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Joining Date:
                                        </label>
                                        <input
                                            type="date"
                                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                                                ? "ring-gray-300 ring-1 ring-inset"
                                                : "border-b ps-0 font-semibold"
                                                }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                            id="joiningDate"
                                            name="joinDate"
                                            value={formData.joinDate}
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Email:
                                        </label>
                                        <input
                                            type="email"
                                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                                                ? "ring-gray-300 ring-1 ring-inset"
                                                : "border-b ps-0 font-semibold"
                                                }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="address"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Address:
                                        </label>
                                        <input
                                            type="text"
                                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                                                ? "ring-gray-300 ring-1 ring-inset"
                                                : "border-b ps-0 font-semibold"
                                                }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="password"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Password:
                                        </label>
                                        <input
                                            type="text"
                                            className={`block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ${editMode
                                                ? "ring-gray-300 ring-1 ring-inset"
                                                : "border-b ps-0 font-semibold"
                                                }  placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                            id="password"
                                            name="password"
                                            value={formData.password}
                                            onChange={handleInputChange}
                                            readOnly={!editMode}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='my-5 text-center'>
                                <button onClick={handleSubmit} className="text-white bg-indigo-500 border-0 py-2 px-9 focus:outline-none hover:bg-indigo-600 rounded">
                                    Submit
                                </button>
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

export default EmployeeDetails