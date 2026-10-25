export const asset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

export const site = {
  name: "Baswara Studio",
  tagline:
    "Capture timeless moments through our lens — where every frame tells a story, and every shot is crafted with passion and precision.",
  catalogUrl: "https://wa.me/c/628995277001",
  waNumber: "628995277001",
  phoneDisplay: "08995277001",
  address: ["Gg. Delima VIII No.13, Jajar,", "Kec. Laweyan, Kota Surakarta,", "Jawa Tengah 57144"],
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Gg.+Delima+VIII+No.13+Jajar+Laweyan+Surakarta",
  hours: [
    { days: "Weekdays", time: "10:00 – 16:30" },
    { days: "Weekends", time: "Sunday closed" },
  ],
};

export const nav = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/services", label: "Services" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const story: string[] = [
  "At Baswara Studio, photography is more than just a profession — it’s a deep passion for capturing life in its most honest and beautiful form. We believe every moment holds a story worth telling.",
  "Our approach blends technical precision with creative vision. From candid portraits to carefully staged scenes, we aim to reflect genuine emotion, personality, and atmosphere in every frame.",
  "Whether you\u0027re celebrating a milestone, launching a brand, or simply expressing your individuality, our photography services are tailored to suit your vision and needs.",
  "We specialize in portrait, lifestyle, product, and event photography — each session is guided by collaboration, attention to detail, and a commitment to artistic excellence.",
  "With a keen eye for composition, lighting, and storytelling, we create images that not only capture the moment but also evoke feeling and memory.",
  "Let Baswara Studio transform your moments into lasting visual stories. Together, we’ll create something truly timeless.",
];

export const specialties = ["Portrait", "Lifestyle", "Product", "Event"] as const;

/* ---------- Pricing ---------- */

export type GroupId = "weddings" | "milestones" | "everyday";

export interface PriceItem {
  name: string;
  description: string;
  group: GroupId;
  price: number;
  originalPrice?: number;
  promoNote?: string;
  /** YYYY-MM-DD, inklusif. Setelah tanggal ini item otomatis disembunyikan. */
  validUntil?: string;
}

export const groups: { id: GroupId; title: string; blurb: string }[] = [
  { id: "weddings", title: "Weddings", blurb: "Prewedding, engagement day and the wedding itself." },
  { id: "milestones", title: "Milestones", blurb: "Graduation, pregnancy and the people you celebrate with." },
  { id: "everyday", title: "Everyday", blurb: "Quick studio sessions and seasonal gift sets." },
];

export const pricelist: PriceItem[] = [
  {
    name: "Wedding / Prewedding",
    description: "Full package romantic session indoor or outdoor.",
    group: "weddings",
    price: 1650000,
  },
  {
    name: "Lamaran (Foto + MUA + Dekor)",
    description: "Engagement day full-service package.",
    group: "weddings",
    price: 1750000,
  },
  {
    name: "Wedding Discount",
    description: "15% off until August 31, 2025.",
    group: "weddings",
    price: 935000,
    originalPrice: 1100000,
    promoNote: "15% off",
    validUntil: "2025-08-31",
  },
  { name: "Wisuda", description: "Graduation photo session with toga.", group: "milestones", price: 250000 },
  { name: "Maternity", description: "Celebrate your pregnancy journey beautifully.", group: "milestones", price: 250000 },
  { name: "Group Photo", description: "Perfect for squads, friends, or families.", group: "milestones", price: 300000 },
  { name: "Pas Foto", description: "Studio shot for ID photos or official needs.", group: "everyday", price: 20000 },
  { name: "Self Photo", description: "Self-service photo booth in studio.", group: "everyday", price: 20000 },
  { name: "Parcel Lebaran", description: "Seasonal gift set for Eid celebrations.", group: "everyday", price: 55000 },
];

export function activePricelist(today = new Date()): PriceItem[] {
  return pricelist.filter(
    (i) => !i.validUntil || today.getTime() <= new Date(`${i.validUntil}T23:59:59`).getTime(),
  );
}

const idr = new Intl.NumberFormat("id-ID");
export const formatIDR = (n: number) => `IDR ${idr.format(n)}`;

/* ---------- Photos ---------- */

export interface Photo {
  src: string;
  alt: string;
}

const photo = (id: string, n: number): Photo => ({
  src: asset(`images/gallery/${id}.jpg`),
  alt: `Baswara Studio photograph, frame ${String(n).padStart(2, "0")}`,
});

// Delapan foto pertama = urutan situs lama; empat terakhir sebelumnya tidak dipakai.
export const portfolio: Photo[] = [
  "DSC06110", "RFN02627", "DSC06102", "RFN02631",
  "DSC06174", "DSC06211", "DSC06146", "DSC06206",
  "DSC06076", "DSC06117", "RFN02670", "RFN02673",
].map((id, i) => photo(id, i + 1));

export const waLink = (text: string) => `https://wa.me/${site.waNumber}?text=${encodeURIComponent(text)}`;
