import {
  BriefcaseBusiness,
  ChartNoAxesCombined,
  FilePenLine,
  FlaskConical,
  Handshake,
  HeartPulse,
  LucideIcon,
  MessagesSquare,
  Milestone,
  Network,
  UsersRound,
  Workflow
} from "lucide-react";

const icons: Record<string, LucideIcon> = {
  BriefcaseBusiness,
  ChartNoAxesCombined,
  FilePenLine,
  FlaskConical,
  Handshake,
  HeartPulse,
  MessagesSquare,
  Milestone,
  Network,
  UsersRound,
  Workflow
};

export function IconBadge({ name }: { name?: string | null }) {
  const Icon = name ? icons[name] : BriefcaseBusiness;
  const Resolved = Icon || BriefcaseBusiness;
  return (
    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-teal/10 text-teal">
      <Resolved className="h-5 w-5" />
    </span>
  );
}
