import { motion } from "framer-motion";

export const WhatsAppFab = () => (
  <motion.a
    href="https://wa.me/254729321412?text=Hi%20Mercpoint%2C%20I%27m%20interested%20in%20a%20car"
    target="_blank"
    rel="noreferrer"
    aria-label="Chat on WhatsApp"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.2, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    whileHover={{ scale: 1.06 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-6 z-[90] flex items-center justify-center size-14 rounded-full shadow-[0_12px_32px_-8px_rgba(37,211,102,0.6)]"
    style={{ backgroundColor: "#25D366" }}
  >
    <span className="absolute inset-0 rounded-full animate-ping opacity-40" style={{ backgroundColor: "#25D366" }} />
    <svg viewBox="0 0 32 32" className="relative w-7 h-7 fill-white" aria-hidden="true">
      <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.045 2.264v.114c-.014.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.477-1.318.13-.33.13-.616.158-.97-.014-.158-.144-.244-.302-.33-.402-.214-2.122-1.043-2.495-1.043l.158-.343zM16.4 5.6C10.43 5.6 5.6 10.45 5.6 16.412c0 1.972.515 3.86 1.518 5.55L5.6 27l5.235-1.39c1.633.86 3.46 1.318 5.34 1.318 5.97 0 10.823-4.842 10.823-10.804C26.998 10.444 22.157 5.6 16.4 5.6zm0 19.792c-1.69 0-3.337-.473-4.785-1.347l-.343-.215-3.55.946.946-3.466-.215-.343a8.838 8.838 0 0 1-1.346-4.715c0-4.913 4.024-8.937 8.937-8.937a8.95 8.95 0 0 1 8.952 8.952c0 4.928-4.025 8.953-8.953 8.953z"/>
    </svg>
  </motion.a>
);