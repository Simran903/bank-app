import { MainNav } from "./components/main-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body>
        <div className="relative">
          <div className="fixed top-0 left-0 right-0 z-10 bg-white border-b shadow-md">
            <div className="flex h-20 items-center px-4">
              <MainNav />
            </div>
          </div>
          <div className="pt-10">
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}