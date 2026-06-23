/**
 * Single source of truth for site-wide contact and identity constants.
 *
 * Import these instead of hardcoding emails or mailto links so the contact
 * email can be changed in one place. The build-time validator
 * (scripts/validate-llms-txt.ts) checks that the static assets (llms.txt,
 * humans.txt, robots.txt, index.html) stay in sync with CONTACT_EMAIL.
 */
export const CONTACT_EMAIL = 'angel@lambertt.tech' as const

/** Ready-to-use mailto: href derived from CONTACT_EMAIL. */
export const MAILTO_EMAIL = `mailto:${CONTACT_EMAIL}` as const
