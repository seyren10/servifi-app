// hooks/useSocket.ts
import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface UseSocketOptions {
  url: string;
  autoConnect?: boolean;
  onConnect?: (socket: Socket) => void;
  onDisconnect?: () => void;
  onError?: (error: any) => void;
}

export const useSocket = ({
  url,
  autoConnect = true,
  onConnect,
  onDisconnect,
  onError,
}: UseSocketOptions) => {
  const socketRef = useRef<Socket | null>(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    socketRef.current = io(url, { autoConnect });

    const socket = socketRef.current;

    socket.on("connect", () => {
      setConnected(true);
      onConnect?.(socket);
    });

    socket.on("disconnect", () => {
      setConnected(false);
      onDisconnect?.();
    });

    socket.on("connect_error", (err) => {
      onError?.(err);
    });

    return () => {
      socket.disconnect();
    };
  }, [autoConnect, onConnect, onDisconnect, onError, url]);

  const emit = useCallback(<T>(event: string, payload: T) => {
    socketRef.current?.emit(event, payload);
  }, []);

  const on = useCallback(<T>(event: string, callback: (data: T) => void) => {
    socketRef.current?.on(event, callback);
  }, []);

  const off = useCallback((event: string) => {
    socketRef.current?.off(event);
  }, []);

  return {
    socket: socketRef.current,
    emit,
    on,
    off,
    connected,
  };
};
