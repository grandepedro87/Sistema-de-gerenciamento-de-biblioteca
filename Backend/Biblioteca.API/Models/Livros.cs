using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;

namespace Biblioteca.API.Models
{
    public class Livros
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O título do livro é obrigatório.")]
        public string Titulo { get; set; } = string.Empty;

        [Required(ErrorMessage = "O autor do livro é obrigatório.")]
        public string Autor { get; set; } = string.Empty;

        [Required(ErrorMessage = "A editora do livro é obrigatória.")]
        public string Editora { get; set; } = string.Empty;

        [Range(0, 2100, ErrorMessage = "O ano de publicação é inválido.")]
        public int AnoPublicacao { get; set; }

        [Range(0, int.MaxValue, ErrorMessage = "A quantidade disponível deve ser um número positivo.")]
        public int QuantidadeDisponivel { get; set; }
    }
}