import { signOut } from "../app/login/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import styles from './header.module.css';

export default async function MainHeader() {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <header className={styles.header}> 
            <nav>
                <ul className={styles.navList}>
                    <li><Link href="/">Anasayfa</Link></li>
                    <li><Link href="/about">Hakkımda</Link></li>
                    <li><Link href="/contact">İletişim</Link></li>
                    {user && <li><Link href="/profile">Profil</Link></li>}
                </ul>
            </nav>

            {user ? (
                <div className={styles.userSection}>
                    <span>Hoşgeldin, {user.email}</span>
                    <form action={signOut} className={styles.form}>
                        <button type="submit" className={styles.button}>Çıkış Yap</button>
                    </form>
                </div>
            ) : (
                <div className={styles.authLinks}>
                    <Link href="/login" className={styles.link}>Giriş Yap</Link>
                    <Link href="/signup" className={styles.link}>Kayıt Ol</Link>
                </div>
            )}
        </header>
    )
}
