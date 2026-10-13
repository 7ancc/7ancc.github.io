"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { projects, schools, type Project, type Evidence } from "./project-content";
import { VentureCaseStudy, VentureAwards } from "./venture-case-study";
import { ConsumerCaseStudy } from "./consumer-case-study";
import { ModelingCaseStudy } from "./modeling-case-study";
import { FlowText } from "./flow-text";
import { CitrusCaseStudy } from "./citrus-case-study";
import { NeuralCaseStudy } from "./neural-case-study";
import { ResearchDevelopment } from "./research-development";
import { SeedlingCaseStudy } from "./seedling-case-study";
import { AppliedInnovation } from "./applied-innovation";
import { Capabilities, ManualPortfolio, RecognitionArchive } from "./capabilities";
import { Leadership } from "./leadership";
import { ResearchDocumentViewer, type ResearchDocument } from "./research-document-viewer";
import { ArrowDown, ArrowUpRight, Download, Mail, Menu, Minus, Phone, Plus, X } from "lucide-react";

const nav = [
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Capabilities", href: "#capabilities" },
  { label: "Leadership", href: "#leadership" },
  { label: "Archive", href: "#portfolio" },
];

const experiences = [
  {
    period: "JUN—SEP 2026",
    company: "Sinolink Securities Co., Ltd.",
    location: "Investment Banking · IPO Project",
    role: "IPO Due Diligence",
    number: "43,000+",
    metric: "transaction records analysed",
    details: [
      "Cleaned and analysed 4,350+ procurement and sales records, reviewed 45 material contracts, and conducted on-site due diligence at 20+ banks across regions. Analysed 43,000+ transaction records, traced dividend flows for 330+ shareholders, and verified 2,000+ personnel records to identify circular fund flows and potential improper benefit transfers.",
      "Revised the Prospectus and two sponsorship letters. Independently drafted the Material Contracts and Purchase Price Analysis sections, prepared five sets of trend charts, and documented verification findings in traceable working papers.",
    ],
  },
  {
    period: "MAR—JUN 2025",
    company: "Zhuhai Municipal Construction Co., Ltd.",
    location: "Finance · Infrastructure",
    role: "Finance Specialist",
    number: "¥18M+",
    metric: "payment applications processed",
    details: [
      "Handled monthly and quarterly VAT and corporate income tax filings, reviewed 400+ invoices, and verified input VAT deduction eligibility and compliance.",
      "Used Kingdee ERP for vouchers, accounting, month-end closing and preliminary financial statements. Processed 100+ payment applications totalling over RMB 18 million, monitored roughly RMB 2 million in monthly construction receivables, and assisted with overdue collections.",
    ],
  },
  {
    period: "DEC 2023—MAR 2024",
    company: "Zhuhai Da Heng Qin Group Co., Ltd.",
    location: "Corporate Finance",
    role: "Finance Intern",
    number: "60+",
    metric: "pages of management presentations",
    details: [
      "Independently prepared annual operating analyses for two subsidiaries, examining revenue, costs, cash flow, ROE, ROA and the current ratio; created 60+ pages of visual reports for management.",
      "Coordinated annual accounting across seven subsidiaries through the internal OA system, cross-checked and archived monthly vouchers, prepared cash journals, and reviewed 10+ funding applications.",
    ],
  },
];

const strengths = [
  {
    number: "01",
    title: "Keen Insight & Agile Learning",
    titleLines: ["Keen Insight &", "Agile Learning"],
    short: "Rapidly mastering advanced technical stacks—from causal inference to AI workflows—I transform interdisciplinary uncertainty into actionable solutions",
    detail: [
      "When facing unfamiliar challenges, I am used to starting from scratch and finding a way through. With an efficient self-learning framework, I have worked across finance, environmental research, and AI, and independently developed practical skills in Python, Stata, PyTorch, and LLM/Agentic Workflows. I am also proficient in quantitative and causal inference methods such as DID/DDD, Double Machine Learning (DDML), LSTM, and System Dynamics simulation.",
      "When dealing with unfamiliar problems, I identify the core issue, build the necessary knowledge structure, and gradually turn uncertainty into practical and executable solutions.",
    ],
  },
  {
    number: "02",
    title: "Resilient Execution Under Pressure",
    titleLines: ["Resilient Execution", "Under Pressure"],
    short: "Thriving in high-pressure, multi-threaded environments, I consistently deliver top-ranked academic results, multiple research publications, and national awards",
    detail: [
      "A solid theoretical foundation and strong execution allow me to maintain high-quality output across multiple demanding tasks, even under pressure. During my undergraduate studies, I ranked first overall in my major, advanced five interdisciplinary papers to submission, and received more than 30 national and provincial honors, including a National Silver Award in the “Internet+” Innovation and Entrepreneurship Competition.",
      "In my Master's program, I have continued to rank among the top students, completed two additional research papers for submission, and brought my thesis close to completion. At the same time, I contributed to Graduate Student Union coordination and was recognized as an “Advanced Individual in Social Work.”",
      "I work with a grounded and disciplined mindset, staying consistent and delivering strong results even under sustained pressure.",
    ],
  },
  {
    number: "03",
    title: "Adaptive Multidimensional Leadership",
    titleLines: ["Adaptive", "Multidimensional Leadership"],
    short: "From driving corporate partnerships to orchestrating cross-university initiatives, I seamlessly adapt my role to ensure every collaboration yields tangible impact",
    detail: [
      "Years of student leadership, centered on solving real problems, have strengthened my ability to coordinate people and resources and to understand different perspectives. During my undergraduate years, I led the university Career Planning Competition and coordinated partnerships with companies such as Coca-Cola, helped organize two of the largest recruitment fairs in western Guangdong, and led a nationally recognized social practice team featured by CCTV.",
      "Through the Graduate Student Union's Academic Exchange and Research & Rights work, I developed an AI-enabled research salon proposal and peer-learning programmes, connecting student-needs research with academic support, practical research tools and cross-department coordination.",
      "In a team, I quickly identify where I can contribute most. I am comfortable taking a broader view to set direction and solve key problems, while also stepping into frontline execution when needed. Whatever the role, I focus on what truly matters and on making collaboration lead to practical results.",
    ],
  },
];

