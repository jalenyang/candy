export default class Message {
  payload;
  target;

  constructor(payload, target) {
    this.payload = payload;
    this.target = target;
  }
}

export function sendMessage(winDom, message) {
  console.log("sending message to:" + message.target);
  if (winDom) {
    winDom.postMessage(message.payload, message.target);
  }
}

export function listenToMessage(handler) {
  window.addEventListener("message", (event) => {
    handler(event);
  }, false);
}


export function stopListenToMessage(handler) {
  window.removeEventListener("message", handler, false);
}
