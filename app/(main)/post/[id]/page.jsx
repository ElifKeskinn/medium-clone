import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import styles from './page.module.css';
import LikeButton from "@/components/LikeButton";

export default async function PostDetail({ params }) {
    const supabase = createClient();

    const { data: post, error: postError } = await supabase
        .from('posts')
        .select('id, title, content, created_at, users(id, email)')
        .eq('id', params.id)
        .single();

    if (postError || !post) {
        console.log(postError);
        return notFound();
    }

    const { data: comments, error: commentsError } = await supabase
        .from('comments')
        .select('id, content, created_at, users(id, email)')
        .eq('post_id', params.id)
        .order('created_at', { ascending: true });

    if (commentsError) {
        console.log(commentsError);
    }

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    const isOwner = user && user.id === post.users.id;

    return (
        <div className={styles.container}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
            <p>Yazar: {post.users.email}</p>
            <LikeButton postId={post.id} />
            {isOwner && (
                <div className={styles.actions}>
                    <Link href={`/post/${post.id}/edit`} className={styles.editButton}>Düzenle</Link>
                </div>
            )}
            <hr />
            <h2>Yorumlar</h2>
            {comments && comments.length > 0 ? (
                comments.map(comment => (
                    <div key={comment.id} className={styles.comment}>
                        <p>{comment.content}</p>
                        <p><em>Yazan: {comment.users.email}</em></p>
                    </div>
                ))
            ) : (
                <p>Henüz yorum yapılmamış.</p>
            )}
            <hr />
            <h3>Yorum Yap</h3>
            <form action={addComment} className={styles.commentForm}>
                <textarea name="content" placeholder="Yorumunuz" required className={styles.textarea}></textarea>
                <button type="submit" className={styles.button}>Yorum Gönder</button>
            </form>
        </div>
    )
}
