import { wsConnected, wsDisconnected } from "./actions/websocketactions";
import {
  WEBSOCKET_ADD_MESSAGE,
  WEBSOCKET_EDIT_MESSAGE,
  WEBSOCKET_REMOVE_MESSAGE,
  WS_CONNECT,
  WS_DISCONNECT,
  SUCCESS_UPDATE_COLLECTION,
  SUCCESS_ADD_RESTAURANT_TO_COLLECTION,
  FAILURE_UPDATE_COLLECTION,
  FAILURE_ADD_RESTAURANT_TO_COLLECTION,
  SUCCESS_DELETE_RESTAURANTS_IN_COLLECTION,
  FAILURE_DELETE_RESTAURANTS_IN_COLLECTION
} from "./actions/types";
const socketMiddleware = () => {
  let socket = null;

  const onOpen = store => event => {
    console.log("websocket open", event.target.url);
    store.dispatch(wsConnected(event.target.url));
  };

  const onClose = store => () => {
    store.dispatch(wsDisconnected());
  };

  const onMessage = store => event => {
    const payload = JSON.parse(event.data);
    console.log("receiving server message");
    switch (payload.actiontype) {
      case SUCCESS_UPDATE_COLLECTION:
        store.dispatch({
          type: SUCCESS_UPDATE_COLLECTION,
          payload: payload.message
        });
        break;
      case FAILURE_UPDATE_COLLECTION:
        store.dispatch({
          type: FAILURE_UPDATE_COLLECTION,
          payload: payload.message
        });
        break;
      case SUCCESS_ADD_RESTAURANT_TO_COLLECTION:
        store.dispatch({
          type: SUCCESS_ADD_RESTAURANT_TO_COLLECTION,
          payload: payload.message
        });
        break;
      case FAILURE_ADD_RESTAURANT_TO_COLLECTION:
        store.dispatch({
          type: FAILURE_ADD_RESTAURANT_TO_COLLECTION,
          payload: payload.message
        });
        break;
      case SUCCESS_DELETE_RESTAURANTS_IN_COLLECTION:
        console.log(payload,'inhere')
        store.dispatch({
          type: SUCCESS_DELETE_RESTAURANTS_IN_COLLECTION,
          payload: payload.message.success,
          restaurantData: {results: payload.message.restaurants}
        });
        break;
      case FAILURE_DELETE_RESTAURANTS_IN_COLLECTION:
        store.dispatch({
          type: FAILURE_DELETE_RESTAURANTS_IN_COLLECTION,
          payload: payload.message
        });
        break;
      default:
        console.log("default");
        break;
    }
  };

  return store => next => action => {
    switch (action.type) {
      case WS_CONNECT:
        // connect to the remote host
        socket = new WebSocket(action.host);

        // websocket handlers
        socket.onmessage = onMessage(store);
        socket.onclose = onClose(store);
        socket.onopen = onOpen(store);

        break;
      case WS_DISCONNECT:
        if (socket !== null) {
          socket.close();
        }
        socket = null;
        console.log("websocket closed");
        break;
      case WEBSOCKET_EDIT_MESSAGE:
        console.log("sending a WEBSOCKET_EDIT_MESSAGE");
        socket.send(
          JSON.stringify({
            actiontype: action.type,
            message: action.message
          })
        );
        break;
      case WEBSOCKET_ADD_MESSAGE:
        console.log("sending a WEBSOCKET_ADD_MESSAGE");
        socket.send(
          JSON.stringify({
            actiontype: action.type,
            message: action.message
          })
        );
        break;
      case WEBSOCKET_REMOVE_MESSAGE:
        console.log("sending a WEBSOCKET_REMOVE_MESSAGE");
        socket.send(
          JSON.stringify({
            actiontype: action.type,
            message: action.message
          })
        );
        break;
      default:
        return next(action);
    }
  };
};

export default socketMiddleware();
