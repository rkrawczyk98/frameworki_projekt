import React, { createContext, useState, useContext, useEffect } from 'react';
import { Comment } from '../types/Comment';

interface CommentContextType {
    comments: Comment[];
    fetchComments: () => void;
    addComment: (newComment: Comment) => void;
    editComment: (editedComment: Comment) => void;
    deleteComment: (commentId: number) => void;
}

export const CommentContext = createContext<CommentContextType | undefined>(undefined);

interface CommentProviderProps {
    children: React.ReactNode;
}

export const CommentProvider: React.FC<CommentProviderProps> = ({ children }) => {
    //const [comments, setComments] = useState<Comment[]>([]);
    const [comments, setComments] = useState<Comment[]>(() => {
        const savedComments = localStorage.getItem('comments');
        return savedComments ? JSON.parse(savedComments) : null;
    });

    useEffect(() => {
        fetchComments();
    }, []);

    useEffect(() => {
        localStorage.setItem('comments', JSON.stringify(comments));
    }, [comments]);

    const fetchComments = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/comments');
            const apiComments: Comment[] = await response.json();
            const localComments: Comment[] = JSON.parse(localStorage.getItem('comments') || '[]');
            const newApiComments = apiComments.filter(apiComment => 
                !localComments.some(localComment => localComment.id === apiComment.id)
            );
            setComments([...localComments, ...newApiComments]);
        } catch (error) {
            console.error('Błąd podczas pobierania commentów:', error);
        }
    };

    const addComment = (newComment: Comment) => {
        const updatedComments = [...comments, newComment];
        setComments(updatedComments);
        localStorage.setItem('comments', JSON.stringify(updatedComments));
    };

    const editComment = (editedComment: Comment) => {
        const updatedComments = comments.map(comment => 
            comment.id === editedComment.id ? editedComment : comment
        );
        setComments(updatedComments);
        localStorage.setItem('comments', JSON.stringify(updatedComments));
    };

    const deleteComment = (commentId: number) => {
        const updatedComments = comments.filter(comment => comment.id !== commentId);
        setComments(updatedComments);
        localStorage.setItem('comments', JSON.stringify(updatedComments));
    };

    return (
        <CommentContext.Provider value={{ comments, fetchComments, addComment, editComment, deleteComment }}>
            {children}
        </CommentContext.Provider>
    );
};

export const useComments = () => {
    const context = useContext(CommentContext);
    if (!context) {
        throw new Error("useComments must be used within an CommentProvider");
    }
    return context;
};
