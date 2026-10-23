import Link from "next/link";
import { ProbeFallback } from "@/components/scene/probe-fallback";

export default function NotFound() {
  return (
    <div className="wrap page notfound">
      <ProbeFallback className="notfound__probe" />
      <p className="eyebrow">404</p>
      <h1>Lost signal</h1>
      <p className="section__lede">This page drifted out of orbit. Try one of these instead.</p>
      <p className="links-row">
        <Link href="/">Home</Link>
        <Link href="/work">Case studies</Link>
        <Link href="/contact">Contact</Link>
      </p>
    </div>
  );
}
