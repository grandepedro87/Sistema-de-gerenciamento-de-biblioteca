import { useEffect, useState } from 'react'
import Search from './components/Search'
import Buttons from './components/Buttons'
import type { Livro } from './types/Livros'
import { listarLivros,
  cadastrarLivro,
  atualizarLivro as atualizarLivroAPI
 } from './services/LivroService'
import './App.css'
import AddBook from './components/AddBook'
import UpdateBook from './components/UpdateBook'

function App() {
  const [livros, setLivros] = useState<Livro[]>([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [livroParaAtualizar, setLivroParaAtualizar] = useState<Livro | null>(null)

  async function adicionarLivro(novoLivro: Omit<Livro, 'id'>) {
    try {
    await cadastrarLivro(novoLivro)

    await carregarLivros()

    setMostrarFormulario(false)
    alert('Livro adicionado com sucesso!')
    }
    catch (error) {
      console.error('Erro ao adicionar livro:', error)
      alert('Erro ao adicionar livro. Por favor, tente novamente.')
    }
  }

  async function carregarLivros() {
try {
  const dados = await listarLivros()
  setLivros(dados)
} catch (error) {
  console.error('Erro ao carregar livros:', error)
}
  }
  useEffect(() => {
    carregarLivros()
  }, [])
 
async function handleAtualizarLivro(
  id: number,
  livroAtualizado: Omit<Livro, 'id'>
) {
  try {
    await atualizarLivroAPI(id, { id, ...livroAtualizado })

    await carregarLivros()

    setLivroParaAtualizar(null)
    alert('Livro atualizado com sucesso!')
  } catch (error) {
    console.error('Erro ao atualizar livro:', error)
    alert('Erro ao atualizar livro. Por favor, tente novamente.')
  }
}

  return (
    <>
      <Search />
      <Buttons
          onList={carregarLivros}
          onAdd={() => setMostrarFormulario(true)}
          onUpdate={() => setLivroParaAtualizar(livros[0])}
          onDelete={() => console.log('Excluir livro')}
        />
        {mostrarFormulario && (
          <AddBook onAdd={adicionarLivro} />
        )}

        {livroParaAtualizar && (
          <UpdateBook
            livro={livroParaAtualizar}
            onUpdate={(livro) => {
              const { id, ...livroAtualizado } = livro
              return handleAtualizarLivro(id, livroAtualizado)
            }}
            onCancel={() => setLivroParaAtualizar(null)}
          />
        )}

      <section className="livros-section">
        <h2>Livros Disponíveis</h2>

        {livros.length === 0 ? (
          <p>Nenhum livro disponível.</p>
        ) : (
          <ul>
            {livros.map((livro) => (
              <li key={livro.id}>
                <h3>{livro.titulo}</h3>
                <p>Autor: {livro.autor}</p>
                <p>Editora: {livro.editora}</p>
                <p>Ano de Publicação: {livro.anoPublicacao}</p>
                <p>Quantidade disponível: {livro.quantidadeDisponivel}</p>
                <button onClick={() => setLivroParaAtualizar(livro)}>Atualizar</button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}

export default App
