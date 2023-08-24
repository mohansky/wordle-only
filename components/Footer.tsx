import React from "react";

export default function Footer() {
  return (
    <footer>
      <div className="animate-in flex flex-col gap-14 max-w-4xl px-3 py-16 lg:py-24 text-foreground">
        <div className="w-full p-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
        <div className="flex justify-center text-center text-xs">
          <p className="text-xs font-extralight">Wordle Only</p>
        </div>
      </div>
    </footer>
  );
}
