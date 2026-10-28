import Image from "next/image";

type Props = { src?: string; alt: string; ratio?: "portrait" | "wide"; tone?: "day" | "night"; ground?: "blush" | "cream"; className?: string };

// Product photos are studio shots on white; multiply melts the white into the ground colour.
export function ImageSlot({ src, alt, ratio = "portrait", tone = "day", ground = "blush", className = "" }: Props) {
  const crop = ratio === "portrait" ? "aspect-[4/5]" : "aspect-[16/9]";
  if (src) {
    return (
      <div className={`relative overflow-hidden ${ground === "blush" ? "bg-blush" : "bg-cream"} ${crop} ${className}`}>
        <Image src={src} alt={alt} fill sizes="(min-width: 768px) 55vw, 100vw" className="object-cover mix-blend-multiply" />
      </div>
    );
  }
  const shade = tone === "day" ? "from-blush to-card text-muted" : "from-[#3a2430] to-ribbon text-muted-dark";
  return (
    <div role="img" aria-label={`${alt}, image to come`} className={`relative grid place-items-center overflow-hidden bg-linear-to-br ${shade} ${crop} ${className}`}>
      <span aria-hidden="true" className="font-serif text-4xl opacity-40">
        ✦
      </span>
      <span aria-hidden="true" className="label absolute top-5 right-5 text-[10px]">
        IMAGE TO COME
      </span>
    </div>
  );
}
