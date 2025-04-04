import React from "react";
import "../styles/DataSet.css";

const DataSet = ({
    columns,
    data,
    onSelectIds,
    selectedIndexes = [],
    onSelectIndexes,
    removingRows = []
}) => {
    const handleRowClick = (index, event) => {
        let updatedSelection;
        if (event.ctrlKey) {
            updatedSelection = selectedIndexes.includes(index)
                ? selectedIndexes.filter((i) => i !== index)
                : [...selectedIndexes, index];
        } else {
            updatedSelection = [index];
        }

        onSelectIndexes?.(updatedSelection);

        if (onSelectIds) {
            const selectedIds = updatedSelection
                .map((i) => data[i]?.id)
                .filter(Boolean);
            onSelectIds(selectedIds);
        }
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
                {data.map((row, rowIndex) => (
                    <tr
                        key={row.id || rowIndex}
                        className={`${selectedIndexes.includes(rowIndex) ? "selected" : ""} ${removingRows.includes(row.id) ? "removing" : ""
                            }`}
                    >
                        <td
                            className="select-area"
                            onClick={(e) => handleRowClick(rowIndex, e)}
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