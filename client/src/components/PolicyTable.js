import React from "react";

const PolicyTable = ({ data }) => {
  // Function to render the table rows
  const renderRows = () => {
    return data.map((policy, index) => {
      return (
        <tr key={index}>
          <th>{`Policy ${policy.schedules_involved[0].id}`}</th>
          {policy.occurrences.map((occurrence, index) => (
            <td key={index} className="cell" data-source={occurrence.source_id}>
              <svg width="20" height="20">
                <circle cx="10" cy="10" r="5" fill="blue" />
              </svg>
            </td>
          ))}
        </tr>
      );
    });
  };

  // Function to render column headers
  const renderColumns = () => {
    if (data.length === 0) return null;
    const timestamps = data[0].occurrences.map((occurrence) => occurrence.time);
    return timestamps.map((timestamp, index) => (
      <th key={index} className="timestamp">
        {timestamp}
      </th>
    ));
  };

  return (
    <table className="policy-table">
      <thead>
        <tr>
          <th></th>
          {renderColumns()}
        </tr>
      </thead>
      <tbody>{renderRows()}</tbody>
    </table>
  );
};

export default PolicyTable;
