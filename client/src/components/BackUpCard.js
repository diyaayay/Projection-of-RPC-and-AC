import React from 'react';

const BackupCard = ({ title, projectionData, activeData, projectionTotal, activeTotal, projectionColor, activeColor }) => {
    return (
        <div style={{ flex: '0 0 30%', marginBottom: '20px' }}>
            <div style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff', width: '100%' }}>
                <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <h3 style={{ fontSize: '19px', marginBottom: '12px', color: '#333' }}>{title}</h3>
                        <ul style={{ listStyle: 'none', paddingLeft: 0, width: '100%' }}>
                            <li style={{ marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>Projection Run</li>
                            {projectionData && Object.entries(projectionData).map(([name, count]) => (
                                <li key={name} style={{ marginTop: '8px', marginBottom: '5px', color: '#333' }}>
                                    {name}: {count}
                                </li>
                            ))}
                            <li style={{ borderTop: '1px solid #ccc', margin: '10px 0' }}></li>
                            <li style={{ marginBottom: '10px', fontWeight: 'bold', color: '#333' }}>Active</li>
                            {activeData && Object.entries(activeData).map(([name, count]) => (
                                <li key={name} style={{ marginTop: '8px', marginBottom: '5px', color: '#333' }}>
                                    {name}: {count}
                                </li>
                            ))}
                        </ul>
                        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '20px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: projectionColor, color: '#fff', marginBottom: '10px' }}>
                                    <h4 style={{ fontSize: '24px', fontWeight: 500, margin: 0 }}>{projectionTotal}</h4>
                                </span>
                                <span style={{ fontSize: '14px', color: '#333' }}>Projection</span>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: activeColor, color: '#fff' }}>
                                    <h4 style={{ fontSize: '24px', fontWeight: 500, margin: 0 }}>{activeTotal}</h4>
                                </span>
                                <span style={{ fontSize: '14px', color: '#333', marginTop:'10px' }}>Active</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BackupCard;
