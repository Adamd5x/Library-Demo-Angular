using System.ComponentModel.DataAnnotations;

namespace Library.Common;

public class BookDto
{
    public int Id { get; set; }

    [Required]
    public string Isbn { get; set; } = null!;

    [Required]
    public string Title { get; set; } = null!;

    [Required]
    public string State { get; set; } = null!;

    [Required]
    public string Author { get; set; } = null!;
}
