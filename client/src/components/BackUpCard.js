import React from 'react';

const BackupCard = ({ title, data, color, totalCount }) => {
    return (
        <div style={{ flex: '0 0 48%', marginBottom: '20px' }}>
            <div style={{ boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#fff', width: '100%' }}>
                <div style={{ padding: '24px' }}>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '1 1 auto' }}>
                            <h3 style={{ fontSize: '19px', marginBottom: '12px', color: '#333' }}>{title}</h3>
                            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
                                {data && Object.entries(data).map(([name, count]) => (
                                    <li key={name} style={{ marginTop: '8px', marginBottom: '5px' }}>
                                        {name}: {count}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '60px', height: '60px', borderRadius: '50%', backgroundColor: color, color: '#fff', marginLeft: '20px' }}>
                            {totalCount ? (
                                <h4 style={{ fontSize: '30px', fontWeight: 500, margin: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    {totalCount}
                                </h4>
                            ) : (
                                <span></span>
                            )}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BackupCard;
