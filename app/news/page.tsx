import React from "react";

export default function NewsPage() {
  return (
    <div className="relative min-h-screen bg-black text-white flex flex-col items-center justify-center pt-20">
      <h1 className="text-4xl font-suave tracking-wide uppercase">
        Latest News
      </h1>
      <p className="mt-4 text-sm text-neutral-400 font-sans tracking-wide">
        Updates from the world of La Bella Monte.
      </p>
      <div className="mt-10 max-w-4xl w-full px-10 flex flex-col gap-8">
        {[1, 2].map((item) => (
          <div key={item} className="p-8 border border-white/10 rounded-lg bg-neutral-900/50">
            <h2 className="text-xl font-semibold mb-2">New Collection Launching Soon</h2>
            <p className="text-neutral-400 text-sm">Stay tuned for our upcoming reveal of the new masterpiece series.</p>
          </div>
        ))}
      </div>
    </div>
  );
}
