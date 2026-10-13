export type Contribution = { title: string; text: string };
export type Evidence = { title: string; subtitle: string; image: string };
export type Project = {
  id: string;
  eyebrow: string;
  title: string;
  role: string;
  summary: string;
  result: string;
  journal?: string;
  methods: string;
  contributions: Contribution[];
  evidence: Evidence[];
  paper?: string;
  href?: string;
  confidential?: boolean;
};

export const projects: Project[] = [
  {
    id: "climate", eyebrow: "Published research / 2025",
    title: "Forecasting global temperature with LSTM and ARIMA", role: "First-listed co-first author",
    summary: "Applying deep learning and time-series forecasting to 142 years of climate data, this study decodes the complex interplay between greenhouse emissions, the COVID-19 economic shock, and global temperature trends to inform sustainable policy-making.",
    result: "First Prize, 2022 Asia and Pacific Mathematical Contest in Modeling; subsequently extended into peer-reviewed research and published in PLOS One, 20(9), e0330645",
    journal: "PLOS One", methods: "LSTM · ARIMA · Pearson & Spearman Correlation · Time-Series Forecasting",
    contributions: [
      { title: "Predictive Modeling", text: "Engineered robust forecasting frameworks using LSTM and ARIMA to analyze and predict global temperature dynamics across a 1880–2022 dataset." },
      { title: "Contextual Impact Analysis", text: "Leveraged Pearson and Spearman correlation methods to quantify the relationship between greenhouse gas emissions and climate anomalies, specifically isolating the macroeconomic and ecological impacts of the COVID-19 pandemic." },
      { title: "Strategic Insights", text: "Translated complex quantitative findings into data-driven reference frameworks for ecological environment management and macroeconomic construction policies." },
    ],
    evidence: [{ title: "APMCM First Prize", subtitle: "2022 · Award certificate", image: "/evidence/apmcm-first-prize.webp" }],
    paper: "/papers/climate-forecasting-plos-one.pdf", href: "https://doi.org/10.1371/journal.pone.0330645",
  },
  {
    id: "healthcare", eyebrow: "Published research / 2024",
    title: "Healthcare investment efficiency in China", role: "Third author",
    summary: "Evaluating a decade of national healthcare data to optimize resource allocation and measure the true efficiency of medical inputs versus outcomes.",
    result: "Published in Finance Research Letters, 67, 105688.", journal: "Finance Research Letters",
    methods: "Data Envelopment Analysis (DEA) · Efficiency Evaluation · Longitudinal Data Analysis · Origin",
    contributions: [
      { title: "Metric Framework Construction", text: "Designed a robust input-output evaluation index system to accurately measure and quantify the true efficiency of healthcare resource allocation." },
      { title: "Data Envelopment Analysis", text: "Processed and modeled a 10-year longitudinal dataset (2012–2021) of China's healthcare system using DEA to identify regional efficiency bottlenecks." },
      { title: "Scientific Visualization", text: "Produced publication-ready visual assets using Origin, translating complex efficiency matrices into intuitive charts that directly supported the paper's core arguments." },
    ],
    evidence: [], paper: "/papers/healthcare-investment-frl.pdf", href: "https://doi.org/10.1016/j.frl.2024.105688",
  },
  {
    id: "environmental-tax", eyebrow: "Independent research / 2024—present",
    title: "Environmental tax reform and corporate default risk", role: "Independent researcher",
    summary: "Bridging environmental policy and corporate finance, this progressive research evaluates the impact of China's fee-to-tax reform on corporate default risk, processing a massive panel dataset of 20,000+ firms.",
    result: "Outstanding Undergraduate Thesis (Rank 1st, 96/100); Currently under journal review.",
    methods: "KMV–EDF · Causal Inference · DID / DDD · PSM-DID · DDML · Stata",
    contributions: [
      { title: "Credit Risk Measurement", text: "Constructed corporate default-risk measures with the KMV–EDF framework and prepared a panel dataset for policy evaluation." },
      { title: "Policy Evaluation", text: "Examined the environmental fee-to-tax reform using DID / DDD, PSM-DID and Double Machine Learning, connecting environmental regulation with corporate financial risk." },
    ],
    evidence: [
      { title: "Research Framework", subtitle: "Policy identification, mechanisms & research workflow", image: "/evidence/environmental-tax/research-framework.webp" },
      { title: "Parallel Trends Test", subtitle: "Figure 1 · Environmental tax reform & corporate default risk", image: "/evidence/environmental-tax/parallel-trends.webp" },
      { title: "Placebo Test", subtitle: "Figure 2 · Randomised treatment assignment", image: "/evidence/environmental-tax/placebo-test.webp" },
      { title: "Covariate Balance", subtitle: "Figure 3 · Matching differences", image: "/evidence/environmental-tax/covariate-balance.webp" },
      { title: "Propensity Score Matching", subtitle: "Figure 4 · Kernel density before & after matching", image: "/evidence/environmental-tax/propensity-score-matching.webp" },
      { title: "Industry Concentration", subtitle: "Figure 5 · Heterogeneity analysis", image: "/evidence/environmental-tax/industry-concentration.webp" },
      { title: "Environmental Information Disclosure", subtitle: "Figure 6 · Heterogeneity by disclosure quality", image: "/evidence/environmental-tax/environmental-disclosure.webp" },
      { title: "Corporate Ownership", subtitle: "Figure 7 · Heterogeneity by ownership type", image: "/evidence/environmental-tax/corporate-ownership.webp" },
    ],
    confidential: true,
  },
  {
    id: "venture", eyebrow: "Core team member · Market strategy & commercialisation / 2022–2024",
    title: "From Aquaculture to Market: Building a Golden Pomfret Value Chain", role: "Core team member · Market strategy & commercialisation",
    summary: "A two-year entrepreneurship venture transforming local golden-pomfret aquaculture into market-ready prepared-food products through field research, product development, commercial partnerships and rural value-chain integration.",
    result: "National Silver Award, China International College Students’ Innovation Competition\nDeveloped through nearly two years of iteration and subsequently recognised across multiple national and provincial entrepreneurship competitions.\nSelected as the only Guangdong team featured in CCTV’s national coverage of the programme.",
    methods: "Market Intelligence · Product Strategy · Commercialisation · Financial Analysis · Partnership Development · Rural Revitalisation",
    contributions: [
      { title: "Market & Industry Intelligence", text: "Conducted 10+ rounds of field research across aquaculture communities, enterprises and industry stakeholders, translating first-hand findings into market positioning, customer insights and value-chain analysis." },
      { title: "Product & Go-to-Market", text: "Developed product SKU concepts and differentiated positioning strategies for golden-pomfret products, translating consumer and channel insights into packaging, product propositions and targeted marketing plans." },
      { title: "Partnerships & Commercialisation", text: "Engaged directly with companies, customers and local cooperatives, supporting commercial negotiations and the signing of purchase agreements while connecting upstream aquaculture production with downstream market demand." },
      { title: "Business & Financial Analysis", text: "Co-developed the business plan and supported financial management and performance analysis, evaluating revenue logic, cost structures and operating indicators throughout successive project iterations." },
    ],
    evidence: [
      { title: "National Silver Award", subtitle: "China International College Students’ Innovation Competition · 2023", image: "/evidence/venture-national-silver.webp" },
      { title: "Challenge Cup Provincial Silver", subtitle: "Prepared seafood venture · 2024", image: "/venture/award-challenge-silver.webp" },
    ],
  },
  {
    id: "consumer", eyebrow: "Consumer Analytics & Market Research · Team Lead · Nov 2022 – Apr 2023",
    title: "Consumer Insights for Recreational Fisheries", role: "Team Lead",
    summary: "Led a five-member market research team to investigate consumer satisfaction in Zhanjiang’s recreational-fisheries sector, combining field research, survey data and online-review analytics to identify experience gaps and translate them into actionable market recommendations.",
    result: "Provincial Second Prize, “CP Cup” Market Survey Competition; 434 valid responses, 105-page research report and 52-slide competition presentation.",
    methods: "Python · Jieba · SO-PMI · SPSS · CiteSpace · ACSI · Fuzzy Evaluation · Importance–Satisfaction Analysis",
    contributions: [
      { title: "Research Leadership", text: "Led a five-member team through research framing, survey design, field research, analytical integration and final delivery." },
      { title: "Survey & Field Research", text: "Helped design an ACSI-informed, multi-level satisfaction questionnaire; coordinated pilot testing and a four-day online/offline survey campaign, including three days of on-site research in Zhanjiang." },
      { title: "Consumer & Text Analytics", text: "Integrated survey findings with Python/Jieba review mining and SO-PMI sentiment analysis to identify recurring consumer needs and pain points." },
      { title: "Statistical Modeling", text: "Applied SPSS-based reliability and validity testing, fuzzy comprehensive evaluation and importance–satisfaction analysis to quantify satisfaction and prioritize improvement areas." },
      { title: "Insight to Strategy", text: "Translated quantitative and qualitative findings into recommendations spanning service experience, industry governance, destination branding and sustainable development." },
    ],
    evidence: [{ title: "Provincial Second Prize", subtitle: "“CP Cup” Market Survey Competition · Guangdong · 2023", image: "/consumer/award.webp" }],
  },
  {
    id: "modeling", eyebrow: "Quantitative Modeling · 2023–2024 Portfolio",
    title: "Empirical Modeling Across Complex Real-World Scenarios", role: "Modeling · Data Analysis · Research Writing",
    summary: "A portfolio of applied modeling projects spanning aviation safety, consumer NLP, social-system early warning and retail optimization. Across these cases, I worked at the intersection of problem framing, data analysis, collaborative modeling, result interpretation and technical writing to turn complex datasets into structured evidence and decision-oriented outputs.",
    result: "Four applied cases across aviation safety, consumer NLP, early-warning systems and retail optimization.",
    methods: "Predictive Analytics · Machine Learning · Decision Modeling",
    contributions: [], evidence: [],
  },
  {
    id: "citrus", eyebrow: "AI PRODUCT & COMMERCIALISATION / 2022–2025",
    title: "AI-Enabled Citrus Psyllid Monitoring & Treatment System", role: "Deputy Project Lead · Head of Business & Commercialisation",
    summary: "A cross-disciplinary agritech venture integrating AI-based pest recognition, IoT-enabled monitoring and heat-treatment hardware into an end-to-end citrus-disease control system, developed through field testing, industry partnerships and commercial modelling.",
    result: "6 competition awards, including First Prize in the Guangdong “Challenge Cup”, alongside 2 utility-model patents, 2 registered software copyrights, and provincial innovation-project recognition.",
    methods: "AI Productisation · Market Intelligence · Financial Modelling · Field Validation · Business Strategy · Commercialisation",
    contributions: [
      { title: "Commercial Strategy", text: "Led market research, business-model design, financial forecasting, SKU strategy and the translation of R&D outputs into product and market plans." },
      { title: "Cross-Functional Execution", text: "Worked with the technical team on intelligent pest detection and early warning, moving the concept from prototype validation to external partnerships." },
    ], evidence: [
      { title: "Internet+ Provincial Bronze", subtitle: "Citrus-pest project · 2023", image: "/evidence/citrus-provincial-bronze.webp" },
      { title: "iCAN Project Recognition", subtitle: "柑橘卫士 · Award certificate", image: "/evidence/citrus-ican.webp" },
      { title: "Pest Classification & Recognition Algorithm", subtitle: "Registered software copyright", image: "/evidence/pest-recognition-software.webp" },
      { title: "Intelligent Pest Detection System", subtitle: "Registered software copyright", image: "/evidence/pest-detection-software.webp" },
    ],
  },
  {
    id: "neural-dynamics", eyebrow: "INTERDISCIPLINARY AI RESEARCH / 2023–2024",
    title: "Neural Dynamics & Intelligent Detection", role: "Research Contributor · Patent Co-Inventor",
    summary: "A cross-disciplinary research journey into neural dynamics and intelligent detection, built around the ability to rapidly understand unfamiliar mathematical frameworks, reconstruct technical workflows, and translate complex results into structured research and intellectual-property outputs.",
    result: "Co-inventor of a granted invention patent: Hyperspectral Image Target Detection Method, ZL202410627687.5.",
    methods: "Adaptive Gradient Neural Dynamics · Dynamic Tensor Inversion · High-Dimensional Computation · Patent Documentation",
    contributions: [
      { title: "Research Support", text: "Contributed literature review, mathematical-method screening, data sourcing, figure preparation, research synthesis and manuscript drafting support to the ACGND research stream." },
      { title: "Technical Translation", text: "Built the ability to understand unfamiliar computational methods, reproduce core workflows and translate research outputs into structured writing and patent documentation." },
    ], evidence: [{ title: "Granted Invention Patent", subtitle: "Hyperspectral Image Target Detection Method · Co-inventor", image: "/evidence/hyperspectral-patent.webp" }],
  },
  {
    id: "research-development", eyebrow: "Selected Manuscripts / 2022–Present",
    title: "Research Development", role: "First Author · Co-First Author",
    summary: "This portfolio reflects a cumulative research journey rather than a shift in focus. My early bibliometric work established a rigorous foundation in literature review, evidence synthesis and academic writing; system-dynamics research with my undergraduate supervisor marked my transition into formal empirical modelling; and my current work in environmental finance builds on both foundations through increasingly rigorous causal identification and independent research design.",
    result: "3 selected manuscripts · 2 first-author papers · 1 co-first-author paper · Prior Core/CSSCI peer-review milestones · Current submission to Ecological Economics.",
    methods: "Literature Synthesis · System Dynamics · Causal Identification · Environmental Finance",
    contributions: [], evidence: [], confidential: true,
  },
  {
    id: "planting", eyebrow: "Agritech Product & Business Operations / 2023–2025",
    title: "Intelligent Automated Seedling Cultivation System", role: "Early-Stage Project Coordinator · Business & Finance Lead",
    summary: "An interdisciplinary agritech innovation project integrating automated multi-tier seedling equipment, intelligent crop monitoring and data-driven cultivation management. My involvement centred on business planning, financial management and cross-functional coordination, supporting the project from early-stage development through practical implementation.",
    result: "National First Prize in the 9th Swan Cup; National Bronze Award in the 2024 China International College Students’ Innovation Competition; documented commercial partnerships.",
    methods: "Business Strategy · Financial Modelling · OKR-Based Coordination · Operations Management · B2B Commercialisation",
    contributions: [], evidence: [],
  },
  {
    id: "applied-innovation", eyebrow: "Selected Innovations & IP / 2022–2024",
    title: "Applied Innovation & Intellectual Property", role: "Product Concepts · Digital Collaboration · Social Innovation",
    summary: "Three selected cases spanning financial workflow innovation, digital product development and inclusive sports. Together, they reflect my experience in identifying practical needs, shaping product concepts and collaborating across disciplines to develop tangible solutions.",
    result: "3 innovation cases · 2 registered software copyrights · 1 granted utility-model patent.",
    methods: "Problem Sensing · Product Planning · Cross-Disciplinary Collaboration · Intellectual Property",
    contributions: [], evidence: [],
  },

];

