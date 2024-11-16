using FluentAssertions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Testing;

namespace Library.Api.Test;

public class StartUpTest: IClassFixture<WebApplicationFactory<Program>>
{
    private readonly WebApplicationFactory<Program> _factory;

    readonly List<Type> controllerList = typeof(Program).Assembly
        .GetTypes()
        .Where(x => x.IsSubclassOf(typeof(ControllerBase)))
        .ToList();

    public StartUpTest(WebApplicationFactory<Program> factory)
    {
        _factory = factory;
        _factory = factory.WithWebHostBuilder (builder =>
        {
            builder.ConfigureServices (service =>
            {
                controllerList.ForEach (controller => service.AddScoped (controller));
            });
        });
    }

    [Fact]
    public void ConfigureServices_ForControllers_RegistrtersAllDependences()
    {
        // Arrange
        var scopeFactory = _factory.Services.GetService<IServiceScopeFactory>();
        using var scope = scopeFactory.CreateScope();

        // Act

        // Assert
        controllerList.ForEach (item => { 
            var controller = scope.ServiceProvider.GetService(item);
            controller.Should().NotBeNull();
        });
    }
}
