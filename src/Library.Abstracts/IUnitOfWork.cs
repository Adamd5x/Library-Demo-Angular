using Library.Models.Entity;

namespace Library.Abstracts;

public interface IUnitOfWork : IDisposable
{
    IGenericRepository<Book> BookRepository { get; }
    IGenericRepository<StatResult> StatResultRepository { get; }
    Task SaveAsync ();
}
