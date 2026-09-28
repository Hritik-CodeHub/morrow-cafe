import { MapPin } from "lucide-react";
import { features, highlights } from "./constants/common.constant";
import ClaimForm from "./components/ClaimForm";

function App() {

  return (
    <main className="min-h-screen overflow-hidden bg-[#f5f0e6] text-[#14231f]">

      {/* ====================== HEADER========================== */}
      <header className="relative z-20 flex w-full items-center justify-between px-4 py-2 sm:px-6 lg:px-12">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <div>
            <div className="text-lg font-medium tracking-[0.18em] sm:text-2xl">
              MORROW CAFÉ
            </div>
          </div>
        </div>

        {/* Location */}
        <div className="hidden items-center gap-4 sm:flex">
          <div className="h-9 w-px bg-[#14231f]/30" />

          <div className="flex items-center gap-2 text-sm sm:text-base">
            <MapPin className="h-5 w-5" />

            <span>Sector 104 · Noida</span>
          </div>
        </div>
      </header>


      {/* ==================== MAIN HERO ======================= */}

      <section className="relative  max-w-full   ">
        <div className="block lg:flex">
          <div className="relative w-full overflow-hidden lg:rounded-r-[28px] lg:min-h-190 lg:w-6xl">
            <img
              src="/cafe.png"
              alt="Warm interior of Morrow Café"
              className="absolute inset-0 h-full w-full object-cover"
            />

            {/* Dark gradient for text readability */}
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/45 to-transparent" />

            {/* Extra bottom gradient */}
            <div className="absolute inset-x-0 bottom-0 h-56 bg-linear-to-t from-black/50 to-transparent" />

            <div className="relative z-10 flex min-h-135 flex-col justify-between p-5 text-white sm:min-h-155 sm:p-8 lg:min-h-190 lg:p-16">
              <div className="max-w-155 pt-10 sm:pt-12 lg:pt-16">

                <div className="mb-4 flex items-center gap-5 sm:mb-7">
                  <span className="text-[10px] font-bold tracking-[0.18em] sm:text-xs lg:text-sm">
                    YOUR NEXT COFFEE
                  </span>

                  <span className="h-px w-12 bg-white/70 sm:w-16" />
                </div>

                {/* Main heading */}
                <h1 className="font-serif text-[42px] font-bold leading-[0.88] tracking-[-0.055em] sm:text-[64px] lg:text-[105px]">
                  ₹150 OFF <span className="mt-3 block text-[0.58em] leading-[0.95] tracking-[-0.04em] sm:mt-5">
                   on your next visit
                  </span>
                </h1>

                {/* Description */}
                <p className="mt-5 max-w-97.5 text-sm leading-6 text-white/85 sm:mt-8 sm:text-base lg:text-lg">
                  Come by Morrow Café and make your
                  next visit a little sweeter.
                  Great coffee, fresh food and a cozy
                  space await you.
                </p>

                {/* Feature icons */}
                <div className="mt-8 flex max-w-105 divide-x divide-white/30 sm:mt-10 lg:mt-12">
                  {features.map(({ icon: Icon, title, subtitle }) => (
                    <div
                      key={title}
                      className="flex flex-1 flex-col items-center px-2 text-center sm:px-3"
                    >
                      <Icon className="h-6 w-6 sm:h-8 sm:w-8" />
                      <span className="mt-2 text-[10px] leading-4 sm:mt-3 sm:text-sm">
                        {title}
                        <br />
                        {subtitle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <ClaimForm />
        </div>
      </section>


      {/* ==================== BOTTOM FEATURES ======================= */}

      <section className="mx-auto grid max-w-350 gap-0 px-8 pb-8 pt-3 sm:grid-cols-3">
        {highlights.map(({ icon: Icon, title, description }, index) => (
          <div
            key={title}
            className={`flex items-start gap-5 py-6 sm:px-8 ${index < 2 ? "border-b border-black/15 sm:border-b-0 sm:border-r" : ""
              } ${index === 0 ? "sm:pl-0" : ""} ${index === 2 ? "sm:pr-0" : ""}`}
          >
            <Icon className="h-8 w-8 shrink-0" />

            <div>
              <h3 className="font-semibold">{title}</h3>
              <p className="mt-2 text-sm text-black/55">{description}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Reduced motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            scroll-behavior: auto !important;
            animation-duration: 0.01ms !important;
            transition-duration: 0.01ms !important;
          }
        }
      `}</style>
    </main>
  );
}

export default App;