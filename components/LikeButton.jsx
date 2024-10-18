'use client'

import { useState, useEffect } from 'react';
import styles from './LikeButton.module.css';

export default function LikeButton({ postId }) {
    const [likes, setLikes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        // Beğeni sayısını çek
        fetch(`/api/posts/${postId}/likes`)
            .then(res => res.json())
            .then(data => {
                setLikes(data.count);
                // Kullanıcının bu postu beğenip beğenmediğini kontrol et
                fetch(`/api/posts/${postId}/likes/check`)
                    .then(res => res.json())
                    .then(checkData => setLiked(checkData.liked));
            });
    }, [postId]);

    const handleLike = async () => {
        if (liked) {
            // Beğeniyi kaldır
            const res = await fetch(`/api/posts/${postId}/likes`, {
                method: 'DELETE',
            });
            if (res.ok) {
                setLikes(likes - 1);
                setLiked(false);
            }
        } else {
            // Beğeni ekle
            const res = await fetch(`/api/posts/${postId}/likes`, {
                method: 'POST',
            });
            if (res.ok) {
                setLikes(likes + 1);
                setLiked(true);
            }
        }
    };

    return (
        <button onClick={handleLike} className={styles.likeButton}>
            {liked ? '👍 Beğenildi' : '👍 Beğen'}
            <span className={styles.likeCount}>{likes}</span>
        </button>
    );
}
