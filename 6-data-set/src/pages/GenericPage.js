import React, { useEffect, useState, useMemo } from "react";
import DataSet from "../components/DataSet";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../styles/GenericPage.css";
import TrashIcon from "../icons/ic-trash.svg";
import EditIcon from "../icons/ic-edit.svg";

const API_ROOT = "https://jsonplaceholder.typicode.com/";

const validationSchemas = {
    posts: Yup.object({
        title: Yup.string().required("Введите заголовок"),
        body: Yup.string().required("Введите содержимое")
    }),
    albums: Yup.object({
        title: Yup.string().required("Введите название альбома")
    }),
    todos: Yup.object({
        title: Yup.string().required("Введите задачу"),
        completed: Yup.boolean()
    }),
    users: Yup.object({
        name: Yup.string().required("Имя обязательно"),
        email: Yup.string().email("Некорректный email").required("Email обязателен")
    }),
    comments: Yup.object({
        postId: Yup.number().required("ID поста обязателен"),
        name: Yup.string().required("Имя обязательно"),
        email: Yup.string().email("Некорректный email").required("Email обязателен"),
        body: Yup.string().required("Комментарий не может быть пустым")
    })
};

const initialValuesMap = {
    posts: { title: "", body: "" },
    albums: { title: "" },
    todos: { title: "", completed: false },
    users: { name: "", email: "" },
    comments: { postId: 1, name: "", email: "", body: "" }
};

const columnOrderMap = {
    comments: ["postId", "name", "email", "body"],
    posts: ["userId", "title", "body"],
    albums: ["userId", "title"],
    todos: ["userId", "title", "completed"],
    users: ["name", "email"]
};

const GenericPage = ({ endpoint }) => {
    const [data, setData] = useState([]);
    const [selectedIds, setSelectedIds] = useState([]);
    const [removingRows, setRemovingRows] = useState([]);
    const [editingItem, setEditingItem] = useState(null);

    useEffect(() => {
        fetch(`${API_ROOT}${endpoint}`)
            .then((res) => res.json())
            .then(setData);
    }, [endpoint]);

    const schema = validationSchemas[endpoint];
    const initialValues = initialValuesMap[endpoint] || {};
    const formInitialValues = useMemo(() => editingItem || initialValues, [editingItem, initialValues]);

    const handleSubmit = async (values, { resetForm, setSubmitting }) => {
        if (editingItem) {
            const id = editingItem.id;

            setData((prev) =>
                prev.map((item) => (item.id === id ? { ...item, ...values } : item))
            );

            try {
                await fetch(`${API_ROOT}${endpoint}/${id}`, {
                    method: "PATCH",
                    body: JSON.stringify(values),
                    headers: { "Content-Type": "application/json" }
                });
            } catch (err) {
                alert("Ошибка при изменении");
            }

            setEditingItem(null);
        } else {
            const tempId = Date.now();
            const newItem = { ...values, id: tempId };

            setData((prev) => [...prev, newItem]);

            try {
                const response = await fetch(`${API_ROOT}${endpoint}`, {
                    method: "POST",
                    body: JSON.stringify(values),
                    headers: { "Content-Type": "application/json" }
                });

                const json = await response.json();

                setData((prev) =>
                    prev.map((item) =>
                        item.id === tempId ? { ...json, id: json.id } : item
                    )
                );
            } catch (err) {
                console.error("Ошибка добавления:", err);
                setData((prev) => prev.filter((item) => item.id !== tempId));
                alert("Ошибка при добавлении");
            }
        }

        resetForm();
        setEditingItem(null);
        setSelectedIds([]);
        setSubmitting(false);
    };

    const deleteSelected = async () => {
        const toDelete = [...selectedIds];
        setRemovingRows(toDelete);

        setTimeout(() => {
            setData((prev) => prev.filter((item) => !toDelete.includes(item.id)));
            setRemovingRows([]);
            setSelectedIds([]);
        }, 300);

        for (const id of toDelete) {
            try {
                await fetch(`${API_ROOT}${endpoint}/${id}`, {
                    method: "DELETE"
                });
            } catch (err) {
                console.error("Ошибка при удалении:", err);
            }
        }
    };

    const startEdit = () => {
        const firstId = selectedIds[0];
        const item = data.find((d) => d.id === firstId);
        if (item) {
            setEditingItem(item);
        }
    };

    const columns = useMemo(() => {
        const keys =
            data.length > 0
                ? columnOrderMap[endpoint] || Object.keys(data[0])
                : [];

        return keys.map((key) => ({
            key,
            title: key,
            render: (value) => {
                if (typeof value === "object" && value !== null) {
                    return JSON.stringify(value);
                }
                return value;
            }
        }));
    }, [data, endpoint]);

    return (
        <div className="page">
            <h2>{endpoint[0].toUpperCase() + endpoint.slice(1)}</h2>

            {schema && (
                <Formik
                    enableReinitialize
                    initialValues={formInitialValues}
                    validationSchema={schema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="formik-form">
                            {Object.keys(initialValues).map((key) => (
                                <div key={key} className="form-field">
                                    <div className="field-content">
                                        <label htmlFor={key}>{key}</label>
                                        <Field name={key} />
                                    </div>
                                    <ErrorMessage name={key} component="div" className="error" />
                                </div>
                            ))}
                            <button type="submit" disabled={isSubmitting}>
                                {editingItem ? "Сохранить изменения" : "Добавить"}
                            </button>
                        </Form>
                    )}
                </Formik>
            )}

            <div className="controls">
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
                    onClick={startEdit}
                    disabled={selectedIds.length !== 1}
                    title="Изменить"
                >
                    <img src={EditIcon} alt="Изменить" />
                </button>
            </div>

            <DataSet
                data={data}
                columns={columns}
                onSelectIds={(ids) => setSelectedIds(ids)}
                selectedIds={selectedIds}
                removingRows={removingRows}
            />
        </div>
    );
};

export default GenericPage;