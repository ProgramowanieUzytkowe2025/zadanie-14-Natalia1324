import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toastSuccess, toastError } from "../toasts";
import Api from "../api";

function EdytujKota() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    Id: null,
    Imie: "",
    Rasa: "",
    Wiek: 0,
    DoAdopcji: false,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (!id) return;

    Api.getKot(id)
      .then((data) =>
        setForm({
          Id: data.Id,
          Imie: data.Imie,
          Rasa: data.Rasa,
          Wiek: data.Wiek,
          DoAdopcji: data.DoAdopcji,
        })
      )
      .catch(() => {
        toastError("Nie udało się pobrać kota");
        setError("Nie udało się pobrać kota");
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await Api.updateKot(id, {
        Imie: form.Imie,
        Rasa: form.Rasa,
        Wiek: Number(form.Wiek),
        DoAdopcji: form.DoAdopcji,
      });

      toastSuccess();
      navigate("/");
    } catch (err) {
      toastError();
      setError(err.message || "Błąd zapisu danych");
    }
  };

  return (
    <div className="form-container">
      <h2>Edytuj kota: {form.Imie}</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Imię:
          <input 
          name="Imie" 
          value={form.Imie} 
          onChange={handleChange} 
          />
        </label>

        <label>
          Rasa:
          <input
            name="Rasa"
            value={form.Rasa}
            onChange={handleChange}
          />
        </label>

        <label>
          Wiek:
          <input
            type="number"
            name="Wiek"
            value={form.Wiek}
            onChange={handleChange}
          />
        </label>

        <label>
          Do adopcji:
          <input
            type="checkbox"
            name="DoAdopcji"
            checked={form.DoAdopcji}
            onChange={handleChange}
          />
        </label>

        <button type="submit">Zapisz</button>
      </form>
    </div>
  );
}

export default EdytujKota;
