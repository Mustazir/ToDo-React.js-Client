import React from 'react';
import Card from '../../Components/HomeComponents/Card';

const IncompleteTask = () => {
    return (
        <div>
            <Card home='false' filterStatus="Incomplete"></Card>
        </div>
    );
};

export default IncompleteTask;