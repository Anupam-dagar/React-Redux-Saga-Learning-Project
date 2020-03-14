import {
  WS_CONNECT,
  WS_CONNECTING,
  WS_CONNECTED,
  WS_DISCONNECT,
  WS_DISCONNECTED,
  WEBSOCKET_EDIT_MESSAGE,
  WEBSOCKET_REMOVE_MESSAGE,
  WEBSOCKET_ADD_MESSAGE
} from "./types";

export const wsConnect = host => ({ type: WS_CONNECT, host });

export const wsConnecting = host => ({ type: WS_CONNECTING, host });

export const wsConnected = host => ({ type: WS_CONNECTED, host });

export const wsDisconnect = host => ({ type: WS_DISCONNECT, host });

export const wsDisconnected = host => ({ type: WS_DISCONNECTED, host });

export const websocketEditMessage = message => ({
  type: WEBSOCKET_EDIT_MESSAGE,
  message
});

export const websocketAddMessage = message => ({
  type: WEBSOCKET_ADD_MESSAGE,
  message
});

export const websocketRemoveMessage = message => ({
  type: WEBSOCKET_REMOVE_MESSAGE,
  message
});
