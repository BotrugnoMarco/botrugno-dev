// /llms.txt: riassunto del sito in Markdown per i modelli linguistici (proposta llmstxt.org).
// Generato dagli stessi dati delle pagine, così non va aggiornato a mano.
import type { APIRoute } from 'astro'
import { projects } from '../data/projects'
import { SITE, personSchema } from '../data/person'

export const GET: APIRoute = () => {
  const person = personSchema('en')
  // Match Ready per primo: è il progetto principale e ha la sua sezione in home
  const ordered = [...projects].sort((a, b) => Number(b.slug === 'matchready') - Number(a.slug === 'matchready'))

  const projectLines = ordered.map((p) => {
    const { github, live, appStore, playStore } = p.links
    const extra = [
      appStore && `[App Store](${appStore})`,
      playStore && `[Google Play](${playStore})`,
      github && `[source code](${github})`,
      live && `[${appStore || playStore ? 'website' : 'live'}](${live})`,
    ].filter(Boolean)
    return `- [${p.en.title}](${SITE}/en/projects/${p.slug}/): ${p.en.description}` +
      (extra.length ? ` Links: ${extra.join(', ')}.` : '') +
      ` Italian page: ${SITE}/projects/${p.slug}/`
  })

  const body = `# ${person.name}

> ${person.jobTitle} at ${person.worksFor.name} (${person.worksFor.address.addressLocality}, ${person.address.addressRegion}, Italy): ${person.description.split(': ')[1]}

botrugno.dev is his personal portfolio. It is in Italian (default, at the root) and English (under /en/); the content of the two versions is the same.

## Main pages

- [Home](${SITE}/en/): who he is, Match Ready, projects, contacts. Italian: ${SITE}/
- [Resume](${SITE}/en/cv/): experience, education, skills, certifications. Italian: ${SITE}/cv/
- [Resume PDF](${SITE}/CV_Marco_Luigi_Botrugno_EN.pdf), [Italian PDF](${SITE}/CV_Marco_Luigi_Botrugno.pdf)

## Projects

${projectLines.join('\n')}

## Profiles

${person.sameAs.map((url) => `- ${url}`).join('\n')}
`

  return new Response(body, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
}