export const schools = [
  {
    id: "shandong", name: "Shandong University", nameLines: ["Shandong", "University"], type: "School of Business · Graduate", period: "Sep 2025 – Jun 2028", logo: "/sdu-emblem.png",
    degree: "Master's in Applied Economics", discipline: "Finance / Insurance", gpa: "90.91/100", rank: "8/46",
    admission: "Recommended admission after ranking first across my undergraduate school",
    courses: [
      ["Intermediate and Advanced Econometrics", "99"], ["Intermediate and Advanced Macroeconomics", "95"], ["Artificial Intelligence in Business", "93"], ["Microeconomic Finance Theory", "90.5"],
    ],
    honors: ["Second-Class University Scholarship", "Outstanding Individual in Social Service"],
  },
  {
    id: "guangdong", name: "Guangdong Ocean University", nameLines: ["Guangdong Ocean", "University"], type: "School of Management · Undergraduate", period: "Sep 2021 – Jun 2025", logo: "/guangdong-ocean-university-logo.png",
    degree: "Bachelor's in Financial Management", discipline: "", gpa: "4.13/5.00", rank: "1/151", admission: "",
    courses: [
      ["Tax Planning", "98"], ["Mathematics for Economics", "97"], ["Marketing", "96"], ["Financial Accounting Simulation", "95"], ["Macroeconomics", "94"], ["Advanced Financial Management", "94"], ["Corporate Strategy and Risk Management", "93"], ["Investments", "93"], ["Probability and Mathematical Statistics", "92"], ["Financial Markets", "90"], ["Linear Algebra", "90"], ["Microeconomics", "88"],
    ],
    honors: ["National Scholarship", "Top 10 Outstanding Student of the University", "First-Class University Scholarship (awarded annually)", "Outstanding Student Leader (University Level)", "Zhengda Scholarship (Top 10 in the School · Top 0.31%)"],
  },
];
