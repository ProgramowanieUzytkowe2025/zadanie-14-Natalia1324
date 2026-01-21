import { useNavigate } from "react-router-dom";

function Kot({ kot, onDelete }) {
  const navigate = useNavigate();

  return (
    <div className="tile">
      <h3>Imię: {kot.Imie}</h3>
      <p>Rasa: {kot.Rasa}</p>
      <p>Wiek: {kot.Wiek}</p>
      <p>Do adopcji: {kot.DoAdopcji ? "tak" : "nie"}</p>

      <div className="actions">
        <button onClick={() => navigate(`/edytuj/${kot.Id}`)}>
          Edytuj
        </button>

        <button className="delete-btn" onClick={() => onDelete(kot.Id)}>
          Usuń
        </button>
      </div>
    </div>
  );
}

export default Kot;
