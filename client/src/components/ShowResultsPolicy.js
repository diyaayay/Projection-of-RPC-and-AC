export default function ShowResultsPolicy({ dataPolicy }) {
    const renderPolicy = (policy) => {
      return (
        <div key={policy.id}>
          <p>ID: {policy.id}</p>
          <p>Interval: {policy.interval}</p>
          <p>Start Time: {policy.startTime}</p>
          <p>Type: {policy.type}</p>
          {policy.children && (
            <div style={{ marginLeft: '20px' }}>
              {Array.isArray(policy.children) && policy.children.map(child => renderPolicy(child))}
            </div>
          )}
        </div>
      );
    };
  
    return (
      <div>
        {renderPolicy(dataPolicy)}
      </div>
    );
  }