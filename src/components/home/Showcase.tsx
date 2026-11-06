import chocolateBoxLarge from '../../assets/showcase/chocolate-box-1800.webp'
import chocolateBoxSmall from '../../assets/showcase/chocolate-box-900.webp'
import wineBottleLarge from '../../assets/showcase/wine-bottle-1800.webp'
import wineBottleSmall from '../../assets/showcase/wine-bottle-900.webp'
import Container from '../ui/Container'

// Rendered in Blender at 3:2 and saved as WebP at 900 and 1800 px wide.
interface ShowcaseImage {
  small: string
  large: string
  alt: string
}

interface ShowcaseItem {
  id: string
  title: string
  byline: string
  description: string
  image: ShowcaseImage
}

interface ShowcaseRowProps {
  item: ShowcaseItem
  isReversed: boolean
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'wine',
    title: 'Wine',
    byline: 'by Ghvinola',
    description: 'Our own wines, bottled for long dinners and good company.',
    image: {
      small: wineBottleSmall,
      large: wineBottleLarge,
      alt: 'A bottle of Ghvinola Saperavi red wine with a cream and gold label',
    },
  },
  {
    id: 'chocolate',
    title: 'Chocolate',
    byline: 'by Chocola',
    description: 'Chocolate from our partners at Chocola, chosen to pair with every bottle.',
    image: {
      small: chocolateBoxSmall,
      large: chocolateBoxLarge,
      alt: 'An open box of twelve chocolates topped with almonds, pistachios and berries',
    },
  },
]

function ShowcaseRow({ item, isReversed }: ShowcaseRowProps) {
  return (
    <article className="grid gap-10 lg:grid-cols-12 lg:items-center lg:gap-x-8">
      <div
        className={`lg:col-span-4 lg:row-start-1 xl:col-span-3 ${
          isReversed ? 'lg:col-start-9 xl:col-start-10' : 'lg:col-start-1'
        }`}
      >
        <h2 className="font-sans text-3xl font-bold tracking-wide text-wine-300 uppercase lg:text-[2rem]">
          {item.title}
        </h2>
        <p className="mt-2 font-sans text-xs font-bold tracking-widest text-cream/60 uppercase">{item.byline}</p>
        <p className="mt-6 text-lg/relaxed text-cream/80">{item.description}</p>
      </div>

      {/* The browser picks the 900 px file on small screens and the 1800 px one on large or high-density screens. */}
      <img
        src={item.image.large}
        srcSet={`${item.image.small} 900w, ${item.image.large} 1800w`}
        sizes="(min-width: 1024px) 50vw, 100vw"
        width={1800}
        height={1200}
        loading="lazy"
        decoding="async"
        alt={item.image.alt}
        className={`order-first aspect-[3/2] w-full rounded-sm border border-cream/15 bg-wine-950 lg:order-none lg:col-span-7 lg:row-start-1 xl:col-span-6 ${
          isReversed ? 'lg:col-start-1' : 'lg:col-start-6 xl:col-start-7'
        }`}
      />
    </article>
  )
}

export default function Showcase() {
  return (
    <section aria-label="Our range" className="bg-wine-900 py-24 text-cream lg:py-40">
      <Container className="space-y-24 lg:space-y-40">
        {SHOWCASE_ITEMS.map((item, index) => (
          <ShowcaseRow key={item.id} item={item} isReversed={index % 2 === 1} />
        ))}
      </Container>
    </section>
  )
}
