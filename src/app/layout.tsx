export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-200">
        <div className="bg-red-300">{children}</div>
      </body>
    </html>
  );
}
