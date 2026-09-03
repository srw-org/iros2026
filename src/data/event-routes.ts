export const HUB_DOMAIN = "space-robots.org";
export const HUB_URL = "https://space-robots.org";
export const EVENT_ID = "IROS-2026";
export const EVENT_SLUG = "iros2026";
export const EVENT_CANONICAL_PATH = "/events/iros2026/";

export const canonicalEventUrl = (_slug?: string) =>
  `${HUB_URL}${EVENT_CANONICAL_PATH}`;

export type NavEdition = { id: string; label: string; href: string };

/** Snapshot of the hub's event list; refresh with `srw-event refresh`. */
export const navEditions: NavEdition[] = [
  {
    "id": "IROS-2026",
    "label": "IROS 2026",
    "href": "https://space-robots.org/events/iros2026/"
  },
  {
    "id": "CAI-2026",
    "label": "IEEE CAI 2026",
    "href": "https://space-robots.org/events/cai2026/"
  },
  {
    "id": "SMC-2025",
    "label": "IEEE SMC-IT/SCC 2025",
    "href": "https://space-robots.org/events/smcit2025/"
  },
  {
    "id": "ICRA-2026",
    "label": "ICRA 2026",
    "href": "https://space-robots.org/events/icra2026/"
  }
];

export const externalEditions: NavEdition[] = [
  {
    "id": "RSS-2025",
    "label": "RSS 2025",
    "href": "https://albee.github.io/space-robotics-rss/"
  },
  {
    "id": "SMC-2024",
    "label": "IEEE SMC-IT/SCC 2024",
    "href": "https://2024.smcit-scc.space/workshop-srw.html"
  }
];
