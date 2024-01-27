import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/UserContext';
import { useToDos } from '../../contexts/ToDoContext';
import ToDoComponent from '../../components/toDo/ToDo';
import NavBar from '../../components/navbar/NavBar';

interface ToDoViewHelper {
    ownerName: string;
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

const ToDosPage = () => {
    const { user, users } = useAuth();
    const { toDos, addToDo } = useToDos();
    const [userToDos, setUserToDos] = useState<ToDoViewHelper[]>([]);
    const [newToDoTitle, setNewToDoTitle] = useState('');

    useEffect(() => {
        const toDosWithUserInfo = toDos.map(toDo => {
            const toDoOwner = users.find(u => u.id === toDo.userId);
            return {
                ...toDo,
                ownerName: toDoOwner ? toDoOwner.name : 'Nieznany autor'
            };
        });
        setUserToDos(toDosWithUserInfo);
    }, [toDos, users]);

    const handleAddToDo = () => {
        if (user && newToDoTitle) {
            const newToDo = {
                userId: user.id,
                id: Math.max(...toDos.map(toDo => toDo.id), 0) + 1,
                title: newToDoTitle,
                completed: false
            };
            addToDo(newToDo);
            setNewToDoTitle('');
        }
    };

    return (
        <div>
            <NavBar />
            <h1>Zadania</h1>
            {user && (
                <div>
                    <h3>Dodaj nowe zadanie</h3>
                    <input
                        type="text"
                        value={newToDoTitle}
                        onChange={(e) => setNewToDoTitle(e.target.value)}
                        placeholder="Tytuł zadania"
                    />
                    <button onClick={handleAddToDo}>Dodaj Zadanie</button>
                </div>
            )}
            <ToDoComponent filteredToDos={userToDos} showManipulateButtons={!!user} />
        </div>
    );
};

export default ToDosPage;
