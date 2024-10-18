import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import styles from './page.module.css';

export default async function Home() {
    const supabase = createClient();

    const { data: posts, error } = await supabase
        .from('posts_with_user')
        .select('id, title, created_at, user_id, email')
        .order('created_at', { ascending: false });

    if (error){
        console.log(error);
        return <p>Bir hata oluştu.</p>;
    }

    return (
        <div className={styles.container}>
            <h1>Anasayfa</h1>
            <Link href="/new-post" className={styles.newPostButton}>Yeni Yazı Oluştur</Link>
            <div className={styles.posts}>
                {posts && posts.length > 0 ? (
                    posts.map(post => (
                        <div key={post.id} className={styles.post}>
                            <h2><Link href={`/post/${post.id}`}>{post.title}</Link></h2>
                            <p>Yazar: {post.email}</p>
                            <p>Tarih: {new Date(post.created_at).toLocaleDateString()}</p>
                        </div>
                    ))
                ) : (
                    <p>Henüz yazı yok.</p>
                )}
            </div>
        </div>
    )
}
