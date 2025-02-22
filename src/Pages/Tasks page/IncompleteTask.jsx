import React from 'react';
import Card from '../../Components/HomeComponents/Card';

const IncompleteTask = () => {
    return (
        <div className='mx-auto flex flex-col items-center'>
            <h1 className='mt-2 uppercase bg-gray-700 w-fit px-4 text-2xl rounded-xl font-bold py-1' >Incomplete Task</h1>
            <Card home='false' filterStatus="Incomplete"></Card>
        </div>
    );
};

export default IncompleteTask;