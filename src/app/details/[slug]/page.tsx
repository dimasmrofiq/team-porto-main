import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

const details = {
  nutriverse: {
    label: { en: "AMICTA 2026 · Universitas AMIKOM Yogyakarta", id: "AMICTA 2026 · Universitas AMIKOM Yogyakarta" },
    title: { en: "NutriVerse", id: "NutriVerse" },
    description: {
      en: "NutriVerse is an AI-powered nutrition application developed for the AMICTA 2026 competition held by Universitas AMIKOM Yogyakarta in July 2026. The project uses technology to help users build healthier daily habits.",
      id: "NutriVerse adalah proyek aplikasi nutrisi berbasis AI yang dikembangkan untuk mengikuti lomba AMICTA 2026 yang diselenggarakan oleh Universitas AMIKOM Yogyakarta pada Juli 2026. Proyek ini menggunakan teknologi untuk membantu pengguna membangun kebiasaan hidup yang lebih sehat.",
    },
    date: { en: "July 29, 2026", id: "29 Juli 2026" },
    image: "/images/nutriverse.png",
    aspectRatio: "1 / 1",
    externalUrl: "https://nutriverse.my.id/",
  },
  "amikom-eventhub": {
    label: { en: "Event management platform", id: "Platform manajemen acara" },
    title: { en: "AmikomEventHub", id: "AmikomEventHub" },
    titleLines: ["Amikom", "EventHub"],
    description: {
      en: "An event management system that helps users discover events, view activity details, select categories, and book tickets in an organized way. Its admin panel also enables organizers to manage event information and participant needs in one place.",
      id: "Sistem penyelenggara acara yang membantu pengguna menemukan acara, melihat detail kegiatan, memilih kategori, dan memesan tiket secara lebih terorganisir. Panel adminnya juga membantu penyelenggara mengatur informasi acara dan kebutuhan peserta dalam satu tempat.",
    },
    image: "/images/amikom-eventhub.png",
    aspectRatio: "1905 / 972",
    externalUrl: "https://amikomeventhub-3302.gt.tc/",
  },
  "certificate-preview-01": {
    label: { en: "Certificate preview", id: "Pratinjau sertifikat" },
    title: { en: "AMICTA E-Certificate", id: "E-Sertifikat AMICTA" },
    description: { en: "Team Kumis AMICTA achievement certificate.", id: "Sertifikat pencapaian AMICTA milik Team Kumis." },
    image: "/images/sertifikat-amicta-faishal-mumtazah.png",
    aspectRatio: "994 / 1404",
    pdf: "/certificates/sertifikat-amicta-faishal-mumtazah.pdf",
  },
} as const;

export default function DetailPage({ params, searchParams }: { params: { slug: string }; searchParams?: { lang?: string } }) {
  const detail = details[params.slug as keyof typeof details];
  if (!detail) notFound();
  const language = searchParams?.lang === "id" ? "id" : "en";
  const ui = language === "id" ? {
    back: "← Kembali ke portofolio", date: "Tanggal proyek", project: "Lihat hasil proyek ↗", pdf: "Buka sertifikat PDF ↗",
  } : {
    back: "← Back to portfolio", date: "Project date", project: "View project ↗", pdf: "Open certificate PDF ↗",
  };

  return <main className={styles.page}>
    <Link href={`/?lang=${language}#portfolio`} className={styles.back}>{ui.back}</Link>
    <section className={styles.hero}>
      <div className={styles.copy}><p>{detail.label[language]}</p><h1>{"titleLines" in detail ? detail.titleLines.map((line) => <span className={styles.titleLine} key={line}>{line}</span>) : detail.title[language]}</h1>{"date" in detail && detail.date && <p className={styles.date}>{ui.date}: {detail.date[language]}</p>}<span>{detail.description[language]}</span>{"externalUrl" in detail && detail.externalUrl && <a className={styles.projectLink} href={detail.externalUrl} target="_blank" rel="noreferrer">{ui.project}</a>}{"pdf" in detail && detail.pdf && <a className={styles.projectLink} href={detail.pdf} target="_blank" rel="noreferrer">{ui.pdf}</a>}</div>
      <div className={styles.imageWrap} style={{ aspectRatio: detail.aspectRatio }}><Image src={detail.image} alt={detail.title[language]} fill priority sizes="(max-width: 850px) 100vw, 55vw" /></div>
    </section>
  </main>;
}
