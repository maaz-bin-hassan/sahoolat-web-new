import { motion, AnimatePresence } from "framer-motion";

export default function ChatMessage({ m, prev }) {
    const isBot = m.from === "bot";
    const showAvatar = !prev || prev.from !== m.from;

    const incoming = "bg-[#0e8282] text-[#ffffff] rounded-[18px] rounded-tl-[26px] px-5 py-3 shadow-sm";
    const outgoing = "bg-[#007f7a] text-white rounded-[18px] rounded-tr-[26px] px-5 py-3 shadow-md";

    return (
        <motion.div
            layout
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex mb-6 ${isBot ? "justify-start" : "justify-end"}`}
        >
            <div className="max-w-[75%]">
                <div className={`flex items-end gap-3 ${isBot ? "flex-row" : "flex-row-reverse"}`}>
                    {showAvatar && (
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${isBot ? "bg-[#0e8282] text-white" : "bg-gray-200"}`}>
                            {isBot ? "S" : "U"}
                        </div>
                    )}

                    <div>
                        <div className={isBot ? incoming : outgoing}>{m.text}</div>
                        <div className="text-[11px] text-gray-400 mt-1">
                            {new Date(m.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
}
