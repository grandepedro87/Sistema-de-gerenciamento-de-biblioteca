import { useState } from 'react'
import type { FormEvent } from 'react'

interface SearchProps {
  onSearch: (termo: string) => void
}

export default function Search({ onSearch }: SearchProps) {
  const [termo, setTermo] = useState('')

  function handleSearch(event: FormEvent<HTMLFormElement>) {
  event.preventDefault()
  onSearch(termo)
}

  return (
    <section id="books" className="books">
      <div id="search-container">
        <form onSubmit={handleSearch}>
          <input
            type="text"
            id="search-input"
            placeholder="Search for books..."
            value={termo}
            onChange={(e) => setTermo(e.target.value)}
          />
          <button id="search-button" type="submit">
            Search
          </button>
        </form>
      </div>
    </section>
  )
}