import { LayoutDashboard, History, TrendingUp, Bell, Building, Settings, LogOut } from "lucide-react";
import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";
import logo from "../../assets/logo.png"

function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logoArea}>
      <div className={styles.logoIcon}>
        <img src={logo} alt="Logo FloodGuard" className={styles.logoImage} />
      </div>
        <span className={styles.logoText}>FloodGuard</span>
      </div>

      <nav className={styles.nav}>
        <NavLink to="/" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <LayoutDashboard size={20} /> Visão geral
        </NavLink>
        <NavLink to="/historico" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <History size={20} /> Histórico
        </NavLink>
        <NavLink to="/previsao" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <TrendingUp size={20} /> Previsão
        </NavLink>
        <NavLink to="/alertas" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <Bell size={20} /> Alertas
        </NavLink>
        <NavLink to="/cidades" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <Building size={20} /> Cidades
        </NavLink>
      </nav>

      <div className={styles.footer}>
        <NavLink to="/configuracoes" className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}>
          <Settings size={20} /> Configurações
        </NavLink>
        <NavLink to="/sair" className={`${styles.navItem} ${styles.logout}`}>
          <LogOut size={20} /> Sair
        </NavLink>
      </div>
    </aside>
  );
}

export default Sidebar;
