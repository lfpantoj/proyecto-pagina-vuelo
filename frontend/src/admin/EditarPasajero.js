import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import "./ListaPasajeros.css";

/**
 * Componente para editar un pasajero existente.
 * Permite modificar su información y guardarla en localStorage.
 */
export default function EditarPasajero() {
  const { id } = useParams(); // Obtiene el id del pasajero desde la URL
  const navigate = useNavigate();

  const [pasajeros, setPasajeros] = useState([]);
  const [vuelos, setVuelos] = useState([]);
  const [pasajero, setPasajero] = useState({
    nombre: "",
    documento: "",
    vuelo: "",
    asiento: "",
  });

  // Cargar pasajeros y vuelos guardados al iniciar
  useEffect(() => {
    const guardadosPasajeros = localStorage.getItem("pasajeros");
    const guardadosVuelos = localStorage.getItem("vuelos");

    if (guardadosPasajeros) {
      const lista = JSON.parse(guardadosPasajeros);
      setPasajeros(lista);

      // Buscar el pasajero que corresponde al id de la URL
      const encontrado = lista.find((p) => p.id.toString() === id);
      if (encontrado) setPasajero(encontrado);
    }

    if (guardadosVuelos) setVuelos(JSON.parse(guardadosVuelos));
  }, [id]);

  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    setPasajero({ ...pasajero, [e.target.name]: e.target.value });
  };

  // Guardar los cambios del pasajero
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar campos obligatorios
    if (!pasajero.nombre || !pasajero.vuelo) {
      alert("Por favor completa todos los campos.");
      return;
    }

    // Reemplazar el pasajero modificado dentro del arreglo
    const actualizado = pasajeros.map((p) =>
      p.id.toString() === id ? pasajero : p
    );

    // Guardar en localStorage y regresar a la lista
    localStorage.setItem("pasajeros", JSON.stringify(actualizado));
    alert("Pasajero actualizado correctamente");
    navigate("/admin/lista-pasajeros");
  };

  return (
    <div className="pasajeros-container">
      <h2>Editar Pasajero</h2>

      <form className="form-pasajero" onSubmit={handleSubmit}>
        <label>Nombre completo:</label>
        <input
          type="text"
          name="nombre"
          value={pasajero.nombre}
          onChange={handleChange}
          required
        />

        <label>Documento de identidad:</label>
        <input
          type="text"
          name="documento"
          value={pasajero.documento}
          onChange={handleChange}
          required
        />

        <label>Vuelo asociado:</label>
        <select
          name="vuelo"
          value={pasajero.vuelo}
          onChange={handleChange}
          required
        >
          <option value="">Seleccione un vuelo...</option>
          {vuelos.length > 0 ? (
            vuelos.map((v) => (
              <option key={v.id} value={`${v.numero} - ${v.origen} → ${v.destino}`}>
                {v.numero} — {v.origen} → {v.destino}
              </option>
            ))
          ) : (
            <option disabled>No hay vuelos registrados</option>
          )}
        </select>

        <label>Asiento:</label>
        <input
          type="text"
          name="asiento"
          value={pasajero.asiento}
          onChange={handleChange}
          required
        />

        <button type="submit" className="btn-registrar">
          Guardar Cambios
        </button>
      </form>

      <Link to="/admin/lista-pasajeros" className="btn-volver">
        ⬅ Volver a la lista
      </Link>
    </div>
  );
}
