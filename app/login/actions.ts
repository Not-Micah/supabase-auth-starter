'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import toast from 'react-hot-toast'

import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = createClient()
  console.log("Trying to log in")

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }


  revalidatePath('/', 'layout') 
  redirect('/account')
}

export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)
  console.log(error);

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  toast.error("Please verify then login.")
  redirect('./verification')
}