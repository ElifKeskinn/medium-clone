'use server'

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function addComment(formData, { params }) {
    const content = formData.get('content');
    const supabase = createClient();

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user){
        console.log('Kullanıcı girişi yapmadı veya hata oluştu:', userError);
        redirect('/login');
    }

    const { error } = await supabase
        .from('comments')
        .insert({
            content,
            user_id: user.id,
            post_id: params.id
        });

    if (error){
        console.log(error);
        return;
    }

    redirect(`/post/${params.id}`);
}
