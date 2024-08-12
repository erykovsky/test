"use client";

import { useEffect, useState } from "react";
import { socket } from "../socket";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export const Realtime = () => {
 const [isConnected, setIsConnected] = useState(false);
 const [messages, setMessages] = useState<string[]>([]);
 const [newMessage, setNewMessage] = useState("");

 useEffect(() => {
  if (socket.connected) {
   onConnect();
  }

  function onConnect() {
   setIsConnected(true);

   socket.on("message", (message) => {
    setMessages((prevMessages) => [...prevMessages, message]);
   });
  }

  function onDisconnect() {
   setIsConnected(false);
  }

  socket.on("connect", onConnect);
  socket.on("disconnect", onDisconnect);

  return () => {
   socket.off("connect", onConnect);
   socket.off("disconnect", onDisconnect);
  };
 }, []);

 const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  if (newMessage) {
   socket.emit("message", newMessage);
   setNewMessage("");
  }
 };

 return (
  <div>
   <p>Status: {isConnected ? "connected" : "disconnected"}</p>
   <div>
    <h2>Chat</h2>
    <div>
     {messages.map((msg, index) => (
      <p key={index}>{msg}</p>
     ))}
    </div>
    <form className="grid gap-4" onSubmit={sendMessage}>
     <Input
      type="text"
      value={newMessage}
      onChange={(e) => setNewMessage(e.target.value)}
     />
     <Button type="submit">Send</Button>
    </form>
   </div>
  </div>
 );
};
