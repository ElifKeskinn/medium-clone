'use server'

import { redirect } from "next/navigation";
import { createClient } from "@/utils/supabase/server";

export async function SavePost(formData) {
    const title = formData.get('title');
    const content = formData.get('content');
    const supabase = createClient();

    const { data, error: userError } = await supabase.auth.getUser();
    const user = data.user;

    if (userError || !user) {
        console.log('Kullanıcı girişi yapmadı veya hata oluştu:', userError);
        redirect('/login');
    }


    const { data: postData, error } = await supabase
        .from('posts')
        .insert({ title, content, user_id: user.id })
        .select()
        .single();

        console.log('Post Data:', postData);
        console.log('Post Error:', error);
        
    if (error) {
        console.log(error);
        return;
    }

    redirect(`/post/${postData.id}`);
}