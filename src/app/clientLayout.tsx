"use client";

import Header from "@/components/header";
import { Suspense, useEffect, useState } from "react";
import liff, { Liff } from "@line/liff";
import ProfileContext from "@/contexts/line";
import { Profile } from "@liff/get-profile";
import Loading from "./loading";

function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    console.log("use effect");

    liff
      .init({ liffId: "2005736477-2eRaENlj" })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }

        liff.getProfile().then((pf) => {
          console.log("get profile:", pf);

          setProfile(pf);
        });

        console.log("profile: ", profile);
      })
      .catch((error) => {
        console.log(`liff.init() failed: ${error}`);
      });
  }, []);

  if (!profile) return <Loading />;

  return (
    <ProfileContext.Provider value={profile}>
      <Suspense fallback={<Loading />}>
        <Header></Header>
        <div className="flex px-6 mb-4">{children}</div>
      </Suspense>
    </ProfileContext.Provider>
  );
}

export default ClientLayout;
