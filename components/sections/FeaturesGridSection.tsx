"use client";

export default function FeaturesGridSection() {
  return (
    <section className="relative z-[60] w-full bg-white py-24 border-t border-neutral-100">
      <div className="w-full px-4">
        <div className="flex flex-col items-center justify-center gap-3 mb-16">
          <span className="text-xs tracking-widest uppercase text-gray-500">LA BELLA MONTE</span>
          <div className="w-12 h-0.5 bg-red-600"></div>
          <h2 className="text-4xl md:text-5xl font-suave tracking-normal text-black mt-2">FEATURES</h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-8 md:gap-4 justify-items-center text-center">
          {[
            {
              icon: (
                <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor"/>
                  <path d="M12 6V12L16 14" stroke="currentColor"/>
                </svg>
              ),
              text: "1 Year Warranty"
            },
            {
              icon: (
                <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor"/>
                  <path d="M2 17L12 22L22 17" stroke="currentColor"/>
                  <path d="M2 12L12 17L22 12" stroke="currentColor"/>
                </svg>
              ),
              text: "Automatic"
            },
            {
              icon: (
                <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor"/>
                  <path d="M8 12C8 12 10 14 12 14C14 14 16 12 16 12" stroke="currentColor"/>
                  <path d="M12 2V6" stroke="currentColor"/>
                </svg>
              ),
              text: "3 ATM Water Resistance"
            },
            {
              icon: (
                <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 3V5" stroke="currentColor"/>
                  <path d="M12 19V21" stroke="currentColor"/>
                  <path d="M21 12H19" stroke="currentColor"/>
                  <path d="M5 12H3" stroke="currentColor"/>
                  <path d="M18.364 5.63604L16.9498 7.05025" stroke="currentColor"/>
                  <path d="M7.05025 16.9497L5.63604 18.364" stroke="currentColor"/>
                  <path d="M18.364 18.364L16.9498 16.9497" stroke="currentColor"/>
                  <path d="M7.05025 7.05025L5.63604 5.63604" stroke="currentColor"/>
                </svg>
              ),
              text: "Glow in Dark"
            },
            {
              icon: (
                <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M20 6L9 17L4 12" stroke="currentColor"/>
                </svg>
              ),
              text: "6 Months Replacement"
            },
            {
              icon: (
                <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor"/>
                  <path d="M12 22V12" stroke="currentColor"/>
                  <path d="M22 7V17L12 22" stroke="currentColor"/>
                  <path d="M2 7V17L12 22" stroke="currentColor"/>
                </svg>
              ),
              text: "Stainless Steel"
            },
            {
              icon: (
                <svg className="w-12 h-12 stroke-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 21H21" stroke="currentColor"/>
                  <path d="M5 21V7L13 3L21 7V21" stroke="currentColor"/>
                </svg>
              ),
              text: "Design in Italy"
            }
          ].map((feature, index) => (
            <div key={index} className="flex flex-col items-center gap-4 group">
              <div className="w-24 h-24 rounded-full bg-neutral-50 flex items-center justify-center text-neutral-800 transition-colors duration-500 group-hover:bg-black group-hover:text-white">
                {feature.icon}
              </div>
              <span className="text-xs uppercase tracking-[0.2em] font-medium text-neutral-600 max-w-[120px]">
                {feature.text}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
