export default function ShowResults({ data }) {
    return (
      <div>
        {data.map((entry, index) => (
          <div key={index}>
            <h2>Schedules Involved: {entry.schedules_involved.join(', ')}</h2>
            <ul>
              {entry.occurrences.map((occurrence, subIndex) => (
                <li key={subIndex}>
                  {occurrence.join(' to ')}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }