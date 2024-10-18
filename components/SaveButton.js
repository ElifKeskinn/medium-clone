'use client';

import { useState, useEffect } from 'react';
import styles from './LikeButton.module.css';
import { useRouter } from 'next/navigation';

export default function SaveButton({ postId }) {
    const [saved, setSaved] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const fetchSaved = async () => {
            const res = await fetch(`/saved/${postId}`);
            const data = await res.json();
            if (res.ok) {
                setSaved(data.saved);
            }
        };

        fetchSaved();
    }, [postId]);

    const handleSave = async () => {
        if (!saved) {
            const res = await fetch(`/api/saved/${postId}`, {  // Burada /api/saved/[postId] kullanılıyor
                method: 'POST', 
            });
    
            if (res.ok) {
                setSaved(true);
            } else {
                const data = await res.json();
                alert(data.error || 'Kaydetme işlemi sırasında bir hata oluştu.');
            }
        } else {
            const res = await fetch(`/api/saved/${postId}`, {  // DELETE işlemi de aynı şekilde güncelleniyor
                method: 'DELETE', 
            });
    
            if (res.ok) {
                setSaved(false);
            } else {
                const data = await res.json();
                alert(data.error || 'Kaydetme işlemi iptal edilirken bir hata oluştu.');
            }
        }
    };
    

    return (
        <button onClick={handleSave} className={styles.likeButton}>
            {saved ? 'Kaydedildi 💾' : 'Kaydet 💾'}
        </button>
    );
}
