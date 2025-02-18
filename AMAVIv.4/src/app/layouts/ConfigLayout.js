import styles from "./ConfigLayout.module.css"; // Importando o arquivo de estilo
import ConfigBar from "../../components/ConfigBar/ConfigBar";

export default function ConfigLayout({ children }) {
  return (
    <div className={styles.ConfigLayout}>
      <ConfigBar />
      <main>{children}</main>
    </div>
  );
}
