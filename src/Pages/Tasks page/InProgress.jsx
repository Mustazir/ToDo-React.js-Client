import React from 'react';
import Card from '../../Components/HomeComponents/Card';

const InProgress = () => {
    return (
        <div className='mx-auto flex flex-col items-center '>
            <h1 className='mt-2 uppercase border w-fit px-4 text-2xl rounded-xl font-bold py-1' >In Progress</h1>
            <Card home='false' filterStatus="In Progress"></Card>
        </div>
    );
};

export default InProgress;