'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function updatePost(params, formData) {
    const title = formData.get('title');
    const content = formData.get('content');
    const supabase = createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        console.log('Kullanıcı girişi yapmadı veya hata oluştu:', userError);
        redirect('/login');
    }

    // Postun sahibi olup olmadığını kontrol et
    const { data: post, error: postError } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', params.id)
        .single();

    if (postError || !post) {
        console.log(postError);
        redirect('/');
    }

    if (post.user_id !== user.id) {
        console.log('Kullanıcı bu yazıyı düzenleme yetkisine sahip değil.');
        redirect('/');
    }

    const { error } = await supabase
        .from('posts')
        .update({ title, content })
        .eq('id', params.id);

    if (error) {
        console.log(error);
        return;
    }

    revalidatePath(`/post/${params.id}`);
    redirect(`/post/${params.id}`);
}

export async function deletePost(params) {
    const supabase = createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        console.log('Kullanıcı girişi yapmadı veya hata oluştu:', userError);
        redirect('/login');
    }

    // Postun sahibi olup olmadığını kontrol et
    const { data: post, error: postError } = await supabase
        .from('posts')
        .select('user_id')
        .eq('id', params.id)
        .single();

    if (postError || !post) {
        console.log(postError);
        redirect('/');
    }

    if (post.user_id !== user.id) {
        console.log('Kullanıcı bu yazıyı silme yetkisine sahip değil.');
        redirect('/');
    }

    const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', params.id);

    if (error) {
        console.log(error);
        return;
    }

    revalidatePath('/');
    redirect('/');
}
