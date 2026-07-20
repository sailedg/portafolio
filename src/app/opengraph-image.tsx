import { ImageResponse } from "next/og";
import { profile } from "@/data/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: 96,
          background: "#0A0A0A",
          color: "#FFFFFF",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, color: "#9CA3AF", marginBottom: 24 }}>
          RodasDev
        </div>
        <div style={{ display: "flex", fontSize: 80, fontWeight: 700 }}>{profile.name}</div>
        <div style={{ display: "flex", fontSize: 44, color: "#C8F224", marginTop: 16 }}>
          {profile.role}
        </div>
      </div>
    ),
    { ...size },
  );
}
