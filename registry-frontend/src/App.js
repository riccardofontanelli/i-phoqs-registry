import React, { useState, useEffect } from 'react';

function App() {
  const [strumenti, setStrumenti] = useState([]);
  const [formData, setFormData] = useState({ nome: '', laboratorio: '' });

  // Caricamento iniziale della lista
  useEffect(() => {
    fetch('http://localhost:8000/strumenti')
      .then(response => response.json())
      .then(data => setStrumenti(data))
      .catch(error => console.error('Errore nel caricamento:', error));
  }, []);

  // Gestione input form
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Gestione invio form
  const handleSubmit = e => {
    e.preventDefault();
    fetch('http://localhost:8000/strumenti', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
      .then(response => response.json())
      .then(() => {
        // Dopo la POST, ricarico la lista aggiornata dal backend
        return fetch('http://localhost:8000/strumenti');
      })
      .then(response => response.json())
      .then(data => {
        setStrumenti(data); // aggiorna la lista
        setFormData({ nome: '', laboratorio: '' }); // svuota il form
      })
      .catch(error => console.error('Errore invio:', error));
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial' }}>
      <h1>Registry I-PHOQS</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome strumento"
          value={formData.nome}
          onChange={handleChange}
          required
          style={{ marginRight: '1rem' }}
        />
        <input
          type="text"
          name="laboratorio"
          placeholder="Laboratorio"
          value={formData.laboratorio}
          onChange={handleChange}
          required
        />
        <button type="submit" style={{ marginLeft: '1rem' }}>Aggiungi</button>
      </form>

      <h2 style={{ marginTop: '2rem' }}>Strumenti registrati</h2>
      <ul>
        {strumenti.map((s, i) => (
          <li key={i}><strong>{s.nome}</strong> – {s.laboratorio}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;