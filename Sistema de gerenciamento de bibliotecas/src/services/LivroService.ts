import api from './api';
import type { Livro } from '../types/Livros';

export async function listarLivros(): Promise<Livro[]> {
    const response = await api.get<Livro[]>('/livros');
    return response.data;
}

export async function cadastrarLivro(livro: Omit<Livro, 'id'>): Promise<Livro> {
    const response = await api.post<Livro>('/livros', livro);
    return response.data;
}