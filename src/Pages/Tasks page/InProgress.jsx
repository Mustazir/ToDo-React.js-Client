import React from 'react';
import Card from '../../Components/HomeComponents/Card';

const InProgress = () => {
    return (
        <div className='mx-auto p-8'>
            <Card home='false' filterStatus="In Progress"></Card>
        </div>
    );
};

export default InProgress;