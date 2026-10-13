"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Plus } from "lucide-react";
import useEmblaCarousel from "embla-carousel-react";
import { motion, useAnimationControls, useInView, useReducedMotion, useScroll } from "framer-motion";
import type { Evidence } from "./project-content";
import { recognitions } from "./recognition-content";
import type { ResearchDocument } from "./research-document-viewer";
import { materialRequest } from "./material-access";

const photo = (name: string) => `/leadership/${name}.webp`;
const systems = [
  { name: "Listen", title: "Listen before designing", text: "I use student-needs research to shape employment support, academic services, campus proposals and freshman support.", activities: ["Student feedback", "Demand analysis", "Service priorities"] },
  { name: "Design", title: "Turn needs into programmes", text: "I connect academic support with practical formats: AI-enabled research activities, literature-reading challenges and continuing peer learning.", activities: ["AI for Research", "Literature Sprint", "Peer learning"] },
  { name: "Mobilize", title: "Bring people and resources together", text: "I work across outreach, member selection, interviews and onboarding, linking role fit with responsibility and programme delivery.", activities: ["Freshman outreach", "Interviews & onboarding", "Department coordination"] },
  { name: "Institutionalize", title: "Make good work repeatable", text: "I focus on clear ownership, documented processes, post-event review and reusable resource archives so the work can continue beyond one organiser.", activities: ["Clear ownership", "Post-event review", "Reusable archives"] },
];
type PhotoItem = { name: string; title: string; caption: string; image?: string };
const classPhotos: PhotoItem[] = [
  { name: "class-study-habits", title: "Building Effective Study Habits", caption: "Financial Management Class 1213 · Study-habit class meeting" },
  { name: "class-wellbeing", title: "Student Wellbeing & Peer Support", caption: "Financial Management Class 1213 · Wellbeing and peer exchange" },
  { name: "class-safety", title: "Campus Safety & Fraud Awareness", caption: "Financial Management Class 1213 · Safety and fraud-awareness meeting" },
  { name: "class-team-building", title: "Community Building", caption: "Financial Management Class 1213 · Outdoor team-building activity" },
  { name: "class-community-service", title: "Community Service in Practice", caption: "Financial Management Class 1213 · Campus-cleaning activity" },
  { name: "class-themed-meeting", title: "Themed Class & Youth League Activities", caption: "Financial Management Class 1213 · Joint class and Youth League meeting" },
  { name: "class-youth-league", title: "Youth League Engagement", caption: "Financial Management Class 1213 · Youth League activity" },
  { name: "class-group-discussion", title: "Class Discussion & Coordination", caption: "Financial Management Class 1213 · Themed education and class exchange" },
];
const classContributions = [
  ["COORDINATION", "Class Governance & Faculty Liaison", "Coordinated class committee responsibilities, communicated faculty instructions promptly, organised meetings and followed up on administrative and academic tasks to maintain efficient class operations."],
  ["ACADEMIC CULTURE", "Learning Culture & Peer Development", "Encouraged collaborative learning, constructive study habits and active faculty–student engagement, helping cultivate an environment where classmates supported one another's academic progress."],
  ["COMMUNITY", "Community Building & Student Support", "Organised class meetings and collective activities, maintained a dedicated WeChat communication channel and worked with fellow class officers to strengthen cohesion, participation and student wellbeing."],
  ["MENTORSHIP", "Freshman Transition & Peer Mentorship", "Later served as a freshman class assistant, helping incoming students adapt to campus life, navigate academic and administrative questions, and build a supportive class community in coordination with their faculty adviser."],
];
const classPresentation: ResearchDocument = {
  id: "class-excellence-presentation", title: "Class Excellence Presentation", kind: "34-page class presentation · 7 selected previews",
  requestHref: materialRequest("Request for Class Leadership Materials", "I would like to review the Class Excellence Presentation from your undergraduate class leadership experience."),
  excerpts: [1, 6, 25, 26, 28, 29, 31].map(n => ({ image: photo(`class-presentation-${String(n).padStart(3, "0")}`), label: n === 6 ? "Slide 6 · Collective academic outcomes · Aggregate excerpt" : `Original class presentation · Slide ${n}` })),
};

