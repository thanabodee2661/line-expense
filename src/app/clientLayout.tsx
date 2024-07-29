"use client";

import Header from "@/components/header";
import { useEffect, useState } from "react";
import liff, { Liff } from "@line/liff";
import LiffContext from "@/contexts/line";
import { Profile } from "@liff/get-profile";

function ClientLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [liffObject, setLiffObject] = useState<Liff | null>(null);
  const [liffError, setLiffError] = useState<string | null>(null);
  const [profile, setProfile] = useState<Profile>();

  // useEffect(() => {
    liff
      .init({ liffId: "2005736477-2eRaENlj" })
      .then(() => {
        if (!liff.isLoggedIn()) {
          liff.login();
        }
        setLiffObject(liff);

        liffObject?.getProfile()
        .then((pf) => {
          setProfile(pf);
        });
      })
      .catch((error) => {
        console.log(`liff.init() failed: ${error}`);
        setLiffError(error.toString());
      });
  // }, []);

  return (
    <LiffContext.Provider value={liffObject}>
      <Header></Header>
      <div className="flex px-6 mb-4">
        {children}
      </div>
    </LiffContext.Provider>
  );
}

export default ClientLayout;
