import { useState, useEffect } from "react";
import { ref, onValue, off } from "firebase/database";
import { realtimeDb } from "@/lib/firebase";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Clock, X } from "lucide-react";
import AnonymousChat from "./AnonymousChat";

interface ActiveChat {
  vehicleId: string;
  sessionId: string;
  expiresAt: number;
  plateNumber: string;
}

interface OwnerChatListProps {
  vehicles: Array<{ id: string; plateNumber: string }>;
  onClose?: () => void;
}

const OwnerChatList = ({ vehicles, onClose }: OwnerChatListProps) => {
  const [activeChats, setActiveChats] = useState<ActiveChat[]>([]);
  const [selectedChat, setSelectedChat] = useState<ActiveChat | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (vehicles.length === 0) {
      setLoading(false);
      return;
    }

    const unsubscribes: (() => void)[] = [];

    vehicles.forEach((vehicle) => {
      const vehicleChatRef = ref(realtimeDb, `vehicleChats/${vehicle.id}`);
      
      const unsubscribe = onValue(vehicleChatRef, (snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          const now = Date.now();
          
          if (data.isActive && data.expiresAt > now) {
            setActiveChats((prev) => {
              const existing = prev.find((c) => c.vehicleId === vehicle.id);
              if (existing) {
                return prev.map((c) =>
                  c.vehicleId === vehicle.id
                    ? { ...c, sessionId: data.sessionId, expiresAt: data.expiresAt }
                    : c
                );
              }
              return [
                ...prev,
                {
                  vehicleId: vehicle.id,
                  sessionId: data.sessionId,
                  expiresAt: data.expiresAt,
                  plateNumber: vehicle.plateNumber,
                },
              ];
            });
          } else {
            setActiveChats((prev) => prev.filter((c) => c.vehicleId !== vehicle.id));
          }
        } else {
          setActiveChats((prev) => prev.filter((c) => c.vehicleId !== vehicle.id));
        }
      });

      unsubscribes.push(() => off(vehicleChatRef));
    });

    setLoading(false);

    return () => {
      unsubscribes.forEach((unsub) => unsub());
    };
  }, [vehicles]);

  if (selectedChat) {
    return (
      <div className="h-[500px]">
        <AnonymousChat
          vehicleId={selectedChat.vehicleId}
          vehiclePlate={selectedChat.plateNumber}
          isOwner={true}
          onClose={() => setSelectedChat(null)}
        />
      </div>
    );
  }

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden">
      <div className="bg-primary px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="w-5 h-5 text-primary-foreground" />
          <h3 className="font-bold text-primary-foreground">Active Chats</h3>
        </div>
        {onClose && (
          <button onClick={onClose} className="p-1 hover:bg-primary-foreground/10 rounded-full">
            <X className="w-5 h-5 text-primary-foreground" />
          </button>
        )}
      </div>

      <div className="p-4">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : activeChats.length === 0 ? (
          <div className="text-center py-8">
            <MessageCircle className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-50" />
            <p className="text-muted-foreground text-sm">No active chats</p>
            <p className="text-muted-foreground text-xs mt-1">
              When someone scans your QR and starts a chat, it will appear here.
            </p>
          </div>
        ) : (
          <AnimatePresence>
            {activeChats.map((chat) => {
              const timeRemaining = Math.max(0, Math.ceil((chat.expiresAt - Date.now()) / 60000));
              
              return (
                <motion.button
                  key={chat.vehicleId}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  onClick={() => setSelectedChat(chat)}
                  className="w-full p-4 bg-secondary rounded-xl mb-2 last:mb-0 text-left hover:bg-secondary/80 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                        <MessageCircle className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold">{chat.plateNumber}</p>
                        <p className="text-xs text-muted-foreground">Someone wants to chat</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 bg-primary/10 px-2 py-1 rounded-full">
                      <Clock className="w-3 h-3 text-primary" />
                      <span className="text-xs font-medium text-primary">{timeRemaining}m</span>
                    </div>
                  </div>
                </motion.button>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default OwnerChatList;
