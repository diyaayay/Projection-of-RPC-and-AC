import React, { useState } from 'react';


const AddSchedule = ({ onSave,onCancel}) => {
    const [frequency, setFrequency] = useState('Hourly');
    const [backupFrequency, setBackupFrequency] = useState({ value: '', unit: 'hours' });
    const [timeRangeStart, setTimeRangeStart] = useState('');
    const [timeRangeEnd, setTimeRangeEnd] = useState('');
    const [retainFor, setRetainFor] = useState({ value: '', unit: 'hours' });

    const handleSave = () => {
        console.log('Saved!');
        onSave({
            frequency,
            backupFrequency,
            timeRangeStart,
            timeRangeEnd,
            retainFor
        });
    };

    const handleCancel = () => {
        console.log('Cancelled!');
        onCancel()
    };
    const handleFrequencyChange = (e) => {
        setFrequency(e.target.value);
    };

    const handleBackupFrequencyChange = (e) => {
        setBackupFrequency({ ...backupFrequency, value: e.target.value });
    };

    const handleBackupFrequencyUnitChange = (e) => {
        setBackupFrequency({ ...backupFrequency, unit: e.target.value });
    };

    const handleTimeRangeStartChange = (e) => {
        setTimeRangeStart(e.target.value);
    };

    const handleTimeRangeEndChange = (e) => {
        setTimeRangeEnd(e.target.value);
    };

    const handleRetainForChange = (e) => {
        setRetainFor({ ...retainFor, value: e.target.value });
    };

    const handleRetainForUnitChange = (e) => {
        setRetainFor({ ...retainFor, unit: e.target.value });
    };

    return (
        <div className="form-container">
            <label htmlFor="frequency">Frequency:</label>
            <select id="frequency" value={frequency} onChange={handleFrequencyChange}>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
            </select>

            <label htmlFor="backupFrequency">Backup Frequency:</label>
            <input type="number" id="backupFrequency" value={backupFrequency.value} onChange={handleBackupFrequencyChange} />
            <select value={backupFrequency.unit} onChange={handleBackupFrequencyUnitChange}>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
            </select>

            <label htmlFor="timeRange">Time Range:</label>
            <input type="time" id="timeRangeStart" value={timeRangeStart} onChange={handleTimeRangeStartChange} />
            <span> to </span>
            <input type="time" id="timeRangeEnd" value={timeRangeEnd} onChange={handleTimeRangeEndChange} />

            <label htmlFor="retainFor">Retain For:</label>
            <input type="number" id="retainFor" value={retainFor.value} onChange={handleRetainForChange} />
            <select value={retainFor.unit} onChange={handleRetainForUnitChange}>
                <option value="hours">Hours</option>
                <option value="days">Days</option>
                <option value="weeks">Weeks</option>
            </select>

            <div className="button-group">
                <button onClick={handleCancel}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </div>

        </div>

    );
};

export default AddSchedule;