function LeadershipHeading() {
  const heading = useRef<HTMLHeadingElement>(null);
  const inView = useInView(heading, { once: true, margin: "0px 0px -20% 0px" });
  const reduced = useReducedMotion();
  const entrance = useAnimationControls();
  useEffect(() => {
    if (reduced) { entrance.set({ y: 0, opacity: 1 }); return; }
    if (!inView) { entrance.set({ y: "110%", opacity: 0 }); return; }
    entrance.start(index => ({ y: 0, opacity: 1, transition: { duration: .95, delay: index * .08, ease: [.16, 1, .3, 1] } }));
    return () => entrance.stop();
  }, [inView, reduced, entrance]);
  // Default/server text remains visible if motion cannot run.
  return <h2 ref={heading} className="leadership-masked-heading" aria-label="Leadership in practice.">{["Leadership", "in", "practice."].map((word, index) => <span className="leadership-word-mask" key={word} aria-hidden="true"><motion.span initial={false} animate={entrance} custom={index}>{word}</motion.span>{index < 2 && " "}</span>)}</h2>;
}

function ClassFoundation({ onViewEvidence, onViewDocument }: { onViewEvidence: (item: Evidence) => void; onViewDocument: (item: ResearchDocument) => void }) {
  const collective = recognitions.find(record => record.id === "class-collective")!;
  const assistant = recognitions.find(record => record.id === "class-assistant")!;
  return <section className="leadership-foundation" id="leadership-trust" aria-labelledby="class-leadership-title">
    <header className="class-foundation-heading"><span>THE FOUNDATION / 2021–2023</span><h3 id="class-leadership-title">Building a Culture of Learning &amp; Belonging</h3><p className="leadership-role">Class Monitor &amp; Deputy Youth League Secretary · Financial Management Class 1213</p><p className="class-later-role">Later: Freshman Class Assistant · Financial Management Class 1233</p></header>
    <div className="leadership-foundation-facts" aria-label="Collective class outcomes"><span><b>#1</b>Class academic ranking · 2022–23</span><span><b>7/10</b>Top-10 students in overall merit assessment</span><span><b>38</b>Students in the class community</span></div>
    <p className="class-collective-note">Collective outcomes achieved by the class, faculty and class committee.</p>
    <div className="class-foundation-body"><div className="class-foundation-copy"><p className="class-leadership-overview">As Class Monitor and Deputy Youth League Secretary, I took a leading role in coordinating class affairs, aligning responsibilities across the class committee and maintaining timely communication between faculty and students. Beyond day-to-day administration, I actively fostered an academically motivated, collaborative and supportive class culture through study initiatives, themed meetings and community activities.</p><div className="class-contributions" aria-label="Leadership contributions">{classContributions.map(([label, title, text]) => <article key={label}><span>{label}</span><h4>{title}</h4><p>{text}</p></article>)}</div></div>
    <div className="class-gallery"><h4>Class Life in Action</h4><div className="class-main-photos">{classPhotos.slice(0, 2).map(item => <LeadershipPhoto key={item.name} {...item} onViewEvidence={onViewEvidence}/>)}</div><div className="class-supporting-photos">{classPhotos.slice(2, 6).map(item => <LeadershipPhoto key={item.name} {...item} onViewEvidence={onViewEvidence}/>)}</div><details className="class-more-moments"><summary>More Class Moments <ChevronDown size={16}/></summary><div className="class-main-photos">{classPhotos.slice(6).map(item => <LeadershipPhoto key={item.name} {...item} onViewEvidence={onViewEvidence}/>)}</div></details><div className="class-mentorship"><div><h4>Leadership Continued — From Classmates to Freshmen</h4><p className="leadership-role">Freshman Class Assistant · Financial Management Class 1233</p><p>Building on my Class Monitor experience, I helped Class 1233 freshmen adapt to campus life, answered academic and administrative questions, and worked with their faculty adviser to build an inclusive, supportive learning environment.</p></div><button type="button" className="class-assistant-proof" onClick={() => onViewEvidence(assistant)} aria-label="View Outstanding Freshman Class Assistant recognition"><img src={assistant.image} alt="Outstanding Freshman Class Assistant recognition" loading="lazy"/><span>Outstanding Freshman Class Assistant <ArrowUpRight size={14}/></span></button></div></div>
    </div><div className="leadership-foundation-links"><button type="button" className="leadership-link" onClick={() => onViewDocument(classPresentation)}>Class Excellence Presentation <ArrowUpRight size={14}/></button><button type="button" className="leadership-link" onClick={() => onViewEvidence(collective)}>Advanced Class Collective <ArrowUpRight size={14}/></button></div>
  </section>;
}
const undergraduatePhotos: PhotoItem[] = [
  { name: "recruitment-fair", title: "Regional Recruitment Fair", caption: "Employer stands, visitor flow and on-site delivery" },
  { name: "career-competition", title: "Career Planning Competition", caption: "University-wide competition and stage delivery" },
  { name: "hr-judges", title: "Corporate & HR Engagement", caption: "Connecting external judges with the university programme" },
  { name: "employer-engagement", title: "Employer Coordination", caption: "First-hand communication at the recruitment event" },
  { name: "cctv", image: "/venture/cctv.webp", title: "CCTV National Coverage", caption: "The rural-industry practice team featured in national coverage, 2023" },
];
const graduatePhotos: PhotoItem[] = [
  { name: "academic-cohort", title: "Academic Community in Practice", caption: "Faculty, students and organisers at the research-methods salon" },
  { name: "research-frontiers", title: "AI & Research Discussion", caption: "Research-methods exchange across disciplinary perspectives" },
  { name: "academic-roundtable", title: "Faculty–Student Roundtable", caption: "An exchange format built around questions and shared experience" },
  { name: "peer-research-sharing", title: "Peer Research Experience", caption: "Research and competition experience shared with fellow students" },
  { name: "research-methods", title: "Methods & Academic Writing", caption: "A faculty-led session on practical research development" },
];
function LeadershipPhoto({ name, image, title, caption, onViewEvidence }: PhotoItem & { onViewEvidence: (item: Evidence) => void }) {
  const src = image || photo(name);
  return <figure className="leadership-photo"><button type="button" onClick={() => onViewEvidence({ title, subtitle: caption, image: src })} aria-label={`Enlarge ${title}`}><img src={src} alt={title} loading="lazy" /><span className="leadership-photo-context">{caption}</span><ArrowUpRight size={18} /></button><figcaption>{title}</figcaption></figure>;
}
function Tags({ items }: { items: string[] }) { return <div className="leadership-tags">{items.map(item => <span key={item}>{item}</span>)}</div>; }
function MetricCard({ value, label, index }: { value: string; label: string; index: number }) {
  const card = useRef<HTMLDivElement>(null);
  const inView = useInView(card, { once: true, amount: .35 });
  const reduced = useReducedMotion();
  const entrance = useAnimationControls();
  const [display, setDisplay] = useState(value);

  useEffect(() => {
    if (!inView || reduced) {
      setDisplay(value);
      entrance.set({ opacity: 1, y: 0 });
      return;
    }
    // Keep the real value accessible and reserve its final width throughout the count.
    entrance.start({ opacity: [.2, 1], y: [20, 0], transition: { duration: .55, delay: index * .1, ease: [.16, 1, .3, 1] } });
    const parts = value.match(/^([^0-9]*)(\d+(?:\.\d+)?)(.*)$/);
    if (!parts) return;
    const [, prefix, digits, suffix] = parts;
    const target = Number(digits);
    let frame = 0;
    setDisplay(`${prefix}0${suffix}`);
    const timer = window.setTimeout(() => {
      const started = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - started) / 1500, 1);
        const current = target * (1 - (1 - progress) ** 3);
        const number = suffix.startsWith("K") ? current.toFixed(1).replace(/\.0$/, "") : String(Math.round(current));
        setDisplay(progress === 1 ? value : `${prefix}${number}${suffix}`);
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    }, index * 100);
    return () => { window.clearTimeout(timer); cancelAnimationFrame(frame); entrance.stop(); };
  }, [inView, reduced, value, index, entrance]);

  return <motion.div ref={card} initial={false} animate={entrance}>
    <dt><span className="leadership-metric-measure" aria-hidden="true">{value}</span><span className="leadership-metric-ticker" aria-hidden="true">{display}</span><span className="leadership-accessible-value">{value}</span></dt><dd>{label}</dd>
  </motion.div>;
}
function Metrics({ items }: { items: [string, string][] }) { return <dl className="leadership-dashboard">{items.map(([value, label], index) => <MetricCard key={label} value={value} label={label} index={index} />)}</dl>; }

