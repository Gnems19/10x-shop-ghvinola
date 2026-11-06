// Publishes products.json as a DummyJSON custom response and prints its URL for CATALOG_URL in src/api/products.ts.
// Run with `node catalog/publish.mjs`. A URL can't be edited and expires after 90 days, so any change needs a new one.
import { readFile } from 'node:fs/promises'

const json = JSON.parse(await readFile(new URL('./products.json', import.meta.url), 'utf8'))

const response = await fetch('https://dummyjson.com/c/generate', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ json, method: 'GET' }),
})

if (!response.ok) {
  throw new Error(`POST /c/generate failed with status ${response.status}`)
}

const { url } = await response.json()
console.log(url)
