// src/admin/ListaPasajeros.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ListaPasajeros.css";

/**
 * Componente para administrar la lista de pasajeros de un vuelo específico.
 * Permite agregar, editar y eliminar pasajeros, y guarda la información en localStorage.
 */
export default function ListaPasajeros() {
  const { vueloId } = useParams();
  const navigate = useNavigate();

  // Estado para pasajeros y datos del vuelo
  const [pasajeros, setPasajeros] = useState([]);
  const [vuelos, setVuelos] = useState([]);
  const [vueloActual, setVueloActual] = useState(null);

  // Cargar vuelos y pasajeros desde localStorage
  useEffect(() => {
    const vuelosGuardados = JSON.parse(localStorage.getItem("vuelos")) || [];
    const pasajerosGuardados = JSON.parse(localStorage.getItem("pasajeros")) || [];
    setVuelos(vuelosGuardados);

    // Si hay vueloId (desde la URL), mostrar sus pasajeros
    if (vueloId) {
      setVueloActual(vuelosGuardados.find((v) => v.id === vueloId));
      setPasajeros(pasajerosGuardados.filter((p) => p.vueloId === vueloId));
    } else {
      setPasajeros(pasajerosGuardados);
    }
  }, [vueloId]);

  // Estado para el formulario
  const [formData, setFormData] = useState({
    nombre: "",
    documento: "",
    asiento: "",
  });

  // Manejar cambios del formulario
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Agregar pasajero
  const handleAdd = (e) => {
    e.preventDefault();

    if (!formData.nombre || !formData.documento || !formData.asiento) {
      alert("Por favor, completa todos los campos.");
      return;
    }

    const nuevoPasajero = {
      id: Date.now().toString(),
      ...formData,
      vueloId,
    };

    const nuevosPasajeros = [...pasajeros, nuevoPasajero];
    setPasajeros(nuevosPasajeros);

    // Actualizar almacenamiento global
    const todos = JSON.parse(localStorage.getItem("pasajeros")) || [];
    localStorage.setItem("pasajeros", JSON.stringify([...todos, nuevoPasajero]));

    // Actualizar contador del vuelo
    const vuelosActualizados = vuelos.map((v) =>
      v.id === vueloId ? { ...v, pasajeros: (v.pasajeros || 0) + 1 } : v
    );
    setVuelos(vuelosActualizados);
    localStorage.setItem("vuelos", JSON.stringify(vuelosActualizados));

    setFormData({ nombre: "", documento: "", asiento: "" });
  };

  // Eliminar pasajero
  const eliminarPasajero = (id) => {
    if (window.confirm("¿Seguro que deseas eliminar este pasajero?")) {
      const nuevos = pasajeros.filter((p) => p.id !== id);
      setPasajeros(nuevos);

      const todos = JSON.parse(localStorage.getItem("pasajeros")) || [];
      const actualizados = todos.filter((p) => p.id !== id);
      localStorage.setItem("pasajeros", JSON.stringify(actualizados));
    }
  };

  return (
    <div className="pasajeros-container">
      <h2>🧳 Lista de Pasajeros</h2>
      {vueloActual && (
        <p>
          <strong>Vuelo:</strong> {vueloActual.numero} — {vueloActual.origen} →{" "}
          {vueloActual.destino}
        </p>
      )}

      <form className="form-pasajero" onSubmit={handleAdd}>
        <input
          type="text"
          name="nombre"
          value={formData.nombre}
          onChange={handleChange}
          placeholder="Nombre del pasajero"
          required
        />
        <input
          type="text"
          name="documento"
          value={formData.documento}
          onChange={handleChange}
          placeholder="Documento"
          required
        />
        <input
          type="text"
          name="asiento"
          value={formData.asiento}
          onChange={handleChange}
          placeholder="Asiento"
          required
        />
        <button type="submit" className="btn-agregar">
          + Agregar Pasajero
        </button>
      </form>

      {pasajeros.length === 0 ? (
        <p className="sin-pasajeros">No hay pasajeros registrados para este vuelo.</p>
      ) : (
        <table className="tabla-pasajeros">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Documento</th>
              <th>Asiento</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {pasajeros.map((p) => (
              <tr key={p.id}>
                <td>{p.nombre}</td>
                <td>{p.documento}</td>
                <td>{p.asiento}</td>
                <td>
                  <button
                    onClick={() => eliminarPasajero(p.id)}
                    className="btn-eliminar"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <button onClick={() => navigate("/admin/vuelos")} className="btn-volver">
        ← Volver a Vuelos
      </button>
    </div>
  );
}
