"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  AlertTriangle,
  Info,
  CheckCircle,
  XCircle,
} from "lucide-react";

export type ConfirmVariant = "info" | "warning" | "danger" | "success";

const variantMap = {
  info: {
    icon: Info,
    color: "text-blue-600",
    button: "bg-blue-600 hover:bg-blue-700",
  },
  warning: {
    icon: AlertTriangle,
    color: "text-yellow-600",
    button: "bg-yellow-600 hover:bg-yellow-700",
  },
  danger: {
    icon: XCircle,
    color: "text-red-600",
    button: "bg-red-600 hover:bg-red-700",
  },
  success: {
    icon: CheckCircle,
    color: "text-green-600",
    button: "bg-green-600 hover:bg-green-700",
  },
};

interface Props {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  onConfirm: () => void;
  onClose: () => void;
}

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "info",
  onConfirm,
  onClose,
}: Props) {
  const Icon = variantMap[variant].icon;

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/50"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center px-4"
          >
            <div className="w-full max-w-md rounded-2xl bg-white dark:bg-neutral-900 p-6 shadow-xl">
              <div className="flex gap-3 items-start">
                <Icon className={`w-6 h-6 ${variantMap[variant].color}`} />

                <div>
                  <h2 className="text-lg font-semibold">{title}</h2>
                  {description && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="px-4 py-2 rounded-lg border text-sm hover:bg-neutral-100 dark:hover:bg-neutral-800"
                >
                  {cancelText}
                </button>

                <button
                  onClick={() => {
                    onConfirm();
                    onClose();
                  }}
                  className={`px-4 py-2 rounded-lg text-sm font-medium text-white ${variantMap[variant].button}`}
                >
                  {confirmText}
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
