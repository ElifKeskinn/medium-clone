// middleware.ts
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import  { NextRequest } from 'next/server'

export async function middleware(req) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  // Oturumu al
  const { data: { session } } = await supabase.auth.getSession()

  // Eğer oturum yoksa, isterseniz kullanıcıyı yönlendirebilirsiniz
  /*
  if (!session) {
    const redirectUrl = req.nextUrl.clone()
    redirectUrl.pathname = '/login'
    return NextResponse.redirect(redirectUrl)
  }
  */

  return res
}

export const config = {
  matcher: [
    /*
    Middleware tüm yollar için geçerli olacak şekilde ayarlanmıştır,
    ancak _next/static, _next/image ve favicon.ico gibi statik dosya yollarını hariç tutar.
    */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
