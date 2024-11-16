using FluentAssertions;
using Library.Api.Test.Fixture;

namespace Library.Api.Test
{
    public class StatControllerTests(ApiWebHostFactory factory) : IClassFixture<ApiWebHostFactory>
    {
        [Fact]
        public async Task GetStat_RetursOkResult()
        {
            // Arrange
            string testEndpoint = "api/stat";
            HttpClient httpClient = factory.CreateClient();

            // Act
            var response = await httpClient.GetAsync(testEndpoint);

            // Assert
            response.StatusCode.Should().Be(HttpStatusCode.OK);
        }
    }
}
