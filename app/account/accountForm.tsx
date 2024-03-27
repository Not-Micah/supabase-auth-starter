"use client";

import { useCallback, useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Box from "@/components/Box";

export default function AccountForm({ user }: { user: User | null }) {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [website, setWebsite] = useState<string | null>(null);
  const [avatar_url, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from("profiles")
        .select("full_name, username, website, avatar_url")
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      toast.error("It seems you are not logged in or our servers are down!");
      router.replace("./");
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    website: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await supabase.from("profiles").upsert({
        id: user?.id as string,
        full_name: fullname,
        username,
        website,
        avatar_url,
        updated_at: new Date().toISOString(),
      });
      if (error) throw error;
      toast.success("Profile updated!");
    } catch (error) {
      toast.error("Error updating the data!");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Box className="bg-white rounded-md p-12 flex flex-col justify-center items-center md:drop-shadow-md">
      <div className="form">
        <label className="form-label" htmlFor="email">Email</label>
        <input className="form-entry" id="email" type="text" value={user?.email} disabled />
      </div>
      <div className="form">
        <label className="form-label" htmlFor="fullName">Full Name</label>
        <input className="form-entry" id="fullName" type="text" value={fullname || ""} onChange={(e) => setFullname(e.target.value)} />
      </div>
      <div className="form">
        <label className="form-label" htmlFor="username">Username</label>
        <input className="form-entry" id="username" type="text" value={username || ""} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div className="form">
        <label className="form-label" htmlFor="website">Website</label>
        <input className="form-entry" id="website" type="url" value={website || ""} onChange={(e) => setWebsite(e.target.value)} />
      </div>
      <div className="form-row mt-4">
        <button className="button" onClick={() => updateProfile({ fullname, username, website, avatar_url })} disabled={loading}>
          {loading ? "Loading ..." : "Update"}
        </button>
        <form action="/auth/signout" method="post">
          <button className="button" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </Box>
  );
}
