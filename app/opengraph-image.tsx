import { ImageResponse } from "next/og";

export const alt = "Hamza Bhulla — Full-Stack Developer";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          boxSizing: "border-box",
          color: "#F5F4EF",
          background:
            "radial-gradient(circle at 82% 24%, rgba(189,244,119,0.18), transparent 28%)",
          backgroundColor: "#0B0D0B",
          fontFamily: "Arial, Helvetica, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 22,
            letterSpacing: "0.12em",
          }}
        >
          <div style={{ color: "#BDF477", fontWeight: 700 }}>HB /</div>
          <div style={{ color: "#A4ABA2" }}>PORTFOLIO</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div
            style={{
              color: "#BDF477",
              fontSize: 23,
              letterSpacing: "0.2em",
              fontWeight: 700,
            }}
          >
            FULL-STACK DEVELOPER
          </div>
          <div
            style={{
              fontSize: 88,
              lineHeight: 1,
              letterSpacing: "-0.06em",
              fontWeight: 700,
            }}
          >
            Hamza Bhulla
          </div>
          <div style={{ color: "#A4ABA2", fontSize: 30 }}>
            Thoughtful interfaces. Reliable engineering.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid rgba(245,244,239,0.16)",
            paddingTop: 24,
            color: "#A4ABA2",
            fontSize: 18,
          }}
        >
          <div>React · TypeScript · Full-stack web apps</div>
          <div>Open to remote opportunities</div>
        </div>
      </div>
    ),
    size,
  );
}
