import React, { useState, useEffect } from "react";
import { useAuth } from "../../contexts/UserContext";
import { usePosts } from "../../contexts/PostContext";
import Post from "../../components/post/Post";
import NavBar from "../../components/navbar/NavBar";
import Comment from "../../components/comment/Comment";
import styles from "../../components/post/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";

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
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostBody, setNewPostBody] = useState("");

    useEffect(() => {
        const postsWithUserInfo = posts.map((post) => {
            const postAuthor = users.find((u) => u.id === post.userId);
            return {
                ...post,
                authorName: postAuthor ? postAuthor.name : "Nieznany autor",
            };
        });
        setUserPosts(postsWithUserInfo);
    }, [posts, users]);

    const handleAddPost = () => {
        if (user && newPostTitle && newPostBody) {
            const newPost = {
                userId: user.id,
                id: Math.max(...posts.map((post) => post.id), 0) + 1,
                title: newPostTitle,
                body: newPostBody,
            };
            addPost(newPost);
            setNewPostTitle("");
            setNewPostBody("");
        }
    };

    return (
        <div>
            <header className="wrapper">
                <NavBar />
            </header>
            <div className={styles.container}>
                <h1>Posty</h1>
                {user && (
                    <div className="newPostContainer">
                        <input
                            type="text"
                            value={newPostTitle}
                            className="newPostInput"
                            onChange={(e) => setNewPostTitle(e.target.value)}
                            placeholder="Tytuł"
                        />
                        <textarea
                            value={newPostBody}
                            className="newPostInput"
                            onChange={(e) => setNewPostBody(e.target.value)}
                            placeholder="Treść"
                        />
                        <button
                            className="newTodoButton"
                            onClick={handleAddPost}
                        >
                            <FontAwesomeIcon icon={["fas", "add"]} size="lg" />
                        </button>
                    </div>
                )}
                {userPosts.map((post) => (
                    <div key={post.id} className={styles.post}>
                        <article className={styles.article}>
                            <h2 className={styles.postTitle}>{post.title}</h2>
                            <p className={styles.postBody}>{post.body}</p>
                            <p className={styles.postAuthor}>
                                Autor: {post.authorName}
                            </p>
                        </article>
                        <section className={styles.comment}>
                            <Comment postId={post.id} />
                        </section>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostPage;
