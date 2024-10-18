import styles from './page.module.css';

export default function Contact() {
    return (
        <div className={styles.container}>
            <h1>İletişim</h1>
            <p>Bize ulaşmak için aşağıdaki formu doldurabilirsiniz.</p>
            <form className={styles.form}>
                <label htmlFor="name">İsim:</label>
                <input id="name" name="name" type="text" required className={styles.input} />

                <label htmlFor="email">Email:</label>
                <input id="email" name="email" type="email" required className={styles.input} />

                <label htmlFor="message">Mesaj:</label>
                <textarea id="message" name="message" required className={styles.textarea}></textarea>

                <button type="submit" className={styles.button}>Gönder</button>
            </form>
        </div>
    )
}
