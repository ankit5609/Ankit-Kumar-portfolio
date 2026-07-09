import portrait from "@/assets/ankit-portrait.png";
import resume from "@/assets/Ankit_Kumar_resume.pdf?url";


export const site = {
  name: "Ankit Kumar",
  role: "Java Backend & Full Stack Developer",
  tagline: "Building cloud-native systems and AI-powered platforms.",
  email: "ankitkr5609@gmail.com",
  location: "NIT Jamshedpur · India",
  portraitUrl: portrait,
  resumeUrl: resume,

  socials: {
    github: "https://github.com/ankit5609",
    linkedin: "https://www.linkedin.com/in/ankit5609/",
    leetcode: "https://leetcode.com/u/ankit1304/",
    gfg: "https://www.geeksforgeeks.org/profile/ankitkr5609?tab=activity",
    codechef: "https://www.codechef.com/users/ankit5609",
    codeforces: "https://codeforces.com/profile/ankit1304",
  },
} as const;

export type ProjectSlug = "distributed-codeforge" | "staynest" | "codeforge-monolith";

export interface ProjectHighlight {
  metric: string;
  label: string;
}

export interface ProjectMeta {
  slug: ProjectSlug;
  title: string;
  subtitle: string;
  pitch: string;
  highlights?: ProjectHighlight[];
  tech: string[];
  github: string;
  demo?: string;
  hasCaseStudy?: boolean;
  gradient: string;
}

export const projects: ProjectMeta[] = [
  {
    slug: "distributed-codeforge",
    title: "Distributed CodeForge",
    subtitle: "Cloud-native agentic coding workspace on Kubernetes",
    pitch:
      "A cloud-native, agentic collaborative coding workspace — 6-microservice Spring Cloud control plane split across network-isolated Kubernetes namespaces, with a self-correcting Spring AI tool-calling loop that reads files, runs preview builds and resolves compiler exceptions from pgvector past-fix memory.",
    highlights: [
      { metric: "90%",       label: "sandbox spin-up latency cut · 15s → <1.5s" },
      { metric: "6",         label: "Spring Cloud services · network-isolated K8s namespaces" },
      { metric: "LRU pool",  label: "pre-warmed runner pods · Redis-cached routes" },
      { metric: "keyless",   label: "GCP Workload Identity Federation · Jib · GitHub Actions" },
    ],
    tech: [
      "Java 21", "Spring Cloud", "Spring AI", "Kubernetes (GKE)", "Fabric8 K8s Client",
      "Kafka", "Redis", "PostgreSQL + pgvector", "MinIO", "Jib", "GitHub Actions", "Stripe",
    ],
    github: "https://github.com/ankit5609/Distributed-CodeForge",
    demo: "https://codeforge.arclite.site/",
    hasCaseStudy: true,
    gradient: "from-[oklch(0.4_0.15_195)] via-[oklch(0.5_0.14_170)] to-[oklch(0.65_0.14_150)]",
  },
  {
    slug: "staynest",
    title: "StayNest",
    subtitle: "Production hotel booking REST platform",
    pitch:
      "A Spring Boot 3 hospitality reservation REST API — layered architecture with a Decorator-pattern pricing calculator for surge, occupancy and holiday rules, pessimistic room-inventory locks, signature-verified Stripe webhooks and three fallback-guarded Spring AI features backed by pgvector.",
    highlights: [
      { metric: "90+",   label: "source files · 25+ tests · layered architecture" },
      { metric: "0",     label: "double-bookings · pessimistic row locks" },
      { metric: "5 min", label: "scheduled job expires unpaid reservations" },
      { metric: "3",     label: "Spring AI features · dynamic pricing · semantic search · RAG chatbot" },
    ],
    tech: [
      "Java 21", "Spring Boot 3", "Spring Security", "Hibernate/JPA",
      "PostgreSQL + pgvector", "Spring AI", "Stripe (webhooks)", "Cloudinary", "JWT + BCrypt",
    ],
    github: "https://github.com/ankit5609/StayNest-Hotel-Booking-Platform-Backend",
    demo: "https://staynest.arclite.site",
    hasCaseStudy: true,
    gradient: "from-[oklch(0.4_0.15_50)] via-[oklch(0.55_0.14_35)] to-[oklch(0.68_0.16_75)]",
  },
  {
    slug: "codeforge-monolith",
    title: "CodeForge (Monolith)",
    subtitle: "Original single-service collaborative IDE",
    pitch:
      "The monolithic prototype that seeded the distributed rewrite — a Spring Boot backend with a Node.js WebSocket proxy over Redis pub/sub for real-time multi-user editing, JWT + BCrypt auth, and Docker Compose for local dev. Proved the concept, exposed the ~15s cold-start and scaling limits that drove the microservices refactor.",
    tech: ["Java 17", "Spring Boot", "Node.js proxy", "Redis pub/sub", "WebSocket", "PostgreSQL", "JWT + BCrypt", "Docker Compose", "React"],
    github: "https://github.com/ankit5609/CodeForge",
    hasCaseStudy: false,
    gradient: "from-[oklch(0.4_0.15_260)] via-[oklch(0.5_0.14_240)] to-[oklch(0.65_0.14_210)]",
  },
];



export const codingStats = [
  {
    platform: "LeetCode",
    href: site.socials.leetcode,
    primary: "1739",
    primaryLabel: "Contest rating",
    lines: ["Top 11% globally", "448+ problems solved", "170-day max streak"],
  },
  {
    platform: "GeeksforGeeks",
    href: site.socials.gfg,
    primary: "1258",
    primaryLabel: "Coding Score",
    lines: ["339 problems solved", "Institute Rank 355 · NIT JSR", "187-day longest streak"],
  },
  {
    platform: "CodeChef",
    href: site.socials.codechef,
    primary: "1140",
    primaryLabel: "Rating",
    lines: ["146 problems solved", "Long / cook-off regular"],
  },
  {
    platform: "Codeforces",
    href: site.socials.codeforces,
    primary: "879",
    primaryLabel: "Rating",
    lines: ["225 problems solved", "Contest participant"],
  },
];
