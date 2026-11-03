import { useState } from 'react'
import type { FormEvent } from 'react'
import type { Livro } from '../types/Livros'

interface UpdateBookProps {
    livro: Livro
    onUpdate: (livro: Livro) => void
    onCancel: () => void
}

export default function UpdateBook({
    livro,
    onUpdate,
    onCancel
}: UpdateBookProps) {

    const [titulo, setTitulo] = useState(livro.titulo)
    const [autor, setAutor] = useState(livro.autor)
    const [editora, setEditora] = useState(livro.editora)
    const [anoPublicacao, setAnoPublicacao] = useState(livro.anoPublicacao)
    const [quantidadeDisponivel, setQuantidadeDisponivel] = useState(livro.quantidadeDisponivel)

    function handleSubmit(event: FormEvent<HTMLFormElement>) {
        event.preventDefault()

        onUpdate({
            id: livro.id,
            titulo,
            autor,
            editora,
            anoPublicacao,
            quantidadeDisponivel
        })
    }

    return (
        <form onSubmit={handleSubmit} className="update-book-form">
            <h2>Atualizar livro</h2>

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
                placeholder="Ano de publicação"
                value={anoPublicacao}
                onChange={(e) => setAnoPublicacao(Number(e.target.value))}
                min={1000}
                max={2100}
                required
            />

            <input
                type="number"
                placeholder="Quantidade disponível"
                value={quantidadeDisponivel}
                onChange={(e) => setQuantidadeDisponivel(Number(e.target.value))}
                min={0}
                max={10000}
                required
            />

            <button type="submit">Salvar alterações</button>
            <button type="button" onClick={onCancel}>Cancelar</button>
        </form>
    )
}