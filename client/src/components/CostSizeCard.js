import React, { useState, useEffect } from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const CostAndSizeCard = ({ title, costAndSizeData, pieChartColors, givenTime, activeCount }) => {
    const [formattedTime, setFormattedTime] = useState('');

    useEffect(() => {
        setFormattedTime(handleFormatChange(givenTime));
    }, [givenTime]);

    const handleFormatChange = (e) => {
        const [datePart, timePart] = e.split(' ');
        const [day, month, year] = datePart.split(':');
        const formattedDate = `${day}/${month}/20${year}`;
        return `${formattedDate} ${timePart}`;
    };

    const prepareChartData = (data, valueKey, colors) => {
        const labels = Object.keys(data);
        const values = labels.map((key) => data[key][valueKey]);

        return {
            labels,
            datasets: [
                {
                    label: valueKey === 'cost_projected' ? 'Cost Projected' : 'Size on Disk',
                    data: values,
                    backgroundColor: colors, // Use provided colors directly
                },
            ],
        };
    };

    const getSegmentColors = (labels, baseColor) => {
        const segmentColors = labels.map((_, index) => {
            switch (index % 3) {
                case 0:
                    return baseColor;
                case 1:
                    return '#91DDCF'; // Light green
                case 2:
                    return '#FFC700'; // Gold
                default:
                    return baseColor;
            }
        });

        return segmentColors;
    };

    return (
        <div style={{ flex: '0 0 30%', margin: '0 10px', marginBottom: '20px' }}>
            <div style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff', width: '100%' }}>
                <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '20px', color: '#333', textAlign: 'center' }}>{title}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginBottom: '20px', width: '100%' }}>
                            <h4 style={{ textAlign: 'center', marginBottom: '10px', fontWeight: '600', fontSize: '18px' }}>Cost</h4>
                            <ul style={{ listStyle: 'none', paddingLeft: 0, textAlign: 'center' }}>
                                <p style={{ fontSize: '15px' }}>
                                    Given Time - {formattedTime}
                                    <br />
                                    Total Active Count - {activeCount}
                                    <br />
                                </p>
                                {Object.entries(costAndSizeData).map(([name, { cost_projected }]) => (
                                    <li key={name} style={{ marginTop: '8px', marginBottom: '5px', color: '#333', fontSize: '16px' }}>
                                        {name}: ${cost_projected.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                            <div style={{ width: '80%', margin: '0 auto', height: '300px' }}>
                                <Pie data={prepareChartData(costAndSizeData, 'cost_projected', pieChartColors)} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', width: '100%' }}>
                            <h4 style={{ textAlign: 'center', marginBottom: '10px', fontWeight: '600', fontSize: '18px' }}>Size</h4>
                            <ul style={{ listStyle: 'none', paddingLeft: 0, textAlign: 'center' }}>
                                <p style={{ fontSize: '15px' }}>
                                    Given Time - {formattedTime}
                                    <br />
                                    Total Active Count - {activeCount}
                                    <br />
                                </p>
                                {Object.entries(costAndSizeData).map(([name, { size_on_disk }]) => (
                                    <li key={name} style={{ marginTop: '8px', marginBottom: '5px', color: '#333' }}>
                                        {name}: {size_on_disk.toFixed(2)} GB
                                    </li>
                                ))}
                            </ul>
                            <div style={{ width: '80%', margin: '0 auto', height: '300px' }}>
                                <Pie data={prepareChartData(costAndSizeData, 'size_on_disk', pieChartColors)} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostAndSizeCard;
