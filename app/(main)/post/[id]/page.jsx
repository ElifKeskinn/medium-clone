"use server"; 

import { createClient } from "@/utils/supabase/server";
import { notFound } from "next/navigation";
import Link from "next/link";
import styles from './page.module.css';
import LikeButton from "@/components/LikeButton";
import { commentSave } from "./commentSave"; 
import Comments from "./comments"; 
import SaveButton from "@/components/SaveButton";

export default async function PostDetail({ params }) {
  const supabase = createClient();

  const { data: post, error: postError } = await supabase
      .from('posts_with_user') 
      .select('id, title, content, created_at, user_id, email')
      .eq('id', params.id)
      .single();

  if (postError || !post) {
      console.log(postError);
      return notFound();
  }

  const { data: comments, error: commentsError } = await supabase
      .from('comments')
      .select('id, content, created_at, user_id, user_email') 
      .eq('post_id', params.id)
      .order('created_at', { ascending: true });

  if (commentsError) {
      console.log(commentsError);
  }

  
  const commentsWithUsers = await Promise.all(comments.map(async (comment) => {
      try {
          const { data: commentUser, error: commentUserError } = await supabase.auth.admin.getUserById(comment.user_id);

          if (commentUserError || !commentUser) {
              console.error("Kullanıcı bulunamadı:", comment.user_id);
              return { ...comment, user }; 
          }

          return { ...comment, user: commentUser }; 
      } catch (error) {
          console.error("Kullanıcı bilgisi çekilemedi:", error);
          return { ...comment, user: null };
      }
  }));

  const { data: userData } = await supabase.auth.getUser();
  const currentUser = userData?.user;

  const isOwner = currentUser && currentUser.id === post.user_id;

console.log(commentsWithUsers);

  return (
      <div className={styles.container}>
          <h1>{post.title}</h1>
          <p>{post.content}</p>
          <p>Yazar: {post.email}</p>
          <LikeButton postId={post.id} />
          <SaveButton postId={post.id} /> 
          {isOwner && (
              <div className={styles.actions}>
                  <Link href={`/post/${post.id}/edit`} className={styles.editButton}>Düzenle</Link>
              </div>
          )}
          <hr />
          <Comments comments={commentsWithUsers} /> 
          <hr />
          <h3>Yorum Yap</h3>
          <form action={commentSave} className={styles.commentForm}>
              <input type="hidden" name="postId" value={post.id} />
              <textarea name="content" placeholder="Yorumunuz" required className={styles.textarea}></textarea>
              <button type="submit" className={styles.button}>Yorum Gönder</button>
          </form>
      </div>
  );
}