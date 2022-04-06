import React, {
  useContext,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import { SocketContext } from "../context/SocketContext";

export const BandList = () => {
  const inputRef = useRef();

  const { socket } = useContext(SocketContext);
  const [bands, setBands] = useState([]);
  const [name, setName] = useState("");
  useEffect(() => {
    socket.on("current-bands", (bands) => {
      setBands(bands);
    });
    return () => socket.off("current-bands");
  }, [socket]);

  const votar = (id) => {
    socket.emit("votar-banda", id);
  };
  const borrarBanda = (id) => {
    socket.emit("borrar-banda", id);
  };

  const onPerdioFoco = (id, nombre) => {
    console.log(bands);
    // let band = bands.map((band) => {
    //   if (band.id === id) {
    //     band.name = newName;
    //   }
    //   return band;
    // });

    // setBands(band);
  };

  const cambioNombre = () => {
    const newName = inputRef.current.value;
    setName(newName);
  };

  const CrearRows = (props) => {
    return bands.map((band) => (
      <tr key={band.id}>
        <td>
          <button className="btn btn-primary" onClick={() => votar(band.id)}>
            +1
          </button>
        </td>
        <td>
          <input
            ref={inputRef}
            value={band.name}
            onChange={(e) => cambioNombre()}
            onBlur={() => onPerdioFoco(band.id, band.name)}
          />
        </td>
        <td>
          <h3>{band.votes}</h3>
        </td>
        <td>
          <button
            className="btn btn-danger"
            onClick={() => borrarBanda(band.id)}
          >
            Borrar
          </button>
        </td>
      </tr>
    ));
  };

  return (
    <div>
      <table className="table table-stripped">
        <thead>
          <tr>
            <th></th>
            <th>Nombre</th>
            <th>Votos</th>
            <th>Borrar</th>
          </tr>
        </thead>
        <tbody>
          <CrearRows />
        </tbody>
      </table>
    </div>
  );
};
