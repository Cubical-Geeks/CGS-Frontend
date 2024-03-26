import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Dashboard from '../Components/Dashboard';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import axios from 'axios';
import WithAuth from '../Components/WithAuth';
import api from '../Components/Api';

const EmployeeDetails = () => {

    const { id } = useParams();

    const [editMode, setEditMode] = useState(false);
    const [selectedOption, setSelectedOption] = useState('Select');
    const [randomNumber, setRandomNumber] = useState("");
    const [employeeData, setEmployeeData] = useState([]);
    const [department, setDepartment] = useState([{ label: "", value: "" }]);
    const [count, setCount] = useState(1);
    const [shift, setShift] = useState([]);
    const [designation, setDesignation] = useState([]);
    const [bank, setBank] = useState([]);


    const [formData, setFormData] = useState({
        id: id ? id : count,
        Name: '',
        joinDate: '',
        FathName: '',
        cnic: '',
        email: '',
        phone: '',
        emergencyPhone: '',
        reference: '',
        address: '',
        userName: '',
        password: '',
        department: '',
        designation: '',
        EndDate: '',
        salary: '',
        shift: '',
        bankName: '',
        accountNum: ''
    });

    // console.log("Params:", id, _name, _joiningDate, _fathersName, _cnic, _email, _phone, _emergencyPhone, _reference, _address, _username, _password, depart_ment, _designation, _StartDate, _EndDate, _salary, _shift, _bank, _accountNumber);

    const handleSelectChange = (e) => {
        setSelectedOption(e.target.value);
    };

    const handleUsers = async () => {
        try {
            console.log("Form Data Department:", formData.department);
            if (formData.department === "Sales") {
                const salesResponse = await axios.post(`${api}/api/salesuser/signup`, {
                    username: formData.userName,
                    password: formData.password
                });
                console.log("Sales Response:", salesResponse.data);
                if (salesResponse.status === 200 && salesResponse.data.success) {
                    console.log("Sales user added");
                }
            } else if (formData.department === "Production-Graphics" || formData.department === "Production-Development") {
                const prodResponse = await axios.post(`${api}/api/productionUser/signup`, {
                    username: formData.userName,
                    password: formData.password
                });
                console.log("Production Response:", prodResponse.data);
                if (prodResponse.status === 200 && prodResponse.data.success) {
                    console.log("Production user added");
                }
            }
            else if (formData.department === "Administration") {
                const adminResponse = await axios.post(`${api}/api/user/signup`, {
                    username: formData.userName,
                    password: formData.password
                });
                console.log("Production Response:", adminResponse.data);
                if (adminResponse.status === 200 && adminResponse.data.success) {
                    console.log("Production user added");
                }
            }
        } catch (error) {
            console.log("Error in handleUsers:", error);
        }
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post(`${api}/api/employee/submit`, {
                id: id ? id : randomNumber,
                name: formData.Name,
                joiningDate: formData.joinDate,
                EndDate: formData.EndDate,
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
                    salary: formData.salary,
                    shift: formData.shift,
                    bank: formData.bankName,
                    accountNumber: formData.accountNum
                }]
            });

            // Check response status and data
            if (response.status === 200 && response.data.success) {
                console.log(response);
                console.log("Data posted Successfully !");
                handleUsers();
                alert("Form posted successfully!");
                setFormData({
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
                    EndDate: "",
                    salary: "",
                    shift: "",
                    bankName: "",
                    accountNum: ""
                })
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
            alert("Error in submitting Employee : ", error.message);
        }
    };

    const handleUpdate = async () => {
        try {
            const updateData = {
                name: formData.Name,
                joiningDate: formData.joinDate,
                EndDate: formData.EndDate,
                fathersName: formData.FathName,
                cnic: formData.cnic,
                email: formData.email,
                phone: formData.phone,
                reference: formData.reference,
                address: formData.address,
                emergencyPhone: formData.emergencyPhone,
                username: formData.userName,
                password: formData.password,
            };

            const response = await axios.put(`${api}/api/employee/update/${id}`, updateData);

            if (response.status === 200 && response.data.success) {
                console.log(response);
                console.log("Data posted Successfully !");
                alert("Form updated successfully!");
            } else {
                console.log("Data posting FAILED!");
            }
        } catch (error) {
            console.log("Error in Updating employee ", error)
            alert("Error in Updating Employee");
        }
    }


    useEffect(() => {
        const getDepartment = async () => {
            try {
                const response = await axios.get(`${api}/dropdown/getDepartment`);
                setDepartment(response.data.data[0]);
                console.log("Response", response.data.data[0]);
            } catch (error) {
                console.log("Error in fetching Project Nature", error)
            }
        };

        const generateRandomId = () => {
            return Math.floor(100000 + Math.random() * 900000);
        }

        const fetchEmployeeData = async () => {
            try {
                const response = await axios.get(
                    `${api}/api/employee/search/${id}`
                );
                setEmployeeData(response.data.data[0]);
                console.log(`fetching employee history of id : ${id}`, response.data.data[0]);
                setFormData(prevState => ({
                    ...prevState,
                    Name: response.data.data[0].name,
                    joinDate: response.data.data[0].joiningDate,
                    EndDate: response.data.data[0].EndDate,
                    FathName: response.data.data[0].fathersName,
                    phone: response.data.data[0].phone,
                    cnic: response.data.data[0].cnic,
                    email: response.data.data[0].email,
                    emergencyPhone: response.data.data[0].emergencyPhone,
                    reference: response.data.data[0].reference,
                    address: response.data.data[0].address,
                    userName: response.data.data[0].username,
                    password: response.data.data[0].password,
                    department: response.data.data[0].history[response.data.data[0].history.length - 1].department,
                    designation: response.data.data[0].history[response.data.data[0].history.length - 1].designation,
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

        const bankFetch = async () => {
            try {
                const response = await axios.get(`${api}/dropdown/getBank`);
                if (response.status === 200 && response.data.success) {
                    setBank(response.data.data[0])
                }
            } catch (error) {
                console.log("Error in designation fetching", error)
            }
        }

        fetchEmployeeData();
        setRandomNumber(generateRandomId());
        getDepartment();
        shiftFetch();
        designationFetch();
        bankFetch();
    }, [])

    console.log("Employee Data : ", employeeData)
    console.log("Departments ", department);

    const [errors, setErrors] = useState({});


    const handleInputChange = (e) => {
        const { name, value } = e.target;
        let newErrors = { ...errors };

        // Validate joining date format
        if (name === 'joinDate' || name === 'EndDate') {
            const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
            if (!dateRegex.test(value)) {
                newErrors[name] = 'Please enter a valid date in the format YYYY-MM-DD';
            } else {
                delete newErrors[name];
            }
        }

        // Update formData and errors state
        setFormData({ ...formData, [name]: value });
        setErrors(newErrors);
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
                            <div className='grid grid-cols-1 md:grid-cols-2'>
                                <h1 className='text-2xl lg:text-4xl font-semibold mb-5'>{id ? "Edit Employee Personal Details" : "Add a new Employee"}</h1>
                                <div className='lg:ms-auto'>
                                    <Link to={`/EmployeeEdit/${id}`}>
                                        <button className="text-white bg-indigo-500 border-0 py-2 px-9 focus:outline-none hover:bg-indigo-600 rounded">
                                            Edit
                                        </button>
                                    </Link>
                                </div>
                            </div>
                            <div className='grid grid-cols-1 lg:grid-cols-3 gap-3'>
                                <div className="mb-3">
                                    <label
                                        htmlFor="ID"
                                        className="block text-sm font-medium leading-6 text-gray-900"
                                    >
                                        ID: <span className='text-red-500'>*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                        id="ID"
                                        name="id"
                                        value={id ? id : randomNumber}
                                        onChange={handleInputChange}
                                    />
                                </div>
                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="Name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Name: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="Name"
                                                name="Name"
                                                value={formData.Name}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="Name"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Name: <span className='text-red-500'>*</span>
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
                                    )
                                }
                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="fatherName"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Father's Name: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="fatherName"
                                                name="FathName"
                                                value={formData.FathName}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="fatherName"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Father's Name: <span className='text-red-500'>*</span>
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
                                    )
                                }
                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="phone"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Phone: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="phone"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="phone"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Phone: <span className='text-red-500'>*</span>
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
                                    )
                                }
                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="emerPhone"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Emergency Phone: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="emerPhone"
                                                name="emergencyPhone"
                                                value={formData.emergencyPhone}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="emerPhone"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Emergency Phone: <span className='text-red-500'>*</span>
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
                                    )
                                }
                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label htmlFor="dropdown" className="block text-sm font-medium leading-6 text-gray-900">Department: <span className='text-red-500'>*</span></label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="department"
                                                name="department"
                                                value={formData.department}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label htmlFor="dropdown" className="block text-sm font-medium leading-6 text-gray-900">Department: <span className='text-red-500'>*</span></label>
                                            <select id="dropdown" className='w-full border p-2 rounded' name='department' value={formData.department} onChange={handleInputChange}>
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
                                                htmlFor="shift"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Shift: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="shift"
                                                name="shift"
                                                value={formData.shift}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
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
                                    )
                                }

                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="cnic"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                CNIC: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="number"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="cnic"
                                                name="cnic"
                                                value={formData.cnic}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="cnic"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                CNIC: <span className='text-red-500'>*</span>
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
                                    )
                                }
                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="reference"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Reference: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="reference"
                                                name="reference"
                                                value={formData.reference}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="reference"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Reference: <span className='text-red-500'>*</span>
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
                                    )
                                }
                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="userID"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Username: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="userID"
                                                name="userName"
                                                value={formData.userName}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="userID"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Username: <span className='text-red-500'>*</span>
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
                                    )
                                }
                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Password: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="password"
                                                name="password"
                                                value={formData.password}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="password"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Password: <span className='text-red-500'>*</span>
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
                                    )
                                }
                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="designation"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Designation: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="designation"
                                                name="designation"
                                                value={formData.designation}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="designation"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Designation: <span className='text-red-500'>*</span>
                                            </label>
                                            <select id="designation" className='w-full border p-2 rounded' name='designation' value={formData.designation} onChange={handleInputChange} >
                                                <option className='m-5' value="">Select</option>
                                                {
                                                    designation.map((item, index) => (
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
                                                htmlFor="joiningDate"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Joining Date: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="joiningDate"
                                                name="joinDate"
                                                placeholder='YYYY-MM-DD'
                                                value={formData.joinDate}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="joiningDate"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Joining Date: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none border-b ps-0 font-semibold placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="joiningDate"
                                                name="joinDate"
                                                placeholder='YYYY-MM-DD'
                                                value={formData.joinDate}
                                                onChange={handleInputChange}
                                            />
                                            {errors.joinDate && <p className="text-red-500 text-xs mt-1">{errors.joinDate}</p>}
                                        </div>
                                    )
                                }

                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="EndDate"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                End Date:
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="EndDate"
                                                name="EndDate"
                                                value={formData.EndDate}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
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
                                                placeholder='YYYY-MM-DD'
                                                value={formData.EndDate}
                                                onChange={handleInputChange}
                                            />
                                            {errors.EndDate && <p className="text-red-500 text-xs mt-1">{errors.EndDate}</p>}
                                        </div>
                                    )
                                }

                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Email: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="email"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="email"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Email: <span className='text-red-500'>*</span>
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
                                    )
                                }
                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="address"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Address: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="address"
                                                name="address"
                                                value={formData.address}
                                                onChange={handleInputChange}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="address"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Address: <span className='text-red-500'>*</span>
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
                                    )
                                }

                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="salary"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Salary: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="salary"
                                                name="salary"
                                                value={formData.salary}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="salary"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Salary: <span className='text-red-500'>*</span>
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
                                    )
                                }

                                {
                                    id ? (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="bankName"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Bank: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-500 focus:outline-none border-b ps-0 placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                id="bankName"
                                                name="bankName"
                                                value={formData.bankName}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="bankName"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Bank: <span className='text-red-500'>*</span>
                                            </label>
                                            <select id="bankName" className='w-full border p-2 rounded' name='bankName' value={formData.bankName} onChange={handleInputChange} >
                                                <option className='m-5' value="">Select</option>
                                                {
                                                    bank.filter(item => item.label.toLowerCase().startsWith(formData.bankName.toLowerCase())).map((item, index) => (
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
                                                htmlFor="accountNum"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Account: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`block w-full rounded-md border-0 py-1.5 pr-20 text-gray-500 focus:outline-none ring-gray-300 border-b placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                                id="accountNum"
                                                name="accountNum"
                                                value={formData.accountNum}
                                                readOnly={true}
                                            />
                                        </div>
                                    ) : (
                                        <div className="mb-3">
                                            <label
                                                htmlFor="accountNum"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Account: <span className='text-red-500'>*</span>
                                            </label>
                                            <input
                                                type="text"
                                                className={`block w-full rounded-md border-0 py-1.5 pr-20 text-gray-900 font-semibold focus:outline-none ring-gray-300 border-b placeholder:text-gray-400 sm:text-sm sm:leading-6`}
                                                id="accountNum"
                                                name="accountNum"
                                                value={formData.accountNum}
                                                onChange={handleInputChange}
                                            />
                                        </div>
                                    )
                                }

                            </div>
                            <div className='my-5 text-center'>
                                {id ? null : (
                                    <button
                                        onClick={() => handleSubmit()}
                                        className="text-white bg-indigo-500 border-0 py-2 px-9 focus:outline-none hover:bg-indigo-600 rounded">
                                        Submit
                                    </button>
                                )}

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