'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';

export default function EditPost({ params, post }) {
    const router = useRouter();
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const res = await fetch(`/api/posts/${params.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, content }),
        });

        if (res.ok) {
            router.push(`/post/${params.id}`);
        } else {
            console.error('Yazı güncellenirken hata oluştu.');
        }
    };

    const handleDelete = async () => {
        const res = await fetch(`/api/posts/${params.id}`, {
            method: 'DELETE',
        });

        if (res.ok) {
            router.push('/');
        } else {
            console.error('Yazı silinirken hata oluştu.');
        }
    };

    return (
        <div className={styles.container}>
            <h1>Yazıyı Düzenle</h1>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="text"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Yazı Başlığı"
                    required
                    className={styles.input}
                />
                <textarea
                    name="content"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Yazı İçeriği"
                    required
                    className={styles.textarea}
                ></textarea>
                <button type="submit" className={styles.button}>Yazıyı Güncelle</button>
            </form>
            <button onClick={handleDelete} className={styles.deleteButton}>Yazıyı Sil</button>
        </div>
    );
}
