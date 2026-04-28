import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Mail, ExternalLink, Award, GraduationCap, Briefcase, ChevronRight, Clock, Newspaper, HelpCircle, Users } from 'lucide-react'
import { aboutContent, type AboutLang } from './about-i18n'

const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/in/angel-lambertt-pierra-a813801a9' },
  { name: 'GitHub', url: 'https://github.com/alambertt' },
]

const SITE_URL = 'https://www.alambertt.dev'

export default function AboutPage({ lang = 'es' }: { lang?: AboutLang }) {
  const t = aboutContent[lang]
  const altSlug = t.altSlug

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = t.seo.title

    let desc = document.querySelector('meta[name="description"]') as HTMLMetaElement
    if (!desc) { desc = document.createElement('meta'); desc.name = 'description'; document.head.appendChild(desc) }
    desc.content = t.seo.description

    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) { canonical = document.createElement('link'); canonical.rel = 'canonical'; document.head.appendChild(canonical) }
    canonical.href = `${SITE_URL}/${t.slug}`

    const hreflangs = [
      { lang: 'es', href: `${SITE_URL}/sobre-mi` },
      { lang: 'en', href: `${SITE_URL}/about` },
      { lang: 'x-default', href: `${SITE_URL}/sobre-mi` },
    ]
    document.querySelectorAll('link[hreflang]').forEach(el => el.remove())
    for (const hl of hreflangs) {
      const link = document.createElement('link')
      link.rel = 'alternate'
      link.hreflang = hl.lang
      link.href = hl.href
      document.head.appendChild(link)
    }

    let script = document.querySelector('script[data-about-jsonld]') as HTMLScriptElement
    if (!script) { script = document.createElement('script'); script.type = 'application/ld+json'; script.dataset.aboutJsonld = ''; document.head.appendChild(script) }
    script.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'ProfilePage',
      dateModified: '2026-04-28',
      mainEntity: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Angel Lambertt',
        alternateName: ['Angel Lambertt', 'alambertt'],
        url: SITE_URL,
        image: `${SITE_URL}/angel-avatar.webp`,
        email: 'mailto:alambertt1991@icloud.com',
        jobTitle: ['Senior Full Stack Software Engineer', 'Cloud Engineer', 'AI Product Engineer'],
        knowsAbout: [
          { '@type': 'Thing', name: 'Full Stack Software Engineering' },
          { '@type': 'Thing', name: 'Cloud Architecture' },
          { '@type': 'Thing', name: 'Serverless Architecture' },
          { '@type': 'Thing', name: 'Infrastructure as Code' },
          { '@type': 'Thing', name: 'Artificial Intelligence', url: 'https://en.wikipedia.org/wiki/Artificial_intelligence' },
          { '@type': 'SoftwareApplication', name: 'React', url: 'https://react.dev' },
          { '@type': 'SoftwareApplication', name: 'Angular', url: 'https://angular.dev' },
          { '@type': 'SoftwareApplication', name: 'FastAPI', url: 'https://fastapi.tiangolo.com' },
          { '@type': 'SoftwareApplication', name: 'AWS CDK', url: 'https://aws.amazon.com/cdk/' },
        ],
        hasCredential: [
          { '@type': 'EducationalOccupationalCredential', name: 'AWS Certified Cloud Practitioner', recognizedBy: { '@type': 'Organization', name: 'Amazon Web Services' } },
          { '@type': 'EducationalOccupationalCredential', name: 'Google Cloud training and certification', recognizedBy: { '@type': 'Organization', name: 'Google Cloud' } },
        ],
        alumniOf: [
          { '@type': 'EducationalOrganization', name: 'Universidad de Ciencias Informaticas' },
        ],
        sameAs: [
          'https://www.linkedin.com/in/angel-lambertt-pierra-a813801a9',
          'https://github.com/alambertt',
        ],
        worksFor: {
          '@type': 'Organization',
          name: 'Argus',
        },
        address: { '@type': 'PostalAddress', addressLocality: 'Jupiter', addressRegion: 'FL', addressCountry: 'US' },
      },
    })

    let faqScript = document.querySelector('script[data-about-faq-jsonld]') as HTMLScriptElement
    if (!faqScript) { faqScript = document.createElement('script'); faqScript.type = 'application/ld+json'; faqScript.dataset.aboutFaqJsonld = ''; document.head.appendChild(faqScript) }
    faqScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/${t.slug}/#faq`,
      inLanguage: lang,
      mainEntity: t.faq.map(item => ({
        '@type': 'Question',
        name: item.q,
        acceptedAnswer: { '@type': 'Answer', text: item.a },
      })),
    })

    return () => {
      script?.remove()
      faqScript?.remove()
      document.querySelectorAll('link[hreflang]').forEach(el => el.remove())
    }
  }, [lang, t])

  return (
    <div className="min-h-screen bg-background text-foreground bg-[length:24px_24px] [background-image:radial-gradient(circle,hsl(var(--dot-grid))_1px,transparent_1px)]">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-12 md:py-20">

        {/* Header */}
        <header className="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10">
          <img
            src="/angel-avatar-sm.webp"
            srcSet="/angel-avatar-sm.webp 192w, /angel-avatar.webp 384w"
            sizes="96px"
            alt="Angel Lambertt"
            className="w-24 h-24 rounded-full border-2 border-border shadow-lg"
            width={96}
            height={96}
          />
          <div className="text-center sm:text-left">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mb-1">
              {t.heading}
            </h1>
            <p className="text-sm text-primary font-medium mb-2">{t.subtitle}</p>
            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5" />
                {t.location}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {t.lastUpdated}
              </span>
            </div>
          </div>
        </header>

        {/* Manifesto */}
        <blockquote cite={SITE_URL} className="mb-10 border-l-4 border-primary pl-6 pr-4 py-3 text-xl md:text-2xl italic font-display leading-snug text-foreground/90">
          {t.manifesto}
        </blockquote>

        {/* Bio */}
        <section className="mb-10">
          {t.bio.map((paragraph, i) => (
            <p key={i} className="text-base text-muted-foreground leading-relaxed mb-4">
              {paragraph}
            </p>
          ))}
        </section>

        {/* Seeking — hidden when empty */}
        {t.seeking && t.roles.length > 0 && (
        <section className="mb-10 p-4 rounded-lg bg-primary/5 border border-primary/20">
          <p className="text-sm font-medium text-primary mb-2">{t.seeking}</p>
          <div className="flex flex-wrap gap-2">
            {t.roles.map((role) => (
              <span key={role} className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                {role}
              </span>
            ))}
          </div>
        </section>
        )}

        {/* Timeline */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-4 h-4 text-primary" />
            {t.timelineHeading}
          </h2>
          <div className="space-y-3">
            {t.timeline.map((item) => (
              <div key={item.period} className="flex gap-4 p-3 rounded-lg bg-card border border-border">
                <span className="text-xs font-mono text-primary whitespace-nowrap pt-0.5">{item.period}</span>
                <div>
                  <p className="font-medium text-foreground text-sm">{item.role}</p>
                  <p className="text-xs text-muted-foreground">{item.company} — {item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-primary" />
            {t.projectsHeading}
          </h2>
          <div className="space-y-2">
            {t.projects.map((project) => (
              <Link
                key={project.name}
                to={project.href}
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/30 hover:bg-primary/5 transition-all group"
              >
                <div>
                  <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{project.name}</p>
                  <p className="text-xs text-muted-foreground">{project.desc}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Award className="w-4 h-4 text-primary" />
            {t.certificationsHeading}
          </h2>
          <div className="space-y-3">
            {t.certifications.map((cert) => (
              <div key={cert.org} className="p-3 rounded-lg bg-card border border-border">
                <p className="font-medium text-foreground text-sm mb-1">{cert.org}</p>
                <div className="flex flex-wrap gap-1.5">
                  {cert.items.map((item) => (
                    <span key={item} className="px-2 py-0.5 rounded text-xs bg-muted/30 text-muted-foreground">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <GraduationCap className="w-4 h-4 text-primary" />
            {t.educationHeading}
          </h2>
          <ul className="space-y-1.5">
            {t.education.map((item) => (
              <li key={item} className="text-sm text-muted-foreground">{item}</li>
            ))}
          </ul>
        </section>

        {/* Press */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Newspaper className="w-4 h-4 text-primary" />
            {t.pressHeading}
          </h2>
          {t.press.map((item) => (
            <a
              key={item.href}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-all group"
            >
              <div>
                <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{item.title}</p>
                <p className="text-xs text-muted-foreground">{item.publisher} · {item.date}</p>
              </div>
              <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
            </a>
          ))}
        </section>

        {/* Community */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Users className="w-4 h-4 text-primary" />
            {t.communityHeading}
          </h2>
          <div className="space-y-2">
            {t.community.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-lg bg-card border border-border hover:border-primary/30 transition-all group"
              >
                <div>
                  <p className="font-medium text-foreground text-sm group-hover:text-primary transition-colors">{item.title}</p>
                  <p className="text-xs text-muted-foreground">{item.platform}</p>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-muted-foreground shrink-0" />
              </a>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-primary" />
            {t.faqHeading}
          </h2>
          <div className="space-y-4">
            {t.faq.map((item) => (
              <div key={item.q} className="p-4 rounded-lg bg-card border border-border">
                <p className="font-medium text-foreground text-sm mb-2">{item.q}</p>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Connect */}
        <section className="mb-10">
          <h2 className="font-display text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-primary" />
            {t.connectHeading}
          </h2>

          <a
            href={`mailto:${t.email}`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover:bg-primary/90 transition-colors mb-4"
          >
            <Mail className="w-4 h-4" />
            {t.email}
          </a>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {SOCIAL_LINKS.map((link) => (
              <a
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-card border border-border text-sm text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
              >
                <ExternalLink className="w-3 h-3 text-primary shrink-0" />
                {link.name}
              </a>
            ))}
          </div>
        </section>

        {/* Language toggle */}
        <div className="text-center pt-6 border-t border-border">
          <Link
            to={`/${altSlug}`}
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            {lang === 'es' ? 'Read in English →' : 'Leer en Español →'}
          </Link>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} Angel Lambertt. {lang === 'es' ? 'Todos los derechos reservados.' : 'All rights reserved.'}
          </p>
        </footer>
      </main>
    </div>
  )
}
