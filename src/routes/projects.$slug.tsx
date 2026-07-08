import { createFileRoute, notFound } from "@tanstack/react-router";
import { CaseStudy } from "@/components/site/case-study";
import { projects, type ProjectSlug } from "@/lib/site";
import {
  distributedArch, distributedPreview, distributedRag, distributedK8s,
  distributedErAccount, distributedErWorkspace, distributedErIntel,
  staynestArch, staynestBooking, staynestPricing, staynestReview, staynestEr,
} from "@/components/site/diagrams";

const VALID: ProjectSlug[] = ["distributed-codeforge", "staynest"];

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    if (!VALID.includes(params.slug as ProjectSlug)) throw notFound();
    return { slug: params.slug as ProjectSlug };
  },
  head: ({ params }) => {
    const p = projects.find((x) => x.slug === params.slug);
    if (!p) return { meta: [{ title: "Project — Ankit Kumar" }] };
    const title = `${p.title} — Case study · Ankit Kumar`;
    return {
      meta: [
        { title },
        { name: "description", content: p.pitch },
        { property: "og:title", content: title },
        { property: "og:description", content: p.pitch },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${p.slug}` },
      ],
      links: [{ rel: "canonical", href: `/projects/${p.slug}` }],
    };
  },
  component: ProjectRoute,
  notFoundComponent: () => (
    <div className="mx-auto max-w-2xl px-6 py-40 text-center">
      <h1 className="font-display text-4xl font-bold uppercase">Project not found</h1>
      <p className="mt-3 text-muted-foreground">This case study doesn't exist.</p>
    </div>
  ),
});

function ProjectRoute() {
  const { slug } = Route.useLoaderData();
  if (slug === "distributed-codeforge") return <DistributedCase />;
  return <StayNestCase />;
}

/* -------------------------------- Distributed CodeForge -------------------------------- */

function DistributedCase() {
  return (
    <CaseStudy
      slug="distributed-codeforge"
      overview={
        <>
          <p>
            Distributed CodeForge is a cloud-native, <strong>agentic collaborative coding
            workspace</strong> — a <strong>6-microservice Spring Cloud control plane</strong>
            (Gateway, Eureka, Config Server, Account, Workspace, Intelligence) split across
            <strong> network-isolated Kubernetes namespaces</strong> on GKE to secure sandbox
            runtime execution. Services coordinate over Apache Kafka and Redis, backed by
            PostgreSQL 16 + pgvector for relational and vector data, with MinIO for file trees.
          </p>
          <p>
            Sandbox preview spin-up latency was reduced <strong>~90% (15s → &lt;1.5s)</strong> by
            orchestrating a <strong>pre-warmed Kubernetes runner-pod pool</strong> with
            Redis-based route caching and <strong>LRU eviction</strong>. Workspace drives the pool
            through the <strong>Fabric8 Kubernetes client</strong>. A <strong>self-correcting
            agentic feedback loop</strong> uses <strong>Spring AI tool calling</strong> to read
            files, run preview builds and dynamically resolve compiler exceptions — pulling
            few-shot context from a pgvector memory of past error-fix pairs.
          </p>
          <p>
            Deployments run through <strong>5 path-filtered GitHub Actions workflows</strong> using
            <strong> Jib</strong> for daemonless container packaging and <strong>keyless GCP
            Workload Identity Federation</strong>, so CI pushes to Artifact Registry without
            long-lived keys. Stripe powers subscription billing with <strong>automated token-usage
            quotas</strong>, and Kubernetes egress policies lock sandbox pods down to
            <strong> private IP scopes only</strong>.
          </p>
        </>
      }


      metrics={[
        { label: "Microservices", value: "6" },
        { label: "Cold-start ↓", value: "~90%" },
        { label: "Preview p50", value: "~1.5s" },
        { label: "Cluster", value: "GKE" },
      ]}
      diagrams={[distributedArch, distributedPreview, distributedRag, distributedK8s, distributedErAccount, distributedErWorkspace, distributedErIntel]}
      schema={`CREATE EXTENSION IF NOT EXISTS vector;

CREATE TABLE projects (
  id       BIGSERIAL PRIMARY KEY,
  owner_id BIGINT REFERENCES users(id),
  name     TEXT NOT NULL
);

CREATE TABLE sessions (
  id         BIGSERIAL PRIMARY KEY,
  user_id    BIGINT REFERENCES users(id),
  project_id BIGINT REFERENCES projects(id),
  started_at TIMESTAMPTZ DEFAULT now(),
  ended_at   TIMESTAMPTZ
);

CREATE TABLE embeddings (
  id        BIGSERIAL PRIMARY KEY,
  scope     TEXT NOT NULL,           -- 'diff' | 'file' | 'issue'
  ref_id    BIGINT NOT NULL,
  embedding VECTOR(1536),
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX ON embeddings USING ivfflat (embedding vector_cosine_ops) WITH (lists = 100);`}
      lessons={[
        <>Spring Cloud Gateway with a custom JWT filter handles routing + authentication in one place; Eureka provides service discovery so ports and hostnames stay out of app code.</>,
        <>Kafka is the event backbone — enabling idempotent producers stopped duplicated deploy events during flaky retries.</>,
        <>A pre-warmed pod pool plus Redis-cached user→pod routing gave &lt;100ms lookup and drove preview cold-start from ~15s to ~1.5s.</>,
        <>Spring AI + pgvector implements a self-healing compile loop: past fix diffs are embedded and retrieved as few-shot context for the LLM.</>,
        <>Jib packages the services without a Docker daemon, and GCP Workload Identity Federation lets CI push to Artifact Registry without long-lived keys.</>,
      ]}
    />
  );
}

/* -------------------------------- StayNest -------------------------------- */

function StayNestCase() {
  return (
    <CaseStudy
      slug="staynest"
      overview={
        <>
          <p>
            StayNest is a production hospitality reservation REST API built on Java 21 and
            <strong> Spring Boot 3</strong> — <strong>90+ source files, 25+ tests</strong>, layered
            architecture, and a <strong>Decorator-pattern pricing calculator</strong> for surge,
            occupancy and holiday rules that keeps business logic composable and unit-testable.
          </p>
          <p>
            Concurrency is guarded by <strong>pessimistic row locks on room inventory</strong> to
            eliminate double-booking anomalies, paired with a <strong>5-minute scheduled job</strong>
            that expires unpaid reservations. Stripe checkout uses <strong>signature-verified
            webhooks</strong> and transactional refund handlers that persist state to PostgreSQL
            <em>before</em> invoking the gateway — preventing financial discrepancies on retries.
          </p>
          <p>
            Three Spring AI integrations run on top: <strong>dynamic pricing adjustments</strong>,
            <strong> semantic property search</strong>, and a <strong>pgvector-backed review Q&A
            chatbot</strong> — each wrapped with a fallback handler. Sessions are hardened with
            HttpOnly JWT cookies, BCrypt hashing, role-based access control and
            <strong> token versioning</strong> for global sign-out on password reset.
          </p>
        </>
      }

      metrics={[
        { label: "Runtime", value: "Spring 3" },
        { label: "Payments", value: "Stripe" },
        { label: "Media", value: "Cloudinary" },
        { label: "AI", value: "pgvector" },
      ]}
      diagrams={[staynestArch, staynestBooking, staynestPricing, staynestReview, staynestEr]}
      schema={`CREATE TABLE hotels (
  id         SERIAL PRIMARY KEY,
  name       TEXT NOT NULL,
  city       TEXT,
  manager_id INT REFERENCES users(id)
);

CREATE TABLE rooms (
  id         SERIAL PRIMARY KEY,
  hotel_id   INT REFERENCES hotels(id) ON DELETE CASCADE,
  type       TEXT,
  base_price DECIMAL(10,2)
);

CREATE TABLE inventory (
  room_id INT REFERENCES rooms(id) ON DELETE CASCADE,
  day     DATE NOT NULL,
  count   INT NOT NULL,
  PRIMARY KEY (room_id, day)
);

CREATE TABLE bookings (
  id             SERIAL PRIMARY KEY,
  guest_id       INT REFERENCES users(id),
  hotel_id       INT REFERENCES hotels(id),
  room_id        INT REFERENCES rooms(id),
  start_date     DATE,
  end_date       DATE,
  status         TEXT,
  payment_status TEXT
);

CREATE TABLE payments (
  id         SERIAL PRIMARY KEY,
  booking_id INT REFERENCES bookings(id),
  stripe_id  TEXT UNIQUE,
  amount     DECIMAL(10,2),
  status     TEXT
);`}
      lessons={[
        <>Pessimistic locks on the <span className="font-mono">inventory</span> table prevent double-booking under concurrent checkout without needing a distributed lock service.</>,
        <>Stripe webhook handler is idempotent: <span className="font-mono">stripe_id</span> is unique on payments so retries fold safely, and refunds check current status before mutating.</>,
        <>The pricing decorator chain keeps rules composable — new campaigns become one class instead of a spider of <span className="font-mono">if</span>-branches.</>,
        <>A scheduler expires unpaid bookings after 15 minutes, releasing inventory and closing the checkout window cleanly.</>,
        <>Semantic review search + a fallback answer path keeps the AI chatbot useful even when the LLM is unavailable.</>,
      ]}
    />
  );
}
