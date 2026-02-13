import { useMemo } from "react";
import type { UserData } from "@/types/userInfoTypes";

interface AnalyticsPanelProps {
  data: UserData;
  accentColor: string;
}

const ACTION_VERBS = [
  "built",
  "led",
  "improved",
  "designed",
  "launched",
  "developed",
  "optimized",
  "implemented",
  "managed",
  "created",
  "delivered",
  "streamlined",
  "increased",
  "reduced",
  "grew",
  "automated",
];

const AnalyticsPanel = ({ data, accentColor }: AnalyticsPanelProps) => {
  const metrics = useMemo(() => {
    const personal = data.personal;
    const personalReady = [
      personal.name,
      personal.email,
      personal.address,
      personal.phone,
    ].every((value) => Boolean(value && value.trim()));

    const skillsCount = data.skills.length;
    const expCount = data.exp.length;
    const eduCount = data.edu.length;

    const expText = data.exp
      .map((item) => item.description || "")
      .join(" ")
      .trim();
    const coverLetterText = data.coverLetter.body || "";
    const totalWords = `${expText} ${coverLetterText}`
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    const actionVerbCount = ACTION_VERBS.reduce((count, verb) => {
      const regex = new RegExp(`\\b${verb}\\b`, "gi");
      return count + (expText.match(regex)?.length ?? 0);
    }, 0);

    const coverLetterWords = coverLetterText
      .trim()
      .split(/\s+/)
      .filter(Boolean).length;

    let score = 0;
    if (personalReady) score += 30;
    if (skillsCount > 0) score += 20;
    if (expCount > 0) score += 25;
    if (eduCount > 0) score += 15;
    if (coverLetterWords > 60) score += 10;

    const flags: string[] = [];
    if (!personal.email) flags.push("Add an email address");
    if (!personal.phone) flags.push("Add a phone number");
    if (skillsCount === 0) flags.push("Add at least 1 skill");
    if (expCount === 0) flags.push("Add work experience");
    if (coverLetterWords === 0) flags.push("Draft a cover letter");

    return {
      score,
      skillsCount,
      expCount,
      eduCount,
      totalWords,
      actionVerbCount,
      coverLetterWords,
      flags,
    };
  }, [data]);

  return (
    <div className="rounded-2xl border bg-white/85 p-4 shadow-sm backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Live analytics
          </p>
          <p className="text-lg font-semibold">CV Score</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold" style={{ color: accentColor }}>
            {metrics.score}
          </p>
          <p className="text-xs text-muted-foreground">/ 100</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
        <div className="rounded-xl border bg-muted/20 p-3">
          <p className="text-muted-foreground">Skills</p>
          <p className="text-lg font-semibold">{metrics.skillsCount}</p>
        </div>
        <div className="rounded-xl border bg-muted/20 p-3">
          <p className="text-muted-foreground">Experience</p>
          <p className="text-lg font-semibold">{metrics.expCount}</p>
        </div>
        <div className="rounded-xl border bg-muted/20 p-3">
          <p className="text-muted-foreground">Education</p>
          <p className="text-lg font-semibold">{metrics.eduCount}</p>
        </div>
        <div className="rounded-xl border bg-muted/20 p-3">
          <p className="text-muted-foreground">Action verbs</p>
          <p className="text-lg font-semibold">{metrics.actionVerbCount}</p>
        </div>
      </div>

      <div className="mt-4 space-y-2 text-xs text-muted-foreground">
        <div className="flex items-center justify-between">
          <span>Total words</span>
          <span className="font-medium text-foreground">
            {metrics.totalWords}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span>Cover letter words</span>
          <span className="font-medium text-foreground">
            {metrics.coverLetterWords}
          </span>
        </div>
      </div>

      {metrics.flags.length > 0 && (
        <div className="mt-4 rounded-xl border border-dashed bg-muted/10 p-3">
          <p className="text-xs font-semibold text-muted-foreground">
            Suggestions
          </p>
          <ul className="mt-2 space-y-1 text-xs">
            {metrics.flags.slice(0, 3).map((flag) => (
              <li key={flag} className="text-muted-foreground">
                {flag}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default AnalyticsPanel;
