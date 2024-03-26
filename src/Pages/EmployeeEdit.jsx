import React, { useEffect, useState } from 'react'
import Dashboard from '../Components/Dashboard'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import axios from 'axios'
import api from '../Components/Api'
import { useParams } from 'react-router-dom'

const EmployeeEdit = () => {

    const { id } = useParams();

    const [formData, setFormData] = useState({
        id: '',
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

    const [employeeData, setEmployeeData] = useState([]);
    const [department, setDepartment] = useState([{ label: "", value: "" }]);
    const [shift, setShift] = useState([]);
    const [designation, setDesignation] = useState([]);
    const [bank, setBank] = useState([]);

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
        getDepartment();
        shiftFetch();
        designationFetch();
        bankFetch();
    }, [])

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

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    };

    return (
        <>
            <div className='flex'>
                <div>
                    <Dashboard />
                </div>
                <div className='container flex flex-col justify-between'>
                    <div>
                        <Navbar />
                        <div className="pt-10 px-5">
                            <div className='my-4'>
                                <h1 className='text-2xl lg:text-4xl font-semibold mb-5'>Edit Employee Personal Details</h1>
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
                                        value={id}
                                        onChange={handleInputChange}
                                        readOnly={true}
                                    />
                                </div>
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
                                        placeholder='YYYY-MM-DD'
                                        value={formData.EndDate}
                                        onChange={handleInputChange}
                                    />
                                </div>

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

                            </div>
                            <div className='my-5 text-center'>
                                <button
                                    onClick={handleUpdate}
                                    className="text-white bg-indigo-500 border-0 py-2 px-9 focus:outline-none hover:bg-indigo-600 rounded">
                                    Update
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

export default EmployeeEdit