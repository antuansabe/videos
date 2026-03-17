"use client";

import { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Tooltip,
  Fade,
  Grow,
  Stack,
} from "@mui/material";
import LightModeRoundedIcon from "@mui/icons-material/LightModeRounded";
import DarkModeRoundedIcon from "@mui/icons-material/DarkModeRounded";
import DownloadForm from "@/components/DownloadForm";
import { useColorMode } from "@/components/ThemeRegistry";

export default function Home() {
  const { toggleColorMode, mode } = useColorMode();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mode === "dark";

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
        background: isDark
          ? "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(138,180,248,0.08), transparent), #0f1318"
          : "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(26,115,232,0.06), transparent), #f8f9fa",
      }}
    >
      {/* Animated ambient orbs */}
      <Box
        sx={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 0,
          overflow: "hidden",
        }}
      >
        {/* Primary orb */}
        <Box
          sx={{
            position: "absolute",
            top: "-15%",
            left: "5%",
            width: "clamp(400px, 50vw, 700px)",
            height: "clamp(400px, 50vw, 700px)",
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(138,180,248,0.12) 0%, rgba(138,180,248,0.02) 50%, transparent 70%)"
              : "radial-gradient(circle, rgba(26,115,232,0.1) 0%, rgba(26,115,232,0.02) 50%, transparent 70%)",
            filter: "blur(60px)",
            animation: "float 20s ease-in-out infinite",
            "@keyframes float": {
              "0%, 100%": { transform: "translate(0, 0) scale(1)" },
              "33%": { transform: "translate(30px, -20px) scale(1.05)" },
              "66%": { transform: "translate(-20px, 20px) scale(0.95)" },
            },
          }}
        />

        {/* Secondary orb */}
        <Box
          sx={{
            position: "absolute",
            bottom: "-10%",
            right: "0%",
            width: "clamp(300px, 40vw, 500px)",
            height: "clamp(300px, 40vw, 500px)",
            borderRadius: "50%",
            background: isDark
              ? "radial-gradient(circle, rgba(129,201,149,0.1) 0%, rgba(129,201,149,0.02) 50%, transparent 70%)"
              : "radial-gradient(circle, rgba(19,115,51,0.08) 0%, rgba(19,115,51,0.01) 50%, transparent 70%)",
            filter: "blur(50px)",
            animation: "float2 25s ease-in-out infinite",
            "@keyframes float2": {
              "0%, 100%": { transform: "translate(0, 0) scale(1)" },
              "50%": { transform: "translate(-40px, -30px) scale(1.1)" },
            },
          }}
        />

        {/* Subtle grid overlay */}
        <Box
          sx={{
            position: "absolute",
            inset: 0,
            backgroundImage: isDark
              ? `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)`
              : `radial-gradient(circle at 1px 1px, rgba(0,0,0,0.02) 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </Box>

      {/* Top Bar */}
      <Fade in={mounted} timeout={500}>
        <Box
          component="header"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            px: { xs: 2.5, sm: 4 },
            py: 2,
            position: "relative",
            zIndex: 2,
          }}
        >
          {/* Brand */}
          <Stack direction="row" alignItems="center" spacing={1.5}>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "12px",
                background: isDark
                  ? "linear-gradient(135deg, #8ab4f8 0%, #669df6 100%)"
                  : "linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: isDark
                  ? "0 4px 12px rgba(138,180,248,0.25)"
                  : "0 4px 12px rgba(26,115,232,0.3)",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "&:hover": {
                  transform: "scale(1.05)",
                },
              }}
            >
              <svg
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4V16M12 16L7 11M12 16L17 11"
                  stroke={isDark ? "#062e6f" : "#ffffff"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 20H19"
                  stroke={isDark ? "#062e6f" : "#ffffff"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </Box>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                fontSize: "1.1rem",
                color: "text.primary",
                letterSpacing: "-0.02em",
                display: { xs: "none", sm: "block" },
              }}
            >
              VidDown
            </Typography>
          </Stack>

          {/* Theme Toggle */}
          <Tooltip title={isDark ? "Light mode" : "Dark mode"} arrow>
            <IconButton
              onClick={toggleColorMode}
              sx={{
                width: 44,
                height: 44,
                borderRadius: "14px",
                border: "1px solid",
                borderColor: isDark ? "rgba(138,180,248,0.2)" : "rgba(26,115,232,0.15)",
                color: "text.secondary",
                background: isDark
                  ? "rgba(138,180,248,0.06)"
                  : "rgba(26,115,232,0.04)",
                transition: "all 0.2s ease",
                "&:hover": {
                  borderColor: isDark ? "rgba(138,180,248,0.4)" : "rgba(26,115,232,0.3)",
                  background: isDark
                    ? "rgba(138,180,248,0.12)"
                    : "rgba(26,115,232,0.08)",
                },
              }}
            >
              {isDark ? (
                <LightModeRoundedIcon sx={{ fontSize: 22 }} />
              ) : (
                <DarkModeRoundedIcon sx={{ fontSize: 22 }} />
              )}
            </IconButton>
          </Tooltip>
        </Box>
      </Fade>

      {/* Main Content */}
      <Container
        maxWidth="sm"
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: { xs: 3, sm: 5 },
          px: { xs: 2.5, sm: 3 },
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Hero Section */}
        <Grow in={mounted} timeout={600}>
          <Box sx={{ textAlign: "center", mb: { xs: 3, sm: 4 }, width: "100%" }}>
            {/* Animated Icon */}
            <Box
              sx={{
                width: 88,
                height: 88,
                borderRadius: "28px",
                background: isDark
                  ? "linear-gradient(145deg, #8ab4f8 0%, #669df6 50%, #4285f4 100%)"
                  : "linear-gradient(145deg, #4285f4 0%, #1a73e8 50%, #1557b0 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                mx: "auto",
                mb: 3.5,
                boxShadow: isDark
                  ? "0 8px 32px rgba(138,180,248,0.3), inset 0 1px 0 rgba(255,255,255,0.15)"
                  : "0 8px 32px rgba(26,115,232,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
                position: "relative",
                animation: "pulse 3s ease-in-out infinite",
                "@keyframes pulse": {
                  "0%, 100%": {
                    boxShadow: isDark
                      ? "0 8px 32px rgba(138,180,248,0.3), inset 0 1px 0 rgba(255,255,255,0.15)"
                      : "0 8px 32px rgba(26,115,232,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
                  },
                  "50%": {
                    boxShadow: isDark
                      ? "0 12px 48px rgba(138,180,248,0.4), inset 0 1px 0 rgba(255,255,255,0.15)"
                      : "0 12px 48px rgba(26,115,232,0.45), inset 0 1px 0 rgba(255,255,255,0.2)",
                  },
                },
                "&::before": {
                  content: '""',
                  position: "absolute",
                  inset: -4,
                  borderRadius: "32px",
                  background: isDark
                    ? "linear-gradient(145deg, rgba(138,180,248,0.2), transparent 60%, rgba(129,201,149,0.15))"
                    : "linear-gradient(145deg, rgba(26,115,232,0.15), transparent 60%, rgba(19,115,51,0.1))",
                  filter: "blur(12px)",
                  zIndex: -1,
                },
              }}
            >
              <svg
                width="40"
                height="40"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 4V16M12 16L7 11M12 16L17 11"
                  stroke={isDark ? "#062e6f" : "#ffffff"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M5 20H19"
                  stroke={isDark ? "#062e6f" : "#ffffff"}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </Box>

            {/* Title */}
            <Typography
              variant="h3"
              sx={{
                fontWeight: 700,
                fontSize: { xs: "2rem", sm: "2.75rem" },
                lineHeight: 1.1,
                mb: 2,
                background: isDark
                  ? "linear-gradient(135deg, #e8eaed 0%, #aecbfa 40%, #8ab4f8 100%)"
                  : "linear-gradient(135deg, #202124 0%, #1a73e8 40%, #4285f4 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Video Downloader
            </Typography>

            {/* Subtitle */}
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                maxWidth: 400,
                mx: "auto",
                lineHeight: 1.7,
                fontSize: { xs: "0.95rem", sm: "1.05rem" },
              }}
            >
              Download videos and audio from your favorite platforms.
              <Box
                component="span"
                sx={{
                  display: "block",
                  mt: 1,
                  color: "text.disabled",
                  fontSize: { xs: "0.85rem", sm: "0.9rem" },
                  fontWeight: 500,
                }}
              >
                No ads · No tracking · Open source
              </Box>
            </Typography>
          </Box>
        </Grow>

        {/* Download Form */}
        <Box sx={{ width: "100%", maxWidth: 560 }}>
          <DownloadForm />
        </Box>
      </Container>

      {/* Footer */}
      <Fade in={mounted} timeout={900}>
        <Box
          component="footer"
          sx={{
            textAlign: "center",
            py: { xs: 3, sm: 4 },
            px: 2,
            position: "relative",
            zIndex: 1,
          }}
        >
          <Stack spacing={1} alignItems="center">
            <Typography
              variant="caption"
              sx={{
                color: "text.disabled",
                fontSize: "0.8rem",
                display: "flex",
                alignItems: "center",
                gap: 0.75,
                flexWrap: "wrap",
                justifyContent: "center",
              }}
            >
              Powered by{" "}
              <Box
                component="a"
                href="https://github.com/imputnet/cobalt"
                target="_blank"
                rel="noopener noreferrer"
                sx={{
                  color: "primary.main",
                  textDecoration: "none",
                  fontWeight: 600,
                  transition: "opacity 0.2s ease",
                  "&:hover": { opacity: 0.8, textDecoration: "underline" },
                }}
              >
                Cobalt
              </Box>
              <Box component="span" sx={{ mx: 0.5, opacity: 0.5 }}>
                ·
              </Box>
              Personal use only
            </Typography>

            <Typography
              variant="caption"
              sx={{
                color: "text.disabled",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.05em",
                opacity: 0.7,
              }}
            >
              Designed by{" "}
              <Box
                component="span"
                sx={{
                  background: isDark
                    ? "linear-gradient(90deg, #8ab4f8, #81c995)"
                    : "linear-gradient(90deg, #1a73e8, #137333)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: 700,
                  letterSpacing: "0.03em",
                }}
              >
                Antonn
              </Box>
            </Typography>
          </Stack>
        </Box>
      </Fade>
    </Box>
  );
}
