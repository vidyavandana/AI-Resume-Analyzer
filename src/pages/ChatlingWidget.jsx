// ChatlingWidget.jsx
import { useEffect } from 'react';

const ChatlingWidget = () => {
  useEffect(() => {
    window.chtlConfig = {
      chatbotId: "6481667549"
    };

    if (!document.getElementById("chatling-embed-script")) {
      const script = document.createElement("script");
      script.src = "https://chatling.ai/js/embed.js";
      script.async = true;
      script.type = "text/javascript";
      script.id = "chatling-embed-script";
      document.body.appendChild(script);
    }
  }, []);

  return null;
};

export default ChatlingWidget;
