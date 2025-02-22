import React from 'react';
import SideBar from '../Components/HomeComponents/SideBar';
import { Outlet } from 'react-router-dom';


const Home = () => {
    return (
        <div className='flex gap-5 h-screen text-white p-4 relative bg-gray-950'>
            <div className='w-1/6 border rounded border-gray-200 p-4 flex flex-col justify-between'><SideBar></SideBar> </div>
            <div className='w-5/6 border rounded border-gray-200 p-4'> <Outlet></Outlet></div>
        </div>
    );
};

export default Home;