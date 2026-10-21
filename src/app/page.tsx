"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "motion/react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import styles from "./page.module.css";

const HeroOrb = dynamic(() => import("./HeroOrb"), { ssr: false });

const tabs = ["Projects", "Certificates", "Tech Stack"] as const;
type Tab = (typeof tabs)[number];
type Language = "en" | "id";

const translations = {
  en: {
    loadingTitle: "BUILDING DIGITAL PRESENCE", loadingExperience: "LOADING EXPERIENCE",
    nav: ["Home", "About", "Awards", "Portfolio", "Contact"], languageLabel: "Switch to Indonesian",
    available: "Available for work", heroTitle: ["Fullstack", "Team"],
    intro: "We build modern web applications from frontend to backend with clean, responsive, and elegant interfaces. We turn ideas into engaging and easy-to-use digital experiences.",
    profileHeadline: "Small team,", profileBackdrop: ["big", "results"], profileAria: "Team Kumis members", profileAlt: "Black-and-white portrait of a Team Kumis member", profileCta: "KNOW MORE ABOUT US",
    awardsEyebrow: "Recognition", awardsTitle: ["Awards and", "Achievements"], awardsDescription: "A collection of academic and professional recognitions that reflect our dedication to continuous learning.",
    awardTitle: "2nd Place in the AMICTA Information Systems Category", awardGalleryAria: "Award photo carousel", awardNext: "Show next award photo", rotate: "Click to rotate ↗",
    galleryLabels: ["NutriVerse team showcase", "NutriVerse team at AMICTA"],
    portfolioEyebrow: "Selected proof of work", portfolioTitle: "Portfolio Showcase", portfolioDescription: "Explore our journey through projects, certifications, and technical expertise.", portfolioAria: "Portfolio categories",
    tabLabels: { Projects: "Projects", Certificates: "Certificates", "Tech Stack": "Tech Stack" },
    openPdf: "Open PDF ↗", showLess: "Show less ↑", showMore: "Show more ↓",
    demoEyebrow: "Product demo", demoTitle: "See it in action", demoAria: "NutriVerse product demo", fullscreen: "Enlarge NutriVerse video",
    contactEyebrow: "Contact us", contactTitle: "Contact Us", contactIntro: "Have something in mind? Send a message and let’s connect.",
    contactFormTitle: "Get in Touch", contactFormCopy: "Feel free to reach out if you want to collaborate, discuss ideas, or simply say hello.",
    name: "Your Name", email: "Your Email", message: "Your Message", send: "↗ Send Message", connect: "Connect With Us",
    comments: "Comments", commentsCopy: "Leave your thoughts here", comment: "Your Comment", upload: "Upload Image", post: "Post Comment", emptyComment: "Your next collaboration could start here.", anonymous: "Anonymous", justNow: "just now",
    copyright: "© 2026 Team Kumis. All rights reserved.", certificateTitle: "AMICTA E-Certificate",
  },
  id: {
    loadingTitle: "MEMBANGUN KEHADIRAN DIGITAL", loadingExperience: "MEMUAT PENGALAMAN",
    nav: ["Beranda", "Tentang", "Penghargaan", "Portofolio", "Kontak"], languageLabel: "Ganti ke bahasa Inggris",
    available: "Tersedia untuk bekerja", heroTitle: ["Tim", "Fullstack"],
    intro: "Kami membangun aplikasi web modern dari frontend hingga backend dengan tampilan yang bersih, responsif, dan elegan. Kami mengubah ide menjadi pengalaman digital yang menarik dan mudah digunakan.",
    profileHeadline: "Tim kecil,", profileBackdrop: ["hasil", "besar"], profileAria: "Anggota Team Kumis", profileAlt: "Potret hitam putih anggota Team Kumis", profileCta: "KENALI KAMI LEBIH LANJUT",
    awardsEyebrow: "Pengakuan", awardsTitle: ["Penghargaan dan", "Pencapaian"], awardsDescription: "Kumpulan penghargaan akademik dan profesional yang mencerminkan dedikasi kami untuk terus belajar.",
    awardTitle: "Juara 2 Lomba AMICTA Kategori Sistem Informasi", awardGalleryAria: "Galeri foto penghargaan", awardNext: "Tampilkan foto penghargaan berikutnya", rotate: "Klik untuk memutar ↗",
    galleryLabels: ["Presentasi tim NutriVerse", "Tim NutriVerse di AMICTA"],
    portfolioEyebrow: "Karya pilihan", portfolioTitle: "Galeri Portofolio", portfolioDescription: "Jelajahi perjalanan kami melalui proyek, sertifikasi, dan keahlian teknis.", portfolioAria: "Kategori portofolio",
    tabLabels: { Projects: "Proyek", Certificates: "Sertifikat", "Tech Stack": "Teknologi" },
    openPdf: "Buka PDF ↗", showLess: "Tampilkan lebih sedikit ↑", showMore: "Tampilkan lebih banyak ↓",
    demoEyebrow: "Demo produk", demoTitle: "Lihat cara kerjanya", demoAria: "Demo produk NutriVerse", fullscreen: "Perbesar video NutriVerse",
    contactEyebrow: "Hubungi kami", contactTitle: "Hubungi Kami", contactIntro: "Punya ide? Kirim pesan dan mari terhubung.",
    contactFormTitle: "Hubungi Kami", contactFormCopy: "Jangan ragu menghubungi kami untuk berkolaborasi, mendiskusikan ide, atau sekadar menyapa.",
    name: "Nama Anda", email: "Email Anda", message: "Pesan Anda", send: "↗ Kirim Pesan", connect: "Terhubung dengan Kami",
    comments: "Komentar", commentsCopy: "Tinggalkan pendapat Anda di sini", comment: "Komentar Anda", upload: "Unggah Gambar", post: "Kirim Komentar", emptyComment: "Kolaborasi berikutnya dapat dimulai dari sini.", anonymous: "Anonim", justNow: "baru saja",
    copyright: "© 2026 Team Kumis. Seluruh hak dilindungi.", certificateTitle: "E-Sertifikat AMICTA",
  },
} as const;

