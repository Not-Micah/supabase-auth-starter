import Button from "@/components/Button";
import { login, signup } from "./actions";

export default function LoginPage() {
  return (
    <form className="max-w-[800px]
    flex flex-col justify-start items-start gap-y-4
    mx-auto p-6 mt-40
    rounded-md shadow-md bg-neutral-200">
      <div className="form">
        <label className="form-label" htmlFor="email">Email:</label>
        <input className="form-entry" id="email" name="email" type="email" required />
      </div>
      <div className="form">
        <label className="form-label" htmlFor="password">Password:</label>
        <input className="form-entry" id="password" name="password" type="password" required />
      </div>
      <div className="flex justify-start items-center gap-x-4 mt-4">
        <Button formAction={login}>Log in</Button>
        <Button formAction={signup}>Sign up</Button>
      </div>
    </form>
  );
}

