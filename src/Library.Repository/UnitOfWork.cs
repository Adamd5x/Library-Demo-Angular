using Library.Abstracts;
using Library.Models.Entity;

namespace Library.Repository;

public class UnitOfWork(LibraryDbContext dbContext) : IUnitOfWork
{
    private bool _disposed = false;

    private IGenericRepository<Book> _bookRepository;
    private IGenericRepository<StatResult> _statResultRepository;

    public IGenericRepository<Book> BookRepository => _bookRepository ??= new GenericRepository<Book>(dbContext);
    public IGenericRepository<StatResult> StatResultRepository => _statResultRepository ??= new GenericRepository<StatResult> (dbContext);

    public async Task SaveAsync ()
    {
        await dbContext.SaveChangesAsync();
    }

    #region Dispose
    public void Dispose ()
    {
        Dispose(true);
        GC.SuppressFinalize (this);
    }

    protected virtual void Dispose(bool disposing)
    {
        if (!_disposed) 
        {
            if (disposing) 
            { 
                dbContext.Dispose();
            }
            _disposed = true;
        }
    }
    #endregion Dispose
}
