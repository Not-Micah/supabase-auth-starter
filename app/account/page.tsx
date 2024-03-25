import AccountForm from './accountForm'
import { createClient } from '@/utils/supabase/server'

export default async function Account() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  console.log(user)

  return <div className="mt-40">
    <AccountForm user={user} />
  </div>
}