import chocolateBoxLarge from '../../assets/showcase/gift-box-chocolate-1800.webp'
import chocolateBoxSmall from '../../assets/showcase/gift-box-chocolate-900.webp'
import pairBoxLarge from '../../assets/showcase/gift-box-pair-1800.webp'
import pairBoxSmall from '../../assets/showcase/gift-box-pair-900.webp'
import wineBoxLarge from '../../assets/showcase/gift-box-wine-1800.webp'
import wineBoxSmall from '../../assets/showcase/gift-box-wine-900.webp'
import Container from '../ui/Container'

// The open gift boxes, rendered in Blender at 3:2 and saved as WebP at 900 and 1800 px wide.
// Their background is baked in as the section's wine-900, so the boxes float on it with no visible edge.
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
      small: wineBoxSmall,
      large: wineBoxLarge,
      alt: 'An open claret gift box with a bottle of Ghvinola Saperavi lying on cream satin',
    },
  },
  {
    id: 'pair',
    title: 'Wine & Chocolate',
    byline: 'Gift box',
    description: 'A bottle of our wine and six Chocola chocolates, packed together as a gift.',
    image: {
      small: pairBoxSmall,
      large: pairBoxLarge,
      alt: 'An open cream gift box with a bottle of Ghvinola Saperavi and six Chocola chocolates on wine red velvet',
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
      alt: 'An open kraft paper box of twelve Chocola chocolates topped with almonds, pistachios and berries',
    },
  },
]

function ShowcaseRow({ item, isReversed }: ShowcaseRowProps) {
  return (
    <article className="grid gap-6 lg:grid-cols-12 lg:items-center lg:gap-x-8">
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
        className={`order-first aspect-[3/2] w-full lg:order-none lg:col-span-7 lg:row-start-1 xl:col-span-6 ${
          isReversed ? 'lg:col-start-1' : 'lg:col-start-6 xl:col-start-7'
        }`}
      />
    </article>
  )
}

export default function Showcase() {
  return (
    <section aria-label="Our range" className="bg-wine-900 py-24 text-cream lg:py-32">
      <Container className="space-y-20 lg:space-y-28">
        {SHOWCASE_ITEMS.map((item, index) => (
          <ShowcaseRow key={item.id} item={item} isReversed={index % 2 === 1} />
        ))}
      </Container>
    </section>
  )
}
