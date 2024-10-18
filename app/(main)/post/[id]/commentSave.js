"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function commentSave(formData) {
    const content = formData.get("content");
    const postId = formData.get("postId");

    console.log("Post IDaction:", postId); 
    console.log("Contentaction:", content);

    if (!content || content.trim() === "") {
        throw new Error("Yazı alanı boş olamaz");
    }

    const supabase = createClient();
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        redirect("/");
    }

    console.log("User Emailaction:", user.email); 

    const { data, error } = await supabase
        .from('comments')
        .insert([
            { content, user_id: user.id, post_id: postId, user_email: user.email  } 
        ])
        .select()
        .single();

    if (error) {
        console.error("Comment insertion error:", error);
        throw new Error("Yorum kaydedilirken bir hata oluştu.");
    }

    revalidatePath(`/post/${postId}`);
}
