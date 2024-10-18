import EditPostForm from './EditPostForm';
import { createClientInstance } from "@/utils/supabase/server";
import { redirect } from 'next/navigation';

export default async function EditPostPage({ params }) {
    console.log('EditPostPage params:', params); 

    const supabase = createClientInstance();
    const postId = params.id;

    const { data: post, error } = await supabase
        .from('posts_with_user')
        .select('id, title, content, user_id')
        .eq('id', postId)
        .single();

    if (error || !post) {
        console.error('Post bulunamadı:', error);
        return redirect('/');
    }

    const { data: userData, error: userError } = await supabase.auth.getUser();
    const user = userData.user;

    if (userError || !user) {
        console.error('Kullanıcı doğrulanamadı:', userError);
        return redirect('/');
    }

    if (user.id !== post.user_id) {
        console.error('Kullanıcı bu yazıyı düzenleme yetkisine sahip değil.');
        return redirect('/');
    }

    return <EditPostForm post={post} params={params} />;
}
