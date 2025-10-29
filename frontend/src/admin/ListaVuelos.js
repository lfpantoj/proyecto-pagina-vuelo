import React from "react";
import "./ListaVuelos.css";

export default function ListaVuelos({ vuelos }) {
  return (
    <div className="lista-container">
      <h2>🛫 Lista de Vuelos Registrados</h2>

      {vuelos.length === 0 ? (
        <p>No hay vuelos registrados todavía.</p>
      ) : (
        <div className="tabla-container">
          <table className="tabla-vuelos">
            <thead>
              <tr>
                <th>N° Vuelo</th>
                <th>Origen</th>
                <th>Destino</th>
                <th>Fecha</th>
                <th>Precio</th>
              </tr>
            </thead>
            <tbody>
              {vuelos.map((vuelo) => (
                <tr key={vuelo.id}>
                  <td>{vuelo.numero}</td>
                  <td>{vuelo.origen}</td>
                  <td>{vuelo.destino}</td>
                  <td>{vuelo.fecha}</td>
                  <td>{"$" + vuelo.precio.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
