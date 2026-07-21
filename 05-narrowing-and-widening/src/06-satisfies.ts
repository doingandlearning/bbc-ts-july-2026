const colors: Record<string, string> = {
  red: "#ff0000",
  green: "#00FF00",
  blue: "#0000ff",
  purple: "#800080",
};

type Blue = "#0000ff" | "#3b82f6";

type Theme = {
  primary: Blue;
  secondary: string;
  success: string;
};

const theme = {
  primary: "#3b82f6",
  secondary: "#64748b",
  success: "#10b981",
} as const satisfies Theme;
