import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const supabase = createClient();
    const postId = params.id;

    const { count, error } = await supabase
        .from('likes')
        .select('*', { count: 'exact', head: true })
        .eq('post_id', postId);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    const { data: userData } = await supabase.auth.getUser();
    const user = userData.user;

    let liked = false;
    if (user) {
        const { data, error } = await supabase
            .from('likes')
            .select('*')
            .eq('post_id', postId)
            .eq('user_id', user.id)
            .single();

        if (!error && data) {
            liked = true;
        }
    }

    return NextResponse.json({ count, liked });
}

export async function POST(request, { params }) {
    const supabase = createClient();
    const postId = params.id;

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({ error: 'Kullanıcı girişi yapmadı.' }, { status: 401 });
    }

    const { data, error: selectError } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

    if (data) {
        return NextResponse.json({ error: 'Zaten beğenildi.' }, { status: 400 });
    }

    const { error } = await supabase
        .from('likes')
        .insert({ post_id: postId, user_id: user.id });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Beğeni eklendi.' }, { status: 200 });
}

export async function DELETE(request, { params }) {
    const supabase = createClient();
    const postId = params.id;

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({ error: 'Kullanıcı girişi yapmadı.' }, { status: 401 });
    }

    const { error } = await supabase
        .from('likes')
        .delete()
        .eq('post_id', postId)
        .eq('user_id', user.id);

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ message: 'Beğeni kaldırıldı.' }, { status: 200 });
}
