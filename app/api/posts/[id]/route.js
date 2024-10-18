import { createClientInstance } from '@/utils/supabase/server';

export async function PUT(req, { params }) {
    const { id } = params;
    console.log(`PUT request received for post ID: ${id}`);

    try {
        const { title, content } = await req.json();
        console.log(`Updating post ID ${id} with title: ${title}`);

        const supabase = createClientInstance();

        const { error } = await supabase
            .from('posts')
            .update({ title, content })
            .eq('id', id);

        if (error) {
            console.error('Post güncellenirken hata:', error.message);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        console.log('Post başarıyla güncellendi.');
        return new Response(JSON.stringify({ message: 'Post güncellendi.' }), { status: 200 });
    } catch (error) {
        console.error('Beklenmeyen hata:', error);
        return new Response(JSON.stringify({ error: 'Beklenmeyen bir hata oluştu.' }), { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    const { id } = params;
    console.log(`DELETE request received for post ID: ${id}`);

    try {
        const supabase = createClientInstance();

        const { error } = await supabase
            .from('posts')
            .delete()
            .eq('id', id);

        if (error) {
            console.error('Post silinirken hata:', error.message);
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        console.log('Post başarıyla silindi.');
        return new Response(JSON.stringify({ message: 'Post silindi.' }), { status: 200 });
    } catch (error) {
        console.error('Beklenmeyen hata:', error);
        return new Response(JSON.stringify({ error: 'Beklenmeyen bir hata oluştu.' }), { status: 500 });
    }
}
