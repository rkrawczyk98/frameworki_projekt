import React, { useState } from 'react';
import { useToDos } from '../../contexts/ToDoContext';
import { ToDo } from '../../types/ToDo';
import { useAuth } from '../../contexts/UserContext';
import styles from './styles.module.css';

interface ToDoComponentProps {
    filteredToDos: ToDo[];
    showManipulateButtons: boolean;
}

const ToDoComponent: React.FC<ToDoComponentProps> = ({ filteredToDos, showManipulateButtons }) => {
    const { toDos, addToDo, editToDo, deleteToDo } = useToDos();
    const [newToDoTitle, setNewToDoTitle] = useState('');
    const [editToDoId, setEditToDoId] = useState<number | null>(null);
    const [editToDoTitle, setEditToDoTitle] = useState('');
    const [editCompleted, setEditCompleted] = useState(false);
    const { user } = useAuth();

    const handleAddToDo = () => {
        if (user?.id) {
            const newToDo: ToDo = {
                userId: user.id,
                id: Math.max(...toDos.map(toDo => toDo.id), 0) + 1,
                title: newToDoTitle,
                completed: false
            };
            addToDo(newToDo);
            setNewToDoTitle('');
        } else {
            alert('Aby dodawać zadania, musisz być zalogowanym użytkownikiem.');
        }
    };

    const handleEditToDo = (toDo: ToDo) => {
        setEditToDoId(toDo.id);
        setEditToDoTitle(toDo.title);
        setEditCompleted(toDo.completed);
    };

    const handleSaveEdit = () => {
        if (editToDoId && user?.id) {
            editToDo({ userId: user.id, id: editToDoId, title: editToDoTitle, completed: editCompleted });
            setEditToDoId(null);
            setEditToDoTitle('');
            setEditCompleted(false);
        } else {
            alert('Aby edytować zadania, musisz być zalogowanym użytkownikiem.');
        }
    };

    return (
        <div className={styles.container}>
            <div>
                {filteredToDos.map(toDo => (
                    <div key={toDo.id} className={editToDoId === toDo.id ? `${styles.toDo} ${styles.editMode}` : styles.toDo}>
                        {editToDoId === toDo.id && showManipulateButtons ? (
                            <div className={styles.toDoContent}>
                                <label>Tytuł:</label>
                                <input className={styles.inputField} value={editToDoTitle} onChange={e => setEditToDoTitle(e.target.value)} />
                                <label>Status: <input type="checkbox" checked={editCompleted} onChange={e => setEditCompleted(e.target.checked)} /></label>
                                
                                <div className={styles.buttonContainer}>
                                    <button className={styles.button} onClick={handleSaveEdit}>Zapisz</button>
                                </div>
                            </div>
                        ) : (
                            <div className={styles.toDoContent}>
                                <div className={styles.toDoHeader}>Tytuł: <span>{toDo.title}</span></div>
                                <div>Status: <span>{toDo.completed ? 'Wykonane' : 'Niewykonane'}</span></div>
                                {showManipulateButtons && (
                                    <div className={styles.buttonContainer}>
                                        <button className={styles.button} onClick={() => handleEditToDo(toDo)}>Edytuj</button>
                                        <button className={styles.button} onClick={() => deleteToDo(toDo.id)}>Usuń</button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {showManipulateButtons && (
                <div>
                    <label className={styles.label}>Tytuł:</label>
                    <input className={styles.inputField} value={newToDoTitle} onChange={e => setNewToDoTitle(e.target.value)} />
                    <button className={styles.button} onClick={handleAddToDo}>Dodaj Zadanie</button>
                </div>
            )}
        </div>
    );
};

export default ToDoComponent;
