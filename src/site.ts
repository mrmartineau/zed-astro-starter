// Site-wide settings. Change these first when starting a new project.

/** Name, description and contact email, shown in the layout and on pages. */
export const site = {
  name: "Astro Starter",
  description: "An opinionated Astro starter, styled with ZUI and deployed to Cloudflare Workers.",
  email: "hello@example.com",
};

/** Every page path, written once. Link to pages through these, not typed strings. */
export const routes = {
  home: "/",
  about: "/about",
  contact: "/contact",
};

/** Links in the masthead nav, in display order. */
export const navItems = [
  { label: "Home", href: routes.home },
  { label: "About", href: routes.about },
  { label: "Contact", href: routes.contact },
];
