"use client";

import { useState, useEffect } from "react";
import {
  Box,
  TextField,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  CircularProgress,
  Alert,
  Chip,
  Stack,
  InputAdornment,
  IconButton,
  Collapse,
  Typography,
  Paper,
  Fade,
  Grow,
  useTheme,
} from "@mui/material";
import ContentPasteRoundedIcon from "@mui/icons-material/ContentPasteRounded";
import DownloadRoundedIcon from "@mui/icons-material/DownloadRounded";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import ExpandMoreRoundedIcon from "@mui/icons-material/ExpandMoreRounded";
import ExpandLessRoundedIcon from "@mui/icons-material/ExpandLessRounded";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import OpenInNewRoundedIcon from "@mui/icons-material/OpenInNewRounded";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import CameraAltRoundedIcon from "@mui/icons-material/CameraAltRounded";
import MusicNoteRoundedIcon from "@mui/icons-material/MusicNoteRounded";
import MovieRoundedIcon from "@mui/icons-material/MovieRounded";

const SUPPORTED_SERVICES = [
  { name: "YouTube", color: "#FF0000" },
  { name: "Instagram", color: "#E4405F" },
  { name: "TikTok", color: "#00F2EA" },
  { name: "Twitter / X", color: "#1DA1F2" },
  { name: "Reddit", color: "#FF4500" },
  { name: "Pinterest", color: "#E60023" },
  { name: "Facebook", color: "#1877F2" },
  { name: "SoundCloud", color: "#FF5500" },
  { name: "Twitch", color: "#9146FF" },
  { name: "Bluesky", color: "#0085FF" },
  { name: "Snapchat", color: "#FFFC00" },
];

