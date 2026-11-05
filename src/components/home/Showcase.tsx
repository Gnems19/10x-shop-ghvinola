import Container from '../ui/Container'

interface ShowcaseItem {
  id: string
  title: string
  byline: string
  description: string
  imageLabel: string
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
    imageLabel: 'Wine bottle photo',
  },
  {
    id: 'chocolate',
    title: 'Chocolate',
    byline: 'by Chocola',
    description: 'Chocolate from our partners at Chocola, chosen to pair with every bottle.',
    imageLabel: 'Chocolate photo',
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

      <div
        aria-hidden="true"
        className={`order-first grid aspect-[3/2] place-items-center rounded-sm border border-cream/15 bg-linear-to-br from-wine-800 to-wine-950 lg:order-none lg:col-span-7 lg:row-start-1 xl:col-span-6 ${
          isReversed ? 'lg:col-start-1' : 'lg:col-start-6 xl:col-start-7'
        }`}
      >
        <span className="font-sans text-xs font-bold tracking-widest text-cream/40 uppercase">{item.imageLabel}</span>
      </div>
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
