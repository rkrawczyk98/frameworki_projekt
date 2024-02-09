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
            {showManipulateButtons ? (
                <div className={styles.newUserPost}>
                    <input
                        className="userPostInput"
                        value={newPostTitle}
                        onChange={(e) => setNewPostTitle(e.target.value)}
                        placeholder="Tytuł"
                    />
                    <textarea
                        className="userPostInput"
                        value={newPostBody}
                        onChange={(e) => setNewPostBody(e.target.value)}
                        placeholder="Treść"
                    />
                    <button className="newPostButton" onClick={handleAddPost}>
                        <FontAwesomeIcon icon={["fas", "add"]} size="lg" />
                    </button>
                </div>
            ) : null}
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
                            <div className={styles.editModeContainer}>
                                <input
                                    className={styles.inputField}
                                    value={editPostTitle}
                                    onChange={(e) =>
                                        setEditPostTitle(e.target.value)
                                    }
                                />
                                <textarea
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
                                    <FontAwesomeIcon
                                        icon={["fas", "save"]}
                                        size="lg"
                                        className={styles.faIconSave}
                                    />
                                </button>
                            </div>
                        ) : (
                            <div className={styles.article}>
                                <h2 className={styles.postTitle}>
                                    {post.title}
                                </h2>
                                <p className={styles.postBody}>{post.body}</p>
                                {showManipulateButtons ? (
                                    <div className={styles.buttonsContainer}>
                                        <button
                                            className={styles.button}
                                            onClick={() => handleEditPost(post)}
                                        >
                                            <FontAwesomeIcon
                                                icon={["fas", "edit"]}
                                                size="lg"
                                                className={styles.faIconEdit}
                                            />
                                        </button>
                                        <button
                                            className={styles.button}
                                            onClick={() => deletePost(post.id)}
                                        >
                                            <FontAwesomeIcon
                                                icon={["fas", "trash"]}
                                                size="lg"
                                                className={styles.faIconTrash}
                                            />
                                        </button>
                                    </div>
                                ) : null}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PostComponent;

{
    /* <div className={styles.addButton}>
                    <input
                        className={styles.newAlbumInput}
                        value={newAlbumTitle}
                        onChange={(e) => setNewAlbumTitle(e.target.value)}
                        placeholder="Nazwa nowego albumu"
                    />
                    <button className="newTodoButton" onClick={handleAddAlbum}>
                        <FontAwesomeIcon icon={["fas", "add"]} size="lg" />
                    </button>
                </div> */
}
