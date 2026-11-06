import { useCallback, useState } from 'react'
import { createPortal } from 'react-dom'
import { prefersReducedMotion } from '../../utils/motion'
import Container from '../ui/Container'
import GiftBox from './GiftBox'
import PageTransition from './PageTransition'

interface ShowcaseItem {
  id: string
  title: string
  byline: string
  description: string
  folder: string // where the box's frames are, in public/
  alt: string
}

interface ShowcaseRowProps {
  item: ShowcaseItem
  isReversed: boolean
  onOpen: () => void
}

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  {
    id: 'wine',
    title: 'Wine',
    byline: 'by Ghvinola',
    description: 'Our own wines, bottled for long dinners and good company.',
    folder: '/showcase/wine',
    alt: 'A claret wine box with the Ghvinola wordmark in gold on its lid',
  },
  {
    id: 'pair',
    title: 'Wine & Chocolate',
    byline: 'Gift box',
    description: 'A bottle of our wine and six Chocola chocolates, packed together as a gift.',
    folder: '/showcase/pair',
    alt: 'A cream gift box with the Ghvinola wordmark in wine red on its lid',
  },
  {
    id: 'chocolate',
    title: 'Chocolate',
    byline: 'by Chocola',
    description: 'Chocolate from our partners at Chocola, chosen to pair with every bottle.',
    folder: '/showcase/chocolate',
    alt: 'A kraft paper chocolate box tied with a wine red ribbon',
  },
]

function ShowcaseRow({ item, isReversed, onOpen }: ShowcaseRowProps) {
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

      <GiftBox
        folder={item.folder}
        alt={item.alt}
        label={`Open the ${item.title.toLowerCase()} box and go to the catalog`}
        onOpen={onOpen}
        className={`order-first lg:order-none lg:col-span-7 lg:row-start-1 xl:col-span-6 ${
          isReversed ? 'lg:col-start-1' : 'lg:col-start-6 xl:col-start-7'
        }`}
      />
    </article>
  )
}

export default function Showcase() {
  const [isLeaving, setIsLeaving] = useState(false)

  // Runs while the transition panel covers the page: jump to the catalog behind it and move focus there.
  const showCatalog = useCallback(() => {
    const catalog = document.getElementById('catalog')
    catalog?.scrollIntoView({ behavior: 'instant', block: 'start' })
    catalog?.focus({ preventScroll: true })
  }, [])
  const finishLeaving = useCallback(() => setIsLeaving(false), [])

  // A box was opened: go to the catalog with the panel transition, or straight away if motion is reduced.
  const handleOpen = () => {
    if (prefersReducedMotion()) showCatalog()
    else setIsLeaving(true)
  }

  return (
    <section aria-label="Our range" className="bg-wine-900 py-24 text-cream lg:py-32">
      <Container className="space-y-20 lg:space-y-28">
        {SHOWCASE_ITEMS.map((item, index) => (
          <ShowcaseRow key={item.id} item={item} isReversed={index % 2 === 1} onOpen={handleOpen} />
        ))}
      </Container>
      {/* Rendered into <body>, so it covers the fixed header too and not only this section. */}
      {isLeaving &&
        createPortal(<PageTransition label="Catalog" onCovered={showCatalog} onDone={finishLeaving} />, document.body)}
    </section>
  )
}
