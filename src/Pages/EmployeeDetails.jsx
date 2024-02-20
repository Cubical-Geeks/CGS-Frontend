import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Dashboard from '../Components/Dashboard';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import Select, { components } from "react-select";
import WithAuth from '../Components/WithAuth';


const Input = (props) => (
    <components.Input {...props} readOnly={props.selectProps.isReadOnly} />
);

const MySelect = (props) => {
    const { options, value, onChange, isReadOnly } = props;
    const [menuIsOpen, setMenuIsOpen] = useState(false); // State to manage menu open/close

    const handleChange = (selectedOption) => {
        onChange(selectedOption);
    };

    return (
        <Select
            options={options}
            value={value}
            onChange={handleChange}
            menuIsOpen={!isReadOnly && menuIsOpen} 
            onMenuOpen={() => setMenuIsOpen(true)} 
            onMenuClose={() => setMenuIsOpen(false)} 
            components={{ Input }}
        />
    );
};

const EmployeeDetails = () => {

    const { id } = useParams();
    const [editMode, setEditMode] = useState(false);
    const [department, setDepartment] = useState([{ label: "", value: "" }]);
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
        department: "",
        designation: "",
        StartDate: "",
        EndDate: "",
        salary: "",
        shift: ""
    });

    const [selectedOption, setSelectedOption] = useState('Select');

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

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
                password: formData.password,
                history: [{
                    department: formData.department,
                    designation: formData.designation,
                    StartDate: formData.joinDate, // Corrected field name
                    EndDate: formData.EndDate,
                    salary: formData.salary,
                    shift: formData.shift
                }]
            });

            // Check response status and data
            if (response.status === 200 && response.data.success) {
                console.log(response);
                console.log("Data posted Successfully !");
                alert("Form posted successfully!");
            } else {
                console.log("Data posting FAILED!");
            }
        } catch (error) {
            // Proper error handling
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

    const handleUsers = async () => {
        try {
            console.log("Form Data Department:", formData.department);
            if (formData.department === "Sales") {
                const salesResponse = await axios.post("http://localhost:4000/api/salesuser/signup", {
                    username: formData.userName,
                    password: formData.password
                });
                console.log("Sales Response:", salesResponse.data);
                if (salesResponse.status === 200 && salesResponse.data.success) {
                    console.log("Sales user added");
                }
            } else if (formData.department === "Production") {
                const prodResponse = await axios.post("http://localhost:4000/api/productionUser/signup", {
                    username: formData.userName,
                    password: formData.password
                });
                console.log("Production Response:", prodResponse.data);
                if (prodResponse.status === 200 && prodResponse.data.success) {
                    console.log("Production user added");
                }
            }
        } catch (error) {
            console.log("Error in handleUsers:", error);
        }
    };



    useEffect(() => {
        const getDepartment = async () => {
            try {
                const response = await axios.get("http://localhost:4000/dropdown/getDepartment");
                setDepartment(response.data.data[0]);
                console.log("Response", response.data.data[0]);
            } catch (error) {
                console.log("Error in fetching Project Nature", error)
            }
        };

        getDepartment();
    }, [])

    console.log("Departments ", department);

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
                                {/* <div>
                                    <button onClick={handleEditMode} className="text-white bg-indigo-500 border-0 py-2 px-9 focus:outline-none hover:bg-indigo-600 rounded">
                                        {editMode ? 'Save' : 'Edit'}
                                    </button>
                                </div> */}
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
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="ID"
                                            name="id"
                                            value={formData.id}
                                            onChange={handleInputChange}
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
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="fatherName"
                                            name="FathName"
                                            value={formData.FathName}
                                            onChange={handleInputChange}
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
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleInputChange}
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
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="emerPhone"
                                            name="emergencyPhone"
                                            value={formData.emergencyPhone}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="dropdown" className="block text-sm font-medium leading-6 text-gray-900">Select an option:</label> <br />
                                        <select id="dropdown" className='w-full border p-2 rounded' name='department' value={formData.department} onChange={handleInputChange}>
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
                                            htmlFor="shift"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Shift:
                                        </label>
                                        <input
                                            type="text"
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="shift"
                                            name="shift"
                                            value={formData.shift}
                                            onChange={handleInputChange}
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
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="Name"
                                            name="Name"
                                            value={formData.Name}
                                            onChange={handleInputChange}
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
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="cnic"
                                            name="cnic"
                                            value={formData.cnic}
                                            onChange={handleInputChange}
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
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="reference"
                                            name="reference"
                                            value={formData.reference}
                                            onChange={handleInputChange}
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
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="userID"
                                            name="userName"
                                            value={formData.userName}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="designation"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            Designation:
                                        </label>
                                        <input
                                            type="text"
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="designation"
                                            name="designation"
                                            value={formData.designation}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label
                                            htmlFor="EndDate"
                                            className="block text-sm font-medium leading-6 text-gray-900"
                                        >
                                            End Date:
                                        </label>
                                        <input
                                            type="text"
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="EndDate"
                                            name="EndDate"
                                            value={formData.EndDate}
                                            onChange={handleInputChange}
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
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="joiningDate"
                                            name="joinDate"
                                            value={formData.joinDate}
                                            onChange={handleInputChange}
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
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
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
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleInputChange}
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
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="password"
                                            name="password"
                                            value={formData.password}
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
                                            type="text"
                                            className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                            id="salary"
                                            name="salary"
                                            value={formData.salary}
                                            onChange={handleInputChange}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className='my-5 text-center'>
                                <button
                                    onClick={() => {
                                        handleSubmit();
                                        handleUsers();
                                    }}
                                    className="text-white bg-indigo-500 border-0 py-2 px-9 focus:outline-none hover:bg-indigo-600 rounded">
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

export default WithAuth(EmployeeDetails);