type PortfolioItem = { id: string; tag: string; title: string; sub: string; kind: string; image?: string; detail: string; href: string };
const portfolio: PortfolioItem[] = [
  { id: "research", tag: "01 / PUBLICATION", title: "Climate forecasting", sub: "PLOS One · First-listed co-first author", kind: "paper", image: "/evidence/climate-paper-preview.webp", detail: "Forecasting and analysing global average temperature trends based on LSTM and ARIMA models. Published in PLOS One, 20(9), e0330645.", href: "https://doi.org/10.1371/journal.pone.0330645" },
  { id: "healthcare", tag: "02 / PUBLICATION", title: "Healthcare investment efficiency", sub: "Finance Research Letters · Third author", kind: "paper", image: "/evidence/healthcare-paper-preview.webp", detail: "Revolutionizing healthcare: Unveiling China's healthcare efficiency quest and path to progress. Published in Finance Research Letters, 67, 105688.", href: "https://doi.org/10.1016/j.frl.2024.105688" },
  { id: "leadership", tag: "03 / PUBLICATION", title: "Transformational leadership", sub: "Science Technology and Industry · First author", kind: "paper", image: "/evidence/leadership-paper-preview.webp", detail: "国内变革型领导的热点演变与热点领域. Tan Can and Wen Mingming. Science Technology and Industry, 2024, 24(20), 287–292.", href: "/papers/transformational-leadership.pdf" },
  { id: "patent", tag: "04 / INVENTION PATENT", title: "Hyperspectral target detection", sub: "Granted invention patent · Co-inventor", kind: "patent", image: "/evidence/hyperspectral-patent.webp", detail: "Co-inventor of the granted invention patent Hyperspectral Image Target Detection Method, ZL202410627687.5.", href: "" },
  { id: "finance-patent", tag: "05 / UTILITY MODEL", title: "Financial information storage", sub: "Utility model patent · First inventor", kind: "patent", image: "/evidence/financial-storage-patent.webp", detail: "First inventor of A Financial Information Storage Device, ZL202322544773.3.", href: "" },
];

const cvPaths = [
  {
    name: "Research & Academic CV",
    description: "Visiting research and exchange applications",
    document: {
      id: "cv-research-oct13", title: "Research & Academic CV", kind: "Visiting Research & Exchange Applications", viewOnly: true,
      excerpts: [1, 2].map(page => ({ image: `/cv/research-${String(page).padStart(2, "0")}.webp`, label: `Research & Academic CV · Page ${page} of 2` })),
    } satisfies ResearchDocument,
  },
  {
    name: "Consulting & Finance CV",
    description: "Consulting, finance and internship applications",
    document: {
      id: "cv-consulting-finance-oct13", title: "Consulting & Finance CV", kind: "Consulting, Finance & Internship Applications", viewOnly: true,
      excerpts: [{ image: "/cv/consulting-finance-01.webp", label: "Consulting & Finance CV · Page 1 of 1" }],
    } satisfies ResearchDocument,
  },
];

function Reveal({ children, className = "", delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  return <motion.div className={className} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.16 }} transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.div>;
}

function PortfolioArt({ kind, image }: { kind: string; image?: string }) {
  if (image) return <div className={`art-document art-document-${kind}`}><img src={image} alt="" loading="lazy" /></div>;
  if (kind === "paper") return <div className="art-paper"><span>PLOS ONE / 2025</span><strong>Forecasting global temperature with LSTM and ARIMA</strong><div className="art-rule" /><small>RESEARCH ARTICLE</small></div>;
  if (kind === "dashboard") return <div className="art-finance"><span>IPO DUE DILIGENCE</span><strong>43,000<span>+</span></strong><small>BANK TRANSACTIONS REVIEWED</small><div className="art-bars"><i /><i /><i /><i /><i /><i /><i /></div></div>;
  if (kind === "patent") return <div className="art-patent"><span>INVENTION PATENT</span><strong>01</strong><small>HYPERSPECTRAL IMAGE TARGET DETECTION</small><em>ZL202410627687.5</em></div>;
  if (kind === "award") return <div className="art-award"><span>NATIONAL RECOGNITION</span><strong>Silver</strong><small>CHINA INTERNATIONAL COLLEGE STUDENTS’ INNOVATION COMPETITION</small></div>;
  return <div className="art-project"><span>AI / COMMERCIALISATION</span><strong>From idea<br />to application.</strong><small>INTELLIGENT CITRUS PEST MONITORING</small></div>;
}

const portfolioItems: PortfolioItem[] = [
  ...portfolio,
  { id: "award", tag: "06 / NATIONAL AWARD", title: "National silver award", sub: "Innovation competition · Prepared seafood venture", kind: "award", image: "/evidence/venture-national-silver.webp", detail: "The prepared seafood venture received a National Silver Award in the 2023 China International College Students’ Innovation Competition.", href: "" },
  { id: "planting", tag: "07 / INTELLIGENT SYSTEMS", title: "Smart agriculture", sub: "Multi-layer unmanned planting · Provincial First Prize", kind: "award", image: "/evidence/planting-challenge-first.webp", detail: "The multi-layer intelligent unmanned planting system received Provincial First Prize in the 2023 Challenge Cup competition.", href: "" },
  { id: "application", tag: "08 / AI APPLICATION", title: "Intelligent pest detection", sub: "Registered software copyright", kind: "project", image: "/evidence/pest-detection-software.webp", detail: "Registered software copyright for the Intelligent Pest Detection System, part of the interdisciplinary citrus-pest project.", href: "" },
  { id: "scholarship", tag: "09 / ACADEMIC HONOR", title: "National Scholarship", sub: "Academic recognition · Guangdong Ocean University", kind: "award", image: "/evidence/national-scholarship.webp", detail: "National Scholarship awarded during undergraduate study at Guangdong Ocean University.", href: "" },
];

