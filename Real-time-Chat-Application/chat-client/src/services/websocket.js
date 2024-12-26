const connectWebSocket = (url, onMessage, onOpen, onClose) => {
  const socket = new WebSocket(url);

  socket.onopen = () => {
    console.log("Connected to WebSocket server");
    if (onOpen) onOpen();
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    onMessage(data);
  };

  socket.onerror = (error) => {
    console.error("WebSocket error:", error);
  };

  socket.onclose = () => {
    console.log("Disconnected from WebSocket server");
    if (onClose) onClose();
  };

  return socket;
};

export default connectWebSocket;
