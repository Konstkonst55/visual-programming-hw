import React from "react";
import "../styles/DataSet.css";

const DataSet = ({
    columns,
    data,
    onSelectIds,
    selectedIds = [],
    removingRows = []
}) => {
    const handleRowClick = (clickedId, event) => {
        let updatedSelection;

        if (event.ctrlKey) {
            updatedSelection = selectedIds.includes(clickedId)
                ? selectedIds.filter((id) => id !== clickedId)
                : [...selectedIds, clickedId];
        } else {
            updatedSelection = [clickedId];
        }

        onSelectIds?.(updatedSelection);
    };

    const computedColumns =
        columns || (data.length > 0
            ? Object.keys(data[0]).map((key) => ({ key, title: key }))
            : []);

    return (
        <table className="dataset">
            <thead>
                <tr>
                    <th></th>
                    {computedColumns.map((col) => (
                        <th key={col.key}>{col.title}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {data.map((row) => (
                    <tr
                        key={row.id}
                        className={`${selectedIds.includes(row.id) ? "selected" : ""} ${removingRows.includes(row.id) ? "removing" : ""
                            }`}
                    >
                        <td
                            className="select-area"
                            onClick={(e) => handleRowClick(row.id, e)}
                        ></td>
                        {computedColumns.map((col) => (
                            <td key={col.key}>
                                {col.render ? col.render(row[col.key], row) : row[col.key]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default DataSet;