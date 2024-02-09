import React, { useState } from "react";
import { useToDos } from "../../contexts/ToDoContext";
import { ToDo } from "../../types/ToDo";
import { useAuth } from "../../contexts/UserContext";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";

interface ToDoComponentProps {
    filteredToDos: ToDo[];
    showManipulateButtons: boolean;
}

const ToDoComponent: React.FC<ToDoComponentProps> = ({
    filteredToDos,
    showManipulateButtons,
}) => {
    const { toDos, addToDo, editToDo, deleteToDo } = useToDos();
    const [newToDoTitle, setNewToDoTitle] = useState("");
    const [editToDoId, setEditToDoId] = useState<number | null>(null);
    const [editToDoTitle, setEditToDoTitle] = useState("");
    const [editCompleted, setEditCompleted] = useState(false);
    const [showCheckLabel, setShowCheckLabel] = useState(true);
    const { user } = useAuth();

    const handleAddToDo = () => {
        if (user?.id) {
            const newToDo: ToDo = {
                userId: user.id,
                id: Math.max(...toDos.map((toDo) => toDo.id), 0) + 1,
                title: newToDoTitle,
                completed: false,
            };
            addToDo(newToDo);
            setNewToDoTitle("");
        } else {
            alert("Aby dodawać zadania, musisz być zalogowanym użytkownikiem.");
        }
    };

    const handleEditToDo = (toDo: ToDo) => {
        setEditToDoId(toDo.id);
        setEditToDoTitle(toDo.title);
        setEditCompleted(toDo.completed);
        setShowCheckLabel(showCheckLabel);
    };

    const handleSaveEdit = () => {
        if (editToDoId && user?.id) {
            editToDo({
                userId: user.id,
                id: editToDoId,
                title: editToDoTitle,
                completed: editCompleted,
            });
            setEditToDoId(null);
            setEditToDoTitle("");
            setEditCompleted(false);
        } else {
            alert(
                "Aby edytować zadania, musisz być zalogowanym użytkownikiem."
            );
        }
    };

    return (
        <div className={styles.container}>
            {/* {showManipulateButtons && (
                <div>
                    <label className={styles.label}>Tytuł:</label>
                    <input
                        className={styles.inputField}
                        value={newToDoTitle}
                        onChange={(e) => setNewToDoTitle(e.target.value)}
                    />
                    <button className={styles.button} onClick={handleAddToDo}>
                        Dodaj Zadanie
                    </button>
                </div>
            )} */}
            {filteredToDos.map((toDo) => (
                <div
                    key={toDo.id}
                    className={
                        editToDoId === toDo.id
                            ? `${styles.toDo} ${styles.editMode}`
                            : styles.toDo
                    }
                >
                    {editToDoId === toDo.id && showManipulateButtons ? (
                        <>
                            <span className={styles.faIconContainer}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    checked={editCompleted}
                                    id="edit"
                                    onChange={(e) => {
                                        setEditCompleted(e.target.checked);
                                    }}
                                />{" "}
                                <label
                                    htmlFor="edit"
                                    className={styles.checkboxIconLabelCheck}
                                >
                                    <FontAwesomeIcon
                                        icon={["fas", "check"]}
                                        size="lg"
                                        className={styles.faIconCheck}
                                    />
                                </label>
                                <label
                                    htmlFor="edit"
                                    className={styles.checkboxIconLabelX}
                                >
                                    <FontAwesomeIcon
                                        icon={["fas", "xmark"]}
                                        size="lg"
                                        className={styles.faIconX}
                                    />
                                </label>
                            </span>
                            <input
                                className={styles.inputField}
                                value={editToDoTitle}
                                onChange={(e) =>
                                    setEditToDoTitle(e.target.value)
                                }
                                autoFocus
                            />
                            <div className={styles.btnWrapper}>
                                <button
                                    className={styles.button}
                                    onClick={handleSaveEdit}
                                >
                                    <FontAwesomeIcon
                                        icon={["fas", "save"]}
                                        size="lg"
                                        className={styles.faIconSave}
                                    />
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className={styles.toDoHeader}>
                                <span className={styles.faIconContainer}>
                                    {toDo.completed ? (
                                        <FontAwesomeIcon
                                            icon={["fas", "check"]}
                                            size="lg"
                                            className={styles.faIconCheck}
                                        />
                                    ) : (
                                        <FontAwesomeIcon
                                            icon={["fas", "xmark"]}
                                            size="lg"
                                            className={styles.faIconX}
                                        />
                                    )}
                                </span>
                                <span className={styles.title}>
                                    {toDo.title}
                                </span>
                            </div>
                            {showManipulateButtons && (
                                <div className={styles.btnWrapper}>
                                    <button
                                        className={styles.button}
                                        onClick={() => handleEditToDo(toDo)}
                                    >
                                        <FontAwesomeIcon
                                            icon={["fas", "edit"]}
                                            size="lg"
                                            className={styles.faIconEdit}
                                        />
                                    </button>
                                    <button
                                        className={styles.button}
                                        onClick={() => deleteToDo(toDo.id)}
                                    >
                                        <FontAwesomeIcon
                                            icon={["fas", "trash"]}
                                            size="lg"
                                            className={styles.faIconTrash}
                                        />
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
            ))}
        </div>
    );
};

export default ToDoComponent;
