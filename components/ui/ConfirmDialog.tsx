"use client";

import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Info, CheckCircle, XCircle } from "lucide-react";

export type ConfirmVariant = "info" | "warning" | "danger" | "success";

const variantMap = {
  info: { icon: Info, color: "text-blue-600", button: "bg-blue-600" },
  warning: { icon: AlertTriangle, color: "text-yellow-600", button: "bg-yellow-600" },
  danger: { icon: XCircle, color: "text-red-600", button: "bg-red-600" },
  success: { icon: CheckCircle, color: "text-green-600", button: "bg-green-600" },
};

export function ConfirmDialog({
  open,
  title,
  description,
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "info",
  onConfirm,
  onClose,
}: {
  open: boolean;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  onConfirm: () => void;
  onClose: () => void;
}) {
  const Icon = variantMap[variant].icon;

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={onClose}
          />

          <motion.div className="fixed inset-0 z-50 flex items-center justify-center px-3">
            <div className="w-full max-w-sm bg-white dark:bg-zinc-900 rounded-xl p-4">
              <div className="flex gap-2">
                <Icon className={`${variantMap[variant].color}`} size={18} />
                <div>
                  <h3 className="text-sm font-semibold">{title}</h3>
                  {description && (
                    <p className="text-xs text-zinc-500">{description}</p>
                  )}
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={onClose}
                  className="px-3 py-1.5 text-xs rounded-lg border"
                >
                  {cancelText}
                </button>
                <button
                  onClick={onConfirm}
                  className={`px-3 py-1.5 text-xs rounded-lg text-white ${variantMap[variant].button}`}
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
