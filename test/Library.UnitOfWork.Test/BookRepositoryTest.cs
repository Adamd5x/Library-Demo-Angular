using Library.Abstracts;
using Library.Models.Entity;

namespace Library.UnitOfWork.Test;

public class BookRepositoryTest
{
    private readonly Mock<IGenericRepository<Book>> mockBookRepository = new ();
    private readonly Mock<IUnitOfWork> mockUnitOfWork = new();

    [Fact]
    public async Task Insert_ShouldCallRepositoru_Insert ()
    {
        // Arrange
        mockUnitOfWork.Setup(b => b.BookRepository)
                      .Returns(mockBookRepository.Object);
        var fixture = new Fixture();
        var sut = fixture.Create<Book>();

        // Act
        _ = await mockUnitOfWork.Object.BookRepository.InsertAsync(sut);

        // Assert
        mockBookRepository.Verify(x => x.InsertAsync(It.IsAny<Book>()), Times.Once);
    }

    [Fact]
    public void Update_ShouldCallRepository_Update()
    {
        // Arrange
        mockUnitOfWork.Setup(b => b.BookRepository)
                      .Returns(mockBookRepository.Object);

        var autofixture = new Fixture();
        var sut = autofixture.Create<Book>();

        // Act
        mockUnitOfWork.Object.BookRepository.Update(sut);

        // Assert
        mockBookRepository.Verify(x => x.Update(sut), Times.Once);
    }


    [Fact]
    public void Delete_ShouldCallRepository_Delete()
    {
        // Arrange
        mockUnitOfWork.Setup (b => b.BookRepository)
                      .Returns (mockBookRepository.Object);

        var autoFixture = new Fixture();
        int sut = autoFixture.Create<int>();

        // Act
        mockUnitOfWork.Object.BookRepository.DeleteAsync(sut);

        // Assert
        mockBookRepository.Verify(x => x.DeleteAsync(sut), Times.Once);
    }
}
