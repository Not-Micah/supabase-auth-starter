import { createClient } from "@/utils/supabase/server";

import Box from "@/components/Box";

const Home = async () => {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: users } = await supabase.from("profiles").select();

  return (
    <Box className="bg-white rounded-md p-12 flex flex-col justify-center items-start md:drop-shadow-md">
      <div className="mb-8">
        <p className="uppercase dynamic-text font-bold">Logged in as</p>
        <p className="dyanmic-text underline">
          {user ? user.email : "You are not logged in."}
        </p>
      </div>
      <div className="">
        <p className="uppercase dynamic-text font-bold">Other user ids</p>
        {
          users?.map((userData) => (
            <div className="dynamic-text" key={userData.id}>
              {userData.id}
            </div>
          ))
        }
      </div>
    </Box>
  );
};

export default Home;
