type ToolLogoProps = {
  slug: string;
  className?: string;
};

function ChatGptMark() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4.4c2.4-1.3 5.3.4 5.3 3.1 2.5.5 3.7 3.5 2 5.5 1.2 2.3-.5 5.1-3.2 5.1-1.1 2.2-4.3 2.7-6 .8-2.4 1.3-5.3-.4-5.3-3.1-2.5-.5-3.7-3.5-2-5.5-1.2-2.3.5-5.1 3.2-5.1 1.1-2.2 4.3-2.7 6-.8Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.45"
      />
      <path
        d="M8.1 7.9 12 5.7l3.9 2.2v4.5L12 14.6l-3.9-2.2V7.9Zm0 4.5v4.1m7.8-4.1v-4m-7.8 0 3.9 2.2 3.9-2.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.25"
      />
    </svg>
  );
}

function ClaudeMark() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4.5v15M4.5 12h15M6.7 6.7l10.6 10.6M17.3 6.7 6.7 17.3"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth="2"
      />
      <circle cx="12" cy="12" r="2.2" fill="currentColor" />
    </svg>
  );
}

function GeminiMark() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path d="M12 3.4c1 4.2 2.8 6 7 7-4.2 1-6 2.8-7 7-1-4.2-2.8-6-7-7 4.2-1 6-2.8 7-7Z" fill="url(#gemini-a)" />
      <path d="M17.3 14.1c.5 2.1 1.4 3 3.5 3.5-2.1.5-3 1.4-3.5 3.5-.5-2.1-1.4-3-3.5-3.5 2.1-.5 3-1.4 3.5-3.5Z" fill="url(#gemini-b)" />
      <defs>
        <linearGradient id="gemini-a" x1="5" x2="19" y1="17.4" y2="3.4" gradientUnits="userSpaceOnUse">
          <stop stopColor="#7C5CFF" />
          <stop offset="0.52" stopColor="#50C7F7" />
          <stop offset="1" stopColor="#8EEB9D" />
        </linearGradient>
        <linearGradient id="gemini-b" x1="13.8" x2="20.8" y1="21.1" y2="14.1" gradientUnits="userSpaceOnUse">
          <stop stopColor="#FB7185" />
          <stop offset="1" stopColor="#FDE68A" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function GrokMark() {
  return (
    <svg aria-hidden="true" className="size-5" viewBox="0 0 24 24" fill="none">
      <path
        d="M7 16.7 16.8 7M8.2 7h8.6v8.6M7.3 12.3c0-3 1.9-5.1 4.7-5.1 1.2 0 2.2.3 3 .9m1.7 3.6c0 3-1.9 5.1-4.7 5.1-1.4 0-2.5-.4-3.4-1.2"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    </svg>
  );
}

export function ToolLogo({ slug, className = "" }: ToolLogoProps) {
  const baseClass =
    "flex size-9 shrink-0 items-center justify-center rounded-xl shadow-sm ring-1";

  if (slug === "chatgpt") {
    return (
      <span
        className={`${baseClass} bg-white text-slate-950 ring-slate-200/80 ${className}`}
      >
        <ChatGptMark />
      </span>
    );
  }

  if (slug === "claude") {
    return (
      <span
        className={`${baseClass} bg-[#ec7357] text-white ring-[#ec7357]/20 ${className}`}
      >
        <ClaudeMark />
      </span>
    );
  }

  if (slug === "gemini") {
    return (
      <span
        className={`${baseClass} bg-white text-slate-950 ring-slate-200/80 ${className}`}
      >
        <GeminiMark />
      </span>
    );
  }

  if (slug === "grok") {
    return (
      <span
        className={`${baseClass} bg-slate-950 text-white ring-slate-950/10 ${className}`}
      >
        <GrokMark />
      </span>
    );
  }

  return (
    <span
      className={`${baseClass} bg-white text-slate-500 ring-slate-200/80 ${className}`}
    >
      <span className="size-2 rounded-full bg-current" />
    </span>
  );
}
