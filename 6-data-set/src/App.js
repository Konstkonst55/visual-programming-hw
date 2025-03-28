import React from "react";
import DataSet from "./components/DataSet";
import "./styles/App.css"

const data = [
  { id: 1, name: "Иванов", firstExam: 85, secondExam: 90, thirdExam: 88, avg: 87.67 },
  { id: 2, name: "Петрова", firstExam: 78, secondExam: 82, thirdExam: 80, avg: 80.00 },
  { id: 3, name: "Сидоров", firstExam: 92, secondExam: 88, thirdExam: 91, avg: 90.33 },
];

const columns = [
  { key: "name", title: "Имя" },
  { key: "firstExam", title: "1-й экз." },
  { key: "secondExam", title: "2-й экз." },
  { key: "thirdExam", title: "3-й экз." },
  { key: "avg", title: "Средний балл", render: (value) => <strong>{value}</strong> }
];

function App() {
  return (
    <div>
      <h2>Таблица успеваемости</h2>
      <DataSet data={data} columns={columns} />
    </div>
  );
}

export default App;