    import React, { useState } from 'react';
    import './styles.css'; // Import CSS file for styles

    // Example data
    const categories = [
        { id: 1, name: "SNAPSHOT" },
        { id: 2, name: "BACKUP" },
        { id: 3, name: "CLOUD_BACKUP" },
        { id: 4, name: "SNAPSHOT" },
        { id: 5, name: "BACKUP" },
        { id: 6, name: "CLOUD_BACKUP" },
    ];

    const occurrences = [
        {
            "current_id": 1,
            "current_time": "2024-04-08 02:00",
            "source_id": "None",
            "source_time": "None"
        },
        {
            "current_id": 2,
            "current_time": "2024-04-08 05:00",
            "source_id": 1,
            "source_time": "2024-04-08 02:00"
        },
        {
            "current_id": 1,
            "current_time": "2024-04-08 06:00",
            "source_id": "None",
            "source_time": "None"
        },
        {
            "current_id": 3,
            "current_time": "2024-04-08 06:00",
            "source_id": 2,
            "source_time": "2024-04-08 05:00"
        },
        {
            "current_id": 1,
            "current_time": "2024-04-08 10:00",
            "source_id": "None",
            "source_time": "None"
        },
        {
            "current_id": 1,
            "current_time": "2024-04-08 14:00",
            "source_id": "None",
            "source_time": "None"
        },
        {
            "current_id": 2,
            "current_time": "2024-04-08 17:00",
            "source_id": 1,
            "source_time": "2024-04-08 14:00"
        },
        {
            "current_id": 1,
            "current_time": "2024-04-08 18:00",
            "source_id": "None",
            "source_time": "None"
        },
        {
            "current_id": 1,
            "current_time": "2024-04-08 22:00",
            "source_id": "None",
            "source_time": "None"
        },
        {
            "current_id": 1,
            "current_time": "2024-04-09 02:00",
            "source_id": "None",
            "source_time": "None"
        },
        {
            "current_id": 2,
            "current_time": "2024-04-09 05:00",
            "source_id": 1,
            "source_time": "2024-04-09 02:00"
        },
        {
            "current_id": 1,
            "current_time": "2024-04-09 06:00",
            "source_id": "None",
            "source_time": "None"
        },
        {
            "current_id": 3,
            "current_time": "2024-04-09 06:00",
            "source_id": 2,
            "source_time": "2024-04-09 05:00"
        }
    ];

    // Function to get color based on category name
    const getCategoryColor = (categoryName) => {
        switch (categoryName) {
            case "SNAPSHOT":
                return "#0000FF"; // Blue
            case "BACKUP":
                return "#01A982"; // Green
            case "CLOUD_BACKUP":
                return "#FFFF00"; // Yellow
            default:
                return "#000000"; // Default to black
        }
    };

    // Grid component
    function Grid({ categories, timeIntervals, occurrences, onCellHover }) {
        return (
            <div className="grid-container">
                <div className="grid">
                    <div className="grid-row">
                        <div className="grid-cell header fixed-cell">Category</div>
                        <div className="grid-cell header fixed-cell-2">IDs</div>
                        {timeIntervals.map((interval, index) => (
                            <div key={index} className="grid-cell header time">
                                {interval.startTime}
                            </div>
                        ))}
                    </div>

                    {categories.map(category => {
                        if (category.name !== "SNAPSHOT" && category.name !== "BACKUP" && category.name !== "CLOUD_BACKUP") {
                            return null; // Skip categories other than SNAPSHOT, BACKUP, and CLOUD_BACKUP
                        }
                        return (
                            <div key={category.id} className="grid-row">
                                <div className="grid-cell header fixed-cell">{category.name}</div>
                                <div className="grid-cell header fixed-cell-2">{category.id}</div> {/* Displaying the schedule ID */}
                                {timeIntervals.map(timeInterval => {
                                    const occurrencesInCell = occurrences.filter(occurrence =>
                                        occurrence.current_id === category.id &&
                                        occurrence.current_time.includes(timeInterval.startTime)
                                    );
                                    return (
                                        <div
                                            key={timeInterval.startTime}
                                            className="grid-cell"
                                            onMouseEnter={() => onCellHover(category.id, timeInterval.startTime, occurrencesInCell)}
                                        >
                                            {occurrencesInCell.map((occurrence, index) => (
                                                <div
                                                    key={index}
                                                    className="circle"
                                                >
                                                    <svg width="20" height="20">
                                                        <circle cx="10" cy="10" r="5" fill={getCategoryColor(category.name)} />
                                                    </svg>
                                                </div>
                                            ))}
                                        </div>
                                    );
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        );
    }

    function BackupScheduleVisualization() {
        const [currentSchedule, setCurrentSchedule] = useState(null);
        const [startDate, setStartDate] = useState("");
        const [endDate, setEndDate] = useState("");
        const [filteredOccurrences, setFilteredOccurrences] = useState([]);
    
        const handleCellHover = (currentId, currentTime, occurrencesInCell) => {
            const occurrenceDetails = occurrencesInCell.map(occurrence => ({
                scheduleId: occurrence.current_id,
                scheduleTime: occurrence.current_time,
                sourceScheduleId: occurrence.source_id,
                sourceScheduleTime: occurrence.source_time,
            }));
            setCurrentSchedule({ currentId, currentTime, occurrenceDetails });
        };
    
        const handleFilter = () => {
            if (startDate && endDate) {
                const start = new Date(startDate);
                const end = new Date(endDate);
                const filtered = occurrences.filter(occurrence => {
                    const occurrenceTime = new Date(occurrence.current_time);
                    return occurrenceTime >= start && occurrenceTime <= end;
                });
                setFilteredOccurrences(filtered);
            }
        };
    
        const timeIntervals = [...new Set(filteredOccurrences.map(occurrence => occurrence.current_time))].map(time => ({
            startTime: time
        }));
    
        return (
            <div className="visualization">
                <h2>Backup Schedule Visualization</h2>
                <div className="date-time-input">
                    <label>
                        Start Date and Time:
                        <input
                            type="datetime-local"
                            value={startDate}
                            onChange={(e) => setStartDate(e.target.value)}
                        />
                    </label>
                    <label>
                        End Date and Time:
                        <input
                            type="datetime-local"
                            value={endDate}
                            onChange={(e) => setEndDate(e.target.value)}
                        />
                    </label>
                    <button className="filter-button" onClick={handleFilter}>Filter</button>
                </div>
                {startDate && endDate && (
                    <>
                        <Grid categories={categories} timeIntervals={timeIntervals} occurrences={filteredOccurrences} onCellHover={handleCellHover} />
                        {/* Displaying the schedule details below the table */}
                        {currentSchedule && (
                            <div className="details">
                                <h3 className="heading">SCHEDULE DETAILS</h3>
                                {currentSchedule.occurrenceDetails.map((detail, index) => (
                                    <div key={index} className="detail">
                                        <div>Schedule ID: {detail.scheduleId}</div>
                                        <div>Schedule Time: {detail.scheduleTime}</div>
                                        <div>Source Schedule ID: {detail.sourceScheduleId}</div>
                                        <div>Source Schedule Time: {detail.sourceScheduleTime}</div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </>
                )}
            </div>
        );
    }
    

    export default BackupScheduleVisualization;
