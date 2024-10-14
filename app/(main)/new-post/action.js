'use server'

import { redirect } from "next/dist/server/api-utils";

export async function SavePost(formData){
    const title = formData.get('title');
    const content = formData.get('content');
    const supabase = createClient();

    const {data: user} = await supabase.auth.getUser();

    if (!user){
        console.log('kullanıcı girişi yapmadı');
        redirect('/login');
    }


    const{error} = await supabase
    .from('posts')
    .insert(
        {title, content, user_id: user.id}  )
    .select()
    .single()
  


    if(error){
        console.log(error);
        return;
    }

    redirect(`/posts/${data.id}`);
}