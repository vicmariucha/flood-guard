import { useState } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error("Falha no login");

      const data = await response.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError("Credenciais inválidas. Tente novamente.");
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.title}>Entrar</h2>

        <label className={styles.label}>
          Email:
          <input
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </label>

        <label className={styles.label}>
          Senha:
          <input
            type="password"
            className={styles.input}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.button}>
          Entrar
        </button>

        <p className={styles.redirect}>
          Ainda não tem conta? <a href="/cadastro">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
}

export default LoginPage;
