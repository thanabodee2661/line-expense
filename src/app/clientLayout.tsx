"use client";

import Header from "@/components/header";
import { useEffect, useState } from "react";
import liff, { Liff } from "@line/liff";
import ProfileContext from "@/contexts/line";
import { Profile } from "@liff/get-profile";

function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    console.log("use effect");
    
    liff
      .init({ liffId: "2005736477-2eRaENlj" })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        setLiffObject(liff);

        console.log("init profile: ", liffObject);
        
        liff.getProfile()
        .then((pf) => {
          console.log("get profile:", pf);
          
          setProfile(pf);
        });

        console.log("profile: ", profile);
        
      })
      .catch((error) => {
        console.log(`liff.init() failed: ${error}`);
        setLiffError(error.toString());
      });
  }, []);

  return (
    <ProfileContext.Provider value={profile}>
      <Header></Header>
      <div className="flex px-6 mb-4">
        {children}
      </div>
    </ProfileContext.Provider>
  );
}

export default ClientLayout;
