import { createContext, ReactNode, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircleIcon,
  XCircleIcon,
  InformationCircleIcon,
} from "@heroicons/react/24/solid";

interface Toast {
  id: number;
  title: string;
  description: string;
  type?: "success" | "error" | "info";
}

interface ToastContextType {
  addToast: (toast: Omit<Toast, "id">) => void;
}

export const ToastContext = createContext<ToastContextType>({
  addToast: () => {},
});

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3000);
  };

  const renderIcon = (type?: string) => {
    switch (type) {
      case "success":
        return <CheckCircleIcon className="w-6 h-6 text-green-500" />;
      case "error":
        return <XCircleIcon className="w-6 h-6 text-red-500" />;
      case "info":
        return <InformationCircleIcon className="w-6 h-6 text-blue-500" />;
      default:
        return null;
    }
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none"
          >
            {/* Overlay blur */}
            <div className="absolute inset-0 bg-black/20 backdrop-blur-sm pointer-events-none"></div>

            {/* Toast card */}
            <div className="relative bg-white rounded-md shadow-lg border border-gray-200 p-6 max-w-sm w-full flex items-center gap-4 pointer-events-auto">
              {/* Icon */}
              {renderIcon(toast.type)}

              {/* Text */}
              <div className="text-center">
                <h4 className="text-lg font-medium text-gray-900">
                  {toast.title}
                </h4>
                <p className="text-gray-600 mt-1 text-sm">
                  {toast.description}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </ToastContext.Provider>
  );
};
