import { Bell, User } from "lucide-react";
import styles from "./Header.module.css";

interface HeaderProps {
  userName: string;
  cityName: string;
}

function Header({ userName, cityName }: HeaderProps) {
  return (
    <header className={styles.header}>
      <div className={styles.left}>
        Olá, <span className={styles.bold}>{userName}</span>! Você está visualizando os dados de{" "}
        <span className={styles.bold}>{cityName}</span>.
      </div>
      <div className={styles.right}>
        <a href="#" className={styles.link}>Sobre o projeto</a>
        <button className={styles.iconButton}><Bell size={18} /></button>
        <button className={styles.iconButton}><User size={18} /></button>
      </div>
    </header>
  );
}

export default Header;
