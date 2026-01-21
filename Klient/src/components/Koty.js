import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "../toasts";
import Api from "../api";
import Kot from "./Kot";

function Koty() {
  const [koty, setKoty] = useState([]);
  const [filter, setFilter] = useState("all");
  const navigate = useNavigate();
  const [error, setError] = useState("");

  useEffect(() => {
    loadKoty();
  }, [filter]);

  const loadKoty = () => {
    if (filter === "all") {
      Api.getKoty().then(setKoty);
    } else if (filter === "true") {
      Api.getKoty(true).then(setKoty);
    } else {
      Api.getKoty(false).then(setKoty);
    }
  };

  const handleDelete = async (id, imie) => {
    setError("");
    if (!window.confirm(`Usunąć kota "${imie}"?`)) return;
    try {
      await Api.deleteKot(id);
      loadKoty();
      toastSuccess();
    }
    catch (err) {
      toastError();
      setError(err.message || "Błąd zapisu danych");
    }
    
  };

  return (
    <>
      <label>
        Filtruj:
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">Wszystkie</option>
          <option value="true">Tylko do adopcji</option>
          <option value="false">Nie do adopcji</option>
        </select>
      </label>

      <button onClick={() => navigate("/dodaj")}>➕ Dodaj kota</button>

      <div className="grid">
        {koty.map((k) => (
          <Kot key={k.Id} kot={k} onDelete={(id) => handleDelete(id, k.Imie)} />
        ))}
      </div>
    </>
  );
}

export default Koty;
