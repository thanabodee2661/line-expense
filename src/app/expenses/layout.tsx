import { Suspense } from "react";
import Loading from "../loading";

function ExpenseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Suspense fallback={<Loading/>}>
      {children}
    </Suspense>
  );
}

export default ExpenseLayout;