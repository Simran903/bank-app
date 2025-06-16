import { ReactNode } from "react";
import Sidebar from "./Sidebar";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-slate-900 dark:to-slate-800 lg:flex">
      <Sidebar />
      <div className="flex-1">
        <main className="min-h-screen py-10">
          {children}
        </main>
      </div>
    </div>
  );
}
