import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import styles from './page.module.css';
import LikeButton from "@/components/LikeButton";
import { addComment } from './comments';

export default async function PostDetail({ params }) {
    const supabase = createClient();

  // View üzerinden yazıyı ve kullanıcı bilgilerini çekiyoruz
  const { data: post, error: postError } = await supabase
  .from('posts_with_user')
  .select('id, title, content, created_at, user_id, email')
  .eq('id', params.id)
  .single();

if (postError || !post) {
  console.log(postError);
  return notFound();
}

// Yorumları çekiyoruz
const { data: comments, error: commentsError } = await supabase
  .from('comments')
  .select('id, content, created_at, user_id')
  .eq('post_id', params.id)
  .order('created_at', { ascending: true });

if (commentsError) {
  console.log(commentsError);
}

// Yorumları kullanıcı bilgileri ile birleştiriyoruz
const commentsWithUsers = await Promise.all(comments.map(async (comment) => {
  const { data: commentUser, error: commentUserError } = await supabase
      .from('auth.users')
      .select('id, email')
      .eq('id', comment.user_id)
      .single();

  if (commentUserError || !commentUser) {
      return { ...comment, user: null };
  }

  return { ...comment, user: commentUser };
}));

// Mevcut kullanıcıyı alıyoruz
const { data: userData } = await supabase.auth.getUser();
const currentUser = userData.user;

const isOwner = currentUser && currentUser.id === post.user_id;

return (
  <div className={styles.container}>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <p>Yazar: {post.email}</p>
      <LikeButton postId={post.id} />
      {isOwner && (
          <div className={styles.actions}>
              <Link href={`/post/${post.id}/edit`} className={styles.editButton}>Düzenle</Link>
          </div>
      )}
      <hr />
      <h2>Yorumlar</h2>
      {commentsWithUsers && commentsWithUsers.length > 0 ? (
          commentsWithUsers.map(comment => (
              <div key={comment.id} className={styles.comment}>
                  <p>{comment.content}</p>
                  {comment.user && <p><em>Yazan: {comment.user.email}</em></p>}
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
/*bu dosyada supabase problemleri yüzünden 
farklı bir yaklaşım izlenmiştir 
supabase sql editörde
CREATE VIEW public.posts_with_user AS
SELECT p.id, p.title, p.content, p.created_at, u.id AS user_id, u.email
FROM public.posts p
JOIN auth.users u ON p.user_id = u.id;

*/