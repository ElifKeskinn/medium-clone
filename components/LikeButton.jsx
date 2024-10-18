'use client'

import { useState, useEffect } from 'react';
import styles from './LikeButton.module.css';
import { useRouter } from 'next/navigation';

export default function LikeButton({ postId }) {
    const [liked, setLiked] = useState(false);
    const [count, setCount] = useState(0);
    const router = useRouter();

    useEffect(() => {
        const fetchLikes = async () => {
            const res = await fetch(`/post/${postId}/likes`);
            const data = await res.json();
            if (res.ok) {
                setLiked(data.liked);
                setCount(data.count);
            }
        };

        fetchLikes();
    }, [postId]);

    const handleLike = async () => {
        if (!liked) {
            const res = await fetch(`/post/${postId}/likes`, {
                method: 'POST',
            });

            if (res.ok) {
                setLiked(true);
                setCount(count + 1);
            } else {
                const data = await res.json();
                alert(data.error || 'Beğeni eklenirken bir hata oluştu.');
            }
        } else {
            const res = await fetch(`/post/${postId}/likes`, {
                method: 'DELETE',
            });

            if (res.ok) {
                setLiked(false);
                setCount(count - 1);
            } else {
                const data = await res.json();
                alert(data.error || 'Beğeni kaldırılırken bir hata oluştu.');
            }
        }
    };

    return (
        <button onClick={handleLike} className={styles.likeButton}>
            {liked ? 'Beğenildi 👍' : 'Beğen 👍'} ({count})
        </button>
    );
}
