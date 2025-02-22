import React from 'react';
import Card from '../../Components/HomeComponents/Card';

const IncompleteTask = () => {
    return (
        <div className='mx-auto p-8'>
            <Card home='false' filterStatus="Incomplete"></Card>
        </div>
    );
};

export default IncompleteTask;