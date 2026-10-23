"use client";

import { curatedAnswers } from "@/content/assistant";
import { useAssistant } from "./assistant/assistant-provider";

export function AskButton({ className, children, start }: { className?: string; children: React.ReactNode; start?: string }) {
  const { open } = useAssistant();
  return (
    <button className={className} onClick={() => open(start)}>
      {children}
    </button>
  );
}

export function AskChips({ ids }: { ids: string[] }) {
  const { open } = useAssistant();
  return (
    <div className="chips">
      {ids
        .map((id) => curatedAnswers.find((c) => c.id === id))
        .filter(Boolean)
        .map((c) => (
          <button key={c!.id} className="chip" onClick={() => open(c!.id)}>
            {c!.question}
          </button>
        ))}
    </div>
  );
}
