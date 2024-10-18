
import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    const supabase = createClient();
    const postId = params.id;

    const formData = await request.formData();
    const content = formData.get('content');

    // Kullanıcı doğrulama
    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({ error: 'Kullanıcı girişi yapmadı.' }, { status: 401 });
    }

    // Yorum ekleme
    const { data: commentData, error } = await supabase
        .from('comments')
        .insert({ content, user_id: user.id, post_id: postId })
        .select()
        .single();

    if (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.redirect(`/post/${postId}`);
}

export async function GET(request, { params }) {
    const supabase = createClient();
    const postId = params.id;

    const { data: comments, error } = await supabase
        .from('comments')
        .select('id, content, created_at, user_id, auth.users(email)')
        .eq('post_id', postId)
        .order('created_at', { ascending: true });

    if (error) {
        console.log(error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ comments });
}
