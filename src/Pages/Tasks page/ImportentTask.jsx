import React from 'react';
import Card from '../../Components/HomeComponents/Card';

const ImportentTask = () => {
    return (
        <div className='mx-auto p-8'>
            <Card home='false' filterImportant={true}></Card>
        </div>
    );
};

export default ImportentTask;