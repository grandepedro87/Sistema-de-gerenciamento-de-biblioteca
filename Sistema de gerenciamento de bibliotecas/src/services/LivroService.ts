import api from './Api';
import type { Livro } from '../types/Livros';

export async function listarLivros(): Promise<Livro[]> {
    const response = await api.get<Livro[]>('/livros');
    return response.data;
}

export async function cadastrarLivro(livro: Omit<Livro, 'id'>): Promise<Livro> {
    const response = await api.post<Livro>('/livros', livro);
    return response.data;
}

export async function atualizarLivro(id: number, livro: Livro): Promise<void> {
    await api.put(`/livros/${id}`, livro);
}

export async function deletarLivro(id: number): Promise<void> {
    await api.delete(`/livros/${id}`);
}