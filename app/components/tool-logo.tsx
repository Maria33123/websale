import Image from "next/image";

type ToolLogoProps = {
  slug: string;
  className?: string;
};

const iconSrcBySlug: Record<string, string> = {
  chatgpt: "/icons/chatgpt.png",
  grok: "/icons/grok.png",
  gemini: "/icons/gemini.png",
  claude: "/icons/claude.png",
};

export function ToolLogo({ slug, className = "" }: ToolLogoProps) {
  const baseClass =
    "flex size-9 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-slate-200/80";
  const iconSrc = iconSrcBySlug[slug];

  if (iconSrc) {
    return (
      <span className={`${baseClass} ${className}`}>
        <Image
          src={iconSrc}
          alt=""
          width={40}
          height={40}
          aria-hidden="true"
          draggable={false}
          className="h-full w-full rounded-xl object-contain"
        />
      </span>
    );
  }

  return (
    <span className={`${baseClass} text-slate-500 ${className}`}>
      <span className="size-2 rounded-full bg-current" />
    </span>
  );
}
