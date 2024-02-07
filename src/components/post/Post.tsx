import React, { useState } from "react";
import { usePosts } from "../../contexts/PostContext";
import { Post } from "../../types/Post";
import { useAuth } from "../../contexts/UserContext";
import styles from "./styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";

interface PostComponentProps {
    filteredPosts: Post[];
    showManipulateButtons: boolean;
}

const PostComponent: React.FC<PostComponentProps> = ({
    filteredPosts,
    showManipulateButtons,
}) => {
    const { posts, addPost, editPost, deletePost } = usePosts();
    const [newPostTitle, setNewPostTitle] = useState("");
    const [newPostBody, setNewPostBody] = useState("");
    const [editPostId, setEditPostId] = useState<number | null>(null);
    const [editPostTitle, setEditPostTitle] = useState("");
    const [editPostBody, setEditPostBody] = useState("");
    const { user } = useAuth();

    const handleAddPost = () => {
        if (user?.id) {
            const newPost: Post = {
                userId: user.id,
                id: Math.max(...posts.map((post) => post.id), 0) + 1,
                title: newPostTitle,
                body: newPostBody,
            };
            addPost(newPost);
            setNewPostTitle("");
            setNewPostBody("");
        } else {
            alert("Aby dodawać posty musisz być zalogowanym użytkownikiem.");
        }
    };

    const handleEditPost = (post: Post) => {
        setEditPostId(post.id);
        setEditPostTitle(post.title);
        setEditPostBody(post.body);
    };

    const handleSaveEdit = () => {
        if (editPostId && user?.id) {
            editPost({
                userId: user?.id ?? 1,
                id: editPostId,
                title: editPostTitle,
                body: editPostBody,
            });
            setEditPostId(null);
            setEditPostTitle("");
            setEditPostBody("");
        } else {
            alert("Aby edytować posty musisz być zalogowanym użytkownikiem.");
        }
    };

    return (
        <div className={styles.post}>
            <h2 className={styles.postHeader}>Posty</h2>
            <div>
                {filteredPosts.map((post) => (
                    <div
                        key={post.id}
                        className={
                            editPostId === post.id
                                ? `${styles.post} ${styles.editMode}`
                                : styles.post
                        }
                    >
                        {editPostId === post.id && showManipulateButtons ? (
                            <div>
                                <input
                                    className={styles.inputField}
                                    value={editPostTitle}
                                    onChange={(e) =>
                                        setEditPostTitle(e.target.value)
                                    }
                                />
                                <input
                                    className={styles.inputField}
                                    value={editPostBody}
                                    onChange={(e) =>
                                        setEditPostBody(e.target.value)
                                    }
                                />
                                <button
                                    className={styles.button}
                                    onClick={handleSaveEdit}
                                >
                                    Zapisz
                                </button>
                            </div>
                        ) : (
                            <div >
                                <div className={styles.postHeader}>
                                    Tytuł: <span>{post.title}</span>
                                </div>
                                <div className={styles.postBody}>
                                    Treść: <span>{post.body}</span>
                                </div>
                                {showManipulateButtons ? (
                                    <button
                                        className={styles.button}
                                        onClick={() => handleEditPost(post)}
                                    >
                                        Edytuj
                                    </button>
                                ) : null}
                                {showManipulateButtons ? (
                                    <button
                                        className={styles.button}
                                        onClick={() => deletePost(post.id)}
                                    >
                                        Usuń
                                    </button>
                                ) : null}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            {showManipulateButtons ? (
                <div>
                    <label className={styles.label}>Tytuł:</label>
                    <input
                        className={styles.inputField}
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                    />
                    <label className={styles.label}>Treść:</label>
                    <input
                        className={styles.inputField}
                        value={newPostBody}
                        onChange={(e) => setNewPostBody(e.target.value)}
                    />
                    <button className={styles.button} onClick={handleAddPost}>
                        Dodaj Post
                    </button>
                </div>
            ) : null}
        </div>
    );
};

export default PostComponent;