const awards = ["Recognition 01"];

const technologies = [
  ["React", "⚛", "react"], ["TypeScript", "TS", "typescript"], ["Tailwind", "~", "tailwind"], ["HTML", "5", "html"], ["CSS", "3", "css"],
  ["PHP", "php", "php"], ["Laravel", "L", "laravel"], ["Next.js", "N", "next"], ["JavaScript", "JS", "javascript"], ["MySQL", "SQL", "mysql"],
];

const projectItems = [
  { title: "NutriVerse", slug: "nutriverse", image: "/images/nutriverse.png" },
  { title: "AmikomEventHub", slug: "amikom-eventhub", image: "/images/amikom-eventhub.png" },
];
const certificateItems = [
  { title: "AMICTA E-Certificate", slug: "certificate-preview-01", image: "/images/sertifikat-amicta-faishal-mumtazah.png", pdf: "/certificates/sertifikat-amicta-faishal-mumtazah.pdf" },
  { title: "AMICTA E-Certificate - Fathan Tamim Taqiyyuddin", slug: "certificate-fathan-tamim-taqiyyuddin", image: "/images/sertifikat-amicta-fathan-tamim-taqiyyuddin.png", pdf: "/certificates/sertifikat-amicta-fathan-tamim-taqiyyuddin.pdf" },
  { title: "AMICTA E-Certificate - Dimas Muhamad Rofiq", slug: "certificate-dimas-muhamad-rofiq", image: "/images/sertifikat-amicta-dimas-muhamad-rofiq.png", pdf: "/certificates/sertifikat-amicta-dimas-muhamad-rofiq.pdf" },
];
const awardGalleryItems = [
  { label: "NutriVerse team showcase", image: "/images/award-card-front.jpg" },
  { label: "NutriVerse team at AMICTA", image: "/images/award-card-back.jpg" },
];

const profileCards = [
  { front: "/images/profile-card-1.png", back: "/images/profile-card-1.png" },
  { front: "/images/profile-card-2.png", back: "/images/profile-card-2.png" },
  { front: "/images/profile-card-3.png", back: "/images/profile-card-3.png" },
];

