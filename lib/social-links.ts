export type SocialIconName =
  | "github"
  | "linkedin"
  | "instagram"
  | "facebook"
  | "twitter";

export type SocialLink = {
  label: string;
  href: string;
  icon: SocialIconName;
};

const configuredLinks = [
  {
    label: "GitHub",
    href: "https://github.com/hamzabhulla",
    icon: "github" as const,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/hamza-mohsin-67b00840a",
    icon: "linkedin" as const,
  },
  {
    label: "Instagram @hamzabhulla_",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL?.trim() || "https://www.instagram.com/hamzabhulla_/",
    icon: "instagram" as const,
  },
  {
    label: "Facebook @hamzabhulla.dev",
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL?.trim() || "https://www.facebook.com/hamzabhulla.dev/",
    icon: "facebook" as const,
  },
  {
    label: "X @hamzabuild",
    href: "https://x.com/hamzabuild",
    icon: "twitter" as const,
  },
];

export const socialLinks: SocialLink[] = configuredLinks.filter(
  (link): link is (typeof configuredLinks)[number] & { href: string } =>
    Boolean(link.href),
);
