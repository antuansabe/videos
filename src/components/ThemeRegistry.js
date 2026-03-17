"use client";

import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const ColorModeContext = createContext({ toggleColorMode: () => {}, mode: "dark" });

export function useColorMode() {
  return useContext(ColorModeContext);
}

// Google-inspired M3 Premium Palette
const M3_DARK = {
  primary: { main: "#8ab4f8", light: "#aecbfa", dark: "#4285f4", contrastText: "#062e6f" },
  secondary: { main: "#81c995", light: "#a8dab5", dark: "#34a853", contrastText: "#0d3f1b" },
  error: { main: "#f28b82", light: "#fad2cf", dark: "#c5221f" },
  warning: { main: "#fdd663", light: "#feefc3", dark: "#f9ab00" },
  success: { main: "#81c995", light: "#a8dab5", dark: "#137333" },
  info: { main: "#8ab4f8", light: "#aecbfa", dark: "#1a73e8" },
  background: {
    default: "#0f1318",
    paper: "#1a2028",
  },
  text: {
    primary: "#e8eaed",
    secondary: "#9aa0a6",
    disabled: "#5f6368",
  },
  divider: "rgba(95, 99, 104, 0.4)",
  action: {
    hover: "rgba(138, 180, 248, 0.08)",
    selected: "rgba(138, 180, 248, 0.16)",
    focus: "rgba(138, 180, 248, 0.12)",
    disabledBackground: "rgba(232, 234, 237, 0.12)",
  },
};

const M3_LIGHT = {
  primary: { main: "#1a73e8", light: "#4285f4", dark: "#1557b0", contrastText: "#ffffff" },
  secondary: { main: "#137333", light: "#34a853", dark: "#0d5025", contrastText: "#ffffff" },
  error: { main: "#c5221f", light: "#ea4335", dark: "#a50e0e" },
  warning: { main: "#e37400", light: "#f9ab00", dark: "#b05a00" },
  success: { main: "#137333", light: "#34a853", dark: "#0d5025" },
  info: { main: "#1a73e8", light: "#4285f4", dark: "#1557b0" },
  background: {
    default: "#f8f9fa",
    paper: "#ffffff",
  },
  text: {
    primary: "#202124",
    secondary: "#5f6368",
    disabled: "#9aa0a6",
  },
  divider: "rgba(0, 0, 0, 0.08)",
  action: {
    hover: "rgba(26, 115, 232, 0.04)",
    selected: "rgba(26, 115, 232, 0.08)",
    focus: "rgba(26, 115, 232, 0.12)",
    disabledBackground: "rgba(0, 0, 0, 0.04)",
  },
};

