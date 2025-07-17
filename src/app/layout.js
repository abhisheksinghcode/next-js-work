import "./globals.css";

export const metadata = {
  title: "Abhishek Singh | Portfolio",
  description: "Frontend Web Developer | JavaScript Enthusiast | Problem Solver",
  viewport: "width=device-width, initial-scale=1.0",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body style={{ background: "var(--color-bg)", color: "var(--color-primary)", fontFamily: "var(--font-main)" }}>
        <main>{children}</main>
      </body>
    </html>
  );
}