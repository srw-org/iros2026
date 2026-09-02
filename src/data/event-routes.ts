export const HUB_DOMAIN = "space-robots.org";
export const EVENT_SLUG = "iros2026";
export const EVENT_CANONICAL_PATH = "/events/iros2026/";

export const canonicalEventUrl = (_slug?: string) =>
  `https://${HUB_DOMAIN}${EVENT_CANONICAL_PATH}`;
