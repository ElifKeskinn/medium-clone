'use client'; 

import React from 'react';
import styles from './comments.module.css';
import LikeButton from '@/components/LikeButton';

export default function Comments({ comments }) {
    console.log(...comments);
    return (
        <div className={styles.commentsContainer}>
            <h3>Yorumlar</h3>
            {comments && comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id} className={styles.comment}>
                        <p>{comment.content}</p>
                        <p><em>Yazan: {comment.user_email || 'Bilinmeyen Kullanıcı'}</em></p>
                        <LikeButton postId={comment.id} /> 
                    </div>
                ))
            ) : (
                <p>Henüz yorum yapılmamış.</p>
            )}
        </div>
    );
}
