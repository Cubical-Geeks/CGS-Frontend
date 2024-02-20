import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../Components/Footer';
import { LogIn } from 'lucide-react';

const LandingPage = () => {
    const landingPage = [
        {
            Name: "Admin Panel",
            Description: "Manage all aspects of your system with ease.",
            Users: 5,
            page: "/Login"
        },
        {
            Name: "Sales Person",
            Description: "Boost sales and track your team's performance.",
            Users: 8,
            page: "/SalesLogin"
        },
        {
            Name: "Production",
            Description: "Efficiently handle production processes and workflows.",
            Users: 10,
            page: "/ProductionLogin"
        },
    ];

    return (
        <div className='px-10'>
            <div className='flex flex-col justify-between h-[100vh]'>
                <div className='mx-auto w-max py-10'>
                    <h1 className='text-3xl lg:text-6xl font-semibold text-slate-700 text-center'>
                        Cubical Geeks Management System
                    </h1>
                    <div className='my-10'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                            {landingPage.map((item, index) => (
                                <Link key={index} to={item.page}>
                                    <div className='p-5 rounded-lg bg-indigo-500 transition transform hover:scale-105 hover:shadow-lg'>
                                        <div className='flex flex-col justify-between h-[250px] text-white'>
                                            <div>
                                                <h3 className='text-2xl font-bold'>{item.Name}</h3>
                                                <p className='text-md my-4'>{item.Description}</p>
                                            </div>
                                            <div className='text-xl'>Users: {item.Users}</div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <Footer />
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
