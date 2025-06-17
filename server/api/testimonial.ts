import { createAvatar } from '@dicebear/core'
import { micah } from '@dicebear/collection'

interface NotionTestimonial {
  id: string
  created_time: string
  last_edited_time: string
  properties: {
    Email: {
      email: string
    }
    Review: {
      rich_text: {
        text: {
          content: string
          link: string | null
        }
        plain_text: string
      }[]
    }
    Rating: {
      select: {
        name: string
      }
    }
    Consent: {
      checkbox: boolean
    }
    'Submission time': {
      created_time: string
    }
    'Full Name': {
      title: {
        plain_text: string
      }[]
    }
  }
  url: string
  public_url: string | null
}

export function generateAvatar(name: string, gender: 'male' | 'female') {
  const avatar = createAvatar(micah, {
    seed: name,
    baseColor: ['ac6651', 'f9c9b6'],
    backgroundColor: ['b6e3f4', 'c0aede', 'd1d4f9'],
    mouth: ['laughing', 'smile', 'smirk'],
    scale: 70,
    translateY: 12,
    shirt: gender === 'female' ? ['open'] : ['collared', 'crew'],
    hair: gender === 'female' ? ['dannyPhantom', 'full', 'pixie'] : ['fonze', 'mrClean', 'turban'],
    eyebrows: gender === 'female' ? ['eyelashesDown', 'eyelashesUp'] : ['down', 'up'],
    facialHairProbability: gender === 'female' ? 0 : 100,
    earringsProbability: gender === 'female' ? 100 : 0,
  })

  return avatar.toDataUri()
}

function shortenName(name: string) {
  const [firstName, lastName] = name.split(' ')
  return `${firstName[0]}. ${lastName}`
}

export default defineCachedEventHandler<Promise<Testimonial[]>>(
  async () => {
    try {
      const config = useRuntimeConfig()

      const notionDbId = config.private.notionDbId as unknown as { testimonial: string }
      const data = await notion.databases.query({ database_id: notionDbId.testimonial })

      const testimonials = data.results as unknown as NotionTestimonial[]

      if (!testimonials) throw createError({ statusCode: 500, statusMessage: 'testimonials is undefined' })

      return testimonials
        .map(({ properties }) => {
          if (!properties.Consent.checkbox) return null

          const name = notionTextStringify(properties['Full Name'].title)
          const gender = 'female'
          const message = notionTextStringify(properties.Review.rich_text)

          return {
            image: generateAvatar(name, gender),
            name: shortenName(name),
            message,
          }
        })
        .filter((value) => !!value)
    } catch (error: unknown) {
      console.error('API testimonials GET', error)

      throw createError({
        statusCode: 500,
        statusMessage: 'Some Unknown Error Found',
      })
    }
  },
  { maxAge: 60 * 60 }
)