type WorkItem = { title: string; body: ReactNode; tags: string[]; facts?: string; photoIndex: number; link?: ReactNode };
const undergraduateWork: WorkItem[] = [
  { title: "Corporate partnerships & career strategy", body: <><strong>Led</strong> the university Career Planning Competition from proposal to delivery, coordinated engagement with HR professionals from <strong>Coca-Cola and CP Group</strong>, and connected university resources with external support.</>, facts: "¥20K multi-source funding · 1,000+ students reached", tags: ["Corporate Partnerships", "Stakeholder Coordination", "Campus Marketing"], photoIndex: 2 },
  { title: "Regional recruitment operations", body: <><strong>Coordinated</strong> employer communication, presentations and on-site execution across major western Guangdong recruitment events. Structured recruitment information and supported the flow between employers and candidates.</>, facts: "2,000+ recruitment listings / records processed", tags: ["Event Operations", "Resource Logistics", "External Communication"], photoIndex: 0 },
  { title: "Fieldwork leadership & social practice", body: <><strong>Led</strong> a rural-industry practice team linking field research with product development and community engagement. The team was selected as Guangdong’s sole team featured in the programme’s CCTV national coverage.</>, tags: ["Fieldwork Leadership", "Public Impact", "Team Delivery"], photoIndex: 4, link: <a className="leadership-link" href="#projects">Explore the Golden Pomfret project <ArrowUpRight size={14} /></a> },
];
const graduateWork: WorkItem[] = [
  { title: "AI-enabled research & cross-university exchange", body: <><strong>Launched</strong> the AI Empowering Research initiative and coordinated collaboration with <strong>Harbin Institute of Technology</strong>, connecting practical AI tools with research, writing and academic exchange.</>, tags: ["Programme Innovation", "Cross-University Collaboration", "AI Workflows"], photoIndex: 1 },
  { title: "Peer learning & academic support", body: <><strong>Developed</strong> peer-support programmes spanning research initiation, paper writing, competitions and further study. Designed a 15-minute literature-reading challenge and a graduate-to-undergraduate mentoring pathway.</>, tags: ["Peer Mentoring", "Academic Community", "Programme Design"], photoIndex: 3 },
  { title: "Demand-led services & team development", body: <><strong>Analysed</strong> student feedback to shape employment and campus-support programmes. Coordinated across departments and participated in outreach, interviews and onboarding, connecting member selection with clear responsibilities.</>, tags: ["Needs Research", "Team Development", "Service Design"], photoIndex: 2 },
  { title: "From delivery to reusable systems", body: <><strong>Established</strong> a working approach built around clear ownership, documented processes, post-event review and shared resource archives: student needs → services → feedback → improvement.</>, tags: ["Process Design", "Organisational Learning", "Resource Archives"], photoIndex: 4 },
];

