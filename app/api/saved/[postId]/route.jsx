import { createClient } from '@/utils/supabase/server';

export async function POST(req, { params }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { error } = await supabase
        .from('bookmarks')
        .insert({ user_id: user.id, post_id: params.postId });

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}

export async function DELETE(req, { params }) {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    const { error } = await supabase
        .from('bookmarks')
        .delete()
        .eq('user_id', user.id)
        .eq('post_id', params.postId);

    if (error) {
        return new Response(JSON.stringify({ error: error.message }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
}
