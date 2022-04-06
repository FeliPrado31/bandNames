import React, { useState } from "react";
import { useSocket } from "../hooks/useSocket";

export const BandAdd = () => {
  const [valor, setValor] = useState("");

  const { socket } = useSocket("http://localhost:8080");

  const crearBanda = (nombre) => {
    socket.emit("crear-banda", { nombre });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (valor === "") return;
    crearBanda(valor);
    setValor("");
  };
  return (
    <>
      <h3>Agregar banda</h3>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="form-control"
          placeholder="Nuevo nombre de banda"
          value={valor}
          onChange={(e) => setValor(e.target.value)}
        />
      </form>
    </>
  );
};
