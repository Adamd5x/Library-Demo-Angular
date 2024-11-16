using Library.Models.Entity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Library.Repository.Configuration;

internal class StatsEntityConfiguration : IEntityTypeConfiguration<StatResult>
{
    public void Configure (EntityTypeBuilder<StatResult> builder)
    {
        builder.ToView ("StatResult")
               .HasNoKey();
    }
}
