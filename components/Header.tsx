import React from "react";

export default function Header({ children }: { children: React.ReactNode }) {
  return (
    <header>
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-xl  justify-between items-center p-3 text-sm text-foreground">
          {children}
        </div>
      </nav>
    </header>
  );
}