function buildTheme(mode) {
  const palette = mode === "dark" ? M3_DARK : M3_LIGHT;
  const isDark = mode === "dark";

  return createTheme({
    palette: { mode, ...palette },
    typography: {
      fontFamily: "'Outfit', 'Google Sans Text', system-ui, sans-serif",
      h1: { fontWeight: 700, letterSpacing: "-0.025em", lineHeight: 1.1 },
      h2: { fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.15 },
      h3: { fontWeight: 600, letterSpacing: "-0.015em", lineHeight: 1.2 },
      h4: { fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.25 },
      h5: { fontWeight: 600, letterSpacing: "-0.005em" },
      h6: { fontWeight: 600, letterSpacing: "0" },
      subtitle1: { fontWeight: 500, lineHeight: 1.5, letterSpacing: "0.01em" },
      subtitle2: { fontWeight: 500, fontSize: "0.875rem", letterSpacing: "0.01em" },
      body1: { lineHeight: 1.6, letterSpacing: "0.01em" },
      body2: { lineHeight: 1.5, letterSpacing: "0.01em" },
      button: { textTransform: "none", fontWeight: 600, letterSpacing: "0.02em" },
      caption: { letterSpacing: "0.03em", fontWeight: 500 },
      overline: { fontWeight: 600, letterSpacing: "0.1em", fontSize: "0.65rem" },
    },
    shape: { borderRadius: 16 },
    shadows: [
      "none",
      /* 1 */ isDark
        ? "0 1px 2px rgba(0,0,0,0.5), 0 1px 3px 1px rgba(0,0,0,0.3)"
        : "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
      /* 2 */ isDark
        ? "0 1px 2px rgba(0,0,0,0.5), 0 2px 6px 2px rgba(0,0,0,0.3)"
        : "0 1px 2px rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)",
      /* 3 */ isDark
        ? "0 4px 8px 3px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.5)"
        : "0 4px 8px 3px rgba(60,64,67,0.15), 0 1px 3px rgba(60,64,67,0.3)",
      /* 4 */ isDark
        ? "0 6px 10px 4px rgba(0,0,0,0.3), 0 2px 3px rgba(0,0,0,0.5)"
        : "0 6px 10px 4px rgba(60,64,67,0.15), 0 2px 3px rgba(60,64,67,0.3)",
      /* 5 */ isDark
        ? "0 8px 12px 6px rgba(0,0,0,0.3), 0 4px 4px rgba(0,0,0,0.5)"
        : "0 8px 12px 6px rgba(60,64,67,0.15), 0 4px 4px rgba(60,64,67,0.3)",
      /* 6+ */ ...Array(19).fill(
        isDark
          ? "0 8px 12px 6px rgba(0,0,0,0.3), 0 4px 4px rgba(0,0,0,0.5)"
          : "0 8px 12px 6px rgba(60,64,67,0.15), 0 4px 4px rgba(60,64,67,0.3)"
      ),
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarWidth: "thin",
            scrollbarColor: isDark ? "#5f6368 transparent" : "#dadce0 transparent",
          },
        },
      },
      MuiButton: {
        defaultProps: { disableElevation: true },
        styleOverrides: {
          root: {
            borderRadius: 24,
            padding: "12px 28px",
            fontSize: "0.9375rem",
            fontWeight: 600,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          contained: {
            "&:hover": {
              boxShadow: isDark
                ? "0 1px 3px 1px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.5)"
                : "0 1px 3px 1px rgba(60,64,67,0.15), 0 1px 2px rgba(60,64,67,0.3)",
            },
            "&:active": {
              transform: "scale(0.98)",
            },
          },
          containedPrimary: {
            background: isDark
              ? "linear-gradient(135deg, #8ab4f8 0%, #669df6 100%)"
              : "linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)",
            "&:hover": {
              background: isDark
                ? "linear-gradient(135deg, #aecbfa 0%, #8ab4f8 100%)"
                : "linear-gradient(135deg, #4285f4 0%, #1a73e8 100%)",
            },
          },
          outlined: {
            borderWidth: "1.5px",
            "&:hover": {
              borderWidth: "1.5px",
              backgroundColor: isDark ? "rgba(138,180,248,0.08)" : "rgba(26,115,232,0.04)",
            },
          },
          text: {
            borderRadius: 20,
            "&:hover": {
              backgroundColor: isDark ? "rgba(138,180,248,0.08)" : "rgba(26,115,232,0.04)",
            },
          },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 16,
            ...(isDark && {
              background: "rgba(26, 32, 40, 0.85)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
            }),
            ...(!isDark && {
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(20px) saturate(180%)",
              WebkitBackdropFilter: "blur(20px) saturate(180%)",
            }),
          },
          elevation1: {
            boxShadow: isDark
              ? "0 1px 2px rgba(0,0,0,0.5), 0 1px 3px 1px rgba(0,0,0,0.3)"
              : "0 1px 2px rgba(60,64,67,0.3), 0 1px 3px 1px rgba(60,64,67,0.15)",
          },
          elevation2: {
            boxShadow: isDark
              ? "0 1px 2px rgba(0,0,0,0.5), 0 2px 6px 2px rgba(0,0,0,0.3)"
              : "0 1px 2px rgba(60,64,67,0.3), 0 2px 6px 2px rgba(60,64,67,0.15)",
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            borderRadius: 14,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: isDark ? "rgba(138,180,248,0.5)" : "rgba(26,115,232,0.5)",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderWidth: "2px",
              borderColor: isDark ? "#8ab4f8" : "#1a73e8",
            },
          },
          notchedOutline: {
            borderColor: isDark ? "rgba(95,99,104,0.5)" : "rgba(0,0,0,0.12)",
            transition: "border-color 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            fontSize: "0.9375rem",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            fontWeight: 500,
            borderRadius: 8,
            height: 32,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
          },
          outlined: {
            borderColor: isDark ? "rgba(95,99,104,0.5)" : "rgba(0,0,0,0.12)",
            "&:hover": {
              backgroundColor: isDark ? "rgba(138,180,248,0.08)" : "rgba(26,115,232,0.04)",
            },
          },
          filled: {
            backgroundColor: isDark ? "rgba(138,180,248,0.16)" : "rgba(26,115,232,0.08)",
          },
        },
      },
      MuiAlert: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            fontWeight: 500,
            alignItems: "center",
          },
          standardSuccess: {
            backgroundColor: isDark ? "rgba(129,201,149,0.16)" : "rgba(19,115,51,0.08)",
            color: isDark ? "#81c995" : "#137333",
          },
          standardError: {
            backgroundColor: isDark ? "rgba(242,139,130,0.16)" : "rgba(197,34,31,0.08)",
            color: isDark ? "#f28b82" : "#c5221f",
          },
          standardInfo: {
            backgroundColor: isDark ? "rgba(138,180,248,0.16)" : "rgba(26,115,232,0.08)",
            color: isDark ? "#8ab4f8" : "#1a73e8",
          },
        },
      },
      MuiSelect: {
        styleOverrides: {
          root: {
            borderRadius: 14,
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            margin: "2px 8px",
            padding: "10px 16px",
            transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
            "&.Mui-selected": {
              backgroundColor: isDark ? "rgba(138,180,248,0.16)" : "rgba(26,115,232,0.08)",
              "&:hover": {
                backgroundColor: isDark ? "rgba(138,180,248,0.24)" : "rgba(26,115,232,0.12)",
              },
            },
            "&:hover": {
              backgroundColor: isDark ? "rgba(138,180,248,0.08)" : "rgba(26,115,232,0.04)",
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            borderRadius: 8,
            fontSize: "0.8125rem",
            fontWeight: 500,
            padding: "8px 12px",
            backgroundColor: isDark ? "#3c4043" : "#202124",
          },
          arrow: {
            color: isDark ? "#3c4043" : "#202124",
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:hover": {
              backgroundColor: isDark ? "rgba(138,180,248,0.08)" : "rgba(26,115,232,0.04)",
            },
            "&:active": {
              transform: "scale(0.92)",
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiInputBase-root": {
              borderRadius: 14,
            },
          },
        },
      },
      MuiCollapse: {
        styleOverrides: {
          root: {
            transition: "height 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          },
        },
      },
    },
  });
}

export default function ThemeRegistry({ children }) {
  const [mode, setMode] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Check for system preference
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedMode = localStorage.getItem("theme-mode");
    if (savedMode) {
      setMode(savedMode);
    } else if (!prefersDark) {
      setMode("light");
    }
  }, []);

  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prev) => {
          const newMode = prev === "light" ? "dark" : "light";
          localStorage.setItem("theme-mode", newMode);
          return newMode;
        });
      },
      mode,
    }),
    [mode]
  );

  const theme = useMemo(() => buildTheme(mode), [mode]);

  // Prevent flash of wrong theme
  if (!mounted) {
    return (
      <div style={{ visibility: "hidden" }}>
        {children}
      </div>
    );
  }

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
