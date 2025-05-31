import { useState } from "react";
import styles from "./AddCityModal.module.css";

interface AddCityModalProps {
  onClose: () => void;
}

function AddCityModal({ onClose }: AddCityModalProps) {
  const [name, setName] = useState("");
  const [region, setRegion] = useState("");
  const [mainStation, setMainStation] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h3 className={styles.modalTitle}>Nova cidade</h3>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Nome:
            <input value={name} onChange={e => setName(e.target.value)} required />
          </label>

          <label>
            Região:
            <input value={region} onChange={e => setRegion(e.target.value)} required />
          </label>

          <label>
            Estação principal:
            <input value={mainStation} onChange={e => setMainStation(e.target.value)} required />
          </label>

          <div className={styles.actions}>
            <button type="button" onClick={onClose} className={styles.cancel}>Cancelar</button>
            <button type="submit" className={styles.submit}>Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCityModal;
