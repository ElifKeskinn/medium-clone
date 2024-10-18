'use client'

import React from 'react';
import styles from './comments.module.css';

export default function Comments({ comments }) {
    return (
        <div className={styles.commentsContainer}>
            <h3>Yorumlar</h3>
            {comments && comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id} className={styles.comment}>
                        <p>{comment.content}</p>
                        <p><em>Yazan: {comment.user?.email || 'Bilinmeyen Kullanıcı'}</em></p>
                    </div>
                ))
            ) : (
                <p>Henüz yorum yapılmamış.</p>
            )}
            <form action={`/post/${comments.postId}/comments`} method="POST" className={styles.commentForm}>
                <textarea name="content" placeholder="Yorumunuz" required className={styles.textarea}></textarea>
                <button type="submit" className={styles.button}>Yorum Gönder</button>
            </form>
        </div>
    )
}
