"use client";

import { useId, useRef, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";

export function SizeGuide({ sizes, columns, chart }: { sizes: string[]; columns: string[]; chart: Record<string, string[]> }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const title = useId();
  const close = () => dialog.current?.close();
  // A text selection drag that ends on the backdrop must not close the guide: both press and release have to land there.
  const pressedBackdrop = useRef(false);
  // The dialog renders into body so its table sits outside the size radio group.
  const host = useSyncExternalStore(
    () => () => {},
    () => document.body,
    () => null,
  );

  return (
    <>
      <button type="button" onClick={() => dialog.current?.showModal()} className="link ml-4 inline-flex min-h-11 items-center text-base">
        Size guide
      </button>
      {host &&
        createPortal(
          <dialog
            ref={dialog}
            aria-labelledby={title}
            onPointerDown={(e) => (pressedBackdrop.current = e.target === dialog.current)}
            onClick={(e) => e.target === dialog.current && pressedBackdrop.current && close()}
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
              <p className="mt-4 text-base text-muted">Garment measurements in inches / cm. The fabric stretches, so each size fits a body a little larger than these numbers.</p>
              <table className="mt-6 w-full text-left text-[15px]">
                <caption className="sr-only">Measurements by size</caption>
                <thead>
                  <tr className="border-b-[0.5px] border-card-border">
                    {["Size", ...columns].map((c) => (
                      <th key={c} scope="col" className="label pr-3 pb-3 text-muted last:pr-0">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sizes.map((s) => (
                    <tr key={s} className="border-b-[0.5px] border-card-border">
                      <th scope="row" className="py-3 pr-3 font-normal">
                        {s}
                      </th>
                      {columns.map((c, i) => {
                        // Phones stack inches over cm; the slash stays for screen readers so the pair reads as one value.
                        const [inches, cm] = (chart[s]?.[i] ?? "").split(" / ");
                        return (
                          <td key={c} className="py-3 pr-3 whitespace-nowrap text-muted last:pr-0">
                            {inches}
                            {cm && (
                              <>
                                <span className="max-md:sr-only"> / </span>
                                <br className="md:hidden" />
                                {cm}
                              </>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </dialog>,
          host,
        )}
    </>
  );
}
