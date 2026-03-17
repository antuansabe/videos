import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import DownloadForm from "@/components/DownloadForm";
import { ThemeProvider, createTheme } from "@mui/material";

const theme = createTheme({ palette: { mode: "dark" } });

const renderWithTheme = (component) => {
  return render(<ThemeProvider theme={theme}>{component}</ThemeProvider>);
};

describe("DownloadForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch.mockReset();
  });

  it("renders the URL input field", async () => {
    renderWithTheme(<DownloadForm />);

    await waitFor(
      () => {
        const input = screen.getByPlaceholderText(/paste a/i);
        expect(input).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("renders the download button", async () => {
    renderWithTheme(<DownloadForm />);

    await waitFor(
      () => {
        const button = screen.getByRole("button", { name: /download/i });
        expect(button).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("download button is disabled when input is empty", async () => {
    renderWithTheme(<DownloadForm />);

    await waitFor(
      () => {
        const button = screen.getByRole("button", { name: /download/i });
        expect(button).toBeDisabled();
      },
      { timeout: 3000 }
    );
  });

  it("enables download button when URL is entered", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DownloadForm />);

    // Wait for component to mount
    await waitFor(
      () => {
        expect(screen.getByPlaceholderText(/paste a/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const input = screen.getByPlaceholderText(/paste a/i);
    await user.type(input, "https://youtube.com/watch?v=test");

    await waitFor(() => {
      const button = screen.getByRole("button", { name: /download/i });
      expect(button).not.toBeDisabled();
    });
  });

  it("detects YouTube platform from URL", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DownloadForm />);

    await waitFor(
      () => {
        expect(screen.getByPlaceholderText(/paste a/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const input = screen.getByPlaceholderText(/paste a/i);
    await user.type(input, "https://youtube.com/watch?v=test");

    await waitFor(() => {
      expect(screen.getByText(/youtube detected/i)).toBeInTheDocument();
    });
  });

  it("detects Instagram platform from URL", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DownloadForm />);

    await waitFor(
      () => {
        expect(screen.getByPlaceholderText(/paste a/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const input = screen.getByPlaceholderText(/paste a/i);
    await user.type(input, "https://instagram.com/p/test");

    await waitFor(() => {
      expect(screen.getByText(/instagram detected/i)).toBeInTheDocument();
    });
  });

  it("detects TikTok platform from URL", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DownloadForm />);

    await waitFor(
      () => {
        expect(screen.getByPlaceholderText(/paste a/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const input = screen.getByPlaceholderText(/paste a/i);
    await user.type(input, "https://tiktok.com/@user/video/123");

    await waitFor(() => {
      expect(screen.getByText(/tiktok detected/i)).toBeInTheDocument();
    });
  });

  it("shows error when download fails", async () => {
    const user = userEvent.setup();
    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve({ status: "error", message: "Invalid URL" }),
    });

    renderWithTheme(<DownloadForm />);

    await waitFor(
      () => {
        expect(screen.getByPlaceholderText(/paste a/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const input = screen.getByPlaceholderText(/paste a/i);
    await user.type(input, "https://invalid-url.com/video");

    await waitFor(() => {
      const button = screen.getByRole("button", { name: /download/i });
      expect(button).not.toBeDisabled();
    });

    const button = screen.getByRole("button", { name: /download/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/invalid url/i)).toBeInTheDocument();
    });
  });

  it("shows success message on successful download", async () => {
    const user = userEvent.setup();
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: "tunnel",
          url: "https://download.url/video.mp4",
          filename: "video.mp4",
        }),
    });

    renderWithTheme(<DownloadForm />);

    await waitFor(
      () => {
        expect(screen.getByPlaceholderText(/paste a/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const input = screen.getByPlaceholderText(/paste a/i);
    await user.type(input, "https://youtube.com/watch?v=test");

    await waitFor(() => {
      const button = screen.getByRole("button", { name: /download/i });
      expect(button).not.toBeDisabled();
    });

    const button = screen.getByRole("button", { name: /download/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/downloading/i)).toBeInTheDocument();
    });
  });

  it("toggles advanced options panel", async () => {
    const user = userEvent.setup();
    renderWithTheme(<DownloadForm />);

    await waitFor(
      () => {
        expect(
          screen.getByRole("button", { name: /advanced options/i })
        ).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const optionsButton = screen.getByRole("button", { name: /advanced options/i });
    await user.click(optionsButton);

    // Wait for collapse animation - use getAllByText since MUI renders label in multiple places
    await waitFor(
      () => {
        const modeElements = screen.getAllByText("Mode");
        expect(modeElements.length).toBeGreaterThan(0);
      },
      { timeout: 3000 }
    );
  });

  it("shows supported platforms chips", async () => {
    renderWithTheme(<DownloadForm />);

    await waitFor(
      () => {
        expect(screen.getByText("YouTube")).toBeInTheDocument();
        expect(screen.getByText("Instagram")).toBeInTheDocument();
        expect(screen.getByText("TikTok")).toBeInTheDocument();
        expect(screen.getByText("Twitter / X")).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("shows paste button", async () => {
    renderWithTheme(<DownloadForm />);

    await waitFor(
      () => {
        const pasteButton = screen.getByTitle(/paste from clipboard/i);
        expect(pasteButton).toBeInTheDocument();
      },
      { timeout: 3000 }
    );
  });

  it("shows picker results when API returns multiple files", async () => {
    const user = userEvent.setup();
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () =>
        Promise.resolve({
          status: "picker",
          picker: [
            { type: "video", url: "https://video1.mp4" },
            { type: "photo", url: "https://photo1.jpg" },
          ],
        }),
    });

    renderWithTheme(<DownloadForm />);

    await waitFor(
      () => {
        expect(screen.getByPlaceholderText(/paste a/i)).toBeInTheDocument();
      },
      { timeout: 3000 }
    );

    const input = screen.getByPlaceholderText(/paste a/i);
    await user.type(input, "https://instagram.com/p/test");

    await waitFor(() => {
      const button = screen.getByRole("button", { name: /download/i });
      expect(button).not.toBeDisabled();
    });

    const button = screen.getByRole("button", { name: /download/i });
    await user.click(button);

    await waitFor(() => {
      expect(screen.getByText(/2 files found/i)).toBeInTheDocument();
    });
  });
});
