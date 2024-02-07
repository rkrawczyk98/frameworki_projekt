import React, { useState, useEffect } from "react";
import { useComments } from "../../contexts/CommentContext";
import { Comment } from "../../types/Comment";
import { useAuth } from "../../contexts/UserContext";
import styles from "../../components/comment/styles.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "font-awesome/css/font-awesome.min.css";

interface CommentComponentProps {
    postId: number;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ postId }) => {
    const { comments, addComment, deleteComment } = useComments();
    const { user } = useAuth();
    const [newCommentBody, setNewCommentBody] = useState("");

    const postComments = comments.filter(
        (comment) => comment.postId === postId
    );

    const handleAddComment = () => {
        if (user && newCommentBody) {
            const newComment = {
                postId,
                id: Math.max(...comments.map((a) => a.id), 0) + 1,
                name: user.name,
                email: user.email,
                body: newCommentBody,
            };
            addComment(newComment);
            setNewCommentBody("");
        }
    };

    return (
        <div>
            {postComments.map((comment) => (
                <div className={styles.comment} key={comment.id}>
                    <p className={styles.commentBody}>{comment.body}</p>
                    <p className={styles.commentAuthor}>{comment.name}</p>
                    {user && user.email === comment.email ? (
                        <button
                            className={styles.deleteComment}
                            onClick={() => deleteComment(comment.id)}
                        >
                            <FontAwesomeIcon
                                icon={["fas", "trash"]}
                                size="lg"
                            />
                        </button>
                    ) : null}
                </div>
            ))}
            {user && (
                <div className={styles.newComment}>
                    <textarea
                        className={styles.newCommentInput}
                        value={newCommentBody}
                        onChange={(e) => setNewCommentBody(e.target.value)}
                        placeholder="Dodaj komentarz"
                    />
                    <button
                        className="newTodoButton"
                        onClick={handleAddComment}
                    >
                        <FontAwesomeIcon icon={["fas", "add"]} size="lg" />
                    </button>
                </div>
            )}
        </div>
    );
};

export default CommentComponent;
