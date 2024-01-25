import React, { useState, useEffect } from 'react';
import { useComments } from '../../contexts/CommentContext';
import { Comment } from '../../types/Comment';
import { useAuth } from '../../contexts/UserContext';

interface CommentComponentProps {
    postId: number;
}

const CommentComponent: React.FC<CommentComponentProps> = ({ postId }) => {
    const { comments, addComment, deleteComment } = useComments();
    const { user } = useAuth();
    const [newCommentBody, setNewCommentBody] = useState('');

    const postComments = comments.filter(comment => comment.postId === postId);

    const handleAddComment = () => {
        if (user && newCommentBody) {
            const newComment = {
                postId,
                id: Math.max(...comments.map(a => a.id), 0) + 1,
                name: user.name,
                email: user.email,
                body: newCommentBody,
            };
            addComment(newComment);
            setNewCommentBody('');
        }
    };

    return (
        <div>
            {postComments.map(comment => (
                <div key={comment.id}>
                    <p>{comment.body} - {comment.name}</p>
                    {user && user.email === comment.email ? (
                        <button onClick={() => deleteComment(comment.id)}>Usuń</button>
                    ) : null}
                </div>
            ))}
            {user && (
                <div>
                    <textarea
                        value={newCommentBody}
                        onChange={e => setNewCommentBody(e.target.value)}
                        placeholder="Dodaj komentarz"
                    />
                    <button onClick={handleAddComment}>Dodaj Komentarz</button>
                </div>
            )}
        </div>
    );
};

export default CommentComponent;
