import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/UserContext';
import { usePosts } from '../../contexts/PostContext';
import Post from '../../components/post/Post';
import NavBar from '../../components/navbar/NavBar';
import Comment from '../../components/comment/Comment';
import "./custom.css"

interface PostViewHelper {
    userId: number;
    id: number;
    title: string;
    body: string;
    authorName: string;
}

const PostPage = () => {
    const { user, users } = useAuth();
    const { posts, addPost } = usePosts();
    const [userPosts, setUserPosts] = useState<PostViewHelper[]>([]);
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostBody, setNewPostBody] = useState('');

    useEffect(() => {
        const postsWithUserInfo = posts.map(post => {
            const postAuthor = users.find(u => u.id === post.userId);
            return {
                ...post,
                authorName: postAuthor ? postAuthor.name : 'Nieznany autor'
            };
        });
        setUserPosts(postsWithUserInfo);
    }, [posts, users]);

    const handleAddPost = () => {
        if (user && newPostTitle && newPostBody) {
            const newPost = {
                userId: user.id,
                id: Math.max(...posts.map(post => post.id), 0) + 1,
                title: newPostTitle,
                body: newPostBody
            };
            addPost(newPost);
            setNewPostTitle('');
            setNewPostBody('');
        }
    };

    return (
        <div>
            <header>
                <NavBar />
            </header>

            <h1>Posty</h1>
            
            {user && (
                
                <div className="x">
                    
                    <input
                        type="text"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="Tytuł postu"
                        className="inputField"
                    />
                    <textarea
                        value={newPostBody}
                        onChange={(e) => setNewPostBody(e.target.value)}
                        placeholder="Treść postu"
                        className="inputField"
                    />
                    <button onClick={handleAddPost} className="button">Dodaj Post</button>
                </div>
            )}
            {userPosts.map(post => (
                <div key={post.id} className="postContainer">
                    <h2>{post.title}</h2>
                    <div className="postBodyContainer">
                        <p>{post.body}</p>
                        <p>Autor: {post.authorName}</p>
                    </div>
                    <Comment postId={post.id} />
                </div>
            ))}
        </div>
    );
};

export default PostPage;
