import React from 'react';
import SideBar from '../Components/HomeComponents/SideBar';


const Home = () => {
    return (
        <div className='flex gap-5 h-[98vh] '>
            <div className='w-1/6 border rounded border-gray-200 p-4 flex flex-col justify-between'><SideBar></SideBar> </div>
            <div className='w-5/6 border rounded border-gray-200 p-4'> hello</div>
        </div>
    );
};

export default Home;