function Workbench({ id, items, photos, onViewEvidence }: { id: string; items: WorkItem[]; photos: PhotoItem[]; onViewEvidence: (item: Evidence) => void }) {
  const [open, setOpen] = useState<number | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState(0);
  return <div className="leadership-workbench"><div className="leadership-accordion" onPointerLeave={() => setSelectedPhoto(open === null ? 0 : items[open].photoIndex)}>
    {items.map((item, index) => <section className={`leadership-work-row ${open === index ? "is-open" : ""}`} key={item.title}>
      <h4><button type="button" id={`${id}-work-${index}`} aria-expanded={open === index} aria-controls={`${id}-detail-${index}`} onPointerEnter={event => { if (event.pointerType === "mouse") setSelectedPhoto(item.photoIndex); }} onFocus={() => setSelectedPhoto(item.photoIndex)} onClick={() => { setOpen(open === index ? null : index); setSelectedPhoto(item.photoIndex); }}><span className="leadership-work-index">0{index + 1}</span><span>{item.title}</span><Plus size={18} aria-hidden="true" /></button></h4>
      <div className="leadership-work-drawer" id={`${id}-detail-${index}`} role="region" aria-labelledby={`${id}-work-${index}`} aria-hidden={open !== index} inert={open !== index}><div><div className="leadership-work-copy"><p>{item.body}</p>{item.facts && <p className="leadership-inline-facts">{item.facts}</p>}<Tags items={item.tags} />{item.link}</div></div></div>
    </section>)}
  </div><aside className="leadership-linked-evidence" aria-label="Related activity photographs"><div className="leadership-linked-photo" key={selectedPhoto}><LeadershipPhoto {...photos[selectedPhoto]} onViewEvidence={onViewEvidence} /></div><div className="leadership-photo-picker" aria-label="Select an activity photograph">{photos.map((item, index) => <button type="button" key={item.name} aria-label={`Show ${item.title}`} aria-pressed={selectedPhoto === index} onClick={() => setSelectedPhoto(index)}><img src={item.image || photo(item.name)} alt="" loading="lazy" /><span>{item.title}</span></button>)}</div></aside></div>;
}

