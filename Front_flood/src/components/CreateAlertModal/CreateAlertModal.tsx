import { useState } from "react";
import styles from "./CreateAlertModal.module.css";

interface CreateAlertModalProps {
  onClose: () => void;
  onSubmit: (alert: {
    date: string;
    time: string;
    type: string;
    level: string;
    message: string;
    status: string;
  }) => void;
}

function CreateAlertModal({ onClose, onSubmit }: CreateAlertModalProps) {
  const [type, setType] = useState("");
  const [level, setLevel] = useState("Amarelo");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("Ativo");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const now = new Date();
    const date = now.toISOString().split("T")[0];
    const time = now.toTimeString().split(":").slice(0, 2).join(":");

    onSubmit({ date, time, type, level, message, status });
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <h3 className={styles.modalHeader}>Novo alerta</h3>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label className={styles.label}>Tipo</label>
            <select
              className={styles.select}
              value={type}
              onChange={(e) => setType(e.target.value)}
              required
            >
              <option value="">Selecione</option>
              <option value="Intensidade da chuva">Intensidade da chuva</option>
              <option value="Volume de chuva">Volume de chuva</option>
              <option value="Falha na estação">Falha na estação</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Nível</label>
            <select
              className={styles.select}
              value={level}
              onChange={(e) => setLevel(e.target.value)}
            >
              <option>Amarelo</option>
              <option>Laranja</option>
              <option>Vermelho</option>
            </select>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Mensagem</label>
            <textarea
              className={styles.textarea}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Status</label>
            <select
              className={styles.select}
              value={status}
              onChange={(e) => setStatus(e.target.value)}
            >
              <option>Ativo</option>
              <option>Resolvido</option>
            </select>
          </div>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancelButton}
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className={styles.submitButton}>
              Criar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAlertModal;
