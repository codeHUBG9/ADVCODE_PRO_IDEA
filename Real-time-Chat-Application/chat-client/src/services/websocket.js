const connectWebSocket = (url, onMessage, onOpen, onClose) => {
    const socket = new WebSocket(url);
  
    // Event listeners
    socket.onopen = () => {
      console.log("Connected to WebSocket server");
      if (onOpen) onOpen();
    };
  
    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      onMessage(data);
    };
  
    socket.onclose = () => {
      console.log("Disconnected from WebSocket server");
      if (onClose) onClose();
    };
  
    return socket;
  };
  
  export default connectWebSocket;
  