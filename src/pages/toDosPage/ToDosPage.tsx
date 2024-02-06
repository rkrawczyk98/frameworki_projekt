import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/UserContext";
import { useToDos } from "../../contexts/ToDoContext";
import ToDoComponent from "../../components/toDo/ToDo";
import NavBar from "../../components/navbar/NavBar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";

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
    const [newToDoTitle, setNewToDoTitle] = useState("");

    useEffect(() => {
        const toDosWithUserInfo = toDos.map((toDo) => {
            const toDoOwner = users.find((u) => u.id === toDo.userId);
            return {
                ...toDo,
                ownerName: toDoOwner ? toDoOwner.name : "Nieznany autor",
            };
        });
        setUserToDos(toDosWithUserInfo);
    }, [toDos, users]);

    const handleAddToDo = () => {
        if (user && newToDoTitle) {
            const newToDo = {
                userId: user.id,
                id: Math.max(...toDos.map((toDo) => toDo.id), 0) + 1,
                title: newToDoTitle,
                completed: false,
            };
            addToDo(newToDo);
            setNewToDoTitle("");
        }
    };

    return (
        <div>
            <header className="wrapper">
                <NavBar />
            </header>
            <div className="todoContainer">
                <h1>Zadania</h1>
                {user && (
                    <div className="newTodoContainer">
                        <input
                            type="text"
                            value={newToDoTitle}
                            className="newTodoInput"
                            onChange={(e) => setNewToDoTitle(e.target.value)}
                            placeholder="Tytuł zadania"
                            autoFocus
                        />
                        <button
                            className="newTodoButton"
                            onClick={handleAddToDo}
                        >
                            <FontAwesomeIcon icon={["fas", "add"]} size="lg" />
                        </button>
                    </div>
                )}
                {/* {userToDos.map(toDo => (
                <div key={toDo.id}>
                <h2>{toDo.title}</h2>
                <p>Status: {toDo.completed ? 'Ukończone' : 'Niewykonane'}</p>
                <p>Właściciel: {toDo.ownerName}</p>
                </div>
            ))} */}
                <ToDoComponent
                    filteredToDos={userToDos}
                    showManipulateButtons={!!user}
                />
            </div>
        </div>
    );
};

export default ToDosPage;
