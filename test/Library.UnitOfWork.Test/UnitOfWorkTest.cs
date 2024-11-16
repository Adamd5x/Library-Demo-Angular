using Library.Repository;

namespace Library.UnitOfWork.Test;

public class UnitOfWorkTest
{
    private readonly Mock<LibraryDbContext> mockDbContext = new ();

    [Fact]
    public async Task SaveChangesAsync_ShouldCallDbContext_RetunsTrue()
    {
        // Arrange
        var unitOfWork = new Repository.UnitOfWork(mockDbContext.Object);

        // Act
        await unitOfWork.SaveAsync();

        // Assert
        mockDbContext.Verify(x => x.SaveChangesAsync(It.IsAny<CancellationToken>()), Times.Once());
    }
}
