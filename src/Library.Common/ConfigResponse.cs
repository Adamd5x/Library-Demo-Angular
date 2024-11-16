namespace Library.Common;

public record class ConfigResponse(Dictionary<EndpointTypes, string> Endpoints);