function HighlightedText({ text }: { text: string }) {
  const terms = ["Python, Stata, PyTorch, and LLM/Agentic Workflows", "DID/DDD, Double Machine Learning (DDML), LSTM, and System Dynamics", "efficient self-learning framework", "core issue", "practical and executable solutions", "ranked first overall", "five interdisciplinary papers", "more than 30 national and provincial honors", "National Silver Award", "two additional research papers", "President of the Graduate Student Union", "Advanced Individual in Social Work", "grounded and disciplined mindset", "Coca-Cola", "two of the largest recruitment fairs", "featured by CCTV", "AI Empowering Research", "Harbin Institute of Technology", "graduate-to-undergraduate mentoring", "frontline execution", "practical results", "advanced technical stacks", "actionable solutions", "top-ranked academic results", "national awards", "corporate partnerships", "cross-university initiatives", "tangible impact"];
  const pattern = new RegExp(`(${terms.map(term => term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "g");
  return <>{text.split(pattern).map((part, index) => terms.includes(part) ? <strong key={index}>{part}</strong> : part)}</>;
}

function JournalOutcome({ text, journal }: { text: string; journal?: string }) {
  if (!journal) return <>{text}</>;
  const [before, after] = text.split(journal);
  return <>{before}<em>{journal}</em>{after}</>;
}

export default function Home() {
  const [cvOpen, setCvOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [readableHeader, setReadableHeader] = useState(false);
  const [activeExperience, setActiveExperience] = useState<number | null>(null);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [activePortfolio, setActivePortfolio] = useState<(typeof portfolioItems)[number] | null>(null);
  const [activeStrength, setActiveStrength] = useState<(typeof strengths)[number] | null>(null);
  const [activeSchool, setActiveSchool] = useState<(typeof schools)[number] | null>(null);
  const [activeEvidence, setActiveEvidence] = useState<Evidence | null>(null);
  const [activeDocument, setActiveDocument] = useState<ResearchDocument | null>(null);
  const [ventureAwardsOpen, setVentureAwardsOpen] = useState(false);
  const [recognitionArchiveOpen, setRecognitionArchiveOpen] = useState(false);
  const [visibleEducationLetters, setVisibleEducationLetters] = useState(0);
  const [compactViewport, setCompactViewport] = useState(false);
  const [shortViewport, setShortViewport] = useState(false);
  const educationRef = useRef<HTMLElement>(null);
  const workRef = useRef<HTMLDivElement>(null);
  const projectRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress: educationProgress } = useScroll({ target: educationRef, offset: ["start start", "end end"] });
  const { scrollYProgress: workProgress } = useScroll({ target: workRef, offset: ["start start", "end end"] });
  const { scrollYProgress: projectProgress } = useScroll({ target: projectRef, offset: ["start start", "end end"] });
  const eduFinalTop = shortViewport ? "11%" : "20%";
  const eduTitleTop = useTransform(educationProgress, [0, 0.35, 0.72], reduceMotion ? [eduFinalTop, eduFinalTop, eduFinalTop] : ["34%", "27%", eduFinalTop]);
  const eduTitleScale = useTransform(educationProgress, [0, 0.35, 0.72], reduceMotion ? [0.46, 0.46, 0.46] : [1, 0.82, 0.46]);
  const eduTitleLeft = useTransform(educationProgress, [0, 0.35, 0.72], reduceMotion ? ["0%", "0%", "0%"] : ["50%", "50%", "0%"]);
  const eduTitleX = useTransform(educationProgress, [0, 0.35, 0.72], reduceMotion ? ["-27%", "-27%", "-27%"] : ["-50%", "-50%", "-27%"]);
  const eduCardOneY = useTransform(educationProgress, [0, 0.23, 0.68, 1], reduceMotion ? [0, 0, 0, 0] : [900, 560, 0, 0]);
  const eduCardTwoY = useTransform(educationProgress, [0, 0.34, 0.68, 1], reduceMotion ? [0, 0, 0, 0] : [1100, 650, 0, 0]);
  const workEndScale = compactViewport ? 0.65 : 0.28;
  const workScale = useTransform(workProgress, [0, 0.75, 1], reduceMotion ? [workEndScale, workEndScale, workEndScale] : [1, workEndScale, workEndScale]);
  const chapterFinalTop = compactViewport ? "17%" : "18.5%";
  const workLeft = useTransform(workProgress, [0, 0.75, 1], reduceMotion ? ["0%", "0%", "0%"] : ["50%", "0%", "0%"]);
  const workTop = useTransform(workProgress, [0, 0.75, 1], reduceMotion ? [chapterFinalTop, chapterFinalTop, chapterFinalTop] : ["50%", chapterFinalTop, chapterFinalTop]);
  const workFinalX = `${-50 + workEndScale * 50}%`;
  const workFinalY = `${-50 + workEndScale * 50}%`;
  const workX = useTransform(workProgress, [0, 0.75, 1], reduceMotion ? [workFinalX, workFinalX, workFinalX] : ["-50%", workFinalX, workFinalX]);
  const workY = useTransform(workProgress, [0, 0.75, 1], reduceMotion ? [workFinalY, workFinalY, workFinalY] : ["-50%", workFinalY, workFinalY]);
  const workSingleOpacity = useTransform(workProgress, progress => reduceMotion ? 1 : Math.max(0, Math.min(1, (progress - 0.58) / 0.17)));
  const workStackOpacity = useTransform(workSingleOpacity, opacity => 1 - opacity);
  const panelScaleX = useTransform(projectProgress, [0, 0.18, 0.6, 1], reduceMotion ? [1, 1, 1, 1] : [0.72, 0.86, 1, 1]);
  const panelScaleY = useTransform(projectProgress, [0, 0.18, 0.63, 1], reduceMotion ? [1, 1, 1, 1] : [0.23, 0.42, 1, 1]);
  const projectEndScale = compactViewport ? 0.62 : 0.34;
  const projectTitleScale = useTransform(projectProgress, [0, 0.46, 0.86, 1], reduceMotion ? [projectEndScale, projectEndScale, projectEndScale, projectEndScale] : [0.49, 1, projectEndScale, projectEndScale]);
  const projectTitleLeft = useTransform(projectProgress, [0, 0.52, 0.86], reduceMotion ? ["0%", "0%", "0%"] : ["50%", "50%", "0%"]);
  const projectTitleTop = useTransform(projectProgress, [0, 0.52, 0.86], reduceMotion ? [chapterFinalTop, chapterFinalTop, chapterFinalTop] : ["50%", "50%", chapterFinalTop]);
  const projectFinalX = `${-50 + projectEndScale * 50}%`;
  const projectFinalY = `${-50 + projectEndScale * 50}%`;
  const projectTitleX = useTransform(projectProgress, [0, 0.52, 0.86], reduceMotion ? [projectFinalX, projectFinalX, projectFinalX] : ["-50%", "-50%", projectFinalX]);
  const projectTitleY = useTransform(projectProgress, [0, 0.52, 0.86], reduceMotion ? [projectFinalY, projectFinalY, projectFinalY] : ["-50%", "-50%", projectFinalY]);
  const projectSingleOpacity = useTransform(projectProgress, progress => reduceMotion ? 1 : Math.max(0, Math.min(1, (progress - 0.70) / 0.16)));
  const projectStackOpacity = useTransform(projectSingleOpacity, opacity => 1 - opacity);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 740px)");
    const heightMedia = window.matchMedia("(max-height: 799px)");
    const update = () => { setCompactViewport(media.matches); setShortViewport(heightMedia.matches); };
    update();
    media.addEventListener("change", update);
    heightMedia.addEventListener("change", update);
    return () => { media.removeEventListener("change", update); heightMedia.removeEventListener("change", update); };
  }, []);

  useMotionValueEvent(educationProgress, "change", (progress) => {
    if (reduceMotion) return;
    setVisibleEducationLetters(Math.max(0, Math.min(9, Math.floor(progress * 28))));
  });

  useEffect(() => {
    let frame = 0;
    const sections = ["capabilities", "leadership"].map(id => document.getElementById(id));
    const update = () => {
      frame = 0;
      const headerHeight = document.querySelector(".site-header")?.getBoundingClientRect().height ?? 74;
      setReadableHeader(sections.some(section => {
        const bounds = section?.getBoundingClientRect();
        return !!bounds && bounds.top < headerHeight && bounds.bottom > 0;
      }));
    };
    const schedule = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, []);

  useEffect(() => {
    if (!cvOpen && !activeProject && !activePortfolio && !activeStrength && !activeSchool && !activeEvidence && !activeDocument && !ventureAwardsOpen && !recognitionArchiveOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previousOverflow; };
  }, [cvOpen, activeProject, activePortfolio, activeStrength, activeSchool, activeEvidence, activeDocument, ventureAwardsOpen, recognitionArchiveOpen]);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") { if (activeEvidence) { setActiveEvidence(null); return; } if (activeDocument) { setActiveDocument(null); return; } if (ventureAwardsOpen) { setVentureAwardsOpen(false); return; } if (recognitionArchiveOpen) { setRecognitionArchiveOpen(false); return; } setActiveSchool(null); setCvOpen(false); setActiveProject(null); setActivePortfolio(null); setActiveStrength(null); setMenuOpen(false); }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeEvidence, activeDocument, ventureAwardsOpen, recognitionArchiveOpen]);

  useEffect(() => {
    if (!cvOpen && !activeProject && !activePortfolio && !activeStrength && !activeSchool && !activeEvidence && !activeDocument && !ventureAwardsOpen && !recognitionArchiveOpen) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const dialogId = activeEvidence ? "evidence-modal-title" : activeDocument ? "project-document-title" : ventureAwardsOpen ? "venture-awards-title" : recognitionArchiveOpen ? "recognition-archive-title" : activeSchool ? "education-modal-title" : activeProject ? "project-modal-title" : activeStrength ? "strength-modal-title" : activePortfolio ? "portfolio-modal-title" : "cv-title";
    const timer = window.setTimeout(() => {
      document.querySelector<HTMLElement>(`[aria-labelledby="${dialogId}"]`)?.querySelector<HTMLElement>("button, a[href]")?.focus();
    }, 100);
    function trapFocus(event: KeyboardEvent) {
      if (event.key !== "Tab") return;
      const dialog = document.querySelector<HTMLElement>(`[aria-labelledby="${dialogId}"]`);
      if (!dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>('button:not([disabled]), a[href], input:not([disabled]), select, summary, [tabindex="0"]'));
      const first = controls[0], last = controls[controls.length - 1];
      if (!first) return;
      if (!dialog.contains(document.activeElement) || (!event.shiftKey && document.activeElement === last)) { event.preventDefault(); first.focus(); }
      else if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    }
    window.addEventListener("keydown", trapFocus);
    return () => { window.clearTimeout(timer); window.removeEventListener("keydown", trapFocus); if (previouslyFocused?.isConnected) previouslyFocused.focus({ preventScroll: true }); };
  }, [cvOpen, activeProject, activePortfolio, activeStrength, activeSchool, activeEvidence, activeDocument, ventureAwardsOpen, recognitionArchiveOpen]);

  function navigateTo(event: React.MouseEvent<HTMLAnchorElement>, href: string) {
    if (href !== "#education") { setMenuOpen(false); return; }
    event.preventDefault();
    setMenuOpen(false);
    setVisibleEducationLetters(9);
    const section = educationRef.current;
    if (!section) return;
    history.pushState(null, "", href);
    const stage = section.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: compactViewport ? stage : stage + (section.offsetHeight - window.innerHeight) * 0.82, behavior: reduceMotion ? "instant" : "smooth" });
  }

  useEffect(() => {
    function landAtEducation() {
      const section = educationRef.current;
      if (window.location.hash !== "#education" || !section || window.matchMedia("(max-width: 740px)").matches) return;
      setVisibleEducationLetters(9);
      window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY + (section.offsetHeight - window.innerHeight) * 0.82, behavior: "instant" });
    }
    // Let the framework finish its initial native fragment scroll first.
    const timer = window.setTimeout(landAtEducation, 350);
    window.addEventListener("hashchange", landAtEducation);
    return () => { window.clearTimeout(timer); window.removeEventListener("hashchange", landAtEducation); };
  }, []);

  return <main onContextMenu={event => { if (event.target instanceof Element && event.target.closest("img, video")) event.preventDefault(); }} onDragStartCapture={event => { if (event.target instanceof Element && event.target.closest("img, video")) event.preventDefault(); }}>
    <header className={`site-header${readableHeader ? " readable-header" : ""}`}>
      <a className="brand" href="#top" aria-label="TAN Can, back to top">TAN CAN<span>.</span></a>
      <nav className="desktop-nav" aria-label="Main navigation">{nav.map(item => <a href={item.href} key={item.label} onClick={event => navigateTo(event, item.href)}>{item.label}</a>)}</nav>
      <a className="header-contact" href="mailto:tancan872@gmail.com">Get in touch <ArrowUpRight size={16} /></a>
      <button type="button" className="menu-toggle" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</button>
    </header>
    <AnimatePresence>{menuOpen && <motion.nav className="mobile-nav" aria-label="Mobile navigation" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}>{nav.map(item => <a href={item.href} key={item.label} onClick={event => navigateTo(event, item.href)}>{item.label}<ArrowUpRight size={16} /></a>)}</motion.nav>}</AnimatePresence>

    <section className="hero" id="top">
      <div className="hero-main section-wrap">
        <motion.div className="hero-avatar" initial={false} whileHover={reduceMotion ? undefined : { scale: 1.055 }} whileTap={reduceMotion ? undefined : { scale: 1.04 }} transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}><img src="/portrait.webp" alt="Portrait of TAN Can" fetchPriority="high" /></motion.div>
        <div className="hero-copy"><motion.p className="hero-name">TAN CAN</motion.p><motion.h1><span>Navigating the intersection of</span><span>data, finance, and technology</span><span>to solve complex problems.</span></motion.h1></div>
      </div>
      <div className="hero-bottom section-wrap"><div className="hero-contact"><a href="mailto:tancan872@gmail.com"><Mail size={16} strokeWidth={1.7} aria-hidden="true" />tancan872@gmail.com</a><a href="tel:+8613527224093"><Phone size={16} strokeWidth={1.7} aria-hidden="true" />+86 135 27224093</a><div><a href="https://scholar.google.com/citations?view_op=list_works&hl=zh-CN&user=nFn48qkAAAAJ" target="_blank" rel="noreferrer">Google Scholar <ArrowUpRight size={13} /></a><a href="https://orcid.org/0009-0008-6053-2371" target="_blank" rel="noreferrer">ORCID <ArrowUpRight size={13} /></a></div></div><div className="hero-actions"><a className="scroll-link" href="#about">Scroll to explore <ArrowDown size={18} /></a><button type="button" className="cv-trigger" onClick={() => setCvOpen(true)}>Access CV Hub <ArrowUpRight size={21} /></button></div></div>
    </section>

    <section className="about dark-section" id="about"><div className="section-wrap">
      <div className="section-kicker">ABOUT ME</div>
      <Reveal><h2 className="about-title">Grounded in analytical rigor. Driven by real-world impact.</h2></Reveal>
      <div className="about-layout">
        <Reveal className="about-photo"><img src="/portrait.webp" alt="TAN Can in professional portrait" loading="lazy" /></Reveal>
        <div className="about-story"><Reveal className="about-intro">
          <p>I am currently pursuing a Master&apos;s degree in Applied Economics at Shandong University, where I was admitted through the recommendation-based postgraduate admission track after ranking first across my undergraduate school.</p>
          <p>I am deeply interested in the intersection of finance, economics, machine learning, and cutting-edge AI applications. For me, curiosity is the starting point of exploration, while a solid theoretical foundation supports both problem-solving and execution.</p>
          <p>Keen insight and decisive action are what ultimately bring ideas into practice. I believe real progress comes from staying grounded and persistent, and from turning rigorous interdisciplinary thinking into practical solutions. My goal is to apply this approach to complex real-world problems and make sure that ideas lead to meaningful and tangible results.</p>
        </Reveal></div>
      </div>
      <div className="strengths"><div className="strengths-intro"><span className="section-kicker">HOW I WORK</span><p>Three strengths that guide the way I approach research, execution and collaboration.</p></div><div className="strength-grid">{strengths.map(item => <button type="button" className="strength-card" key={item.number} onClick={() => setActiveStrength(item)} aria-label={`Read more about ${item.title}`}><span>{item.number} / 03</span><h3>{item.titleLines.map(line => <span key={line}>{line}</span>)}</h3><p><HighlightedText text={item.short} /></p><span className="strength-action">Read more <ArrowUpRight size={17} /></span></button>)}</div></div>
    </div></section>

    <section className="education light-section" id="education" ref={educationRef}>
      <div className="education-sticky"><div className="education-scene section-wrap">
        <motion.h2 className="education-backdrop" style={{ top: eduTitleTop, scale: eduTitleScale, left: eduTitleLeft, x: eduTitleX }} aria-label="Education">{"EDUCATION".split("").map((letter, index) => <span className={index < visibleEducationLetters || reduceMotion ? "education-letter is-visible" : "education-letter"} aria-hidden="true" key={index}>{letter}</span>)}</motion.h2>
        <div className="education-cards">
          {schools.map((school, index) => <motion.article className={`edu-card ${index === 0 ? "edu-main" : "edu-undergrad"}`} key={school.id} style={{ y: index === 0 ? eduCardOneY : eduCardTwoY }}>
            <div className="edu-card-head"><img className={`edu-school-logo ${index === 0 ? "sdu-logo" : "gou-logo"}`} src={school.logo} alt={`${school.name} emblem`} loading="lazy" /><span>{school.period}</span></div>
            <div className="edu-card-copy"><p className="edu-school-type">{school.type}</p><h3>{school.nameLines.map(line => <span key={line}>{line}</span>)}</h3></div>
            <p className="edu-degree">{school.degree}{school.discipline && ` · ${school.discipline}`}</p>
            <div className="edu-metrics"><span><small>GPA</small><strong>{school.gpa}</strong></span><span><small>RANK</small><strong>{school.rank}</strong></span></div>
            <div className="edu-recognition">{school.admission && <p className="edu-admission">{school.admission}</p>}<ul className="edu-achievements">{school.honors.map(honor => <li key={honor}>{honor}</li>)}</ul></div>
            <button type="button" className="edu-details-trigger" onClick={() => setActiveSchool(school)}>Courses & academic details <ArrowUpRight size={16} /></button>
          </motion.article>)}
        </div>
      </div></div>
    </section>

    <section className="experience dark-section" id="experience"><div className="work-intro" ref={workRef}><div className="work-sticky"><div className="section-wrap"><motion.h2 aria-label="WORK EXPERIENCE" style={{ scale: workScale, x: workX, y: workY, left: workLeft, top: workTop }}><motion.span className="chapter-title-stacked" aria-hidden="true" style={{ opacity: workStackOpacity }}>WORK<br />EXPERIENCE</motion.span><motion.span className="chapter-title-single" aria-hidden="true" style={{ opacity: workSingleOpacity }}>WORK EXPERIENCE</motion.span></motion.h2></div></div></div><div className="section-wrap experience-content"><div className="experience-list">{experiences.map((item, index) => <div className={"experience-item " + (activeExperience === index ? "is-active" : "")} key={item.company} onMouseEnter={() => setActiveExperience(index)} onMouseLeave={() => setActiveExperience(null)}><button type="button" aria-expanded={activeExperience === index} onClick={() => setActiveExperience(activeExperience === index ? null : index)}><span className="experience-period">{item.period}</span><span className="experience-company">{item.company}<small>{item.location}</small></span><span className="experience-role">{item.role}</span>{activeExperience === index ? <Minus size={19} /> : <Plus size={19} />}</button><AnimatePresence initial={false}>{activeExperience === index && <motion.div className="experience-detail" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}><div className="experience-detail-inner"><div className="experience-stat"><strong>{item.number}</strong><span>{item.metric}</span></div><ul>{item.details.map(detail => <li key={detail}>{detail}</li>)}</ul></div></motion.div>}</AnimatePresence></div>)}</div></div></section>

    <section className="projects" id="projects"><div className="project-transition" ref={projectRef}><div className="project-sticky"><motion.div className="project-panel" aria-hidden="true" style={{ scaleX: panelScaleX, scaleY: panelScaleY }} /><div className="chapter-title-frame section-wrap"><motion.h2 className="project-transition-title" aria-label="PROJECT EXPERIENCE" style={{ scale: projectTitleScale, left: projectTitleLeft, top: projectTitleTop, x: projectTitleX, y: projectTitleY }}><motion.span className="chapter-title-stacked" aria-hidden="true" style={{ opacity: projectStackOpacity }}>PROJECT<br />EXPERIENCE</motion.span><motion.span className="chapter-title-single" aria-hidden="true" style={{ opacity: projectSingleOpacity }}>PROJECT EXPERIENCE</motion.span></motion.h2></div></div></div><div className="project-content"><div className="section-wrap"><div className="project-list">{projects.map((item, index) => <button type="button" className={`project-row${item.id === "modeling" ? " modeling-project-row" : ""}`} key={item.title} onClick={() => setActiveProject(item)}><span className="project-number">{String(index + 1).padStart(2, "0")}</span><span className="project-main"><small>{item.eyebrow}</small><strong>{item.title}</strong>{item.id === "modeling" && <span className="modeling-row-summary">{item.result}<em>Frame → Model → Validate → Interpret → Deliver</em></span>}</span><span className="project-role">{item.id === "modeling" ? <>Explore Portfolio <small>Predictive Analytics · Machine Learning · Decision Modeling</small></> : item.role}</span><ArrowUpRight size={23} /></button>)}</div></div></div></section>

    <Capabilities onViewEvidence={setActiveEvidence} />
    <Leadership onViewEvidence={setActiveEvidence} onViewDocument={setActiveDocument} />
    <ManualPortfolio publications={portfolio.filter(item => item.kind === "paper")} onPublication={id => setActivePortfolio(portfolioItems.find(item => item.id === id)!)} onViewEvidence={setActiveEvidence} onOpenArchive={() => setRecognitionArchiveOpen(true)} />

    <footer className="footer dark-section"><div className="section-wrap"><div className="section-kicker">CONTACT</div><a className="footer-email" href="mailto:tancan872@gmail.com">Let&apos;s connect <ArrowUpRight /></a><div className="footer-bottom"><span>TAN CAN · RESEARCH / FINANCE / AI</span><div><a href="mailto:tancan872@gmail.com">Email</a><a href="https://scholar.google.com/citations?view_op=list_works&hl=zh-CN&user=nFn48qkAAAAJ" target="_blank" rel="noreferrer">Google Scholar</a><a href="https://orcid.org/0009-0008-6053-2371" target="_blank" rel="noreferrer">ORCID</a><a href="#top">Back to top ↑</a></div></div></div></footer>

    <AnimatePresence>{activeSchool && !activeEvidence && <motion.div key="school" className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setActiveSchool(null)}><motion.div className="modal education-modal" role="dialog" aria-modal="true" aria-labelledby="education-modal-title" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onMouseDown={event => event.stopPropagation()}>
      <div className="modal-head"><span>EDUCATION · {activeSchool.period}</span><button type="button" onClick={() => setActiveSchool(null)} aria-label="Close education detail"><X size={21} /></button></div>
      <h2 id="education-modal-title">{activeSchool.name}</h2><p className="modal-role">{activeSchool.type}</p><p className="modal-summary">{activeSchool.degree}{activeSchool.discipline && ` · ${activeSchool.discipline}`}<br /><strong>GPA {activeSchool.gpa} · Rank {activeSchool.rank}</strong></p>
      {activeSchool.admission && <p className="education-modal-admission">{activeSchool.admission}</p>}
      <div className="education-detail-section"><h3>MAJOR COURSES</h3><ul className="course-list">{activeSchool.courses.map(([course, score]) => <li key={course}><span>{course}</span><strong>{score}</strong></li>)}</ul></div>
      <div className="education-detail-section"><h3>SELECTED HONORS</h3><ul className="honor-list">{activeSchool.honors.map(honor => <li key={honor}>{honor}</li>)}</ul></div>
      {activeSchool.id === "guangdong" && <div className="evidence-grid">{[
        { title: "First-Rank Academic Record", subtitle: "Undergraduate academic ranking", image: "/evidence/school-rank-proof.webp" },
        { title: "National Scholarship", subtitle: "Undergraduate academic recognition", image: "/evidence/national-scholarship.webp" },
      ].map(item => <button type="button" className="evidence-card" key={item.image} onClick={() => setActiveEvidence(item)}><div className="evidence-preview"><img src={item.image} alt={item.title} loading="lazy" /></div><div><strong>{item.title}</strong><small>{item.subtitle}</small></div><ArrowUpRight size={17} /></button>)}</div>}

    </motion.div></motion.div>}{cvOpen && <motion.div key="cv" inert={!!activeDocument} aria-hidden={!!activeDocument || undefined} className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setCvOpen(false)}><motion.div className="modal" role="dialog" aria-modal="true" aria-labelledby="cv-title" initial={{ opacity: 0, y: 28, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 20 }} transition={{ duration: 0.35 }} onMouseDown={event => event.stopPropagation()}><div className="modal-head"><span>CV HUB</span><button type="button" onClick={() => setCvOpen(false)} aria-label="Close CV Hub"><X size={21} /></button></div><h2 id="cv-title">Choose a CV.</h2><p className="modal-intro">Two CVs for academic opportunities and professional roles.</p><div className="cv-options">{cvPaths.map((path, index) => <button type="button" key={path.name} onClick={() => setActiveDocument(path.document)} aria-label={`View ${path.name}`}><span>0{index + 1}</span><span><strong>{path.name}</strong><small>{path.description}</small></span><ArrowUpRight size={19} /></button>)}</div></motion.div></motion.div>}{activeProject && (!activeEvidence || activeProject.id === "venture" || activeProject.id === "consumer" || activeProject.id === "modeling" || activeProject.id === "citrus" || activeProject.id === "neural-dynamics" || activeProject.id === "research-development" || activeProject.id === "planting" || activeProject.id === "applied-innovation") && <motion.div key="project" inert={!!activeEvidence || !!activeDocument || ventureAwardsOpen} aria-hidden={!!activeEvidence || !!activeDocument || ventureAwardsOpen || undefined} className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setActiveProject(null)}><motion.div className={`modal project-modal${activeProject.id === "venture" ? " venture-modal" : activeProject.id === "consumer" ? " consumer-modal" : activeProject.id === "modeling" ? " modeling-modal consumer-modal" : activeProject.id === "citrus" ? " citrus-modal consumer-modal" : activeProject.id === "neural-dynamics" ? " neural-modal consumer-modal" : activeProject.id === "research-development" ? " research-modal consumer-modal" : activeProject.id === "planting" ? " seedling-modal consumer-modal" : activeProject.id === "applied-innovation" ? " applied-modal consumer-modal" : ""}`} role="dialog" aria-modal={!activeEvidence && !activeDocument && !ventureAwardsOpen} aria-labelledby="project-modal-title" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onMouseDown={event => event.stopPropagation()}>
      <div className="modal-head"><span>{activeProject.eyebrow}</span><button type="button" onClick={() => setActiveProject(null)} aria-label="Close project detail"><X size={21} /></button></div>
      {activeProject.id !== "citrus" && activeProject.id !== "neural-dynamics" && activeProject.id !== "research-development" && activeProject.id !== "planting" && activeProject.id !== "applied-innovation" && <><h2 id="project-modal-title">{activeProject.id === "modeling" ? <><span>Empirical Modeling Across</span><span>Complex <span className="modeling-title-word">Real-World</span> Scenarios</span></> : activeProject.title}</h2>{activeProject.id !== "consumer" && <p className="modal-role">{activeProject.role}</p>}<p className="modal-summary">{activeProject.id === "modeling" ? <FlowText text={activeProject.summary}/> : activeProject.summary}</p></>}
      {activeProject.id === "venture" ? <VentureCaseStudy project={activeProject} onViewEvidence={setActiveEvidence} onViewAwards={() => setVentureAwardsOpen(true)} /> : activeProject.id === "consumer" ? <ConsumerCaseStudy project={activeProject} onViewEvidence={setActiveEvidence} onViewDocument={setActiveDocument} /> : activeProject.id === "modeling" ? <ModelingCaseStudy onViewEvidence={setActiveEvidence} onViewDocument={setActiveDocument} /> : activeProject.id === "citrus" ? <CitrusCaseStudy project={activeProject} onViewEvidence={setActiveEvidence} onViewDocument={setActiveDocument} /> : activeProject.id === "neural-dynamics" ? <NeuralCaseStudy project={activeProject} onViewEvidence={setActiveEvidence} onViewDocument={setActiveDocument} /> : activeProject.id === "research-development" ? <ResearchDevelopment project={activeProject} onViewEvidence={setActiveEvidence} /> : activeProject.id === "planting" ? <SeedlingCaseStudy project={activeProject} onViewEvidence={setActiveEvidence} onViewDocument={setActiveDocument} /> : activeProject.id === "applied-innovation" ? <AppliedInnovation project={activeProject} onViewEvidence={setActiveEvidence} onViewDocument={setActiveDocument} /> : <>
      <div className="project-facts"><div><span>OUTCOME</span><p><JournalOutcome text={activeProject.result} journal={activeProject.journal} /></p></div><div><span>METHODS</span><p>{activeProject.methods}</p></div></div>
      <div className="project-contribution"><span>MY CONTRIBUTION</span><ul>{activeProject.contributions.map(item => <li key={item.title}><strong>{item.title}:</strong> {item.text}</li>)}</ul></div>
      <div className="attachments"><span>PROJECT MATERIALS</span>
        {activeProject.evidence.length > 0 && <div className="evidence-grid">{activeProject.evidence.map(item => <button type="button" className="evidence-card" key={item.image} onClick={() => setActiveEvidence(item)}><div className="evidence-preview"><img src={item.image} alt={item.title} loading="lazy" /></div><div><strong>{item.title}</strong><small>{item.subtitle}</small></div><ArrowUpRight size={17} /></button>)}</div>}
        {activeProject.paper && <a className="material-action" href={activeProject.paper} download><div><strong>Download Full Paper (PDF)</strong><small>Access the complete research article.</small></div><Download size={20} /></a>}
        <a className="material-action request-paper" href={`mailto:tancan872@gmail.com?subject=${encodeURIComponent("Request supplementary materials — " + activeProject.title)}&body=${encodeURIComponent("Dear TAN Can,\n\nI would like to request " + (activeProject.confidential ? "a confidential copy or supplementary datasets" : "supplementary materials, datasets or methodology scripts") + " for your project: " + activeProject.title + ".\n\nName:\nAffiliation:\nPurpose of request:\n\nThank you.")}`}><div><strong>Request Supplementary Materials ↗</strong><small>{activeProject.confidential ? "The full paper is currently under peer review. Please reach out via email to request a confidential copy or supplementary datasets." : "Reach out via email for datasets, methodology scripts, or further project details."}</small></div><Mail size={20} /></a>
      </div>
      </>}
    </motion.div></motion.div>}{activeStrength && <motion.div key="strength" className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setActiveStrength(null)}><motion.div className="modal strength-modal" role="dialog" aria-modal="true" aria-labelledby="strength-modal-title" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onMouseDown={event => event.stopPropagation()}><div className="modal-head"><span>{activeStrength.number} / HOW I WORK</span><button type="button" onClick={() => setActiveStrength(null)} aria-label="Close strength detail"><X size={21} /></button></div><h2 id="strength-modal-title">{activeStrength.title}</h2><div className="strength-modal-copy">{activeStrength.detail.map(paragraph => <p key={paragraph}><HighlightedText text={paragraph} /></p>)}</div></motion.div></motion.div>}{activePortfolio && !activeEvidence && <motion.div key="portfolio" className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setActivePortfolio(null)}><motion.div className="modal portfolio-modal" role="dialog" aria-modal="true" aria-labelledby="portfolio-modal-title" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onMouseDown={event => event.stopPropagation()}><div className="modal-head"><span>{activePortfolio.tag}</span><button type="button" onClick={() => setActivePortfolio(null)} aria-label="Close portfolio detail"><X size={21} /></button></div><div className={"portfolio-art portfolio-" + activePortfolio.kind}><PortfolioArt kind={activePortfolio.kind} image={activePortfolio.image} /></div><h2 id="portfolio-modal-title">{activePortfolio.title}</h2><p className="modal-summary">{activePortfolio.detail}</p>{activePortfolio.image && <button type="button" className="modal-link" onClick={() => setActiveEvidence({ title: activePortfolio.title, subtitle: activePortfolio.sub, image: activePortfolio.image! })}>View full preview <ArrowUpRight size={17} /></button>}{activePortfolio.href && <a className="modal-link" href={activePortfolio.href} target="_blank" rel="noreferrer">Open published work <ArrowUpRight size={17} /></a>}</motion.div></motion.div>}{ventureAwardsOpen && <motion.div key="venture-awards" className="modal-backdrop venture-awards-backdrop" inert={!!activeEvidence} aria-hidden={!!activeEvidence || undefined} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setVentureAwardsOpen(false)}><motion.div className="modal venture-awards-modal" role="dialog" aria-modal={!activeEvidence} aria-labelledby="venture-awards-title" initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} onMouseDown={event => event.stopPropagation()}><div className="modal-head"><span>AWARD JOURNEY · 2023–2024</span><button type="button" onClick={() => setVentureAwardsOpen(false)} aria-label="Close award gallery"><X size={21} /></button></div><h2 id="venture-awards-title">All project awards</h2><VentureAwards onViewEvidence={setActiveEvidence} /></motion.div></motion.div>}{recognitionArchiveOpen && <motion.div key="recognition-archive" className="modal-backdrop recognition-archive-backdrop" inert={!!activeEvidence} aria-hidden={!!activeEvidence || undefined} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setRecognitionArchiveOpen(false)}><RecognitionArchive onClose={() => setRecognitionArchiveOpen(false)} onViewEvidence={setActiveEvidence} /></motion.div>}{activeEvidence && <motion.div key="evidence" className="modal-backdrop evidence-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={() => setActiveEvidence(null)}><motion.div className="modal evidence-modal" role="dialog" aria-modal="true" aria-labelledby="evidence-modal-title" initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} onMouseDown={event => event.stopPropagation()}><div className="modal-head"><span id="evidence-modal-title">{activeEvidence.title}</span><button type="button" onClick={() => setActiveEvidence(null)} aria-label="Close evidence preview"><X size={21} /></button></div><img src={activeEvidence.image} alt={activeEvidence.title} /><p>{activeEvidence.subtitle}</p></motion.div></motion.div>}{activeDocument && <ResearchDocumentViewer key={activeDocument.id} document={activeDocument} onClose={() => setActiveDocument(null)} />}</AnimatePresence>
  </main>;
}
