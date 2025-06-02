import { useState, useEffect } from "react";
import styles from "./LoginPage.module.css";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import logo from "../../assets/logo.png";

const carouselItems = [
  {
    title: "Dashboard",
    text: "Sistema inteligente de monitoramento de enchentes.",
    image: "/dashboard.png",
  },
  {
    title: "Alertas inteligentes",
    text: "Receba alertas personalizados com base na previsão do tempo.",
    image: "/prediction.png",
  },
  {
    title: "Previsão",
    text: "Monitore diferentes regiões com facilidade e precisão.",
    image: "/prediction.png",
  },
];

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false); 

      setTimeout(() => {
        setCarouselIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
        setIsVisible(true); 
      }, 300);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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
      <div className={styles.left}>
        <div className={styles.brand}>
          <img src={logo} alt="Logo FloodGuard" className={styles.logo} />
          <span className={styles.brandName}>FloodGuard</span>
        </div>

        <div className={styles.carouselTrackWrapper}>
          <div
            className={styles.carouselTrack}
            style={{ transform: `translateX(-${carouselIndex * 100}%)` }}
          >
            {carouselItems.map((item, i) => (
              <div key={i} className={styles.carouselSlide}>
                <img src={item.image} alt={`Slide ${i}`} className={styles.carouselImage} />
                <h2 className={styles.carouselTitle}>{item.title}</h2>
                <p className={styles.carouselText}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.dots}>
          {carouselItems.map((_, i) => (
            <span
              key={i}
              className={`${styles.dot} ${i === carouselIndex ? styles.activeDot : ""}`}
              onClick={() => {
                setCarouselIndex(i);
              }}
            />
          ))}
        </div>

      </div>

      <div className={styles.right}>
        <form className={styles.form} onSubmit={handleLogin}>
          <h2 className={styles.title}>Entrar</h2>

          <label className={styles.label}>
            Email
            <input
              type="email"
              className={styles.input}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>

          <label className={styles.label}>
            Senha
            <div className={styles.passwordWrapper}>
              <input
                type={showPassword ? "text" : "password"}
                className={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => setShowPassword((prev) => !prev)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
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
    </div>
  );
}

export default LoginPage;
