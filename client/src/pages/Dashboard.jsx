import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import DateTimeForm from '../components/DateTime';
import BackupCard from '../components/BackUpCard';

const Dashboard = () => {
    const [dateTime, setDateTime] = useState('');
    const [customDate, setCustomDate] = useState('');
    const [resData, setResData] = useState(null);

    const convertToCustomFormat = (isoString) => {
        const dateObj = new Date(isoString);
        const day = String(dateObj.getDate()).padStart(2, '0');
        const month = String(dateObj.getMonth() + 1).padStart(2, '0');
        const year = String(dateObj.getFullYear()).slice(2);
        const hours = String(dateObj.getHours()).padStart(2, '0');
        const minutes = String(dateObj.getMinutes()).padStart(2, '0');
        return `${day}:${month}:${year} ${hours}:${minutes}`;
    };

    const handleDateTimeChange = (date) => {
        const isoString = date.toISOString();
        const customFormattedDateTime = convertToCustomFormat(isoString);
        setCustomDate(customFormattedDateTime);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/givenTime', {
                givenTime: customDate,
            });
            setResData(res.data);
            console.log(res.data);
        } catch (err) {
            console.log(err);
        }
    };

    const calculateTotalCount = (data) => {
        return data ? Object.values(data).reduce((total, count) => total + count, 0) : 0;
    };

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '140vh', padding: '20px', backgroundColor: '#f5f7fa' }}>
                <DateTimeForm dateTime={dateTime} handleDateTimeChange={handleDateTimeChange} handleSubmit={handleSubmit} />

                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <BackupCard
                        title="Array Snapshots"
                        color="#007bff"
                        data={resData?.SNAPSHOT}
                        totalCount={calculateTotalCount(resData?.SNAPSHOT)}
                    />

                    <BackupCard
                        title="On-Premises Backups"
                        color="#28a745"
                        data={resData?.BACKUP}
                        totalCount={calculateTotalCount(resData?.BACKUP)}
                    />

                    <BackupCard
                        title="Cloud Backups"
                        color="#ffc107"
                        data={resData?.CLOUD_BACKUP}
                        totalCount={calculateTotalCount(resData?.CLOUD_BACKUP)}
                    />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
