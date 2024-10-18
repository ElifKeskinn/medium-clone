import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import styles from './page.module.css';

export default async function ProfilePage() {
    const supabase = createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return <p>Kullanıcı girişi yapmadı. <Link href="/login">Giriş Yap</Link></p>;
    }

    const { data: posts, error: postsError } = await supabase
        .from('posts')
        .select('id, title, created_at')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

    if (postsError) {
        console.log(postsError);
        return <p>Yazılarınızı çekerken hata oluştu.</p>;
    }

    const { data: savedPosts, error: savedError } = await supabase
    .from('bookmarks')
    .select('post_id, posts(title, created_at)')
    .eq('user_id', user.id);
    if (savedError) {
        console.log(savedError);
        return <p>Kaydedilen postları çekerken hata oluştu.</p>;
    }

    return (
        <div className={styles.container}>
            <h1>Profil</h1>
            <p>Email: {user.email}</p>

            <h2>Yazılarınız</h2>
            {posts && posts.length > 0 ? (
                <ul className={styles.postList}>
                    {posts.map(post => (
                        <li key={post.id} className={styles.postItem}>
                            <Link href={`/post/${post.id}`} className={styles.postLink}>{post.title}</Link>
                            <span className={styles.postDate}>{new Date(post.created_at).toLocaleDateString()}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Henüz yazı oluşturmadınız.</p>
                
            )}
             <h2>Kaydedilen Postlar</h2>
            {savedPosts && savedPosts.length > 0 ? (
                <ul className={styles.postList}>
                    {savedPosts.map(saved => (
                        <li key={saved.post_id} className={styles.postItem}>
                            <Link href={`/post/${saved.post_id}`} className={styles.postLink}>{saved.posts.title}</Link>
                            <span className={styles.postDate}>{new Date(saved.posts.created_at).toLocaleDateString()}</span>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Henüz kaydedilen post yok.</p>
            )}
        </div>
    )
}
