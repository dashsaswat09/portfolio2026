import type { ReactNode } from "react";
import type { Artifact, Ownership, Planet as PlanetT, Status } from "@/content";
import { shouldShow, showStatusBadges } from "@/content";

/** Renders children only if the status may be shown here; adds a badge in previews. */
export function Gate({ status, children, inline }: { status: Status; children: ReactNode; inline?: boolean }) {
  if (!shouldShow(status)) return null;
  if (!showStatusBadges || status === "verified") return <>{children}</>;
  const Tag = inline ? "span" : "div";
  return (
    <Tag className={`gate gate--${status}`}>
      <span className="gate__badge">{status === "placeholder" ? "Placeholder — replace" : "Verify"}</span>
      {children}
    </Tag>
  );
}

export function Planet({ planet, size = 72, className }: { planet: PlanetT; size?: number; className?: string }) {
  return (
    <span
      className={`planet ${planet.ring ? "planet--ring" : ""} ${className ?? ""}`}
      style={{ "--p-light": planet.light, "--p-dark": planet.dark, "--p-size": `${size}px` } as React.CSSProperties}
      aria-hidden="true"
    />
  );
}

const ownershipLabel: Record<Ownership, string> = {
  owned: "Owned",
  contributed: "Contributed",
  team: "Team effort",
  independent: "Independent",
};

export function OwnershipTag({ value }: { value: Ownership }) {
  return <span className={`own own--${value}`}>{ownershipLabel[value]}</span>;
}

const kindLabel: Record<Artifact["kind"], string> = {
  screenshot: "Screens",
  dashboard: "Dashboard",
  prd: "PRD",
  figma: "Figma",
  diagram: "Diagram",
  document: "Document",
  chart: "Chart",
};

export function ArtifactSlot({ artifact, slug }: { artifact: Artifact; slug: string }) {
  const hasFile = Boolean(artifact.file || artifact.href);
  if (!hasFile && !shouldShow(artifact.status)) return null;
  return (
    <figure className={`artifact ${hasFile ? "" : "artifact--empty"}`}>
      <div className="artifact__frame">
        {artifact.file ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={artifact.file} alt={artifact.title} loading="lazy" />
        ) : artifact.href ? (
          <a href={artifact.href} target="_blank" rel="noopener" className="artifact__link">
            Open {kindLabel[artifact.kind]} ↗
          </a>
        ) : (
          <div className="artifact__empty">
            <span className="artifact__kind">{kindLabel[artifact.kind]}</span>
            <code>public/artifacts/{slug}/{artifact.id}.png</code>
          </div>
        )}
      </div>
      <figcaption>
        <strong>{artifact.title}</strong>
        <span>{artifact.caption}</span>
      </figcaption>
    </figure>
  );
}
