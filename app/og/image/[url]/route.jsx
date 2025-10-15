import { ImageResponse } from "next/og";

export const runtime = "edge";

async function fetchMetadata(url) {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; OG-Image-Generator)',
      },
    });

    if (!response.ok) {
      return null;
    }

    const html = await response.text();

    // Extract Open Graph image
    const ogImageMatch = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    if (ogImageMatch && ogImageMatch[1]) {
      return ogImageMatch[1];
    }

    // Extract Twitter image
    const twitterImageMatch = html.match(/<meta[^>]*name=["']twitter:image["'][^>]*content=["']([^"']+)["'][^>]*>/i);
    if (twitterImageMatch && twitterImageMatch[1]) {
      return twitterImageMatch[1];
    }

    // Fallback to first image in content
    const imgMatch = html.match(/<img[^>]*src=["']([^"']+)["'][^>]*>/i);
    if (imgMatch && imgMatch[1]) {
      return imgMatch[1];
    }

    return null;
  } catch (error) {
    console.error("Error fetching metadata:", error);
    return null;
  }
}

async function fetchImage(imageUrl, baseUrl) {
  try {
    // Handle relative URLs
    if (imageUrl.startsWith('/')) {
      const url = new URL(baseUrl);
      imageUrl = `${url.protocol}//${url.host}${imageUrl}`;
    } else if (!imageUrl.startsWith('http')) {
      const url = new URL(baseUrl);
      imageUrl = `${url.protocol}//${url.host}/${imageUrl}`;
    }

    const response = await fetch(imageUrl);
    if (!response.ok) {
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    return arrayBuffer;
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
}

export async function GET(request, { params }) {
  try {
    const resParams = await params;
    const url = decodeURIComponent(resParams.url);

    // Fetch metadata to find image
    const imageUrl = await fetchMetadata(url);

    if (!imageUrl) {
      // Fallback to text display if no image found
      return new ImageResponse(
        (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              fontSize: 32,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  marginBottom: 20,
                  color: "#000",
                  textAlign: "center",
                }}
              >
                {url}
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: "#666",
                  textAlign: "center",
                }}
              >
                No image found in metadata
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // Fetch the actual image
    const imageData = await fetchImage(imageUrl, url);

    if (!imageData) {
      // Fallback if image fetch fails
      return new ImageResponse(
        (
          <div
            style={{
              height: "100%",
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#fff",
              fontSize: 32,
              fontWeight: 600,
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px",
              }}
            >
              <div
                style={{
                  fontSize: 36,
                  fontWeight: 700,
                  marginBottom: 20,
                  color: "#000",
                  textAlign: "center",
                }}
              >
                {url}
              </div>
              <div
                style={{
                  fontSize: 24,
                  color: "#666",
                  textAlign: "center",
                }}
              >
                Failed to load image
              </div>
            </div>
          </div>
        ),
        {
          width: 1200,
          height: 630,
        }
      );
    }

    // Create ImageResponse with the fetched image
    return new ImageResponse(
      (
        <div
          style={{
            height: "100%",
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#fff",
          }}
        >
          <img
            src={imageUrl}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
            alt="Preview"
          />
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error("Error generating OG image:", e);
    return new Response("Failed to generate image", { status: 500 });
  }
}
