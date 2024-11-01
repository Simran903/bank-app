import { MainNav } from "./components/main-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
      >
        <div className="flex h-20 items-center px-4">
        <MainNav className="mx-6" />
        </div>
        {children}
      </body>
    </html>
  );
}