// Bu fonksiyon, oturum açmış kullanıcının belirli bir 
//gönderiyi beğenip beğenmediğini kontrol eder
// ve sonucu döndürür

import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    const supabase = createClient();
    const postId = params.id;

    const { data: { user }, error: userError } = await supabase.auth.getUser();

    if (userError || !user) {
        return NextResponse.json({ liked: false });
    }

    const { data, error } = await supabase
        .from('likes')
        .select('*')
        .eq('post_id', postId)
        .eq('user_id', user.id)
        .single();

    if (error) {
        return NextResponse.json({ liked: false });
    }

    return NextResponse.json({ liked: true });
}
