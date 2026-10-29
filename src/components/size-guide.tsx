"use client";

import { useId, useRef } from "react";

const columns = ["Bust", "Waist", "Hip"];

// Placeholder chart until the owner sends real measurements.
export function SizeGuide({ sizes }: { sizes: string[] }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useId();
  const close = () => dialog.current?.close();

  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()} className="link ml-4 inline-flex min-h-11 items-center text-base md:text-sm">
        Size guide
      </button>
      <dialog
        ref={dialog}
        aria-labelledby={title}
        onClick={(e) => e.target === dialog.current && close()}
        className="m-auto w-[min(32rem,calc(100%-2rem))] bg-cream p-0 text-ink backdrop:bg-ink/50"
      >
        <div className="p-6 md:p-10">
          <div className="flex items-start justify-between gap-6">
            <h2 id={title} className="text-4xl">
              Size guide
            </h2>
            <button type="button" aria-label="Close size guide" onClick={close} className="grid size-11 place-items-center">
              <svg aria-hidden="true" width="24" height="24" viewBox="0 0 28 28" stroke="currentColor" strokeWidth="1.25">
                <path d="M7 7l14 14M21 7L7 21" />
              </svg>
            </button>
          </div>
          <p className="mt-3 text-sm text-muted">Placeholder. Measurements to come from Boujie Call.</p>
          <table className="mt-8 w-full text-left text-sm">
            <caption className="sr-only">Measurements by size, placeholder</caption>
            <thead>
              <tr className="border-b-[0.5px] border-ink/15">
                {["Size", ...columns].map((c) => (
                  <th key={c} scope="col" className="label pb-3 text-[10px] font-normal text-muted">
                    {c}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {sizes.map((s) => (
                <tr key={s} className="border-b-[0.5px] border-ink/15">
                  <th scope="row" className="py-3 font-normal">
                    {s}
                  </th>
                  {columns.map((c) => (
                    <td key={c} className="py-3 text-muted">
                      To come
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </dialog>
    </>
  );
}
