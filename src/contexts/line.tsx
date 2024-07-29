import { Liff } from "@line/liff";
import { createContext } from "react";
import { Profile } from "@liff/get-profile";

const LiffContext = createContext<Liff | null>(null);
const ProfileContext = createContext<Profile | null>(null);

export default ProfileContext