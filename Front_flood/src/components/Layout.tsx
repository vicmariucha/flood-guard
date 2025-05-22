import { useLocation } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "./Layout.module.css";
import Dashboard from "../pages/Dashboard";
import HistoryPage from "../pages/HistoryPage";
import PrevisaoPage from "../pages/PrevisaoPage";
import AlertsPage from "../pages/AlertsPage";

interface LayoutProps {
  userName: string;
  cityName: string;
}

function Layout({ userName, cityName }: LayoutProps) {
  const location = useLocation();
  const path = location.pathname;

  const renderPage = () => {
    switch (path) {
      case "/":
        return <Dashboard />;
      case "/historico":
        return <HistoryPage />;
      case "/previsao":
        return <PrevisaoPage/>;
      case "/alertas":
        return <AlertsPage/>;
      case "/cidades":
        return <div style={{ padding: "2rem" }}>Página de Cidades</div>;
      case "/configuracoes":
        return <div style={{ padding: "2rem" }}>Página de Configurações</div>;
      case "/sair":
        return <div style={{ padding: "2rem" }}>Você saiu</div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className={styles.layoutContainer}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header userName={userName} cityName={cityName} />
        <main className={styles.pageContent}>{renderPage()}</main>
      </div>
    </div>
  );
}

export default Layout;
