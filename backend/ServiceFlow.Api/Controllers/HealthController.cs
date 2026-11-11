
using Microsoft.AspNetCore.Mvc;

namespace ServiceFlow.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class HealthController : ControllerBase
{
    [HttpGet]
    public IActionResult Get()
    {
        var response = new
        {
            status = "healthy",
            application = "ServiceFlow",
            version = "1.0.0",
            timestamp = DateTimeOffset.UtcNow
        };

        return Ok(response);
    }
}
