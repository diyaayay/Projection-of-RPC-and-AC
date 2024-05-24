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
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', backgroundColor: '#f5f7fa' }}>
                <DateTimeForm dateTime={dateTime} handleDateTimeChange={handleDateTimeChange} handleSubmit={handleSubmit} />

                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px', width: '100%' }}>
                    <BackupCard
                        title="Array Snapshots"
                        projectionData={resData?.projectionRun.SNAPSHOT}
                        activeData={resData?.Active.SNAPSHOT}
                        projectionTotal={calculateTotalCount(resData?.projectionRun.SNAPSHOT)}
                        activeTotal={calculateTotalCount(resData?.Active.SNAPSHOT)}
                        projectionColor="#87CEEB"
                        activeColor="#4682B4"
                    />

                    <BackupCard
                        title="On-Premises Backups"
                        projectionData={resData?.projectionRun.BACKUP}
                        activeData={resData?.Active.BACKUP}
                        projectionTotal={calculateTotalCount(resData?.projectionRun.BACKUP)}
                        activeTotal={calculateTotalCount(resData?.Active.BACKUP)}
                        projectionColor="#98FB98"
                        activeColor="#3CB371"
                    />

                    <BackupCard
                        title="Cloud Backups"
                        projectionData={resData?.projectionRun.CLOUD_BACKUP}
                        activeData={resData?.Active.CLOUD_BACKUP}
                        projectionTotal={calculateTotalCount(resData?.projectionRun.CLOUD_BACKUP)}
                        activeTotal={calculateTotalCount(resData?.Active.CLOUD_BACKUP)}
                        projectionColor="#FFD700"
                        activeColor="#FF8C00"
                    />
                </div>
            </div>
        </>
    );
};

export default Dashboard;
