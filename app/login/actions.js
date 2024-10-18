'use server'
//sigout signup login
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/utils/supabase/server'

export async function login(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
    options: {
      data: {
        username: formData.get('username'),
        username: formData.get('username'),
        phone: formData.get('phone'),
        interests: formData.getAll('interests'),  
      }
    }
  };
  

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    console.log(error);
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signup(formData) {
  const supabase = createClient()

  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    console.log(error);
    return;
  }

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function signOut() {
  const supabase = createClient()
  const { error } = await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/')

}



/*
alabildiğin kadar 
metadata alacaksın
admin panel olacak
kullanıcılar olacak

*/