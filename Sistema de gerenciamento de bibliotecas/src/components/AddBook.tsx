import { useState } from 'react'
import type { Livro } from '../types/Livros'
import type { FormEvent } from 'react'

interface AddBookProps {
  onAdd: (livro: Omit<Livro, 'id'>) => void
}

export default function AddBook({ onAdd }: AddBookProps) {
  const [titulo, setTitulo] = useState('')
  const [autor, setAutor] = useState('')
  const [editora, setEditora] = useState('')
  const [anoPublicacao, setAnoPublicacao] = useState<number | ''>('')
  const [quantidadeDisponivel, setQuantidadeDisponivel] = useState<number | ''>('')

  function handleSubmit(event: FormEvent) {
    event.preventDefault()

    onAdd({
        titulo,
        autor,
        editora,
        anoPublicacao: Number(anoPublicacao),
        quantidadeDisponivel: Number(quantidadeDisponivel),
    });
}

    return (
        <form onSubmit={handleSubmit} className="add-book-form">
            <input
                type="text"
                placeholder="Título"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Autor"
                value={autor}  
                onChange={(e) => setAutor(e.target.value)}
                required
            />

            <input
                type="text"
                placeholder="Editora"
                value={editora}
                onChange={(e) => setEditora(e.target.value)}
                required
            />

            <input
                type="number"
                placeholder="Ano de Publicação"
                value={anoPublicacao}
                onChange={(e) => setAnoPublicacao(e.target.value ? Number(e.target.value) : '')}
                min={0}
                max={2100}
                required
            />

            <input
                type="number"
                placeholder="Quantidade Disponível"
                value={quantidadeDisponivel}
                onChange={(e) => setQuantidadeDisponivel(e.target.value ? Number(e.target.value) : '')}
                min={0}
                max={10000}
                required
            />

            <button type="submit">Adicionar Livro</button>
        </form>
    ) 
}
