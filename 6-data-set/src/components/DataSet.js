import React, { useState } from "react";
import "../styles/DataSet.css";

const DataSet = ({ columns, data }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const handleRowClick = (index, event) => {
        if (event.ctrlKey) {
            setSelectedRows((prev) =>
                prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
            );
        } else {
            setSelectedRows([index]);
        }
    };

    const computedColumns =
        columns ||
        (data.length > 0 ? Object.keys(data[0]).map((key) => ({ key, title: key })) : []);

    return (
        <table className="dataset">
            <thead>
                <tr>
                    <th></th>{computedColumns.map((col) => <th key={col.key}>{col.title}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((row, rowIndex) => (
                    <tr key={rowIndex} className={selectedRows.includes(rowIndex) ? "selected" : ""}>
                        <td className="select-area" onClick={(e) => handleRowClick(rowIndex, e)}></td>
                        {computedColumns.map((col) => (
                            <td key={col.key}>{col.render ? col.render(row[col.key], row) : row[col.key]}</td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataSet;
