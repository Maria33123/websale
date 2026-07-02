"use client";

const TELEGRAM_URL = "https://t.me/coreychen111";

/**
 * WhatsApp 链接格式：
 * https://wa.me/国家区号手机号
 *
 * 例如英国手机号 +44 7123 456789：
 * https://wa.me/447123456789
 *
 * 注意：不要写 +、空格、横线、括号。
 */
const WHATSAPP_URL = "https://wa.me/你的号码";

function ChatIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-6 w-6"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M7.5 18.5 4 20l1.1-3.7A8 8 0 1 1 7.5 18.5Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M8.5 11.5h.01M12 11.5h.01M15.5 11.5h.01"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.4"
      />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M21.8 4.4c.3-1.3-.9-2.2-2-1.7L3.4 9.1c-1.2.5-1.2 2.1.1 2.5l4.1 1.3 1.6 5.1c.4 1.2 1.9 1.5 2.7.5l2.3-2.9 4.2 3.1c1 .7 2.4.2 2.6-1L21.8 4.4ZM8.2 12.1l9.7-5.9-7.7 7.1-.3 3.1-1.1-3.7-.6-.6Z" />
    </svg>
  );
}

function WhatsAppIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
    >
      <path
        d="M6.2 19.1 4 20l.8-2.4A8.1 8.1 0 1 1 6.2 19.1Z"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
      <path
        d="M9.2 8.7c.2-.5.4-.5.7-.5h.5c.2 0 .4.1.5.4l.6 1.4c.1.3.1.5-.1.7l-.4.5c-.1.2-.1.3 0 .5.3.6.8 1.2 1.3 1.6.6.5 1.1.8 1.8 1 .2.1.4.1.5-.1l.6-.7c.2-.2.4-.2.7-.1l1.4.7c.3.2.4.3.4.6 0 .6-.2 1.1-.6 1.5-.4.4-1.1.6-1.7.5-1.4-.2-2.8-.9-4.2-2.1-1.5-1.3-2.4-2.7-2.8-4.1-.2-.6 0-1.2.3-1.7.1-.1.3-.3.5-.4Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ContactSupport({ lang = "en" }: { lang?: "en" | "zh" }) {
  const isEn = lang === "en";

  const buttonClassName =
    "inline-flex min-w-[170px] items-center justify-center gap-3 rounded-2xl border border-[#159b7b] bg-white px-6 py-4 text-base font-bold text-[#0f8f72] shadow-sm transition hover:-translate-y-0.5 hover:bg-gradient-to-r hover:from-[#159b7b] hover:to-[#0f8f72] hover:text-white hover:shadow-[0_16px_30px_rgba(15,143,114,0.25)]";

  return (
    <section className="mb-8 mt-6 rounded-[32px] border border-slate-200/70 bg-white/80 px-7 py-6 shadow-[0_18px_55px_rgba(15,23,42,0.08)] backdrop-blur-md sm:px-8 sm:py-6">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
            <ChatIcon />
          </div>

          <div className="pt-1">
            <h2 className="text-xl font-bold tracking-tight text-slate-950">
              {isEn ? "Contact Support Before Purchase" : "联系客服购买"}
            </h2>

            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-500 sm:text-base">
              {isEn
                ? "If you have any questions, please contact us via Telegram or WhatsApp before ordering to confirm product details, availability, usage instructions, and after-sales policy."
                : "购买前如有疑问，请先通过 Telegram 或 WhatsApp 联系客服确认商品详情、库存状态、使用方式和售后规则。"}
            </p>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonClassName}
          >
            <TelegramIcon />
            Telegram
          </a>

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className={buttonClassName}
          >
            <WhatsAppIcon />
            WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}