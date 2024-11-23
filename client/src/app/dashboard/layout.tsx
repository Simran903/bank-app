import { MainNav } from "./components/main-nav";
// import { UserNav } from "./components/user-nav";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
      >
        <div className="border-b">
          <div className="flex h-20 items-center px-4">
            <MainNav />
            {/* <div className="ml-auto flex items-center space-x-4">
              <UserNav />
            </div> */}
          </div>
        </div>
        {children}
      </body>
    </html>
  );
}