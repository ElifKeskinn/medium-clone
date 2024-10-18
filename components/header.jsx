import {signOut} from "../app/login/actions";
import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function MainHeader() {
  const supabase = createClient();
  const {data: { user }} = await supabase.auth.getUser();
  console.log(user);

  return (
    <header> 
      <ul>
        <li>Anasayfa</li>
        <li>Hakkımda</li>
        <li>İletişim</li>
      </ul>

        {user? (
          <ul>
            <li>  Hoşgeldin {user.email} </li>
            <li>
              <form action={signOut}>
                <button>Çıkış yap</button>
              </form>
            </li>
          </ul>
        ) : (
          <ul>
            <Link href={"/login"}> Giriş yap </Link>
            <Link href={"/login"}> Kayıt ol </Link>
          </ul>
        )}
    </header>
  )
}