
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { NextResponse } from "next/server"

export async function POST(request, { params }) {
    const supabase = createServerComponentClient({ cookies })

    const postId = params.id
    const formData = await request.formData()
    const content = formData.get('content')

    console.log('Yorum içeriği:', content) 
    const { data: { session }, error: sessionError } = await supabase.auth.getSession()

    if (sessionError || !session) {
        console.log('Kullanıcı girişi yapmadı veya hata oluştu:', sessionError)
        return NextResponse.json({ error: 'Kullanıcı girişi yapmadı.' }, { status: 401 })
    }

    const user = session.user

    const { data: commentData, error } = await supabase
        .from('comments')
        .insert([{ content, user_id: user.id, post_id: postId }])
        .select()
        .single()

    if (error) {
        console.log('Yorum eklenirken hata oluştu:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.redirect(`/post/${postId}`)
}

export async function GET(request, { params }) {
    const supabase = createServerComponentClient({ cookies })
    const postId = params.id

    const { data: comments, error } = await supabase
        .from('comments')
        .select(
            'id, content, created_at, user_id, user (email)'
        )
        .eq('post_id', postId)
        .order('created_at', { ascending: true })

    if (error) {
        console.log('Yorumları çekerken hata oluştu:', error)
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ comments })
}
