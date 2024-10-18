'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { updatePost, deletePost } from '../../../../actions/postActions';

export default function EditPostForm({ post, params }) {
    console.log('EditPostForm received params:', params); 

    const router = useRouter();
    const [title, setTitle] = useState(post.title);
    const [content, setContent] = useState(post.content);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await updatePost(params.id, title, content);

            if (res.ok) {
                router.push(`/post/${params.id}`);
            } else {
                const errorData = await res.json();
                console.error('Yazı güncellenirken hata oluştu:', errorData.error);
            }
        } catch (error) {
            console.error('Yazı güncellenirken beklenmeyen bir hata oluştu:', error);
        }
    };

    const handleDelete = async () => {
        if (!confirm('Bu yazıyı silmek istediğinizden emin misiniz?')) return;

        try {
            const res = await deletePost(params.id);

            if (res.ok) {
                router.push('/');
            } else {
                const errorData = await res.json();
                console.error('Yazı silinirken hata oluştu:', errorData.error);
            }
        } catch (error) {
            console.error('Yazı silinirken beklenmeyen bir hata oluştu:', error);
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
