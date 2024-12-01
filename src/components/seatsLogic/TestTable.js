import React, { useState } from "react";

function EditableTable() {
  const [rows, setRows] = useState([]);
  const [newRow, setNewRow] = useState({ color: "", name: "" });

  const addRow = () => {
    setRows((prevRows) => [
      ...prevRows,
      { color: newRow.color, name: newRow.name, totalSeats: 0 },
    ]);
    setNewRow({ color: "", name: "" }); // Очистить форму
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Таблица</h2>
      <table border="1" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Цвет</th>
            <th>Название</th>
            <th>Всего мест</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} style={{ backgroundColor: row.color }}>
              <td>{row.color}</td>
              <td>{row.name}</td>
              <td>{row.totalSeats}</td>
            </tr>
          ))}
          <tr>
            <td>
              <input
                type="color"
                value={newRow.color}
                onChange={(e) =>
                  setNewRow((prev) => ({ ...prev, color: e.target.value }))
                }
              />
            </td>
            <td>
              <input
                type="text"
                value={newRow.name}
                onChange={(e) =>
                  setNewRow((prev) => ({ ...prev, name: e.target.value }))
                }
              />
            </td>
            <td>
              <button onClick={addRow} disabled={!newRow.color || !newRow.name}>
                Подтвердить
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EditableTable;