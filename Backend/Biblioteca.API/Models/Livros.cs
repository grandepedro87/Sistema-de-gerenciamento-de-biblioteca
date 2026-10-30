using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Biblioteca.API.Models
{
    public class Livros
    {
        public int Id { get; set; }

        public string Titulo { get; set; } = string.Empty;

        public string Autor { get; set; } = string.Empty;

        public string Editora { get; set; } = string.Empty;

        public int AnoPublicacao { get; set; }

        public int QuantidadeDisponivel { get; set; }
    }
}