function RecognitionCoverFlow({ onViewEvidence }: { onViewEvidence: (item: Evidence) => void }) {
  const records = ["class-leader", "class-collective", "class-assistant", "volunteer-service"].map(id => recognitions.find(record => record.id === id)!);
  const [viewportRef, carousel] = useEmblaCarousel({ align: "center", containScroll: false, loop: false });
  const [selected, setSelected] = useState(0);
  const wheel = useRef({ amount: 0, time: 0 });
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!carousel) return;
    const update = () => setSelected(carousel.selectedScrollSnap());
    update(); carousel.on("select", update); carousel.on("reInit", update);
    const node = carousel.rootNode();
    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return;
      const delta = Math.abs(event.deltaY) >= Math.abs(event.deltaX) ? event.deltaY : event.deltaX;
      if (!delta || (delta > 0 ? !carousel.canScrollNext() : !carousel.canScrollPrev())) return;
      event.preventDefault();
      const now = performance.now();
      if (now - wheel.current.time < 350) return;
      wheel.current.amount += delta;
      if (Math.abs(wheel.current.amount) >= 35) { carousel[delta > 0 ? "scrollNext" : "scrollPrev"](!!reduced); wheel.current = { amount: 0, time: now }; }
    };
    node.addEventListener("wheel", onWheel, { passive: false });
    return () => { carousel.off("select", update); carousel.off("reInit", update); node.removeEventListener("wheel", onWheel); };
  }, [carousel, reduced]);
  return <section className="leadership-coverflow" aria-label="Selected leadership recognition"><div className="leadership-coverflow-heading"><h4>Selected recognition</h4><div><span aria-live="polite">{selected + 1} / {records.length}</span><button type="button" aria-label="Previous leadership credential" disabled={selected === 0} onClick={() => carousel?.scrollPrev(!!reduced)}><ArrowLeft size={17} /></button><button type="button" aria-label="Next leadership credential" disabled={selected === records.length - 1} onClick={() => carousel?.scrollNext(!!reduced)}><ArrowRight size={17} /></button></div></div>
    <div className="leadership-coverflow-viewport" ref={viewportRef} tabIndex={0} onKeyDown={event => { if (event.target !== event.currentTarget) return; if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); carousel?.[event.key === "ArrowRight" ? "scrollNext" : "scrollPrev"](!!reduced); } }} aria-label="Browse credentials with arrow keys or swipe"><div className="leadership-coverflow-track">{records.map((item, index) => <div className={`leadership-credential-slide ${selected === index ? "is-selected" : ""}`} key={item.id}><button type="button" aria-label={`${selected === index ? "View" : "Centre"} ${item.title}`} onClick={() => selected === index ? onViewEvidence(item) : carousel?.scrollTo(index, !!reduced)}><div className="leadership-credential-art"><img src={item.image} alt={item.title} loading="lazy" /></div><span>{item.title}<ArrowUpRight size={15} /></span><small>{selected === index ? "View credential" : "Select credential"}</small></button></div>)}</div></div>
  </section>;
}