export default function DownloadForm() {
  const theme = useTheme();
  const isDark = theme.palette.mode === "dark";

  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState(null);
  const [showOptions, setShowOptions] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [options, setOptions] = useState({
    downloadMode: "auto",
    videoQuality: "1080",
    audioFormat: "mp3",
  });

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setUrl(text);
    } catch {
      // clipboard not available
    }
  };

  const handleDownload = async () => {
    if (!url.trim()) {
      setError("Paste a link to continue");
      return;
    }

    setError("");
    setResult(null);
    setLoading(true);

    try {
      const res = await fetch("/api/download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim(), ...options }),
      });

      const data = await res.json();

      if (!res.ok || data.status === "error") {
        setError(data.error?.code || data.message || "Error processing the link");
        return;
      }

      setResult(data);

      if (data.status === "tunnel" || data.status === "redirect") {
        window.open(data.url, "_blank");
      }
    } catch {
      setError("Connection error. Check your API configuration.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleDownload();
  };

  const detectPlatform = (inputUrl) => {
    const lower = inputUrl.toLowerCase();
    if (lower.includes("youtube.com") || lower.includes("youtu.be")) return "YouTube";
    if (lower.includes("instagram.com")) return "Instagram";
    if (lower.includes("tiktok.com")) return "TikTok";
    if (lower.includes("twitter.com") || lower.includes("x.com")) return "Twitter / X";
    if (lower.includes("reddit.com")) return "Reddit";
    return null;
  };

  const detectedPlatform = detectPlatform(url);
  const platformColor = SUPPORTED_SERVICES.find((s) => s.name === detectedPlatform)?.color;

  const getPlatformIcon = () => {
    switch (detectedPlatform) {
      case "YouTube":
        return <PlayCircleFilledRoundedIcon sx={{ fontSize: 20, color: "#FF0000" }} />;
      case "Instagram":
        return <CameraAltRoundedIcon sx={{ fontSize: 18, color: "#E4405F" }} />;
      case "TikTok":
        return <MusicNoteRoundedIcon sx={{ fontSize: 18, color: "#00F2EA" }} />;
      default:
        return (
          <DownloadRoundedIcon
            sx={{ fontSize: 18, color: "primary.main", opacity: 0.7 }}
          />
        );
    }
  };

  return (
    <Fade in={mounted} timeout={700}>
      <Box sx={{ width: "100%", maxWidth: 560, mx: "auto" }}>
        {/* Search / URL Input Card */}
        <Paper
          elevation={2}
          sx={{
            p: 0.75,
            borderRadius: "24px",
            mb: 2,
            border: "1px solid",
            borderColor: isDark ? "rgba(138,180,248,0.12)" : "rgba(26,115,232,0.1)",
            background: isDark
              ? "rgba(26, 32, 40, 0.9)"
              : "rgba(255,255,255,0.95)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "&:focus-within": {
              borderColor: isDark ? "rgba(138,180,248,0.4)" : "rgba(26,115,232,0.4)",
              boxShadow: isDark
                ? "0 0 0 2px rgba(138,180,248,0.15), 0 8px 32px rgba(138,180,248,0.08)"
                : "0 0 0 2px rgba(26,115,232,0.1), 0 8px 32px rgba(26,115,232,0.06)",
            },
          }}
        >
          <TextField
            fullWidth
            variant="standard"
            placeholder="Paste a YouTube, Instagram, TikTok link..."
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
              setResult(null);
            }}
            onKeyDown={handleKeyDown}
            disabled={loading}
            slotProps={{
              input: {
                disableUnderline: true,
                startAdornment: (
                  <InputAdornment position="start" sx={{ ml: 1.5 }}>
                    <Box
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "12px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        background: detectedPlatform
                          ? `${platformColor}15`
                          : isDark
                          ? "rgba(138,180,248,0.1)"
                          : "rgba(26,115,232,0.08)",
                        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                      }}
                    >
                      {getPlatformIcon()}
                    </Box>
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end" sx={{ mr: 0.5 }}>
                    <IconButton
                      onClick={handlePaste}
                      size="small"
                      title="Paste from clipboard"
                      sx={{
                        borderRadius: "12px",
                        width: 40,
                        height: 40,
                        color: "text.secondary",
                        "&:hover": {
                          color: "primary.main",
                        },
                      }}
                    >
                      <ContentPasteRoundedIcon sx={{ fontSize: 20 }} />
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: "1rem",
                py: 1.25,
              },
              "& .MuiInputBase-input": {
                "&::placeholder": {
                  opacity: 0.6,
                },
              },
            }}
          />
        </Paper>

        {/* Platform badge */}
        <Collapse in={!!detectedPlatform}>
          <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
            <Chip
              label={`${detectedPlatform} detected`}
              size="small"
              icon={
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    backgroundColor: platformColor,
                    ml: 1,
                  }}
                />
              }
              sx={{
                fontSize: "0.8rem",
                fontWeight: 600,
                height: 32,
                background: isDark
                  ? "rgba(138,180,248,0.12)"
                  : "rgba(26,115,232,0.08)",
                color: isDark ? "#8ab4f8" : "#1a73e8",
                border: "none",
                "& .MuiChip-icon": {
                  ml: 1,
                },
              }}
            />
          </Box>
        </Collapse>

        {/* Options Toggle */}
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <Button
            size="small"
            startIcon={<TuneRoundedIcon sx={{ fontSize: 18 }} />}
            endIcon={
              showOptions ? (
                <ExpandLessRoundedIcon sx={{ fontSize: 18 }} />
              ) : (
                <ExpandMoreRoundedIcon sx={{ fontSize: 18 }} />
              )
            }
            onClick={() => setShowOptions(!showOptions)}
            sx={{
              color: "text.secondary",
              fontSize: "0.875rem",
              px: 2.5,
              py: 1,
              borderRadius: "14px",
              fontWeight: 500,
              "&:hover": {
                background: isDark
                  ? "rgba(138,180,248,0.08)"
                  : "rgba(26,115,232,0.04)",
              },
            }}
          >
            Advanced options
          </Button>
        </Box>

        {/* Options Panel */}
        <Collapse in={showOptions} timeout={300}>
          <Paper
            elevation={0}
            sx={{
              display: "flex",
              gap: 2,
              mb: 2.5,
              p: 2.5,
              flexWrap: "wrap",
              borderRadius: "20px",
              border: "1px solid",
              borderColor: isDark ? "rgba(95,99,104,0.3)" : "rgba(0,0,0,0.08)",
              background: isDark
                ? "rgba(26, 32, 40, 0.7)"
                : "rgba(248,249,250,0.9)",
            }}
          >
            <FormControl size="small" sx={{ flex: "1 1 150px", minWidth: 140 }}>
              <InputLabel>Mode</InputLabel>
              <Select
                value={options.downloadMode}
                label="Mode"
                onChange={(e) =>
                  setOptions({ ...options, downloadMode: e.target.value })
                }
                sx={{ borderRadius: "14px" }}
              >
                <MenuItem value="auto">
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <MovieRoundedIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                    Video + Audio
                  </Stack>
                </MenuItem>
                <MenuItem value="audio">
                  <Stack direction="row" alignItems="center" gap={1.5}>
                    <MusicNoteRoundedIcon sx={{ fontSize: 18, opacity: 0.7 }} />
                    Audio only
                  </Stack>
                </MenuItem>
                <MenuItem value="mute">Video without audio</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ flex: "1 1 120px", minWidth: 120 }}>
              <InputLabel>Quality</InputLabel>
              <Select
                value={options.videoQuality}
                label="Quality"
                onChange={(e) =>
                  setOptions({ ...options, videoQuality: e.target.value })
                }
                sx={{ borderRadius: "14px" }}
              >
                <MenuItem value="max">Maximum</MenuItem>
                <MenuItem value="2160">4K</MenuItem>
                <MenuItem value="1440">1440p</MenuItem>
                <MenuItem value="1080">1080p</MenuItem>
                <MenuItem value="720">720p</MenuItem>
                <MenuItem value="480">480p</MenuItem>
              </Select>
            </FormControl>

            <FormControl size="small" sx={{ flex: "1 1 120px", minWidth: 120 }}>
              <InputLabel>Audio</InputLabel>
              <Select
                value={options.audioFormat}
                label="Audio"
                onChange={(e) =>
                  setOptions({ ...options, audioFormat: e.target.value })
                }
                sx={{ borderRadius: "14px" }}
              >
                <MenuItem value="best">Best</MenuItem>
                <MenuItem value="mp3">MP3</MenuItem>
                <MenuItem value="ogg">OGG</MenuItem>
                <MenuItem value="wav">WAV</MenuItem>
                <MenuItem value="opus">Opus</MenuItem>
              </Select>
            </FormControl>
          </Paper>
        </Collapse>

        {/* Download Button */}
        <Button
          fullWidth
          variant="contained"
          size="large"
          onClick={handleDownload}
          disabled={loading || !url.trim()}
          startIcon={
            loading ? (
              <CircularProgress
                size={22}
                sx={{ color: isDark ? "rgba(6,46,111,0.7)" : "rgba(255,255,255,0.7)" }}
              />
            ) : (
              <DownloadRoundedIcon sx={{ fontSize: 22 }} />
            )
          }
          sx={{
            py: 2,
            fontSize: "1rem",
            borderRadius: "20px",
            fontWeight: 700,
            letterSpacing: "0.01em",
            color: isDark ? "#062e6f" : "#ffffff",
            background: loading
              ? undefined
              : isDark
              ? "linear-gradient(135deg, #8ab4f8 0%, #669df6 50%, #4285f4 100%)"
              : "linear-gradient(135deg, #1a73e8 0%, #1557b0 100%)",
            boxShadow: loading
              ? "none"
              : isDark
              ? "0 4px 20px rgba(138,180,248,0.3)"
              : "0 4px 20px rgba(26,115,232,0.35)",
            "&:hover": {
              background: isDark
                ? "linear-gradient(135deg, #aecbfa 0%, #8ab4f8 50%, #669df6 100%)"
                : "linear-gradient(135deg, #4285f4 0%, #1a73e8 100%)",
              boxShadow: isDark
                ? "0 6px 28px rgba(138,180,248,0.4)"
                : "0 6px 28px rgba(26,115,232,0.45)",
              transform: "translateY(-1px)",
            },
            "&:active": {
              transform: "translateY(0) scale(0.99)",
            },
            "&.Mui-disabled": {
              background: isDark
                ? "rgba(95,99,104,0.3)"
                : "rgba(0,0,0,0.08)",
              color: isDark ? "rgba(232,234,237,0.4)" : "rgba(0,0,0,0.26)",
            },
            transition: "all 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {loading ? "Processing..." : "Download"}
        </Button>

        {/* Error Alert */}
        <Collapse in={!!error}>
          <Alert
            severity="error"
            sx={{
              mt: 2,
              borderRadius: "16px",
              "& .MuiAlert-icon": { alignItems: "center" },
            }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        </Collapse>

        {/* Picker Result */}
        <Collapse in={result?.status === "picker"}>
          <Box sx={{ mt: 3 }}>
            <Alert
              severity="info"
              icon={<CheckCircleRoundedIcon />}
              sx={{ mb: 2, borderRadius: "16px" }}
            >
              {result?.picker?.length} files found
            </Alert>
            <Stack spacing={1.5}>
              {result?.picker?.map((item, i) => (
                <Button
                  key={i}
                  variant="outlined"
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  startIcon={<DownloadRoundedIcon />}
                  sx={{
                    justifyContent: "flex-start",
                    borderRadius: "14px",
                    py: 1.5,
                    borderColor: isDark
                      ? "rgba(138,180,248,0.3)"
                      : "rgba(26,115,232,0.3)",
                    "&:hover": {
                      borderColor: isDark
                        ? "rgba(138,180,248,0.5)"
                        : "rgba(26,115,232,0.5)",
                    },
                  }}
                >
                  {item.type === "photo" ? "Image" : "Video"} #{i + 1}
                </Button>
              ))}
            </Stack>
          </Box>
        </Collapse>

        {/* Success */}
        <Collapse
          in={
            !!result &&
            (result.status === "tunnel" || result.status === "redirect")
          }
        >
          <Alert
            severity="success"
            icon={<CheckCircleRoundedIcon />}
            sx={{ mt: 2, borderRadius: "16px" }}
            action={
              <IconButton
                color="inherit"
                size="small"
                href={result?.url}
                target="_blank"
                title="Open in new tab"
                sx={{ borderRadius: "10px" }}
              >
                <OpenInNewRoundedIcon />
              </IconButton>
            }
          >
            {result?.filename
              ? `Downloading: ${result.filename}`
              : "Download started"}
          </Alert>
        </Collapse>

        {/* Supported Services */}
        <Grow in={mounted} timeout={900}>
          <Box sx={{ mt: 5, textAlign: "center" }}>
            <Typography
              variant="overline"
              sx={{
                color: "text.disabled",
                mb: 2,
                display: "block",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
              }}
            >
              Supported platforms
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              justifyContent="center"
              useFlexGap
            >
              {SUPPORTED_SERVICES.map((s) => (
                <Chip
                  key={s.name}
                  label={s.name}
                  size="small"
                  variant="outlined"
                  sx={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    height: 30,
                    borderRadius: "8px",
                    borderColor: isDark
                      ? "rgba(95,99,104,0.4)"
                      : "rgba(0,0,0,0.1)",
                    transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
                    "&:hover": {
                      borderColor: s.color,
                      color: s.color,
                      background: `${s.color}12`,
                      transform: "translateY(-1px)",
                    },
                  }}
                />
              ))}
            </Stack>
          </Box>
        </Grow>
      </Box>
    </Fade>
  );
}
