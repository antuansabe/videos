/**
 * @jest-environment node
 */

import { POST } from "@/app/api/download/route";
import { NextResponse } from "next/server";

// Mock NextResponse
jest.mock("next/server", () => ({
  NextResponse: {
    json: jest.fn((data, options) => ({
      data,
      status: options?.status || 200,
    })),
  },
}));

describe("Download API Route", () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it("returns error when URL is not provided", async () => {
    const request = {
      json: () => Promise.resolve({}),
    };

    const response = await POST(request);

    expect(NextResponse.json).toHaveBeenCalledWith(
      { status: "error", message: "URL is required" },
      { status: 400 }
    );
  });

  it("returns error when COBALT_API_URL is not configured", async () => {
    delete process.env.COBALT_API_URL;

    const request = {
      json: () => Promise.resolve({ url: "https://youtube.com/test" }),
    };

    const response = await POST(request);

    expect(NextResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "error",
        message: expect.stringContaining("COBALT_API_URL"),
      }),
      { status: 500 }
    );
  });

  it("calls Cobalt API with correct parameters", async () => {
    process.env.COBALT_API_URL = "https://cobalt.example.com";

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: "tunnel", url: "https://download.url" }),
    });

    const request = {
      json: () =>
        Promise.resolve({
          url: "https://youtube.com/test",
          downloadMode: "auto",
          videoQuality: "1080",
          audioFormat: "mp3",
        }),
    };

    await POST(request);

    expect(global.fetch).toHaveBeenCalledWith(
      "https://cobalt.example.com",
      expect.objectContaining({
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: expect.stringContaining("https://youtube.com/test"),
      })
    );
  });

  it("returns Cobalt API response on success", async () => {
    process.env.COBALT_API_URL = "https://cobalt.example.com";

    const cobaltResponse = {
      status: "tunnel",
      url: "https://download.url/video.mp4",
      filename: "video.mp4",
    };

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve(cobaltResponse),
    });

    const request = {
      json: () => Promise.resolve({ url: "https://youtube.com/test" }),
    };

    await POST(request);

    expect(NextResponse.json).toHaveBeenCalledWith(cobaltResponse, { status: 200 });
  });

  it("returns error response when Cobalt API fails", async () => {
    process.env.COBALT_API_URL = "https://cobalt.example.com";

    const errorResponse = {
      status: "error",
      error: { code: "fetch.fail" },
    };

    global.fetch.mockResolvedValueOnce({
      ok: false,
      json: () => Promise.resolve(errorResponse),
    });

    const request = {
      json: () => Promise.resolve({ url: "https://youtube.com/test" }),
    };

    await POST(request);

    expect(NextResponse.json).toHaveBeenCalledWith(errorResponse, { status: 400 });
  });

  it("handles network errors gracefully", async () => {
    process.env.COBALT_API_URL = "https://cobalt.example.com";

    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    const request = {
      json: () => Promise.resolve({ url: "https://youtube.com/test" }),
    };

    await POST(request);

    expect(NextResponse.json).toHaveBeenCalledWith(
      expect.objectContaining({
        status: "error",
        message: "Error interno del servidor",
      }),
      { status: 500 }
    );
  });

  it("uses default values for optional parameters", async () => {
    process.env.COBALT_API_URL = "https://cobalt.example.com";

    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: () => Promise.resolve({ status: "tunnel" }),
    });

    const request = {
      json: () => Promise.resolve({ url: "https://youtube.com/test" }),
    };

    await POST(request);

    const fetchCall = global.fetch.mock.calls[0];
    const body = JSON.parse(fetchCall[1].body);

    expect(body.downloadMode).toBe("auto");
    expect(body.videoQuality).toBe("1080");
    expect(body.audioFormat).toBe("mp3");
    expect(body.filenameStyle).toBe("pretty");
  });
});
