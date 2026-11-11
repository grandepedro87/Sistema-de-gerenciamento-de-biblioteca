import { useState } from 'react'
import Search from './components/Search'
import Buttons from './components/Buttons'
import type { Livro } from './types/Livros'
import { listarLivros,
  cadastrarLivro,
  atualizarLivro as atualizarLivroAPI,
  deletarLivro
 } from './services/LivroService'
import './App.css'
import AddBook from './components/AddBook'
import UpdateBook from './components/UpdateBook'

function App() {
  const [livros, setLivros] = useState<Livro[]>([])
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [livroParaAtualizar, setLivroParaAtualizar] = useState<Livro | null>(null)
  const [mostrarlivros, setMostrarLivros] = useState(false)
  const [livroPesquisado, setLivroPesquisado] = useState<Livro | null>(null)
  const [pesquisaRealizada, setPesquisaRealizada] = useState(false)

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

async function pesquisarLivro(termo: string) {
  if (!termo.trim()) {
    setLivroPesquisado(null)
    setPesquisaRealizada(false)
    return
  }

  try {
    const dados = await listarLivros()

    const resultado = dados.find((livro) =>
      livro.titulo.toLowerCase().includes(termo.toLowerCase()) ||
      livro.autor.toLowerCase().includes(termo.toLowerCase())
    )

    setLivroPesquisado(resultado ?? null)
    setPesquisaRealizada(true)
    setMostrarLivros(false)
  } catch (error) {
    console.error('Erro ao pesquisar livro:', error)
    alert('Erro ao realizar a pesquisa.')
  }
}
 
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

async function handleDeletarLivro(id: number) {
  const confirmar = window.confirm('Tem certeza que deseja deletar este livro?')
  if (!confirmar) return

  try {
    await deletarLivro(id)
    await carregarLivros()
    alert('Livro deletado com sucesso!')
  }catch (error) {
    console.error('Erro ao deletar livro:', error)
    alert('Erro ao deletar livro. Por favor, tente novamente.')
  }
}

  return (
    <>
      <Search onSearch={pesquisarLivro} />

      {pesquisaRealizada && (
      <section className="livros-section">
        <h2>Resultado da pesquisa</h2>

        {livroPesquisado ? (
          <div>
            <h3>{livroPesquisado.titulo}</h3>
            <p>Autor: {livroPesquisado.autor}</p>
            <p>Editora: {livroPesquisado.editora}</p>
            <p>Ano de publicação: {livroPesquisado.anoPublicacao}</p>
            <p>Quantidade disponível: {livroPesquisado.quantidadeDisponivel}</p>
          </div>
        ) : (
          <p>Nenhum livro encontrado.</p>
        )}
      </section>
    )}

      <Buttons
          onList={async () => {
          await carregarLivros()
          setMostrarLivros(true)
          setPesquisaRealizada(false)
          setLivroPesquisado(null)
        }}
          onAdd={() => setMostrarFormulario(true)}
          onUpdate={() => setLivroParaAtualizar(livros[0])}
          onDelete={() => {}}
        />
        {mostrarFormulario && (
          <AddBook onAdd={adicionarLivro}
          onCancel={() => setMostrarFormulario(false)} />
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

      {mostrarlivros && (
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
                  <button onClick={() => handleDeletarLivro(livro.id)}>Deletar</button>
                </li>
              ))}
            </ul>
          )}
        </section>
      )}
    </>
  )
}

export default App
