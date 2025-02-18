import styles from "./ConfigLayout.module.css"; // Importando o arquivo de estilo
import ConfigBar from "../../components/ConfigAMDBAR/ConfigbarAdm";
import ConfigBarADM from "../../components/ConfigAMDBAR/ConfigbarAdm";

export default function ADMlayout({ children }) {
  return (
    <div className={styles.ConfigLayout}>
      <ConfigBarADM />
      <main>{children}</main>
    </div>
  );
}
