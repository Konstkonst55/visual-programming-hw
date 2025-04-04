import React, { useEffect, useState } from "react";
import DataSet from "./components/DataSet";
import "./styles/App.css";
import PlusIcon from "./icons/ic-add.svg";
import TrashIcon from "./icons/ic-trash.svg";
import EditIcon from "./icons/ic-edit.svg";

const COMMENTS_URL = "https://jsonplaceholder.typicode.com/comments";

function App() {
  const [comments, setComments] = useState([]);
  const [selectedIds, setSelectedIds] = useState([]);
  const [selectedRowIndexes, setSelectedRowIndexes] = useState([]);
  const [removingRows, setRemovingRows] = useState([]);

  useEffect(() => {
    fetch(COMMENTS_URL)
      .then((res) => res.json())
      .then(setComments);
  }, []);

  const addComment = async () => {
    const newComment = {
      postId: 1,
      name: "Новый комментарий",
      email: "new@example.com",
      body: "Это новый комментарий"
    };

    const tempId = Date.now();

    setSelectedRowIndexes([]);
    setSelectedIds([]);

    setComments((prev) => [{ ...newComment, id: tempId }, ...prev]);

    try {
      const res = await fetch(COMMENTS_URL, {
        method: "POST",
        body: JSON.stringify(newComment),
        headers: { "Content-Type": "application/json" }
      });
      const data = await res.json();

      setComments((prev) =>
        prev.map((c) => (c.id === tempId ? { ...data, id: data.id } : c))
      );
    } catch (err) {
      setComments((prev) => prev.filter((c) => c.id !== tempId));
      alert("Ошибка при добавлении комментария");
    }
  };

  const deleteSelected = async () => {
    const toDelete = [...selectedIds];
    setRemovingRows(toDelete);

    setTimeout(() => {
      setComments((prev) => prev.filter((c) => !toDelete.includes(c.id)));
      setRemovingRows([]);
      setSelectedIds([]);
      setSelectedRowIndexes([]);
    }, 300);

    for (const id of toDelete) {
      try {
        await fetch(`${COMMENTS_URL}/${id}`, { method: "DELETE" });
      } catch (err) {
        console.error("Ошибка при удалении:", err);
      }
    }
  };

  const modifyFirstSelected = async () => {
    const id = selectedIds[0];
    const updatedBody = "Комментарий был изменён";

    setComments((prev) =>
      prev.map((c) => (c.id === id ? { ...c, body: updatedBody } : c))
    );

    try {
      await fetch(`${COMMENTS_URL}/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ body: updatedBody }),
        headers: { "Content-Type": "application/json" }
      });
    } catch (err) {
      alert("Ошибка при изменении комментария");
    }
  };

  const columns = [
    { key: "id", title: "ID" },
    { key: "name", title: "Имя" },
    { key: "email", title: "Email" },
    { key: "body", title: "Комментарий" }
  ];

  return (
    <div className="app">
      <h2>Комментарии</h2>

      <div className="controls">
        <button className="icon-btn" onClick={addComment} title="Добавить">
          <img src={PlusIcon} alt="Добавить" />
        </button>
        <button
          className="icon-btn"
          onClick={deleteSelected}
          disabled={selectedIds.length === 0}
          title="Удалить"
        >
          <img src={TrashIcon} alt="Удалить" />
        </button>
        <button
          className="icon-btn"
          onClick={modifyFirstSelected}
          disabled={selectedIds.length !== 1}
          title="Изменить"
        >
          <img src={EditIcon} alt="Изменить" />
        </button>
      </div>

      <DataSet
        data={comments}
        columns={columns}
        onSelectIds={(ids) => setSelectedIds(ids)}
        selectedIndexes={selectedRowIndexes}
        onSelectIndexes={(indexes) => setSelectedRowIndexes(indexes)}
        removingRows={removingRows}
      />
    </div>
  );
}

export default App;