import { useState } from "react";
import { useForm } from "react-hook-form";
import { claimOffer } from "../services/claimApi";
import { Check, Coffee, Phone, ShieldCheck, UserRound, Copy, MapPin } from "lucide-react";

type FormValues = {
  name: string;
  phone: string;
};

function ClaimForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormValues>({
    defaultValues: {
      name: "",
      phone: "",
    },
    mode: "onSubmit",
  });

  const [error, setError] = useState("");
  const [claimCode, setClaimCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const onSubmit = async (data: FormValues) => {
    setError("");

    try {
      const response = await claimOffer({
        name: data.name.trim(),
        phone: data.phone.replace(/\D/g, ""),
      });

      if (response.success) {
        setClaimCode(response.claimCode);
        return;
      }

      setError(
        response.message || "Unable to claim the offer."
      );
    } catch {
      setError("Something went wrong. Please try again.");
    }
  };

  const copyCode = async () => {
    if (!claimCode) return;

    try {
      await navigator.clipboard.writeText(claimCode);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch {
      setError("Unable to copy the code.");
    }
  };

  return (
    <div className="relative z-20 max-w-480px px-4 pb-4 pt-4">
      <div className=" w-full rounded-[22px] bg-[#fbfaf5]/95 p-4 shadow-2xl backdrop-blur-md min-[375px]:p-5 sm:rounded-3xl lg:rounded-[28px]">
        {!claimCode ? (
          <>
            <div className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full bg-[#e9e9df] px-2 py-2" >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full  bg-[#173f32]  text-white sm:h-7 sm:w-7  " >
                <Coffee className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
              </span>

              <span className=" truncate  text-[10px]  font-bold tracking-[0.08em] min-[375px]:text-[11px] sm:text-xs lg:text-sm">
                CLAIM YOUR OFFER
              </span>
            </div>

            <h2 className=" font-serif font-bold leading-[0.95] tracking-[-0.045em] text-[32px] min-[375px]:text-[38px] "
            >
              Get ₹150 OFF
            </h2>

            <p className="mt-3 text-xl leading-tight " >
              Just fill in your details
            </p>

            <form
              onSubmit={handleSubmit(onSubmit)}
              noValidate
              className="mt-6">
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="sr-only"
                >
                  Your name
                </label>

                <div className={` flex min-h-14 items-center rounded-xl border bg-white/30 px-2 transition sm:rounded-2xl
                    ${errors.name
                    ? "border-red-400"
                    : "border-[#cfcabf] focus-within:border-[#173f32]"
                  }
                  `}
                >
                  <UserRound className=" mr-4 h-5 w-5 shrink-0 text-[#5d5a50]"
                  />

                  <input
                    id="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Your name"
                    aria-invalid={Boolean(errors.name)}
                    className="w-full bg-transparent text-sm outline-none placeholder:text-black/45 sm:text-base"
                    {...register("name", {
                      required: "Please enter your name.",
                      validate: (value) =>
                        value.trim().length >= 2 ||
                        "Please enter a valid name.",
                    })}
                  />
                </div>

                {errors.name && (
                  <p className=" mt-2 px-2 text-xs text-red-600" >
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <label
                  htmlFor="phone"
                  className="sr-only"
                >
                  10-digit mobile number
                </label>

                <div
                  className={` flex min-h-14 items-center rounded-xl border bg-white/30 px-2 transition sm:rounded-2xl
                    ${errors.name
                      ? "border-red-400"
                      : "border-[#cfcabf] focus-within:border-[#173f32]"
                    }
                  `}
                >
                  <Phone
                    className="mr-4 h-5 w-5 shrink-0 text-[#5d5a50]"
                  />

                  <input
                    id="phone"
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    autoComplete="tel"
                    placeholder="10-digit mobile number"
                    aria-invalid={Boolean(errors.phone)}
                    className=" w-full bg-transparent text-sm outline-none placeholder:text-black/45 sm:text-base "
                    {...register("phone", {
                      required:
                        "Please enter your phone number.",

                      validate: (value) => {
                        const cleanPhone =
                          value.replace(/\D/g, "");

                        if (!cleanPhone) {
                          return "Please enter your phone number.";
                        }

                        if (cleanPhone.length !== 10) {
                          return "Please enter a valid 10-digit mobile number.";
                        }

                        if (/^(\d)\1{9}$/.test(cleanPhone)) {
                          return "Please enter a valid mobile number.";
                        }

                        return true;
                      },
                    })}
                  />
                </div>

                {errors.phone && (
                  <p className=" mt-2 px-2 text-xs text-red-600 " >
                    {errors.phone.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className=" flex min-h-13.5 w-full items-center justify-center rounded-xl bg-[#173f32] px-4 text-sm font-bold text-white shadow-lg transition duration-200 hover:bg-[#12372c] active:translate-y-0 disabled:cursor-wait  disabled:opacity-70"
              >
                {isSubmitting ? (
                  <span className="inline-flex items-center gap-2.5">
                    <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                    <span>Claiming...</span>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    <span>Claim ₹150 OFF</span>
                    <span aria-hidden="true">→</span>
                  </span>
                )}
              </button>

              <div
                role="status"
                aria-live="polite"
                className=" min-h-5 pt-2 text-center text-xs text-red-600 " >
                {error}
              </div>

              <div className=" mt-1 flex items-start gap-2 text-xs leading-4 text-black/60 min-[375px]:text-xs">
                <ShieldCheck className=" mt-0.5 h-4 w-4 shrink-0 text-[#173f32]" />
                <p>
                  No payment required. Your details
                  are only used to process this offer.
                </p>
              </div>
            </form>

            <div className="my-5 h-px bg-[#dcd8ce]"
            />

            <div className="flex items-center gap-2 rounded-xl bg-[#eef0e7] px-3 py-3 text-[11px] min-[375px]:gap-3">
              <MapPin className="h-5 w-5" />
              <span className="truncate">
                Sector 104, Noida
              </span>
            </div>
          </>
        ) : (
          <section aria-live="polite" className=" flex flex-col items-center justify-center text-center ">
            <div className=" mb-6 grid h-16 w-16  place-items-center  rounded-full  bg-[#173f32]  text-white shadow-lg">
              <Check className=" h-8 w-8 " />
            </div>

            <p className=" mb-3 text-xs font-bold tracking-[0.16em] text-[#173f32]">
              OFFER CLAIMED
            </p>
            <h2 className="font-serif font-bold leading-none tracking-[-0.04em] text-[38px] min-[375px]:text-[42px] " >
              <span>₹150 OFF</span>
              <span className=" mt-2 block text-2xl text-black/60 ">
                is yours.
              </span>
            </h2>

            <p className=" mt-6 max-w-70 text-sm leading-5 text-black/60 sm:leading-6">
              Show this code when you visit
              Morrow Café.
            </p>
            <button
              type="button"
              onClick={copyCode}
              aria-label="Copy claim code"
              className="mt-6 flex w-full items-center justify-between gap-2 rounded-xl border border-dashed border-[#aaa69b] bg-[#f2f0e8] px-4 py-4 text-left transition hover:bg-[#eae8df]"
            >
              <strong className=" min-w-0 truncate text-xs tracking-[0.08em] min-[375px]:text-sm">
                {claimCode}
              </strong>

              <span className=" inline-flex shrink-0 items-center gap-1.5 text-xs font-bold text-[#173f32] ">
                {copied ? (
                  "Copied!"
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    <span className="hidden min-[375px]:inline">
                      Copy
                    </span>
                  </>
                )}
              </span>
            </button>

            <p className=" mt-4 text-xs text-black/45 "
            >
              Sector 104 · Noida
            </p>
          </section>
        )}
      </div>
    </div>
  );
}

export default ClaimForm;