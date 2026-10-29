import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Price, ProductView } from "@/components/product-view";
import { getProduct, products } from "@/lib/products";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct((await params).slug);
  return product ? { title: `${product.name} | Boujie Call`, description: product.description } : {};
}

export default async function ProductPage({ params }: Props) {
  const product = getProduct((await params).slug);
  if (!product) notFound();

  return (
    <>
      <SiteHeader />
      <main className="mx-auto max-w-7xl px-6 pt-10 pb-28 md:px-12 md:pt-16">
        <Link href="/shop" className="cta group gap-3 px-6">
          <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1" className="transition-transform group-hover:-translate-x-1">
            <path d="M15 9H3M8 4L3 9l5 5" />
          </svg>
          Back to the shop
        </Link>
        <div className="mt-8">
          <ProductView
            product={product}
            intro={
              <>
                <h1 className="text-5xl md:text-6xl">{product.name}</h1>
                <Price product={product} className="mt-4" />
                <p className="mt-6 max-w-md leading-relaxed text-muted">{product.description}</p>
              </>
            }
            details={
              <dl className="mt-10 grid max-w-md grid-cols-[6rem_1fr] gap-y-3 border-t-[0.5px] border-card-border pt-6 text-sm">
                <dt>Fabric</dt>
                <dd className="text-muted">{product.fabric}</dd>
                <dt>Care</dt>
                <dd className="text-muted">{product.care}</dd>
              </dl>
            }
          />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