export function Leadership({ onViewEvidence, onViewDocument }: { onViewEvidence: (item: Evidence) => void; onViewDocument: (item: ResearchDocument) => void }) {
  const chapter = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: chapter, offset: ["start 15%", "end 90%"] });
  const [system, setSystem] = useState(0);
  const selected = systems[system];
  return <section className="leadership light-section" id="leadership"><div className="section-wrap">
    <div className="leadership-chapter" ref={chapter}>
    <header className="leadership-hero" id="leadership-introduction"><LeadershipHeading/><p>From class-level stewardship to university-wide student governance, I turn shared needs into <strong>programmes, partnerships and organisational systems.</strong></p><div className="leadership-chapter-progress" aria-hidden="true"><motion.span style={{ scaleX: reduced ? 1 : scrollYProgress }} /></div></header>
    <div className="leadership-body"><nav className="leadership-pillar-nav" aria-label="Leadership pillars"><a href="#leadership-programs"><span>2022–2024</span>Institutional scale &amp; public service <ArrowUpRight size={15} /></a><a href="#leadership-systems"><span>2025–Present</span>Strategic governance &amp; academic ecosystems <ArrowUpRight size={15} /></a></nav>

    <ClassFoundation onViewEvidence={onViewEvidence} onViewDocument={onViewDocument}/>

    <article className="leadership-pillar leadership-pillar-programs" id="leadership-programs"><header className="leadership-pillar-layout"><div className="leadership-pillar-overview"><span className="leadership-pillar-label">PILLAR I / UNDERGRADUATE</span><h3>Institutional scale<br />&amp; public service.</h3><p className="leadership-role">Career programme lead · Student Association<br />Guangdong Ocean University · 2022–2024</p></div><Metrics items={[["2", "Regional recruitment fairs"], ["300+", "Enterprise employers coordinated"], ["10K+", "Job seekers at recruitment events"], ["20K+", "Career-campaign media views"]]} /></header>
      <Workbench id="undergraduate" items={undergraduateWork} photos={undergraduatePhotos} onViewEvidence={onViewEvidence} />
    </article>

    <article className="leadership-pillar leadership-pillar-systems" id="leadership-systems"><header className="leadership-pillar-layout"><div className="leadership-pillar-overview"><span className="leadership-pillar-label">PILLAR II / POSTGRADUATE</span><h3>Strategic governance<br />&amp; academic ecosystems.</h3><p className="leadership-role">President · Graduate Student Union<br />Shandong University · 2026–Present</p><div className="leadership-role-path"><span>2025–2026 · Academic Exchange volunteer</span><ArrowDown size={13} /><span>2026–Present · Presidency &amp; department coordination</span></div></div><Metrics items={[["215", "Student-needs survey responses analysed"], ["≈200", "Members in the collective recruitment intake"], ["2", "Academic Exchange & Research / Rights departments"]]} /></header>
      <Workbench id="postgraduate" items={graduateWork} photos={graduatePhotos} onViewEvidence={onViewEvidence} />
      <p className="leadership-series-note">Departmental series documented in the 2025 communiqué: <strong>11 sessions · 17 professors and outstanding postgraduate contributors.</strong></p>

    <div className="leadership-operating-model"><div className="leadership-operating-heading"><h4>How I organise the work</h4><p>Listen → Design → Mobilize → Institutionalize</p></div><div className="leadership-system-tabs" role="tablist" aria-label="Leadership operating model">{systems.map((item, i) => <button type="button" role="tab" id={`leadership-tab-${i}`} aria-selected={system === i} aria-controls="leadership-system-detail" key={item.name} onClick={() => setSystem(i)} onKeyDown={event => { if (["ArrowRight", "ArrowLeft", "Home", "End"].includes(event.key)) { event.preventDefault(); const next = event.key === "Home" ? 0 : event.key === "End" ? 3 : (i + (event.key === "ArrowRight" ? 1 : 3)) % 4; setSystem(next); document.getElementById(`leadership-tab-${next}`)?.focus(); } }} tabIndex={system === i ? 0 : -1}>{item.name}<ArrowRight size={15} /></button>)}</div><div className="leadership-system-detail" id="leadership-system-detail" role="tabpanel" aria-labelledby={`leadership-tab-${system}`}><div><h5>{selected.title}</h5><p>{selected.text}</p></div><ul>{selected.activities.map(item => <li key={item}>{item}</li>)}</ul></div></div>

    <details className="leadership-report"><summary><span>Selected departmental work <small>Academic Exchange &amp; Research / Rights · March 2026 report</small></span><ChevronDown size={18} /></summary><p>Selected pages document collective departmental activities and resources supported through my coordination work.</p><div className="leadership-report-grid">{[{name:"union-report-overview",title:"Departmental Work Overview",caption:"March 2026 work report"},{name:"academic-resources",title:"Faculty Exchange & Academic Resources",caption:"Selected departmental activities"},{name:"peer-learning",title:"Peer Learning & Research Support",caption:"Selected departmental activities"},{name:"rights-programmes",title:"Student Needs & Campus Proposals",caption:"Selected departmental activities"}].map(item => <LeadershipPhoto {...item} key={item.name} onViewEvidence={onViewEvidence} />)}</div></details>
    </article>

    <footer className="leadership-footer"><div><h3>Listen. Build. Leave a system.</h3><p>For me, leadership starts with listening, becomes meaningful through execution, and becomes sustainable when good work can continue after an organiser leaves.</p></div><RecognitionCoverFlow onViewEvidence={onViewEvidence} /></footer>
    </div></div>
  </div></section>;
}
