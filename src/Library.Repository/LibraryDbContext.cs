using Library.Repository.Configuration;
using Microsoft.EntityFrameworkCore;

namespace Library.Repository;

public partial class LibraryDbContext : DbContext
{
    public LibraryDbContext()
    {
    }

    public LibraryDbContext(DbContextOptions<LibraryDbContext> options): base(options)
    {
    }

    protected override void OnConfiguring (DbContextOptionsBuilder optionsBuilder)
    {
        if (!optionsBuilder.IsConfigured)
        {
            optionsBuilder.UseSqlServer ("Server=.\\Dev;Database=Library_Demo_Dev; Trusted_Connection=true; TrustServerCertificate=true");
        }

        optionsBuilder.EnableSensitiveDataLogging (true);
        optionsBuilder.EnableDetailedErrors (true);
    }

    protected override void OnModelCreating (ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration (new BookEntityConfiguration ());
        modelBuilder.ApplyConfiguration (new StatsEntityConfiguration ());
    }
}
