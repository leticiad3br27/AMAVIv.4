function ConsultarCooperador() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPerson, setSelectedPerson] = useState(null);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://amaviapi.dev.vilhena.ifro.edu.br/api/colaborador/colaboradores");
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setPeople(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredResults = people.filter(
    (person) =>
      person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      person.cpf.includes(searchTerm) ||
      person.matricula.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const closeModal = () => setSelectedPerson(null);

  return (
    <SimpleLayout>
      <div className={styles.container}>
        <h1 className={styles.h1}>Consultar</h1>
        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Consultar por Nome, CPF ou Matrícula"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles.input}
            aria-label="Campo de busca"
          />
        </div>
        <div className={styles.tableContainer}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className={styles.error}>Error: {error}</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>CPF</th>
                  <th>Matrícula</th>
                  <th>Função</th>
                </tr>
              </thead>
              <tbody>
                {filteredResults.length > 0 ? (
                  filteredResults.map((result, index) => (
                    <tr
                      key={index}
                      onClick={() => setSelectedPerson(result)}
                      className={styles.row}
                      tabIndex={0}
                      role="button"
                      onKeyPress={(e) => e.key === "Enter" && setSelectedPerson(result)}
                    >
                      <td>{result.name}</td>
                      <td>{result.cpf}</td>
                      <td>{result.matricula}</td>
                      <td>{result.role}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className={styles.noResults}>
                      Nenhum resultado encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>

        {selectedPerson && (
          <div className={styles.modal} onClick={closeModal}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <div className={styles.modalInfo}>
                <div className={styles.textInfo}>
                  <h2>{selectedPerson.name}</h2>
                  <p><strong>CPF:</strong> {selectedPerson.cpf}</p>
                  <p><strong>Matrícula:</strong> {selectedPerson.matricula}</p>
                  <p><strong>Idade:</strong> {selectedPerson.idade} anos</p>
                  <p><strong>Função:</strong> {selectedPerson.role}</p>
                  <p><strong>Tem família registrada?</strong> {selectedPerson.familiaRegistrada ? "Sim" : "Não"}</p>
                  <p><strong>É responsável?</strong> {selectedPerson.responsavel ? "Sim" : "Não"}</p>
                  <p><strong>É beneficiário responsável?</strong> {selectedPerson.beneficiarioResponsavel ? "Sim" : "Não"}</p>
                  <p><strong>Tem atendimentos registrados?</strong> {selectedPerson.atendimentosRegistrados ? "Sim" : "Não"}</p>
                  <p><strong>Oferece atendimentos?</strong> {selectedPerson.ofereceAtendimentos ? "Sim" : "Não"}</p>
                  {selectedPerson.role === "Administrador" && (
                    <p><strong>Cargo:</strong> {selectedPerson.cargo || "N/A"}</p>
                  )}
                </div>
                <img
                  src={selectedPerson.imageUrl || "/assets/img/placeholder.jpg"}
                  alt={`Imagem de ${selectedPerson.name}`}
                  className={styles.image}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </SimpleLayout>
  );
}

export default ConsultarCooperador;