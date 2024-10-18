export async function updatePost(id, title, content) {
    const res = await fetch(`/api/posts/${id}`, { 
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, content }),
    });
    if (!res.ok) {
        const errorText = await res.text(); 
        throw new Error(`Yazıyı güncellerken hata oluştu: ${errorText}`);
    }
    return res;
}

export async function deletePost(id) {
    const res = await fetch(`/api/posts/${id}`, { 
        method: 'DELETE',
    });
    if (!res.ok) {
        const errorText = await res.text();
        throw new Error(`Yazıyı silerken hata oluştu: ${errorText}`);
    }

    return res;
}
