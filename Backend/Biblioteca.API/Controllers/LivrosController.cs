using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Biblioteca.API.Data;
using Biblioteca.API.Models;


namespace Biblioteca.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LivrosController : ControllerBase
    {
        private readonly BibliotecaDbContext _context;

        public LivrosController(BibliotecaDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Livros>>> GetLivros()
        {
            return await _context.Livros.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Livros>> GetLivro(int id)
        {
            var livro = await _context.Livros.FindAsync(id);

            if (livro == null)
            {
                return NotFound();
            }

            return livro;
        }

        [HttpPost]
        public async Task<ActionResult<Livros>> PostLivro(Livros livro)
        {
            _context.Livros.Add(livro);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetLivro", new { id = livro.Id }, livro);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutLivro(int id, Livros livro)
        {
            if (id != livro.Id)
            {
                return BadRequest();
            }

            _context.Entry(livro).State = EntityState.Modified;

            var livroExistente = await _context.Livros.FindAsync(id);
            if (livroExistente == null)
            {
                return NotFound();
            }

            livroExistente.Titulo = livro.Titulo;
            livroExistente.Autor = livro.Autor;
            livroExistente.Editora = livro.Editora;
            livroExistente.AnoPublicacao = livro.AnoPublicacao;
            livroExistente.QuantidadeDisponivel = livro.QuantidadeDisponivel;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteLivro(int id)
        {
            var livro = await _context.Livros.FindAsync(id);
            if (livro == null)
            {
                return NotFound();
            }

            _context.Livros.Remove(livro);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}