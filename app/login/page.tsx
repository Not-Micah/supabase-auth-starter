import { login, signup } from "./actions";
import { createClient } from "@/utils/supabase/server";

import Box from "@/components/Box";

export default async function LoginPage() {
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <Box className="bg-white rounded-md p-12 flex flex-col justify-center items-center md:drop-shadow-md">
        <form>
          <div className="form">
            <label className="form-label" htmlFor="email">Email:</label>
            <input className="form-entry" id="email" name="email" type="email" required />
          </div>
          <div className="form">
            <label className="form-label" htmlFor="password">Password:</label>
            <input className="form-entry" id="password" name="password" type="password" required />
          </div>
          <div className="form-row mt-5">
            <button className="button dynamic-text" formAction={login}>Log in</button>
            <button className="button dynamic-text" formAction={signup}>Sign up</button>
          </div>
        </form>
      </Box>
    );
  } else {
    return (
      <Box className="flex justify-center items-center">
        <p className="dynamic-text">You are already logged in.</p>
      </Box>
    )
  }
}

