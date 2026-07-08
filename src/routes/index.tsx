import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/hero";
import { About } from "@/components/site/about";
import { SkillsStats } from "@/components/site/skills-stats";
import { ProjectsGrid } from "@/components/site/projects-grid";
import { Contact } from "@/components/site/contact";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <About />
      <SkillsStats />
      <ProjectsGrid />
      <Contact />
    </>
  );
}
