import { ReactNode } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div>
      <Sidebar />
      <Header />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
