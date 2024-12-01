import { useState } from "react";

function CategoriesTable({groupsArray, setGroupsArray, setSelectedColor}){

    const [newRow, setNewRow] = useState({ color: "#000000", name: "" });

    const addRow = () => {
      setGroupsArray((prevRows) => [
        ...prevRows,
        { color: newRow.color, name: newRow.name, totalSeats: 0 },
      ]);
      setNewRow({ color: "", name: "" }); // Очистить форму
    };

    return(
        <div class="categories-container">
            <table class="categories-table" id="categories-table" style={{border: "solid"}}>
                <thead>
                    <tr>
                        <td>Цвет</td>
                        <th>Группа мест</th>
                        <th>Мест</th>
                    </tr>
                </thead>
                <tbody>
                    {groupsArray.map((row, index) => (
                        <tr key={index} >
                            <td style={{ backgroundColor: row.color}}></td>
                            <td onClick={() => setSelectedColor(row.color)}>{row.name}</td>
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
                        <button onClick={addRow} disabled={!newRow.name}>
                            Подтвердить
                        </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default CategoriesTable;