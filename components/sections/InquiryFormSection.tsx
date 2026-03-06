"use client";

export default function InquiryFormSection() {
  return (
    <section className="relative z-[60] w-full bg-white py-20 px-6 md:px-12 lg:px-24">
      <div className="mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-suave tracking-normal text-black mb-4">
            Make an Inquiry
          </h2>
          <p className="text-neutral-600 font-sans tracking-wide max-w-xl mx-auto">
            Interested in a timepiece? Connect with our concierge for personalized assistance and availability.
          </p>
        </div>
        
        <form className="space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative group">
              <input 
                type="text" 
                id="firstName" 
                className="block w-full bg-transparent border-b border-neutral-300 py-4 text-black focus:outline-none focus:border-black transition-colors peer placeholder-transparent" 
                placeholder="First Name"
              />
              <label 
                htmlFor="firstName" 
                className="absolute left-0 -top-3.5 text-xs text-neutral-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest"
              >
                First Name
              </label>
            </div>
            
            <div className="relative group">
              <input 
                type="text" 
                id="lastName" 
                className="block w-full bg-transparent border-b border-neutral-300 py-4 text-black focus:outline-none focus:border-black transition-colors peer placeholder-transparent" 
                placeholder="Last Name"
              />
              <label 
                htmlFor="lastName" 
                className="absolute left-0 -top-3.5 text-xs text-neutral-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest"
              >
                Last Name
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div className="relative group">
              <input 
                type="email" 
                id="email" 
                className="block w-full bg-transparent border-b border-neutral-300 py-4 text-black focus:outline-none focus:border-black transition-colors peer placeholder-transparent" 
                placeholder="Email Address"
              />
              <label 
                htmlFor="email" 
                className="absolute left-0 -top-3.5 text-xs text-neutral-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest"
              >
                Email Address
              </label>
            </div>
            
            <div className="relative group">
              <input 
                type="tel" 
                id="phone" 
                className="block w-full bg-transparent border-b border-neutral-300 py-4 text-black focus:outline-none focus:border-black transition-colors peer placeholder-transparent" 
                placeholder="Phone Number"
              />
              <label 
                htmlFor="phone" 
                className="absolute left-0 -top-3.5 text-xs text-neutral-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest"
              >
                Phone Number
              </label>
            </div>
          </div>

          <div className="relative group">
            <textarea 
              id="message" 
              rows={4}
              className="block w-full bg-transparent border-b border-neutral-300 py-4 text-black focus:outline-none focus:border-black transition-colors peer placeholder-transparent resize-none" 
              placeholder="Your Message"
            ></textarea>
            <label 
              htmlFor="message" 
              className="absolute left-0 -top-3.5 text-xs text-neutral-500 transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-neutral-500 peer-placeholder-shown:top-4 peer-focus:-top-3.5 peer-focus:text-xs peer-focus:text-black uppercase tracking-widest"
            >
              Your Message (Optional)
            </label>
          </div>

          <div className="flex justify-center pt-8">
            <button 
              type="submit"
              className="inline-block border border-black px-12 py-4 text-xs tracking-[0.2em] uppercase text-black transition-all hover:bg-black hover:text-white focus:outline-none focus:ring-1 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
            >
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
