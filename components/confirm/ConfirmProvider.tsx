"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertTriangle,
  Trash2,
  CheckCircle,
  Info,
  Loader2,
} from "lucide-react";

type ConfirmVariant = "info" | "warning" | "danger" | "success";

type ConfirmOptions = {
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  onConfirm: () => Promise<void> | void;
};

type ConfirmContextType = (options: ConfirmOptions) => void;

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({ children }: { children: ReactNode }) {
  const [options, setOptions] = useState<ConfirmOptions | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const confirm: ConfirmContextType = (opts) => {
    setOptions(opts);
    setOpen(true);
  };

  const close = () => {
    if (loading) return;
    setOpen(false);
    setOptions(null);
  };

  const handleConfirm = async () => {
    if (!options) return;
    try {
      setLoading(true);
      await options.onConfirm();
      close();
    } finally {
      setLoading(false);
    }
  };

  /* 🔑 Keyboard support */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Enter") handleConfirm();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, loading]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      <AnimatePresence>
        {open && options && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-xl"
            >
              {/* Header */}
              <div className="flex items-center gap-3 mb-4">
                <VariantIcon variant={options.variant} />
                <h2 className="text-lg font-semibold">
                  {options.title}
                </h2>
              </div>

              {/* Description */}
              {options.description && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                  {options.description}
                </p>
              )}

              {/* Actions */}
              <div className="flex justify-end gap-3">
                <button
                  onClick={close}
                  disabled={loading}
                  className="px-4 py-2 rounded-lg text-sm border disabled:opacity-50"
                >
                  {options.cancelText ?? "Cancel"}
                </button>

                <button
                  onClick={handleConfirm}
                  disabled={loading}
                  className={`px-4 py-2 rounded-lg text-sm text-white flex items-center gap-2 disabled:opacity-70
                    ${variantStyles(options.variant)}`}
                >
                  {loading && (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  )}
                  {options.confirmText ?? "Confirm"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ConfirmContext.Provider>
  );
}

/* 🎨 Variant styles */
function variantStyles(variant?: ConfirmVariant) {
  switch (variant) {
    case "danger":
      return "bg-red-600 hover:bg-red-700";
    case "warning":
      return "bg-yellow-500 hover:bg-yellow-600";
    case "success":
      return "bg-green-600 hover:bg-green-700";
    default:
      return "bg-blue-600 hover:bg-blue-700";
  }
}

/* 🧩 Variant icons */
function VariantIcon({ variant }: { variant?: ConfirmVariant }) {
  const base = "h-6 w-6";

  switch (variant) {
    case "danger":
      return <Trash2 className={`${base} text-red-600`} />;
    case "warning":
      return <AlertTriangle className={`${base} text-yellow-500`} />;
    case "success":
      return <CheckCircle className={`${base} text-green-600`} />;
    default:
      return <Info className={`${base} text-blue-600`} />;
  }
}

export function useConfirm() {
  const ctx = useContext(ConfirmContext);
  if (!ctx) {
    throw new Error("useConfirm must be used inside ConfirmProvider");
  }
  return ctx;
}