function SocialIcon({ platform }: { platform: "linkedin" | "instagram" | "youtube" | "github" | "tiktok" }) {
  const paths = {
    linkedin: <><path d="M4.8 3.5a2.3 2.3 0 1 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM2.7 9.8H7v11.5H2.7zM9.6 9.8h4.1v1.6h.1c.6-1.1 2-2.2 4.1-2.2 4.4 0 5.2 2.9 5.2 6.7v5.4h-4.3v-4.8c0-1.1 0-3.1-1.9-3.1s-2.2 1.5-2.2 3v4.9H10V9.8Z" /></>,
    instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.8" r="1" fill="currentColor" stroke="none" /></>,
    youtube: <><path d="M21.6 7.3a2.8 2.8 0 0 0-2-2C17.8 4.8 12 4.8 12 4.8s-5.8 0-7.6.5a2.8 2.8 0 0 0-2 2C2 9.1 2 12 2 12s0 2.9.4 4.7a2.8 2.8 0 0 0 2 2c1.8.5 7.6.5 7.6.5s5.8 0 7.6-.5a2.8 2.8 0 0 0 2-2C22 14.9 22 12 22 12s0-2.9-.4-4.7Z" /><path d="m10 15.5 5-3.5-5-3.5v7Z" fill="currentColor" stroke="none" /></>,
    github: <path d="M12 2.5a9.5 9.5 0 0 0-3 18.5c.5.1.6-.2.6-.5v-1.8c-2.5.5-3-1.1-3-1.1-.4-1.1-1-1.4-1-1.4-.8-.6.1-.6.1-.6.9.1 1.4.9 1.4.9.8 1.3 2.1.9 2.6.7.1-.6.3-1 .6-1.2-2-.2-4.1-1-4.1-4.4 0-1 .3-1.7.9-2.4-.1-.2-.4-1.1.1-2.3 0 0 .7-.2 2.4.9a8.4 8.4 0 0 1 4.4 0c1.7-1.1 2.4-.9 2.4-.9.5 1.2.2 2.1.1 2.3.6.7.9 1.5.9 2.4 0 3.4-2.1 4.2-4.1 4.4.3.3.6.9.6 1.8v2.7c0 .3.2.6.6.5A9.5 9.5 0 0 0 12 2.5Z" />,
    tiktok: <path d="M15.8 3c.3 2.1 1.5 3.8 3.7 4.1v3.2c-1.3 0-2.5-.4-3.6-1.1v6.9a5.8 5.8 0 1 1-5-5.8v3.2a2.7 2.7 0 1 0 1.7 2.5V3h3.2Z" />,
  };
  return <svg className={platform} viewBox="0 0 24 24" aria-hidden="true">{paths[platform]}</svg>;
}

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [activeTab, setActiveTab] = useState<Tab>("Projects");
  const [commentName, setCommentName] = useState("");
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<string[]>([]);
  const [portraitTilt, setPortraitTilt] = useState({ x: 0, y: 0 });
  const [showAll, setShowAll] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);
  const [activeAwardIndex, setActiveAwardIndex] = useState(0);
  const copy = translations[language];
  const demoVideoRef = useRef<HTMLVideoElement>(null);
  const showcaseItems = activeTab === "Projects" ? projectItems : certificateItems;
  const visibleShowcaseItems = showAll ? showcaseItems : showcaseItems.slice(0, 3);

  useEffect(() => {
    const requestedLanguage = new URLSearchParams(window.location.search).get("lang");
    if (requestedLanguage === "en" || requestedLanguage === "id") {
      setLanguage(requestedLanguage);
      return;
    }
    const savedLanguage = window.localStorage.getItem("team-kumis-language");
    if (savedLanguage === "en" || savedLanguage === "id") setLanguage(savedLanguage);
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem("team-kumis-language", language);
  }, [language]);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) {
      setIsLoading(false);
      return;
    }

    const duration = 1650;
    const startedAt = performance.now();
    let frame = 0;
    const updateProgress = (now: number) => {
      const percentage = Math.min(100, Math.round(((now - startedAt) / duration) * 100));
      setLoadProgress(percentage);
      if (percentage < 100) {
        frame = requestAnimationFrame(updateProgress);
      } else {
        window.setTimeout(() => setIsLoading(false), 180);
      }
    };

    frame = requestAnimationFrame(updateProgress);
    return () => cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    const lenis = new Lenis({ duration: 1.05, smoothWheel: true, touchMultiplier: 1.15 });
    let frame = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reducedMotion) return;

    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      document.querySelectorAll<HTMLElement>("[data-cinematic]").forEach((element) => {
        gsap.fromTo(element, { y: 30, rotateX: 3 }, {
          y: -8,
          rotateX: 0,
          ease: "none",
          scrollTrigger: {
            trigger: element,
            start: "top 88%",
            end: "bottom 18%",
            scrub: 0.7,
          },
        });
      });

    });

    return () => context.revert();
  }, [activeTab, showAll]);

  useEffect(() => {
    const selector = "h1, h2, h3, p, strong, small, button, .portrait, .awardPhoto, .cardVisual, .techCard, .aboutStats article, .awardList article, .messagePanel, .commentPanel, .socialLinks a";
    const targets = Array.from(document.querySelectorAll<HTMLElement>(selector)).filter((target) => !target.closest("[data-loader]"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduceMotion) return;

    targets.forEach((target, index) => {
      target.classList.add(styles.revealItem);
      target.style.setProperty("--reveal-delay", `${(index % 5) * 55}ms`);
    });

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        entry.target.classList.toggle(styles.revealed, entry.isIntersecting);
      }),
      { threshold: 0.12, rootMargin: "0px 0px -5%" }
    );

    targets.forEach((target) => observer.observe(target));
    return () => observer.disconnect();
  }, [activeTab, comments.length]);

  function postComment() {
    const message = comment.trim();
    if (!message) return;
    setComments((current) => [message, ...current]);
    setComment("");
  }

  function toggleDemoFullscreen() {
    const video = demoVideoRef.current;
    if (!video) return;
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void video.requestFullscreen();
    }
  }

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveAwardIndex((current) => (current + 1) % awardGalleryItems.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <main className={styles.page}>
      <div className={`${styles.loadingScreen} ${!isLoading ? styles.loadingScreenDone : ""}`} data-loader aria-live="polite" aria-label={copy.loadingExperience} aria-hidden={!isLoading}>
          <motion.div className={styles.loadingGrid} aria-hidden="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .45 }} />
          <div className={styles.loadingContent}>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12, duration: .5 }}>TEAM KUMIS / 2026</motion.p>
            <motion.div className={styles.loadingTitle} initial="hidden" animate="visible" variants={{ hidden: {}, visible: { transition: { staggerChildren: .09, delayChildren: .18 } } }}>
              {copy.loadingTitle.split(" ").map((word, index) => <motion.span key={`${word}-${index}`} variants={{ hidden: { y: "105%" }, visible: { y: "0%", transition: { duration: .7, ease: [0.16, 1, 0.3, 1] } } }}>{word}</motion.span>)}
            </motion.div>
            <div className={styles.loadingProgress} aria-hidden="true"><motion.span animate={{ scaleX: loadProgress / 100 }} transition={{ ease: "linear", duration: .08 }} /></div>
            <div className={styles.loadingMeta}><span>{copy.loadingExperience}</span><strong>{String(loadProgress).padStart(3, "0")}%</strong></div>
          </div>
          <motion.div className={styles.loadingOrb} aria-hidden="true" animate={{ rotate: 360, scale: [1, 1.12, 1] }} transition={{ rotate: { duration: 7, repeat: Infinity, ease: "linear" }, scale: { duration: 2.2, repeat: Infinity, ease: "easeInOut" } }} />
      </div>
      <div className={styles.background} aria-hidden="true"><span className={styles.orbOne} /><span className={styles.orbTwo} /><span className={styles.orbThree} /></div>
      <nav className={styles.nav} aria-label={language === "en" ? "Primary navigation" : "Navigasi utama"}>
        <a className={styles.brand} href="#home">teamkumis.dev</a>
        <div className={styles.navControls}>
          <div className={styles.navLinks}>
            <a href="#home">{copy.nav[0]}</a><a href="#about">{copy.nav[1]}</a><a href="#awards">{copy.nav[2]}</a><a href="#portfolio">{copy.nav[3]}</a><a href="#contact">{copy.nav[4]}</a>
          </div>
          <button type="button" className={styles.languageToggle} onClick={() => setLanguage((current) => current === "en" ? "id" : "en")} aria-label={copy.languageLabel} title={copy.languageLabel}>
            <span className={language === "en" ? styles.languageActive : ""}>EN</span><i aria-hidden="true">/</i><span className={language === "id" ? styles.languageActive : ""}>ID</span>
          </button>
        </div>
      </nav>
      <section className={styles.hero} id="home">
        <div className={styles.heroOrb} aria-hidden="true"><HeroOrb /></div>
        <div className={styles.heroCopy}>
          <p className={styles.availability}><span /> {copy.available}</p>
          <h1><span>{copy.heroTitle[0]}</span><span>{copy.heroTitle[1]}</span></h1>
          <p className={styles.cursor} aria-hidden="true">_</p>
          <p className={styles.intro}>{copy.intro}</p>
          <div className={styles.skillRow}><span>React.js</span><span>Node.js</span><span>TypeScript</span></div>
        </div>
      </section>
      <section className={styles.about} id="about" data-cinematic>
        <h2 className={styles.profileHeadline}>{copy.profileHeadline}</h2>
        <p className={styles.profileBackdrop} aria-hidden="true"><span>{copy.profileBackdrop[0]}</span><span>{copy.profileBackdrop[1]}</span></p>
        <p className={`${styles.profileBackdrop} ${styles.profileBackdropOutline}`} aria-hidden="true"><span>{copy.profileBackdrop[0]}</span><span>{copy.profileBackdrop[1]}</span></p>
        <div className={styles.profileCards} aria-label={copy.profileAria}>
          <div className={styles.profileRing}>
            {profileCards.map((card, index) => (
              <article className={styles.profileCard} key={card.front} style={{ "--card-index": index } as CSSProperties}>
                <div className={styles.profileCardInner}>
                  <div className={styles.profileCardFace}>
                    <Image src={card.front} alt={copy.profileAlt} fill sizes="(max-width: 640px) 42vw, 18rem" className={styles.profileCardImage} />
                  </div>
                  <div className={`${styles.profileCardFace} ${styles.profileCardBack}`}>
                    <Image src={card.back} alt={copy.profileAlt} fill sizes="(max-width: 640px) 42vw, 18rem" className={styles.profileCardImage} />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <a className={styles.profileCta} href="#portfolio">{copy.profileCta}</a>
        <div className={styles.aboutCopy}>
          <p className={styles.eyebrow}>About us</p>
          <h2>Team<br />Kumis</h2>
          <p className={styles.aboutLead}>A fullstack development team focused on building clean, responsive, and accessible web applications with strong visuals and a solid backend.</p>
          <p className={styles.quote}>“Turning ideas into clean, modern, and meaningful digital experiences.”</p>
          <div className={styles.aboutActions}>
            <span className={styles.cvPending}>▣ Download CV</span>
            <a href="#portfolio">↗ View Projects</a>
          </div>
        </div>
        <div className={styles.portraitWrap} onPointerMove={(event) => { const bounds = event.currentTarget.getBoundingClientRect(); setPortraitTilt({ x: ((event.clientY - bounds.top) / bounds.height - .5) * -14, y: ((event.clientX - bounds.left) / bounds.width - .5) * 14 }); }} onPointerLeave={() => setPortraitTilt({ x: 0, y: 0 })}>
          <div className={styles.portrait} style={{ "--tilt-x": `${portraitTilt.x}deg`, "--tilt-y": `${portraitTilt.y}deg` } as CSSProperties}><Image src="/images/jas.jpeg" alt="Team Kumis" fill priority sizes="(max-width: 850px) 62vw, 20rem" className={styles.portraitImage} /></div>
        </div>
        <div className={styles.aboutStats}>
          <article><span>⌘</span><strong>02</strong><p>Projects</p><b>↗</b></article>
          <article><span>◉</span><strong>03</strong><p>Certificates</p><b>↗</b></article>
          <article><span>✦</span><strong>03</strong><p>Awards</p><b>↗</b></article>
        </div>
      </section>
      <section className={styles.awards} id="awards" data-cinematic>
        <header><p className={styles.eyebrow}>{copy.awardsEyebrow}</p><h2 className={styles.typeTitle}><span>{copy.awardsTitle[0]}</span><span>{copy.awardsTitle[1]}</span></h2><p>{copy.awardsDescription}</p></header>
        <div className={styles.awardContent}>
          <div className={styles.awardGallery} aria-label={copy.awardGalleryAria}>
            <button type="button" className={styles.awardCarousel} onClick={() => setActiveAwardIndex((current) => (current + 1) % awardGalleryItems.length)} aria-label={copy.awardNext}>
              <div className={`${styles.awardPhoto} ${activeAwardIndex === 1 ? styles.awardPhotoFlipped : ""}`}>
                <div className={styles.awardPhotoInner}>
                  {awardGalleryItems.map((item, index) => (
                    <div className={styles.awardPhotoFace} key={item.image}>
                      <Image src={item.image} alt={copy.galleryLabels[index]} fill sizes="(max-width: 720px) 90vw, 32rem" className={styles.awardImage} />
                      <span className={styles.awardPhotoLabel}>{copy.galleryLabels[index]}</span>
                    </div>
                  ))}
                </div>
              </div>
              <span className={styles.awardCarouselHint}>{copy.rotate}</span>
            </button>
          </div>
          <div className={styles.awardList}>
            {awards.map((label, index) => <article key={label}><span className={styles.awardIcon}>{index === 0 ? "◉" : "♜"}</span><strong>{copy.awardTitle}</strong><b>↗</b></article>)}
          </div>
        </div>
      </section>
      <section className={styles.portfolio} id="portfolio" data-cinematic>
        <header className={styles.sectionIntro}><p className={styles.eyebrow}>{copy.portfolioEyebrow}</p><h2>{copy.portfolioTitle}</h2><p>{copy.portfolioDescription}</p></header>
        <div className={styles.tabs} role="tablist" aria-label={copy.portfolioAria}>
          {tabs.map((tab) => <motion.button key={tab} className={activeTab === tab ? styles.activeTab : ""} onClick={() => { setActiveTab(tab); setShowAll(false); }} role="tab" aria-selected={activeTab === tab} whileHover={{ scale: 1.025 }} whileTap={{ scale: .97 }}>
            {activeTab === tab && <motion.span className={styles.activeTabBackground} layoutId="active-portfolio-tab" transition={{ type: "spring", stiffness: 420, damping: 34 }} />}
            <span>{copy.tabLabels[tab]}</span>
          </motion.button>)}
        </div>
        {activeTab === "Tech Stack" ? <div className={styles.techGrid}>
          {technologies.map(([name, icon, color], index) => <article className={`${styles.techCard} ${styles[`tech${color}`]}`} key={name} style={{ "--delay": `${index * 55}ms` } as CSSProperties}><span>{icon}</span><strong>{name}</strong></article>)}
        </div> : <motion.div className={styles.imageCardGrid} layout>
          <AnimatePresence mode="popLayout">
            {visibleShowcaseItems.map((item, index) => <motion.div key={item.slug} layout initial={{ opacity: 0, y: 28, scale: .96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -18, scale: .96 }} transition={{ type: "spring", stiffness: 210, damping: 22, delay: index * .07 }}>
              <Link href={`/details/${item.slug}?lang=${language}`} className={styles.imageCard}>
                <Image src={item.image} alt={item.title} fill sizes="(max-width: 850px) 100vw, 34rem" className={styles.cardImage} />
                <span className={styles.imageShade} /><strong>{item.slug === "certificate-preview-01" ? copy.certificateTitle : item.title}</strong>
              </Link>
              {activeTab === "Certificates" && certificateItems[index].pdf && <a href={certificateItems[index].pdf} target="_blank" rel="noreferrer" className={styles.pdfLink}>{copy.openPdf}</a>}
            </motion.div>)}
          </AnimatePresence>
        </motion.div>}
        {activeTab !== "Tech Stack" && showcaseItems.length > 3 && <button type="button" className={styles.showMore} onClick={() => setShowAll((current) => !current)}>{showAll ? copy.showLess : copy.showMore}</button>}
      </section>
      <section className={styles.demoSection} data-product-demo aria-label={copy.demoEyebrow}>
        <div className={styles.demoSticky}>
          <div className={styles.demoHeading}><p className={styles.eyebrow}>{copy.demoEyebrow}</p><h2>{copy.demoTitle}</h2></div>
          <div className={styles.demoCard} data-demo-card>
            <video ref={demoVideoRef} className={styles.demoVideo} src="/videos/nutriverse-loop.mp4" autoPlay loop muted playsInline controls preload="metadata" aria-label={copy.demoAria} />
            <div className={styles.demoShade} /><strong>NutriVerse <span>↗</span></strong>
            <button type="button" className={styles.demoFullscreenButton} onClick={toggleDemoFullscreen} aria-label={copy.fullscreen}>⛶</button>
          </div>
        </div>
      </section>
      <section className={styles.contact} id="contact" data-cinematic>
        <header className={styles.contactIntro}><p className={styles.eyebrow}>{copy.contactEyebrow}</p><h2>{copy.contactTitle}</h2><p>{copy.contactIntro}</p></header>
        <div className={styles.contactGrid}>
          <form className={styles.messagePanel} action="mailto:faishalmumtazah@gmail.com" method="post" encType="text/plain">
            <h3>{copy.contactFormTitle}</h3><p>{copy.contactFormCopy}</p>
            <label><span>◌</span><input name="name" placeholder={copy.name} required /></label>
            <label><span>✉</span><input name="email" type="email" placeholder={copy.email} required /></label>
            <label className={styles.messageField}><span>□</span><textarea name="message" placeholder={copy.message} required /></label>
            <button type="submit">{copy.send}</button>
            <div className={styles.socialArea}><p>{copy.connect}</p><div className={styles.socialLinks}>
              <a className={styles.linkedinLink} href="https://www.linkedin.com/in/faishal-mumtazah/" target="_blank" rel="noreferrer"><span className={styles.socialIcon}><SocialIcon platform="linkedin" /></span><span><strong>LinkedIn</strong><small>Team Kumis</small></span></a>
              <a href="https://www.instagram.com/faishalmmtzah_?igsi=YnlzeHdhMmdoZGlu" target="_blank" rel="noreferrer"><span className={styles.socialIcon}><SocialIcon platform="instagram" /></span><span><strong>Instagram</strong><small>@teamkumis</small></span></a>
              <a href="https://youtube.com/@slofii-j8h?si=r_fFZwYFe7Dw4dWx" target="_blank" rel="noreferrer"><span className={styles.socialIcon}><SocialIcon platform="youtube" /></span><span><strong>YouTube</strong><small>@slofii-j8h</small></span></a>
              <a href="https://github.com/faishal-creator" target="_blank" rel="noreferrer"><span className={styles.socialIcon}><SocialIcon platform="github" /></span><span><strong>GitHub</strong><small>Team Kumis</small></span></a>
              <a href="https://www.tiktok.com/@fsllll.z?is_from_webapp=1&sender_device=pc" target="_blank" rel="noreferrer"><span className={styles.socialIcon}><SocialIcon platform="tiktok" /></span><span><strong>TikTok</strong><small>@fsllll.z</small></span></a>
            </div></div>
          </form>
          <div className={styles.commentPanel}>
            <h3>{copy.comments}</h3><p>{copy.commentsCopy}</p>
            <input value={commentName} onChange={(event) => setCommentName(event.target.value)} placeholder={copy.name} />
            <textarea value={comment} onChange={(event) => setComment(event.target.value)} placeholder={copy.comment} />
            <label className={styles.uploadField}>↥ <span>{copy.upload}</span><input type="file" accept="image/*" /></label>
            <button type="button" onClick={postComment}>{copy.post}</button>
            <div className={styles.commentFeed} aria-live="polite">
              {comments.length === 0 ? <div className={styles.emptyComment}><strong>TK</strong><span>{copy.emptyComment}</span></div> : comments.map((item, index) => <article className={styles.commentCard} key={`${item}-${index}`}><strong>{commentName.trim().slice(0, 2).toUpperCase() || "AN"}</strong><div><b>{commentName.trim() || copy.anonymous}</b><p>{item}</p></div><span>{copy.justNow}</span></article>)}
            </div>
          </div>
        </div>
        <p className={styles.copyright}>{copy.copyright}</p>
      </section>
    </main>
  );
}
