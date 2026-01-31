export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatarSrc: string;
}

export const designTeam: TeamMember[] = [
  {
    id: "1",
    name: "Alex Chen",
    role: "Lead Designer",
    bio: "Design systems and product strategy. Previously at Stripe and Linear. Focus on accessibility and design tokens.",
    avatarSrc: "https://i.pravatar.cc/128?u=alex-chen",
  },
  {
    id: "2",
    name: "Jordan Lee",
    role: "UX Researcher",
    bio: "User research and usability testing. 8+ years turning insights into better flows and clearer information architecture.",
    avatarSrc: "https://i.pravatar.cc/128?u=jordan-lee",
  },
  {
    id: "3",
    name: "Sam Rivera",
    role: "Visual Designer",
    bio: "Brand, illustration, and motion. Ensures our products feel consistent and recognizable across every touchpoint.",
    avatarSrc: "https://i.pravatar.cc/128?u=sam-rivera",
  },
  {
    id: "4",
    name: "Morgan Kim",
    role: "Interaction Designer",
    bio: "Prototypes and micro-interactions. Specializes in dashboards, data viz, and complex multi-step workflows.",
    avatarSrc: "https://i.pravatar.cc/128?u=morgan-kim",
  },
  {
    id: "5",
    name: "Casey Walsh",
    role: "Content Designer",
    bio: "Copy, UX writing, and content strategy. Makes sure every message is clear, inclusive, and on-brand.",
    avatarSrc: "https://i.pravatar.cc/128?u=casey-walsh",
  },
  {
    id: "6",
    name: "Riley Park",
    role: "Design Ops",
    bio: "Tools, workflows, and design-dev handoff. Keeps the team unblocked and our design system in sync with code.",
    avatarSrc: "https://i.pravatar.cc/128?u=riley-park",
  },
  {
    id: "7",
    name: "Taylor Brooks",
    role: "Product Designer",
    bio: "End-to-end product flows and feature design. Works closely with engineering to ship on time.",
    avatarSrc: "https://i.pravatar.cc/128?u=taylor-brooks",
  },
  {
    id: "8",
    name: "Jamie Foster",
    role: "Design Technologist",
    bio: "Design systems in code, component libraries, and design-dev collaboration. Bridges Figma and React.",
    avatarSrc: "https://i.pravatar.cc/128?u=jamie-foster",
  },
  {
    id: "9",
    name: "Quinn Hayes",
    role: "Service Designer",
    bio: "Journey mapping and service blueprints. Improves cross-channel experiences and internal processes.",
    avatarSrc: "https://i.pravatar.cc/128?u=quinn-hayes",
  },
  {
    id: "10",
    name: "Reese Adams",
    role: "Design Lead",
    bio: "Leads design for core product areas. Mentors designers and aligns work with company goals.",
    avatarSrc: "https://i.pravatar.cc/128?u=reese-adams",
  },
  {
    id: "11",
    name: "Drew Collins",
    role: "Accessibility Designer",
    bio: "WCAG compliance, inclusive patterns, and assistive tech. Makes our products usable for everyone.",
    avatarSrc: "https://i.pravatar.cc/128?u=drew-collins",
  },
  {
    id: "12",
    name: "Skyler Reed",
    role: "Design Writer",
    bio: "In-app copy, help content, and design documentation. Keeps voice and tone consistent.",
    avatarSrc: "https://i.pravatar.cc/128?u=skyler-reed",
  },
];
