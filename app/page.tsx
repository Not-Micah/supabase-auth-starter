import Button from "@/components/Button";
import { createClient } from "@/utils/supabase/server";

const Home = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <main className="max-w-[800px] mx-auto mt-40
    bg-neutral-200 p-6 rounded-md drop-shadow-md 
    flex flex-col gap-y-4">
      <p className="text-xl underline">
        {user ? user.email : "You are not logged in."}
      </p>
    </main>
  );
};

export default Home;
