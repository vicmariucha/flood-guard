import { useState } from "react";
import styles from "./CreateLocationModal.module.css";

interface Props {
  onClose: () => void;
  onCreate: (data: {
    name: string;
    region?: string;
    city?: string;
    status: string;
    waterLevel?: string;
    rainVolume?: string;
    coordinates?: string;
    lastUpdate?: string;
    isStation: boolean;
  }) => void;
  isStation: boolean;
}

export default function CreateLocationModal({ onClose, onCreate, isStation }: Props) {
  const [formData, setFormData] = useState({
    name: "",
    region: "",
    city: "",
    status: "Online",
    waterLevel: "",
    rainVolume: "",
    coordinates: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const lastUpdate = now.toLocaleDateString('pt-BR') + ' ' + now.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    onCreate({ ...formData, lastUpdate, isStation });
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>Nova {isStation ? "Estação" : "Cidade"}</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Nome:
            <input name="name" value={formData.name} onChange={handleChange} required />
          </label>

          {isStation ? (
            <>
              <label>
                Cidade:
                <input name="city" value={formData.city} onChange={handleChange} required />
              </label>
              <label>
                Status:
                <select name="status" value={formData.status} onChange={handleChange}>
                  <option>Online</option>
                  <option>Offline</option>
                </select>
              </label>
              <label>
                Nível da água:
                <input name="waterLevel" value={formData.waterLevel} onChange={handleChange} />
              </label>
              <label>
                Volume de chuva:
                <input name="rainVolume" value={formData.rainVolume} onChange={handleChange} />
              </label>
              <label>
                Coordenadas:
                <input name="coordinates" value={formData.coordinates} onChange={handleChange} />
              </label>
            </>
          ) : (
            <label>
              Região:
              <input name="region" value={formData.region} onChange={handleChange} required />
            </label>
          )}

          <div className={styles.actions}>
            <button type="button" className={styles.cancel} onClick={onClose}>Cancelar</button>
            <button type="submit" className={styles.submit}>Criar</button>
          </div>
        </form>
      </div>
    </div>
  );
}