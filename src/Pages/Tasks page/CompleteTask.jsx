import React from 'react';
import Card from '../../Components/HomeComponents/Card';

const CompleteTask = () => {
    return (
        <div>
            <Card home='false' filterStatus="Completed"></Card>
        </div>
    );
};

export default CompleteTask;