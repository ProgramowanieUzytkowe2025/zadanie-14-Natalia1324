import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toastSuccess, toastError } from "../toasts";
import Api from "../api";

function FormularzKota() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(id);

  const [form, setForm] = useState({
    Imie: "",
    Rasa: "",
    Wiek: 0,
    DoAdopcji: false,
  });

  const [error, setError] = useState("");

  useEffect(() => {
    if (isEdit) {
      Api.getKot(id)
        .then((data) =>
          setForm({
            Imie: data.Imie,
            Rasa: data.Rasa,
            Wiek: data.Wiek,
            DoAdopcji: data.DoAdopcji,
          })
        )
        .catch(() => setError("Nie udało się pobrać kota"));
    }
  }, [id, isEdit]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      if (isEdit) {
        await Api.updateKot(id, {
          Imie: form.Imie,
          Rasa: form.Rasa,
          Wiek: Number(form.Wiek),
          DoAdopcji: form.DoAdopcji,
        });
      } else {
        await Api.createKot({
          ...form,
          Wiek: Number(form.Wiek),
        });
      }
      toastSuccess();
      navigate("/");
    } catch (err) {
      toastError()
      setError(err.message || "Błąd zapisu danych");
    }
  };

  return (
    <div className="form-container">
      <h2>{isEdit ? `Edytuj kota: ${form.Imie}` : "Dodaj nowego kota"}</h2>

      {error && <p className="error">{error}</p>}

      <form onSubmit={handleSubmit}>
        {!isEdit && (
          <label>
            Imię:
            <input name="Imie" value={form.Imie} onChange={handleChange} />
          </label>
        )}

        <label>
            Imię:
            <input name="Imie" value={form.Imie} onChange={handleChange} />
          </label>

        <label>
          Rasa:
          <input name="Rasa" value={form.Rasa} onChange={handleChange} />
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

        <button type="submit">
          {isEdit ? "Zapisz zmiany" : "Dodaj kota"}
        </button>
      </form>
    </div>
  );
}

export default FormularzKota;
