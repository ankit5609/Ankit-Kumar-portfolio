import type { ComponentType, SVGProps } from "react";
import {
  SiSpring,
  SiSpringboot,
  SiSpringsecurity,
  SiPostgresql,
  SiRedis,
  SiApachekafka,
  SiDocker,
  SiKubernetes,
  SiStripe,
  SiCloudinary,
  SiReact,
  SiTypescript,
  SiTailwindcss,
  SiGithub,
  SiGithubactions,
  SiLeetcode,
  SiGeeksforgeeks,
  SiCodechef,
  SiCodeforces,
  SiNodedotjs,
  SiNginx,
  SiHibernate,
  SiJsonwebtokens,
  SiMinio,
  SiGooglecloud,
  SiOpenjdk,
} from "react-icons/si";
import { FaJava, FaLinkedin } from "react-icons/fa";
import { Cpu, Sparkles } from "lucide-react";

// OpenAI brand mark — Simple Icons v13 removed it from this bundle
export const SiOpenai: ComponentType<SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M22.28 9.82a5.9 5.9 0 0 0-.5-4.9 6 6 0 0 0-6.47-2.9A6 6 0 0 0 4.98 4.18a5.9 5.9 0 0 0-3.94 2.87 6 6 0 0 0 .74 7.06 5.9 5.9 0 0 0 .5 4.9 6 6 0 0 0 6.47 2.9 6 6 0 0 0 10.33-2.15 5.9 5.9 0 0 0 3.94-2.87 6 6 0 0 0-.74-7.06zM13.26 20.9a4.44 4.44 0 0 1-2.86-1.03l.14-.08 4.77-2.76a.78.78 0 0 0 .39-.68v-6.75l2.02 1.17a.07.07 0 0 1 .04.06v5.58a4.5 4.5 0 0 1-4.5 4.49zM3.6 16.78a4.47 4.47 0 0 1-.54-3.03l.14.09 4.78 2.76a.77.77 0 0 0 .78 0l5.83-3.37V15.6a.07.07 0 0 1-.03.06L9.73 18.4a4.5 4.5 0 0 1-6.14-1.63zM2.34 7.9a4.47 4.47 0 0 1 2.34-1.97v5.68a.77.77 0 0 0 .39.68l5.8 3.35-2 1.16a.08.08 0 0 1-.08 0L3.96 14a4.5 4.5 0 0 1-1.62-6.11zm16.57 3.84L13.08 8.35 15.1 7.19a.07.07 0 0 1 .07 0l4.83 2.79a4.5 4.5 0 0 1-.68 8.11v-5.69a.79.79 0 0 0-.4-.66zm2-3.03l-.14-.09-4.77-2.77a.78.78 0 0 0-.79 0L9.4 9.22V6.89a.07.07 0 0 1 .03-.06l4.83-2.78a4.5 4.5 0 0 1 6.68 4.66zm-12.65 4.15L6.24 11.7a.06.06 0 0 1-.03-.05V6.06a4.5 4.5 0 0 1 7.37-3.45l-.14.08L8.66 5.45a.79.79 0 0 0-.4.68zm1.1-2.36l2.6-1.5 2.6 1.5v3l-2.6 1.5-2.6-1.5z"/>
  </svg>
);
export { FaLinkedin as SiLinkedin };
export { Sparkles };

export type IconCmp = ComponentType<SVGProps<SVGSVGElement> & { size?: number | string }>;

/** Map a tech label to a brand icon + brand color. */
export const techMeta: Record<string, { Icon: IconCmp; color: string }> = {
  "Java 21": { Icon: FaJava, color: "#f89820" },
  Java: { Icon: FaJava, color: "#f89820" },
  JDK: { Icon: SiOpenjdk, color: "#ed8b00" },
  "Spring Boot": { Icon: SiSpringboot, color: "#6db33f" },
  "Spring Boot 3": { Icon: SiSpringboot, color: "#6db33f" },
  "Spring Cloud": { Icon: SiSpring, color: "#6db33f" },
  "Spring AI": { Icon: SiSpring, color: "#6db33f" },
  "Spring Security": { Icon: SiSpringsecurity, color: "#6db33f" },
  Hibernate: { Icon: SiHibernate, color: "#bcae79" },
  JWT: { Icon: SiJsonwebtokens, color: "#d63aff" },
  PostgreSQL: { Icon: SiPostgresql, color: "#4169e1" },
  "PostgreSQL + pgvector": { Icon: SiPostgresql, color: "#4169e1" },
  pgvector: { Icon: SiPostgresql, color: "#4169e1" },
  Redis: { Icon: SiRedis, color: "#dc382d" },
  Kafka: { Icon: SiApachekafka, color: "#e8e8ff" },
  MinIO: { Icon: SiMinio, color: "#c72e49" },
  Docker: { Icon: SiDocker, color: "#2496ed" },
  Kubernetes: { Icon: SiKubernetes, color: "#326ce5" },
  GKE: { Icon: SiGooglecloud, color: "#4285f4" },
  NGINX: { Icon: SiNginx, color: "#009639" },
  Stripe: { Icon: SiStripe, color: "#635bff" },
  Cloudinary: { Icon: SiCloudinary, color: "#3448c5" },
  OpenAI: { Icon: SiOpenai, color: "#10a37f" },
  React: { Icon: SiReact, color: "#61dafb" },
  TypeScript: { Icon: SiTypescript, color: "#3178c6" },
  Tailwind: { Icon: SiTailwindcss, color: "#38bdf8" },
  "GitHub Actions": { Icon: SiGithubactions, color: "#2088ff" },
  GitHub: { Icon: SiGithub, color: "#e8e8ff" },
  Jib: { Icon: SiDocker, color: "#2496ed" },
  Node: { Icon: SiNodedotjs, color: "#3c873a" },
};

export function iconFor(label: string) {
  return techMeta[label] ?? { Icon: Cpu as unknown as IconCmp, color: "#818cf8" };
}

export const socialMeta = {
  github: { Icon: SiGithub, color: "#e8e8ff", label: "GitHub" },
  linkedin: { Icon: FaLinkedin, color: "#0a66c2", label: "LinkedIn" },
  leetcode: { Icon: SiLeetcode, color: "#ffa116", label: "LeetCode" },
  gfg: { Icon: SiGeeksforgeeks, color: "#2f8d46", label: "GeeksforGeeks" },
  codechef: { Icon: SiCodechef, color: "#5b4638", label: "CodeChef" },
  codeforces: { Icon: SiCodeforces, color: "#1f8acb", label: "Codeforces" },
} as const;
