import NotificationHelper from './notification-helper';
import CONFIG from '../globals/config';

const WebSocketInitiator = {
  init(url) {
    const webSocket = new WebSocket(url);
    webSocket.onmessage = this._onMessageHandler;
  },

  _onMessageHandler(message) {
    console.log(message.data);
    const movie = JSON.parse(message.data);
    NotificationHelper.sendNotification({
      title: `New Restaurant ${movie.title}`,
      options: {
        body: movie.overview,
        image: `${CONFIG.BASE_IMAGE_URL + 14}`,
      },
    });
  },
};
export default WebSocketInitiator;
