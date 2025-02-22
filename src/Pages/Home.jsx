import React from 'react';
import SideBar from '../Components/HomeComponents/SideBar';
import { Outlet } from 'react-router-dom';
import NavBar from '../Components/HomeComponents/NavBar';


const Home = () => {
    return (
        <div className='lg:flex bg-gray-900 dark:text-white'>
            <SideBar></SideBar> 
            <NavBar></NavBar>
             <Outlet></Outlet>
        </div>
    );
};

export default Home;