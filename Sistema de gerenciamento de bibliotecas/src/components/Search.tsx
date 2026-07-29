export default function Search() {
  return (
    <section id="books" className="books">
        <div id="search-container">
            <input type="text" id="search-input" placeholder="Search for books..." />
        </div>
        <div id="Buttons" className="buttons">
            <button id="search-button">Search</button>
        </div>
    </section>
  )
}