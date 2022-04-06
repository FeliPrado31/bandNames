import { useEffect, useMemo, useState } from "react";
import { io } from "socket.io-client";

export const useSocket = (URI) => {
  const socket = useMemo(
    () =>
      io.connect(URI, {
        transport: ["websocket"],
      }),
    [URI]
  );

  const [online, setOnline] = useState(false);

  useEffect(() => {
    setOnline(socket.connected);
  }, [socket]);

  useEffect(() => {
    socket.on("connect", () => {
      setOnline(true);
    });
  }, [socket]);

  useEffect(() => {
    socket.on("disconnect", () => {
      setOnline(false);
    });
  }, [socket]);

  return { socket, online };
};
