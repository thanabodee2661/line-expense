import { Liff } from "@line/liff";
import { createContext } from "react";

const LiffContext = createContext<Liff | null>(null);

export default LiffContext