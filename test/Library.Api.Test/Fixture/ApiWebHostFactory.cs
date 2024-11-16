using Library.Abstracts;
using Library.Models.Entity;
using Library.Repository;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;


namespace Library.Api.Test.Fixture;

public class ApiWebHostFactory: WebApplicationFactory<Program>
{
    private const string TestInMemoryDatabaseName = "LibraryTestDb";

    protected override void ConfigureWebHost (IWebHostBuilder builder)
    {
        builder.ConfigureServices (services => {
        ServiceDescriptor? dbContextOptions = services.SingleOrDefault(service => service.ServiceType == typeof(DbContextOptions<LibraryDbContext>));
        if (dbContextOptions is not null)
        {
            services.Remove (dbContextOptions);
            services.AddDbContext<LibraryDbContext> (options =>
            {
                options.UseInMemoryDatabase (TestInMemoryDatabaseName);
            });
        }

        var emptyStatResult = new List<StatResult> ()
        {
            new () { Authors = default, AvailableBooks = default, Total = default}
        };
        Mock<IGenericRepository<Book>> mockBookRepository = new();
        Mock<IGenericRepository<StatResult>> mockStatResultRepository = new();

        mockStatResultRepository.Setup (x => x.FromSql ()).Returns (emptyStatResult.AsQueryable ());

        Mock<IUnitOfWork> mockUnitOfWork = new Mock<IUnitOfWork> ();
         mockUnitOfWork.Setup(x => x.BookRepository).Returns (mockBookRepository.Object);
        mockUnitOfWork.Setup(x => x.StatResultRepository).Returns (mockStatResultRepository.Object);
            
        services.AddSingleton (mockUnitOfWork.Object);
        });

        base.ConfigureWebHost (builder);
    }
}
