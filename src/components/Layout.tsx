import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";

interface LayoutProps {
  userName: string;
  cityName: string;
}

function Layout({ userName, cityName }: LayoutProps) {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className={styles.layoutContainer}>
      <Sidebar activePage={activePage} onPageChange={setActivePage} />
      <div className={styles.mainContent}>
        <Header userName={userName} cityName={cityName} />
        <main className={styles.pageContent}>
          <h1>{activePage}</h1>
        </main>
      </div>
    </div>
  );
}

export default Layout;
