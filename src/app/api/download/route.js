import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { url, downloadMode, videoQuality, audioFormat } = body;

    if (!url) {
      return NextResponse.json(
        { status: "error", message: "URL is required" },
        { status: 400 }
      );
    }

    const apiUrl = process.env.COBALT_API_URL;

    if (!apiUrl) {
      return NextResponse.json(
        {
          status: "error",
          message:
            "COBALT_API_URL no está configurada. Revisa tu archivo .env.local",
        },
        { status: 500 }
      );
    }

    const cobaltBody = {
      url,
      downloadMode: downloadMode || "auto",
      videoQuality: videoQuality || "1080",
      audioFormat: audioFormat || "mp3",
      filenameStyle: "pretty",
    };

    const response = await fetch(`${apiUrl}/api/json`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(cobaltBody),
    });

    const data = await response.json();

    return NextResponse.json(data, { status: response.ok ? 200 : 400 });
  } catch (error) {
    console.error("Download API error:", error);
    return NextResponse.json(
      {
        status: "error",
        message: "Error interno del servidor",
      },
      { status: 500 }
    );
  }
}
