
import type { ToastActionElement, ToastProps } from "@/components/ui/toast";
import { useToast as useHooksToast, toast as hooksToast } from "@/hooks/use-toast";

export const useToast = useHooksToast;
export const toast = hooksToast;

export type { ToastProps, ToastActionElement };
