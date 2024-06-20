import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';
import DateTimeForm from '../components/DateTime';
import BackupCard from '../components/BackUpCard';
import CostAndSizeCard from '../components/CostSizeCard';
import PolicyTree from "../components/PolicyTree";
import ScatterChart from "../components/ScatterChart";

const Dashboard = () => {
    const [customDate, setCustomDate] = useState('');
    const [resData, setResData] = useState(null);
    const [policyName, setPolicyName] = useState('');
    const [projectionRun, setProjectionRun] = useState([]);

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
        console.log(date.toISOString());
        const isoString = date.toISOString();
        const customFormattedDateTime = convertToCustomFormat(isoString);
        setCustomDate(customFormattedDateTime);
    };

    const handlePolicyNameChange = (name) => {
        setPolicyName(name);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/givenTime', {
                givenTime: customDate,
                policyName: policyName
            });
            setResData(res.data);
        } catch (err) {
            console.error(err);
        }
        try {
            const tableRes = await axios.post('/get_overlaps', {
                givenTime: customDate,
                policyName: policyName
            });
            setProjectionRun(tableRes.data);
        } catch (err) {
            console.log(err);
        }
    };

    const calculateTotalCount = (data) => {
        return data ? Object.values(data).reduce((total, count) => total + count, 0) : 0;
    };

    const projectionRunColors = {
        SNAPSHOT: [ '#4682B4','#87CEEB'],
        BACKUP: [ '#3CB371', '#98FB98',],
        CLOUD_BACKUP: ['#FF8C00','#FFD700' ]
    };

    const cardStyle = {
        flex: '0 0 30%',
        margin: '0 10px',
        marginBottom: '20px',
        minWidth: '300px',
        maxWidth: '300px',
        height: '450px',
    };

    return (
        <>
            <Navbar />
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '20px', backgroundColor: '#f5f7fa' }}>
                <DateTimeForm dateTime={customDate} handleDateTimeChange={handleDateTimeChange} handleSubmit={handleSubmit} policyName={policyName} handlePolicyNameChange={handlePolicyNameChange} />

                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around', marginTop: '20px', width: '100%' }}>
                    <BackupCard
                        title="Array Snapshots"
                        projectionData={resData?.projectionRun.SNAPSHOT}
                        activeData={resData?.Active.SNAPSHOT}
                        projectionTotal={calculateTotalCount(resData?.projectionRun.SNAPSHOT)}
                        activeTotal={calculateTotalCount(resData?.Active.SNAPSHOT)}
                        projectionColor={projectionRunColors.SNAPSHOT[0]}
                        activeColor={projectionRunColors.SNAPSHOT[1]}
                        style={cardStyle}
                    />

                    <BackupCard
                        title="On-Premises Backups"
                        projectionData={resData?.projectionRun.BACKUP}
                        activeData={resData?.Active.BACKUP}
                        projectionTotal={calculateTotalCount(resData?.projectionRun.BACKUP)}
                        activeTotal={calculateTotalCount(resData?.Active.BACKUP)}
                        projectionColor={projectionRunColors.BACKUP[0]}
                        activeColor={projectionRunColors.BACKUP[1]}
                        style={cardStyle}
                    />

                    <BackupCard
                        title="Cloud Backups"
                        projectionData={resData?.projectionRun.CLOUD_BACKUP}
                        activeData={resData?.Active.CLOUD_BACKUP}
                        projectionTotal={calculateTotalCount(resData?.projectionRun.CLOUD_BACKUP)}
                        activeTotal={calculateTotalCount(resData?.Active.CLOUD_BACKUP)}
                        projectionColor={projectionRunColors.CLOUD_BACKUP[0]}
                        activeColor={projectionRunColors.CLOUD_BACKUP[1]}
                        style={cardStyle}
                    />
                </div>

                <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'nowrap', justifyContent: 'space-between', marginTop: '20px', width: '100%' }}>
                    <CostAndSizeCard
                        title="Array Snapshots"
                        costAndSizeData={Object.fromEntries(Object.entries(resData?.CostAndSize || {}).filter(([key, value]) => value.type === 'SNAPSHOT'))}
                        pieChartColors={[projectionRunColors.SNAPSHOT[0], projectionRunColors.SNAPSHOT[1]]}
                        style={cardStyle}
                        givenTime={customDate}
                        activeCount={calculateTotalCount(resData?.Active.SNAPSHOT)}
                    />

                    <CostAndSizeCard
                        title="On-Premises Backups"
                        costAndSizeData={Object.fromEntries(Object.entries(resData?.CostAndSize || {}).filter(([key, value]) => value.type === 'BACKUP'))}
                        pieChartColors={[projectionRunColors.BACKUP[0], projectionRunColors.BACKUP[1]]}
                        style={cardStyle}
                        givenTime={customDate}
                        activeCount={calculateTotalCount(resData?.Active.BACKUP)}
                    />

                    <CostAndSizeCard
                        title="Cloud Backups"
                        costAndSizeData={Object.fromEntries(Object.entries(resData?.CostAndSize || {}).filter(([key, value]) => value.type === 'CLOUD_BACKUP'))}
                        pieChartColors={[projectionRunColors.CLOUD_BACKUP[0], projectionRunColors.CLOUD_BACKUP[1]]}
                        style={cardStyle}
                        givenTime={customDate}
                        activeCount={calculateTotalCount(resData?.Active.CLOUD_BACKUP)}
                    />
                </div>
            </div>
            <div><ScatterChart data={projectionRun} /></div>
            {policyName ? <div><PolicyTree policy={policyName} /></div> : <h2>Policy Tree</h2>}
        </>
    );
};

export default Dashboard;
