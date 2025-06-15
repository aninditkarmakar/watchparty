export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="h-full w-full">
      <body className="w-full h-full">
        <div className="w-full h-full bg-red-300">{children}</div>
      </body>
    </html>
  );
}
