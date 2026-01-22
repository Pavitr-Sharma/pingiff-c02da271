import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MessageCircle, X, User, Clock, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ChatMessage,
  getOrCreateChatSession,
  sendMessage,
  subscribeToMessages,
  endChatSession,
  getSessionTimeRemaining,
} from "@/lib/chatService";

interface AnonymousChatProps {
  vehicleId: string;
  vehiclePlate: string;
  isOwner?: boolean;
  onClose?: () => void;
}

const AnonymousChat = ({ vehicleId, vehiclePlate, isOwner = false, onClose }: AnonymousChatProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(30);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const senderType = isOwner ? "owner" : "scanner";

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat session
  useEffect(() => {
    const initSession = async () => {
      try {
        setIsLoading(true);
        const id = await getOrCreateChatSession(vehicleId);
        setSessionId(id);
        
        const remaining = await getSessionTimeRemaining(vehicleId);
        setTimeRemaining(remaining);
      } catch (err) {
        console.error("Failed to init chat session:", err);
        setError("Failed to start chat. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };
    
    initSession();
  }, [vehicleId]);

  // Subscribe to messages
  useEffect(() => {
    if (!sessionId) return;
    
    const unsubscribe = subscribeToMessages(sessionId, (msgs) => {
      setMessages(msgs);
    });
    
    return () => unsubscribe();
  }, [sessionId]);

  // Update time remaining every minute
  useEffect(() => {
    const interval = setInterval(async () => {
      const remaining = await getSessionTimeRemaining(vehicleId);
      setTimeRemaining(remaining);
      
      // Auto-end if expired
      if (remaining <= 0 && sessionId) {
        await handleEndChat();
      }
    }, 60000);
    
    return () => clearInterval(interval);
  }, [vehicleId, sessionId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !sessionId) return;

    try {
      await sendMessage(sessionId, newMessage.trim(), senderType);
      setNewMessage("");
    } catch (err) {
      console.error("Failed to send message:", err);
    }
  };

  const handleEndChat = async () => {
    if (sessionId) {
      await endChatSession(vehicleId, sessionId);
    }
    onClose?.();
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col h-full bg-white rounded-2xl border-2 border-ping-yellow/30 items-center justify-center p-8">
        <div className="w-12 h-12 border-4 border-ping-yellow border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-ping-brown">Starting secure chat...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col h-full bg-white rounded-2xl border-2 border-red-200 items-center justify-center p-8">
        <AlertCircle className="w-12 h-12 text-red-500 mb-4" />
        <p className="text-red-600 text-center mb-4">{error}</p>
        <Button onClick={onClose} variant="outline">Go Back</Button>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col h-full bg-white rounded-2xl border-2 border-ping-yellow/30 overflow-hidden"
      style={{ boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08)' }}
    >
      {/* Chat Header */}
      <div className="bg-ping-yellow px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-ping-ink/10 rounded-full flex items-center justify-center">
            <MessageCircle className="w-5 h-5 text-ping-ink" />
          </div>
          <div>
            <h3 className="font-bold text-ping-ink">Anonymous Chat</h3>
            <p className="text-xs text-ping-ink/70">Vehicle: {vehiclePlate}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 bg-ping-ink/10 px-2 py-1 rounded-full">
            <Clock className="w-3 h-3 text-ping-ink" />
            <span className="text-xs font-medium text-ping-ink">{timeRemaining}m</span>
          </div>
          {onClose && (
            <button
              onClick={handleEndChat}
              className="p-2 hover:bg-ping-ink/10 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-ping-ink" />
            </button>
          )}
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="bg-ping-cream/50 px-4 py-2 text-center">
        <p className="text-xs text-ping-brown">
          🔒 Messages auto-delete after {timeRemaining} minutes. No data stored.
        </p>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-ping-cream/30">
        {messages.length === 0 && (
          <div className="text-center text-ping-brown/60 py-8">
            <MessageCircle className="w-12 h-12 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No messages yet. Start the conversation!</p>
          </div>
        )}
        
        <AnimatePresence initial={false}>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className={`flex ${message.sender === senderType ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                  message.sender === senderType
                    ? "bg-ping-yellow text-ping-ink rounded-br-md"
                    : "bg-white border border-ping-ink/10 text-ping-ink rounded-bl-md"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <User className="w-3 h-3" />
                  <span className="text-xs font-medium opacity-70">
                    {message.sender === "owner" ? "Vehicle Owner" : "Anonymous"}
                  </span>
                </div>
                <p className="text-sm">{message.text}</p>
                <p className="text-[10px] opacity-50 mt-1 text-right">
                  {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        <div ref={messagesEndRef} />
      </div>

      {/* Message Input */}
      <div className="p-4 bg-white border-t border-ping-ink/10">
        <div className="flex gap-2">
          <Input
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            className="flex-1 border-2 border-ping-ink/20 focus:border-ping-yellow"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="bg-ping-yellow text-ping-ink hover:bg-ping-yellow/90 px-4"
          >
            <Send className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default AnonymousChat;