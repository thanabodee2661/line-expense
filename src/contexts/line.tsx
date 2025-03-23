import { createContext } from "react";
import { Profile } from "@liff/get-profile";

const ProfileContext = createContext<Profile | null>(null);

export default ProfileContext