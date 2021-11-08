export const post_menu_data = [
  {
    name: "Бүлэгт элсэх",
    href: `/user/:userId/profile`,
    icon: <span className={"icon-fi-rs-add-group-f  mr-px-12 text-16px"} />,
    user: true,
  },
  {
    name: "Постыг засах",
    href: "#",
    icon: <span className={"icon-fi-rs-pencil mr-px-12 text-16px"} />,
    user: true,
  },
  {
    name: "Постыг хадгалах",
    href: "#",
    icon: <span className={"icon-fi-rs-bookmark mr-px-12 text-16px"} />,
    user: true,
  },
  {
    name: "Зөрчилтэй мэдээлэл",
    href: "#",
    icon: <span className={"icon-fi-rs-report mr-px-12 text-16px"} />,
    user: true,
  },
  {
    name: "Дахин харагдуулахгүй",
    href: `/user/:userId/settings`,
    icon: <span className={"icon-fi-rs-hide mr-px-12 text-16px"} />,
  },
];
