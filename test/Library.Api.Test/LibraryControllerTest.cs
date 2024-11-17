using FluentAssertions;
using Library.Api.Test.Fixture;

namespace Library.Api.Test
{
    public class LibraryControllerTest(ApiWebHostFactory factory): IClassFixture<ApiWebHostFactory>
    {
        private const string LibraryApi = "api/library";
        readonly HttpClient client = factory.CreateClient();

        [Theory]
        [InlineData("sortBy=Title&sortOrder=Ascending&offset=0&size=50")]
        [InlineData("offset=0&size=50")]
        [InlineData("sortBy=Title&sortOrder=Ascending")]
        [InlineData("sortBy=Title")]
        [InlineData("")]
        public async Task GetAll_WithQueryParams_ReturnsOkResult(string query)
        {
            // Arrange
            string testEndpoint = $"{LibraryApi}?{query}";

            // Act
            var result = await client.GetAsync(testEndpoint);

            // Assert
            result.StatusCode.Should().Be(HttpStatusCode.OK);
        }


        [Theory]
        [InlineData ("offset=-1&size=0")]
        [InlineData ("offset=0&size=125")]
        [InlineData ("offset=-1&size=-1")]
        public async Task GetAll_WithQueryParams_ReturnsBadRequestResult (string query)
        {
            // Arrange
            string testEndpoint = $"{LibraryApi}?{query}";

            // Act
            var result = await client.GetAsync(testEndpoint);

            // Assert
            result.StatusCode.Should ().Be (HttpStatusCode.BadRequest);
        }

        [Theory]
        [InlineData("1234561234560")]
        public async Task CheckIsbn_WithInRouteParam_ReturnsOkResult(string isbn)
        {
            // Arrange
            string testEndpoint = $"{LibraryApi}/isbn/{isbn}";

            // Act
            var result = await client.GetAsync (testEndpoint);

            // Assert
            result.StatusCode.Should().Be(HttpStatusCode.OK);
        }

        //[Theory]
        //[InlineData(null)]
        //[InlineData ("")]
        //[InlineData ("123")]
        //[InlineData ("12345678901234")]
        //public async Task CheckIsbn_WithInRouteParam_ReturnsBadRequestResult (string isbn)
        //{
        //    // Arrange
        //    string testEndpoint = $"api/books/isbn/{isbn}";

        //    // Act
        //    var result = await client.GetAsync(testEndpoint);

        //    // Assert
        //    result.StatusCode.Should().Be (HttpStatusCode.BadRequest);
        //}
    }
}
