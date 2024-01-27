import React, { useState, useEffect } from 'react';
import { useComments } from '../../contexts/CommentContext';
import { Comment } from '../../types/Comment';
import { useAuth } from '../../contexts/UserContext';
import "./styles.css"

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
        <div className='comment-container'>
            <h3>Komentarze</h3>
            {postComments.map(comment => (
                <div key={comment.id} className='comment'>
                    <p><b>{comment.name} - </b>{comment.body}{user && user.email === comment.email ? (
                        <button onClick={() => deleteComment(comment.id)}>Usuń</button>
                    ) : null}</p>
                    
                </div>
            ))}
            {user && (
                <div className="z">
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
