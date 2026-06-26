// Data layer for the research journal.
// Single source of truth for locally-authored posts + categories. Presentation
// components depend on these types, never the other way around (design-for-change).
// Real published posts from the shared DB are merged in at the content layer
// (see ./content.ts) — this file holds the journal's editorial archive.

export type Category =
  | "AI & ML"
  | "Neuroscience"
  | "Physics"
  | "Climate"
  | "Biology"
  | "Data Science";

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: Category;
  /** ISO date string (server-stable, no client clock) */
  date: string;
  readingTime: number;
  author: string;
  authorRole: string;
  /** Ordered paragraphs for the article body */
  body: string[];
}

export const CATEGORIES: Category[] = [
  "AI & ML",
  "Neuroscience",
  "Physics",
  "Climate",
  "Biology",
  "Data Science",
];

const POSTS: Post[] = [
  {
    slug: "small-models-big-context",
    title: "Small Models, Big Context",
    excerpt:
      "The frontier is quietly shifting from parameter count to context length. What a model can hold in mind may matter more than how much it knows.",
    category: "AI & ML",
    date: "2026-06-24",
    readingTime: 8,
    author: "Dr. Priya Nair",
    authorRole: "Machine Learning",
    body: [
      "For two years the headline number was parameters. The quieter revolution has been the context window — the span of text, code, or transcript a model can attend to at once — which has grown from a paragraph to a small library.",
      "A modest model with a million-token window behaves unlike its specification suggests. It can read an entire codebase, a quarter's worth of correspondence, or a patient's full chart before answering, substituting retrieval-in-context for knowledge baked into weights.",
      "The trade is real: attention over long sequences is expensive, and most of those tokens are noise. The research frontier is now about which tokens earn their place — learned compression, hierarchical caches, and routing that decides what to keep.",
      "If the last era asked how much a model could memorize, this one asks how much it can hold in working memory at the moment of decision. The answer is reshaping what 'small' even means.",
    ],
  },
  {
    slug: "quantum-error-correction-crosses-threshold",
    title: "Quantum Error Correction Crosses the Threshold",
    excerpt:
      "For the first time, adding qubits made a logical qubit better instead of worse. The result is quieter than the hype and more important.",
    category: "Physics",
    date: "2026-06-20",
    readingTime: 9,
    author: "Dr. Iris Kovač",
    authorRole: "Quantum Information",
    body: [
      "The promise of quantum computing has always carried an asterisk: qubits are fragile, and every additional one introduces more ways to fail. Below a certain quality, error correction makes things worse, not better.",
      "Recent experiments have, for the first time, crossed that threshold — encoding a logical qubit whose error rate falls as the number of physical qubits grows. The curve finally bends the right way.",
      "This is not a working quantum computer; it is the proof that one is not forbidden by noise. The engineering road ahead — millions of qubits, exquisite control — remains long.",
      "But thresholds are the rare milestones that change what is possible in principle. This one quietly moved quantum computing from 'maybe never' to 'merely very hard.'",
    ],
  },
  {
    slug: "what-the-sleeping-brain-throws-away",
    title: "What the Sleeping Brain Throws Away",
    excerpt:
      "Sleep may be less about rest than about forgetting — the nightly pruning that keeps memory from drowning in its own detail.",
    category: "Neuroscience",
    date: "2026-06-18",
    readingTime: 7,
    author: "Dr. Marcus Feld",
    authorRole: "Computational Neuroscience",
    body: [
      "We tend to think of sleep as restoration, the brain idling to recharge. The evidence increasingly points elsewhere: sleep is when the brain decides what to keep.",
      "During slow-wave sleep, synapses that strengthened during the day are systematically scaled back — a global down-selection that preserves the strongest connections and lets the weakest fade.",
      "The function is counterintuitive but elegant: by forgetting the incidental, the brain makes room for the meaningful, and prevents the runaway strengthening that would otherwise saturate the network.",
      "If memory is sculpture, sleep is the chisel. What it removes may matter as much as what the waking day laid down.",
    ],
  },
  {
    slug: "the-grid-is-the-climate-problem",
    title: "The Grid Is the Climate Problem",
    excerpt:
      "We have the clean electrons. We cannot move them. The unglamorous bottleneck of transmission may decide the energy transition.",
    category: "Climate",
    date: "2026-06-15",
    readingTime: 10,
    author: "Dr. Samuel Brandt",
    authorRole: "Energy Systems",
    body: [
      "The story of clean energy is usually told as a story of generation — cheaper solar, bigger turbines, better batteries. The harder, less photogenic story is transmission: the wires that carry power from where it is made to where it is used.",
      "Interconnection queues now stretch years, and projects die waiting for grid capacity that does not exist. The constraint is no longer the cost of a clean electron but the impossibility of delivering it.",
      "Fixes are known and dull: high-voltage lines, dynamic line rating, planning that crosses jurisdictional borders. None of it trends; all of it is decisive.",
      "Decarbonization will be won or lost in permitting offices and substations, not only in laboratories. The grid is where ambition meets physics — and, more often, paperwork.",
    ],
  },
  {
    slug: "engineering-the-microbiome-carefully",
    title: "Engineering the Microbiome, Carefully",
    excerpt:
      "The trillions of microbes inside us are a second genome we are only beginning to edit. The early lessons are about restraint.",
    category: "Biology",
    date: "2026-06-12",
    readingTime: 8,
    author: "Dr. Yuki Tan",
    authorRole: "Synthetic Biology",
    body: [
      "The human microbiome — the dense ecology of bacteria, fungi, and viruses that share our bodies — behaves less like an organ than like a rainforest: interconnected, resilient, and easy to damage by clumsy intervention.",
      "Early attempts to engineer it, from broad-spectrum probiotics to fecal transplants, worked unpredictably because they treated an ecosystem as a switch. The community resists, reverts, or reorganizes in ways no one intended.",
      "The more promising approaches are ecological: designing microbes that occupy a specific niche, or nudging the existing community with targeted nutrients rather than wholesale replacement.",
      "To engineer the microbiome is to garden, not to manufacture. The humbling lesson is that the system we are editing has its own evolutionary agenda.",
    ],
  },
  {
    slug: "the-alignment-tax-measured",
    title: "The Alignment Tax, Measured",
    excerpt:
      "Safety training was supposed to cost capability. New evaluations suggest the bill is smaller — and stranger — than anyone expected.",
    category: "AI & ML",
    date: "2026-06-11",
    readingTime: 7,
    author: "Dr. Priya Nair",
    authorRole: "Machine Learning",
    body: [
      "It was long assumed that making a model safer made it duller: every refusal, every hedge, every guardrail shaving a little off raw capability. The 'alignment tax' was treated as an unfortunate but unavoidable cost.",
      "Careful evaluation complicates the story. On most benchmarks, well-aligned models lose almost nothing; on some they improve, because the same training that teaches restraint also teaches the model to follow instructions precisely.",
      "Where the tax does appear is narrow and revealing: tasks that reward the very behaviors safety training suppresses — unfiltered speculation, confident extrapolation past the evidence.",
      "The finding reframes the debate. Alignment is not a uniform drag on intelligence but a redistribution of it, sharpening some faculties while dulling others. The question is whether we are trimming the right ones.",
    ],
  },
  {
    slug: "causal-inference-comes-of-age",
    title: "Causal Inference Comes of Age",
    excerpt:
      "Correlation has run the data economy for a decade. The tools to ask 'what if' are finally industrial-strength.",
    category: "Data Science",
    date: "2026-06-09",
    readingTime: 8,
    author: "Dr. Nadia Rahman",
    authorRole: "Causal Inference",
    body: [
      "Most of applied data science answers a narrow question well: given what we have seen, what comes next? The harder, more valuable question — what would happen if we intervened — long lived at the academic margins.",
      "That is changing. Methods for estimating causal effects from observational data — once fragile and assumption-heavy — have matured into tooling robust enough for production decisions.",
      "The payoff is decisions, not predictions: which treatment to deploy, which feature actually moves the outcome, which correlation collapses the moment you act on it.",
      "Causality is harder than prediction and always will be, because it asks about worlds we have not observed. But asking it badly is no longer the only option.",
    ],
  },
  {
    slug: "reading-the-warning-signs-of-a-tipping-point",
    title: "Reading the Warning Signs of a Tipping Point",
    excerpt:
      "Complex systems often flicker before they flip. The hunt is on for the statistical tremors that precede climate collapse.",
    category: "Climate",
    date: "2026-06-05",
    readingTime: 9,
    author: "Dr. Ade Okonkwo",
    authorRole: "Climate Systems",
    body: [
      "A tipping point is a quiet catastrophe: a system that absorbs stress for years, then reorganizes abruptly into a new state from which there is no easy return — an ice sheet, a current, a forest.",
      "Theory predicts these transitions are not entirely silent. As a system approaches its threshold it recovers more slowly from small perturbations, and its fluctuations grow — a signature researchers call critical slowing down.",
      "Detecting that signature in real climate records is fiendishly hard, buried in noise and short observation windows. But early results in ocean circulation and ice dynamics are unsettlingly consistent with a system under strain.",
      "An early-warning sign is not a prediction so much as a plea for humility. The value is in the margin it might buy — if we are willing to act on a tremor rather than a rupture.",
    ],
  },
  {
    slug: "after-the-fold-biologys-prediction-problem",
    title: "After the Fold: Biology's Prediction Problem Moves On",
    excerpt:
      "Structure prediction is largely solved. The field is discovering how much of biology that did, and did not, unlock.",
    category: "Biology",
    date: "2026-06-02",
    readingTime: 7,
    author: "Dr. Hana Sato",
    authorRole: "Molecular Biology",
    body: [
      "A few years ago, predicting a protein's folded shape from its sequence was a grand challenge. Today it is, for most proteins, a solved problem — one of the cleanest victories machine learning has handed biology.",
      "The aftermath is instructive. Knowing a structure is not the same as knowing a function, and proteins rarely sit still: they flex, bind, and change shape in ways a single predicted snapshot cannot capture.",
      "Attention has shifted to the harder questions — interactions, dynamics, and the disordered regions that defy a fixed structure entirely. The map was drawn; now we must learn to read the territory's motion.",
      "It is a familiar pattern in science: solving the question everyone asked reveals the deeper questions no one knew to.",
    ],
  },
  {
    slug: "the-reproducibility-dividend",
    title: "The Reproducibility Dividend",
    excerpt:
      "The replication crisis was treated as an embarrassment. Reframed as an investment, it is quietly paying out.",
    category: "Data Science",
    date: "2026-05-31",
    readingTime: 6,
    author: "Dr. Tomas Reuben",
    authorRole: "Evaluation & Statistics",
    body: [
      "A decade ago, the discovery that many published findings would not replicate landed as a scandal. Whole literatures wobbled; trust in entire fields took a measurable hit.",
      "What followed was less dramatic and more important: pre-registration, shared data, larger samples, and a culture that treats a single study as a hypothesis rather than a verdict.",
      "The dividend is now visible. Newer literatures built on these norms replicate at far higher rates, and the cost of the reforms — slower, more deliberate science — looks like a bargain.",
      "Reproducibility is not bureaucracy; it is the interest paid on honest measurement. The crisis was the price of admission to a more durable kind of knowledge.",
    ],
  },
  {
    slug: "scaling-laws-beyond-the-plateau",
    title: "Scaling Laws Beyond the Plateau",
    excerpt:
      "What happens when bigger stops meaning better? A look at the empirical limits of scale and the architectures reaching past them.",
    category: "AI & ML",
    date: "2026-05-28",
    readingTime: 9,
    author: "Dr. Priya Nair",
    authorRole: "Machine Learning",
    body: [
      "For half a decade the field operated on a simple, intoxicating premise: add parameters, add data, add compute, and capability follows in a smooth power law. The curves held with eerie precision — until they didn't.",
      "Recent frontier runs show diminishing returns that arrive earlier than the canonical fits predict, particularly on tasks requiring multi-step reasoning. The plateau is not a wall so much as a change in slope, and it is forcing a reckoning about what we are actually measuring.",
      "The most promising responses abandon the idea that a single monolithic network must do everything. Mixture-of-experts routing, retrieval-grounded inference, and explicit search over a model's own outputs all decouple capability from raw parameter count.",
      "If the last era was defined by scale, the next will be defined by allocation — deciding which computation happens where, and when a model should think longer rather than simply be larger.",
    ],
  },
  {
    slug: "the-cortex-as-a-prediction-engine",
    title: "The Cortex as a Prediction Engine",
    excerpt:
      "Predictive coding reframes perception as controlled hallucination. New recordings put the theory to its hardest test yet.",
    category: "Neuroscience",
    date: "2026-05-21",
    readingTime: 11,
    author: "Dr. Marcus Feld",
    authorRole: "Computational Neuroscience",
    body: [
      "The brain does not passively receive the world; it predicts it, and attends only to the error. This inversion — perception as a hypothesis the senses correct — has quietly become the dominant frame in cognitive neuroscience.",
      "High-density recordings from visual cortex now let us watch the error signal directly. When a stimulus matches expectation, deep-layer activity falls silent. When it surprises, the same neurons erupt.",
      "What makes predictive coding compelling is not any single experiment but its reach: it explains illusions, attention, and even the felt quality of surprise within one accounting framework.",
      "The open question is whether the elegance survives contact with the messy, recurrent reality of biological circuits — or whether it is the next theory we will be obliged to correct.",
    ],
  },
  {
    slug: "room-temperature-superconductivity-revisited",
    title: "Room-Temperature Superconductivity, Revisited",
    excerpt:
      "After a year of retractions and replications, where does the search for ambient superconductors actually stand?",
    category: "Physics",
    date: "2026-05-14",
    readingTime: 8,
    author: "Dr. Lena Ortiz",
    authorRole: "Condensed Matter",
    body: [
      "Few claims in modern physics have collapsed as publicly as the room-temperature superconductor. And yet the underlying ambition is sound: a material that carries current without loss at ambient conditions would reorganize the energy economy.",
      "The lesson of the past year is methodological. Resistance dropping to zero is necessary but not sufficient; the Meissner effect, isotope shifts, and reproducible synthesis must all line up.",
      "Hydride compounds under extreme pressure remain the most credible high-temperature superconductors we know of — the catch being the pressure of a planetary core.",
      "Progress here will be incremental and unglamorous: better characterization, shared samples, and a community that treats extraordinary claims with proportionate skepticism.",
    ],
  },
  {
    slug: "carbon-removal-at-the-scale-that-matters",
    title: "Carbon Removal at the Scale That Matters",
    excerpt:
      "Direct air capture works in a press release. Making it work at gigatonne scale is a different physics — and economics — problem.",
    category: "Climate",
    date: "2026-05-07",
    readingTime: 10,
    author: "Dr. Ade Okonkwo",
    authorRole: "Climate Systems",
    body: [
      "Capturing a tonne of CO₂ from the air is no longer in doubt. Capturing a billion of them, every year, for a price the world will actually pay, remains the defining engineering challenge of the decade.",
      "The thermodynamics are unforgiving: atmospheric CO₂ is dilute, and concentrating it costs energy that must itself be carbon-free, or the exercise is self-defeating.",
      "The most credible pathways pair capture with cheap, otherwise-stranded renewable energy and with mineralization that locks carbon away on geological timescales.",
      "What we lack is not a prototype but an industry — supply chains, standards, and a price on carbon honest enough to fund them.",
    ],
  },
  {
    slug: "writing-to-the-genome-without-cutting",
    title: "Writing to the Genome Without Cutting",
    excerpt:
      "Base and prime editing rewrite DNA without the double-strand breaks that made early CRISPR a blunt instrument.",
    category: "Biology",
    date: "2026-04-30",
    readingTime: 7,
    author: "Dr. Hana Sato",
    authorRole: "Molecular Biology",
    body: [
      "The first generation of genome editing was a pair of scissors: precise about where it cut, indifferent to what the cell did next. The repair was the gamble.",
      "Base editors changed the verb. Rather than cutting, they chemically convert one letter of DNA into another, sidestepping the double-strand break entirely.",
      "Prime editing goes further, using a guided reverse transcriptase to write new sequence directly — a search-and-replace for the genome.",
      "The frontier now is delivery: getting these molecular machines into the right cells, in the right numbers, without the immune system noticing.",
    ],
  },
  {
    slug: "the-quiet-crisis-in-benchmark-design",
    title: "The Quiet Crisis in Benchmark Design",
    excerpt:
      "When models train on the internet and benchmarks live on the internet, what exactly are we measuring?",
    category: "Data Science",
    date: "2026-04-23",
    readingTime: 6,
    author: "Dr. Tomas Reuben",
    authorRole: "Evaluation & Statistics",
    body: [
      "A benchmark is a promise: that performance on this small, fixed set of problems predicts performance on the vast set we actually care about. Contamination breaks the promise quietly.",
      "When evaluation data leaks into training corpora, scores rise without capability following. The number goes up; the model has simply seen the answer.",
      "Robust evaluation now demands held-out, freshly authored, and adversarially constructed tasks — and the humility to retire a benchmark the moment it saturates.",
      "Measurement is not a solved problem we can take for granted. It is research, and it deserves the same rigor as the systems it judges.",
    ],
  },
  {
    slug: "agents-that-know-when-to-stop",
    title: "Agents That Know When to Stop",
    excerpt:
      "Autonomy is easy to grant and hard to bound. Calibrated stopping may matter more than calibrated answers.",
    category: "AI & ML",
    date: "2026-04-16",
    readingTime: 8,
    author: "Dr. Priya Nair",
    authorRole: "Machine Learning",
    body: [
      "An agent that never quits is not ambitious; it is broken. The hardest part of building autonomous systems is not capability but knowing the boundary of competence.",
      "Calibration — a model's sense of its own uncertainty — turns out to be the load-bearing skill. An agent that knows it doesn't know can ask, defer, or stop.",
      "We are learning to train this directly: rewarding honest abstention, penalizing confident error more than admitted ignorance.",
      "The agents worth trusting will be the ones that hand control back at exactly the right moment — neither too soon to be useful nor too late to be safe.",
    ],
  },
  {
    slug: "memory-and-the-shape-of-a-place",
    title: "Memory and the Shape of a Place",
    excerpt:
      "Grid cells tile space in hexagons. The same code may organize thought itself.",
    category: "Neuroscience",
    date: "2026-04-09",
    readingTime: 9,
    author: "Dr. Marcus Feld",
    authorRole: "Computational Neuroscience",
    body: [
      "Deep in the entorhinal cortex, neurons fire in a hexagonal lattice as an animal moves — a coordinate system the brain builds for itself.",
      "The striking discovery is that this same machinery activates when subjects navigate abstract spaces: relationships between concepts, not just positions in a room.",
      "If true, the brain reuses a spatial code to organize meaning, mapping ideas as if they had locations.",
      "It suggests that to remember is, in some literal sense, to know where something is — even when the something is a thought.",
    ],
  },
  {
    slug: "turbulence-the-last-classical-mystery",
    title: "Turbulence: The Last Classical Mystery",
    excerpt:
      "The equations are a century old and we still cannot solve them. Machine learning is changing the terms of the problem.",
    category: "Physics",
    date: "2026-04-02",
    readingTime: 10,
    author: "Dr. Lena Ortiz",
    authorRole: "Fluid Dynamics",
    body: [
      "Turbulence is the embarrassment at the heart of classical physics: equations we have written down precisely and cannot solve, governing a phenomenon we see in every poured cup of coffee.",
      "The difficulty is the cascade — energy flowing across scales from the largest eddies to the smallest, coupling everything to everything.",
      "Learned models now approximate this cascade, not by solving the equations but by absorbing the statistics of countless simulations.",
      "Whether that counts as understanding or merely prediction is a question turbulence has always forced us to ask.",
    ],
  },
];

/** Posts sorted newest-first. */
export function getAllPosts(): Post[] {
  return [...POSTS].sort((a, b) => b.date.localeCompare(a.date));
}

export function getPostBySlug(slug: string): Post | undefined {
  return POSTS.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return POSTS.map((post) => post.slug);
}

/** Stable formatter — avoids locale/clock differences between server and client. */
export function formatDate(iso: string): string {
  const [year, month, day] = iso.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[month - 1]} ${day}, ${year}`;
}
