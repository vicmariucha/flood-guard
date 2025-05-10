import {
    LayoutDashboard,
    History,
    TrendingUp,
    Bell,
    Building,
    Settings,
    LogOut,
    Droplet
  } from "lucide-react";
  import styles from "./Sidebar.module.css";
  
  function Sidebar() {
    return (
      <aside className={styles.sidebar}>
        <div className={styles.logoArea}>
          <div className={styles.logoIcon}>
            <Droplet size={20} className={styles.droplet} />
          </div>
          <span className={styles.logoText}>FloodGuard</span>
        </div>
  
        <nav className={styles.nav}>
          <a href="#" className={styles.navItem}><LayoutDashboard size={20} /> Visão Geral</a>
          <a href="#" className={styles.navItem}><History size={20} /> Histórico</a>
          <a href="#" className={styles.navItem}><TrendingUp size={20} /> Previsão</a>
          <a href="#" className={styles.navItem}><Bell size={20} /> Alertas</a>
          <a href="#" className={styles.navItem}><Building size={20} /> Cidades</a>
        </nav>
  
        <div className={styles.footer}>
          <a href="#" className={styles.navItem}><Settings size={20} /> Configurações</a>
          <a href="#" className={`${styles.navItem} ${styles.logout}`}><LogOut size={20} /> Sair</a>
        </div>
      </aside>
    );
  }
  
  export default Sidebar;
  