import Image from "next/image";

type WatchId = "daytona" | "spirit" | "phantom" | "royale";

type CheckoutPageProps = {
  searchParams?: Promise<Record<string, string | string[] | undefined>> | Record<string, string | string[] | undefined>;
};

const WATCHES: Record<
  WatchId,
  { name: string; subtitle: string; imageSrc: string; price: string }
> = {
  daytona: {
    name: "Daytona",
    subtitle: "Precision & Performance",
    imageSrc: "/image/daytona.png",
    price: "$12,800",
  },
  spirit: {
    name: "Spirit",
    subtitle: "Sophisticated & Refined",
    imageSrc: "/image/Spirits.png",
    price: "$14,200",
  },
  phantom: {
    name: "Phantom",
    subtitle: "Mysterious & Opulent",
    imageSrc: "/image/Phantomes.png",
    price: "$16,900",
  },
  royale: {
    name: "Royale",
    subtitle: "Regal & Majestic",
    imageSrc: "/image/Suprans.png",
    price: "$18,500",
  },
};

function normalizeWatchId(value: unknown): WatchId {
  if (value === "daytona" || value === "spirit" || value === "phantom" || value === "royale") {
    return value;
  }
  return "daytona";
}

export default async function CheckoutPage({ searchParams }: CheckoutPageProps) {
  const resolvedSearchParams = await searchParams;
  const watchParam = resolvedSearchParams?.watch;
  const watchValue = Array.isArray(watchParam) ? watchParam[0] : watchParam;
  const watchId = normalizeWatchId(watchValue);
  const watch = WATCHES[watchId];

  return (
    <div className="min-h-screen bg-black text-white pt-28 px-6 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex-1">
            <div className="text-3xl md:text-4xl font-suave font-normal tracking-normal uppercase">
              Checkout
            </div>
            <div className="mt-3 text-xs tracking-normal uppercase text-neutral-400">
              {watch.name} • {watch.subtitle}
            </div>

            <div className="mt-10 rounded-2xl border border-white/10 bg-neutral-900/20 p-6">
              <div className="relative mx-auto aspect-square w-full max-w-xl">
                <Image
                  src={watch.imageSrc}
                  alt={`${watch.name} Watch`}
                  fill
                  sizes="(max-width: 1024px) 90vw, 560px"
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>

          <div className="w-full lg:w-[420px]">
            <div className="rounded-2xl border border-white/10 bg-neutral-900/20 p-6">
              <div className="flex items-baseline justify-between">
                <div className="text-lg font-semibold tracking-normal uppercase">
                  Order Summary
                </div>
                <div className="text-sm text-neutral-300 font-light tracking-normal">
                  {watch.price}
                </div>
              </div>

              <div className="mt-6 grid gap-4">
                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-normal text-neutral-400">
                    Full Name
                  </label>
                  <input
                    name="fullName"
                    className="h-11 rounded-xl border border-white/10 bg-black/30 px-4 text-sm outline-none focus:border-white/20"
                    placeholder="Your name"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-normal text-neutral-400">
                    Email
                  </label>
                  <input
                    name="email"
                    className="h-11 rounded-xl border border-white/10 bg-black/30 px-4 text-sm outline-none focus:border-white/20"
                    placeholder="you@example.com"
                    type="email"
                  />
                </div>

                <div className="grid gap-2">
                  <label className="text-xs uppercase tracking-normal text-neutral-400">
                    Address
                  </label>
                  <input
                    name="address"
                    className="h-11 rounded-xl border border-white/10 bg-black/30 px-4 text-sm outline-none focus:border-white/20"
                    placeholder="Shipping address"
                  />
                </div>
              </div>

              <button className="mt-8 h-12 w-full rounded-xl bg-white text-black text-sm font-semibold tracking-normal uppercase hover:bg-neutral-200 transition-colors">
                Place Order
              </button>

              <div className="mt-4 text-[11px] text-neutral-500 tracking-normal">
                Secure checkout • No payment processing connected yet
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
