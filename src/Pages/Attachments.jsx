import React, { useState } from 'react'
import ProductionDashboard from '../Components/ProductionDashboard'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { IoIosSend } from 'react-icons/io'

const Attachments = () => {

    const [formData, setFormData] = useState({
        title: "",
        attachment: "",
        description: ""
    });
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <div className='flex'>
                <div>
                    <ProductionDashboard />
                </div>
                <div className='container flex flex-col justify-between'>
                    <div>
                        <Navbar />
                        <div className='py-10 px-5'>
                            <h1 className='text-2xl md:text-3xl lg:text-4xl lg:font-semibold text-slate-500 my-5'>Module Description</h1>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                                {/* attachments */}
                                <div>
                                    <form>
                                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-3'>
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="title"
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
                                            <div className="mb-3">
                                                <label
                                                    htmlFor="attachment"
                                                    className="block text-sm font-medium leading-6 text-gray-900"
                                                >
                                                    Attachment:
                                                </label>
                                                <input
                                                    type="file"
                                                    className={"block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                    id="attachment"
                                                    name="attachment"
                                                    value={formData.attachment}
                                                    onChange={handleInputChange}

                                                />
                                            </div>
                                        </div>
                                        <div className="mb-3">
                                            <label
                                                htmlFor="description"
                                                className="block text-sm font-medium leading-6 text-gray-900"
                                            >
                                                Description:
                                            </label>
                                            <textarea
                                                className={"block w-full h-[100px] rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 focus:outline-none ring-gray-300 ring-1 ring-inset placeholder:text-gray-400 sm:text-sm sm:leading-6"}
                                                name="description"
                                                id="description"
                                                value={formData.description}
                                                onChange={handleInputChange}

                                            ></textarea>
                                        </div>
                                        <div className="flex justify-center my-10">
                                            <button className="text-white w-full lg:w-1/3 bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                                                Submit
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* chat */}
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
    )
}

export default Attachments