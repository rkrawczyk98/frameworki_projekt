import React, { createContext, useState, useContext, useEffect } from 'react';
import { Post } from '../types/Post';

interface PostContextType {
    posts: Post[];
    fetchPosts: () => void;
    addPost: (newPost: Post) => void;
    editPost: (editedPost: Post) => void;
    deletePost: (postId: number) => void;
}

export const PostContext = createContext<PostContextType | undefined>(undefined);

interface PostProviderProps {
    children: React.ReactNode;
}

export const PostProvider: React.FC<PostProviderProps> = ({ children }) => {
    //const [posts, setPosts] = useState<Post[]>([]);
    const [posts, setPosts] = useState<Post[]>(() => {
        const savedPosts = localStorage.getItem('posts');
        return savedPosts ? JSON.parse(savedPosts) : null;
    });

    useEffect(() => {
        fetchPosts();
    }, []);

    useEffect(() => {
        localStorage.setItem('posts', JSON.stringify(posts));
    }, [posts]);

    const fetchPosts = async () => {
        try {
            const response = await fetch('https://jsonplaceholder.typicode.com/posts');
            const apiPosts: Post[] = await response.json();
            const localPosts: Post[] = JSON.parse(localStorage.getItem('posts') || '[]');
            const newApiPosts = apiPosts.filter(apiPost => 
                !localPosts.some(localPost => localPost.id === apiPost.id)
            );
            setPosts([...localPosts, ...newApiPosts]);
        } catch (error) {
            console.error('Błąd podczas pobierania postów:', error);
        }
    };

    const addPost = (newPost: Post) => {
        const updatedPosts = [...posts, newPost];
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const editPost = (editedPost: Post) => {
        const updatedPosts = posts.map(post => 
            post.id === editedPost.id ? editedPost : post
        );
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    const deletePost = (postId: number) => {
        const updatedPosts = posts.filter(post => post.id !== postId);
        setPosts(updatedPosts);
        localStorage.setItem('posts', JSON.stringify(updatedPosts));
    };

    return (
        <PostContext.Provider value={{ posts, fetchPosts, addPost, editPost, deletePost }}>
            {children}
        </PostContext.Provider>
    );
};

export const usePosts = () => {
    const context = useContext(PostContext);
    if (!context) {
        throw new Error("usePosts must be used within an PostProvider");
    }
    return context;
};
