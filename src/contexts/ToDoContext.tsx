import React, { createContext, useState, useContext, useEffect } from 'react';
import { ToDo } from '../types/ToDo';

interface ToDoContextType {
    toDos: ToDo[];
    fetchToDos: () => void;
    addToDo: (newToDo: ToDo) => void;
    editToDo: (editedToDo: ToDo) => void;
    deleteToDo: (toDoId: number) => void;
}

export const ToDoContext = createContext<ToDoContextType | undefined>(undefined);

interface ToDoProviderProps {
    children: React.ReactNode;
}

export const ToDoProvider: React.FC<ToDoProviderProps> = ({ children }) => {
    //const [toDos, setToDos] = useState<ToDo[]>([]);
    const [toDos, setToDos] = useState<ToDo[]>(() => {
        const savedToDos = localStorage.getItem('toDos');
        return savedToDos ? JSON.parse(savedToDos) : null;
    });

    useEffect(() => {
        fetchToDos();
    }, []);

    useEffect(() => {
        localStorage.setItem('toDos', JSON.stringify(toDos));
    }, [toDos]);

    const fetchToDos = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/toDos');
            const apiToDos: ToDo[] = await response.json();
            const localToDos: ToDo[] = JSON.parse(localStorage.getItem('toDos') || '[]');

            if (!Array.isArray(localToDos)) {
                setToDos(apiToDos);
                return; 
            }

            const newApiToDos = apiToDos.filter(apiToDo => 
                !localToDos?.some(localToDo => localToDo.id === apiToDo.id)
            );
            setToDos([...localToDos, ...newApiToDos]);
        } catch (error) {
            console.error('Błąd podczas pobierania toDosów:', error);
        }
    };

    const addToDo = (newToDo: ToDo) => {
        const updatedToDos = [...toDos, newToDo];
        setToDos(updatedToDos);
        localStorage.setItem('toDos', JSON.stringify(updatedToDos));
    };

    const editToDo = (editedToDo: ToDo) => {
        const updatedToDos = toDos.map(toDo => 
            toDo.id === editedToDo.id ? editedToDo : toDo
        );
        setToDos(updatedToDos);
        localStorage.setItem('toDos', JSON.stringify(updatedToDos));
    };

    const deleteToDo = (toDoId: number) => {
        const updatedToDos = toDos.filter(toDo => toDo.id !== toDoId);
        setToDos(updatedToDos);
        localStorage.setItem('toDos', JSON.stringify(updatedToDos));
    };

    return (
        <ToDoContext.Provider value={{ toDos, fetchToDos, addToDo, editToDo, deleteToDo }}>
            {children}
        </ToDoContext.Provider>
    );
};

export const useToDos = () => {
    const context = useContext(ToDoContext);
    if (!context) {
        throw new Error("useToDos must be used within an ToDosProvider");
    }
    return context;
};
