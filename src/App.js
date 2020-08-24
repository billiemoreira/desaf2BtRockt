import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";


function App() {

  const [repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepository(response.data);
    });

  }, []);

  async function handleAddRepository() {
    // TODO
    const response = await api.post('repositories', {
      title: "New Repository"
    })

    const repository = response.data;

    setRepository([...repositories, repository]);

  }

  async function handleRemoveRepository(id) {
    return await api.delete(`repositories/${id}`)
      .then(() => {
        const result = repositories.filter(repository => repository.id !== id)
        return setRepository(result);
      })
      .catch(err => console.error("deu merda", err));
  }
  //console.log(repositories);
  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository =>
          <li key={repository.id}>{repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
          </button>
          </li>
        )}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );

}

export default App;