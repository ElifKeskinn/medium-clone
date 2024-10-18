'use client'

import { SavePost } from './action';
import styles from './page.module.css';

export default function NewPost() {
    return (
        <div className={styles.container}>
            <h1>Yeni Yazı Oluştur</h1>
            <form action={SavePost} className={styles.form}>
                <input type="text" name="title" placeholder="Yazı Başlığı" required className={styles.input} />
                <br />
                <textarea name="content" placeholder="Yazı İçeriği" required className={styles.textarea}></textarea>
                <br />
                <button type="submit" className={styles.button}>Yazıyı Paylaş</button>
            </form>
        </div>
    )
}
