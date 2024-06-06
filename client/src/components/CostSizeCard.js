import React from 'react';
import { Pie } from 'react-chartjs-2';
import 'chart.js/auto';

const CostAndSizeCard = ({ title, costAndSizeData, pieChartColors }) => {
    const prepareCostChartData = (data) => {
        const labels = Object.keys(data);
        const costs = labels.map((key) => data[key].cost_projected);

        return {
            labels,
            datasets: [
                {
                    label: 'Cost Projected',
                    data: costs,
                    backgroundColor: pieChartColors,
                },
            ],
        };
    };

    const prepareSizeChartData = (data) => {
        const labels = Object.keys(data);
        const sizes = labels.map((key) => data[key].size_on_disk);

        return {
            labels,
            datasets: [
                {
                    label: 'Size on Disk',
                    data: sizes,
                    backgroundColor: pieChartColors,
                },
            ],
        };
    };

    return (
        <div style={{ flex: '0 0 45%', marginBottom: '20px' }}>
            <div style={{ boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff', width: '100%' }}>
                <div style={{ padding: '24px' }}>
                    <h3 style={{ fontSize: '22px', marginBottom: '20px', color: '#333', textAlign: 'center' }}>{title}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div style={{ marginBottom: '20px', width: '100%' }}>
                            <h4 style={{ color: '#555', textAlign: 'center', marginBottom: '10px' }}>Cost</h4>
                            <ul style={{ listStyle: 'none', paddingLeft: 0, textAlign: 'center' }}>
                                {Object.entries(costAndSizeData).map(([name, { cost_projected }]) => (
                                    <li key={name} style={{ marginTop: '8px', marginBottom: '5px', color: '#333' }}>
                                        {name}: ${cost_projected.toFixed(2)}
                                    </li>
                                ))}
                            </ul>
                            <div style={{ width: '80%', margin: '0 auto', height: '300px' }}>
                                <Pie data={prepareCostChartData(costAndSizeData)} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                        <div style={{ marginTop: '20px', width: '100%' }}>
                            <h4 style={{ color: '#555', textAlign: 'center', marginBottom: '10px' }}>Size</h4>
                            <ul style={{ listStyle: 'none', paddingLeft: 0, textAlign: 'center' }}>
                                {Object.entries(costAndSizeData).map(([name, { size_on_disk }]) => (
                                    <li key={name} style={{ marginTop: '8px', marginBottom: '5px', color: '#333' }}>
                                        {name}: {size_on_disk.toFixed(2)} GB
                                    </li>
                                ))}
                            </ul>
                            <div style={{ width: '80%', margin: '0 auto', height: '300px' }}>
                                <Pie data={prepareSizeChartData(costAndSizeData)} options={{ maintainAspectRatio: false }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CostAndSizeCard;
