import { Server } from 'socket.io';
import { Server as HttpServer } from 'http';

export type Socket = {
  io: Server | void;
}

export const socket: Socket = {
  io: undefined,
};

export function connectSocket(server: HttpServer) {
  const options = {
    cors: {
      origin: true,
    },
  };
  const io = new Server(server, options);

  socket.io = io;
}
