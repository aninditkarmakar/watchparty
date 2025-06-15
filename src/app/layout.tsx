export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="h-dvh bg-gray-900">{children}</div>
      </body>
    </html>
  );
}
