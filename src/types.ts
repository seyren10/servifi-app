/* LIST OF COMMON TYPES */

export type SemanticType = "success" | "error" | "info" | "warning";

export type SizeType = "sm" | "md" | "lg" | "default";

export type VariantType = "icon" | "none" | "default" | "secondary";

export type ActionResponse = {
  ok: boolean;
  message?: string;
};
