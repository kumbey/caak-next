export const menu_data = [
  {
    name: "Миний профайл",
    href: `/user/:userId/profile`,
    icon: <span className={"icon-fi-rs-profile text-18px5 w-5 h-5 mr-2"} />,
    user: true,
  },
  {
    name: "Бүлгүүд",
    href: "#",
    icon: <span className={"icon-fi-rs-group text-18px5 w-5 h-5 mr-2"} />,
    user: true,
  },
  {
    name: "Шөнийн горим",
    href: "#",
    icon: <span className={"icon-fi-rs-view text-18px5 w-5 h-5 mr-2"} />,
    user: true,
  },
  {
    name: "Шинэчлэлт",
    href: "#",
    icon: <span className={"icon-fi-rs-resend text-18px w-5 h-5 mr-2"} />,
    user: true,
  },
  {
    name: "Тохиргоо",
    href: `/user/:userId/settings`,
    icon: <span className={" icon-fi-rs-settings text-18px w-5 h-5 mr-2"} />,
  },
  {
    name: "Тусламж",
    href: "#",
    icon: <span className={"icon-fi-rs-help text-18px w-5 h-5 mr-2"} />,
  },
  {
    name: "Гарах",
    href: "/logout",
    icon: <span className={"icon-fi-rs-exit text-18px w-5 h-5 mr-2"} />,
  },
];
