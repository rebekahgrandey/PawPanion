using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using PawPanion.Models;
using PawPanion.Repositories;
using System.Security.Claims;

namespace PawPanion.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class RecordController : ControllerBase
    {
        private readonly IRecordRepository _recordRepository;

        public RecordController(IRecordRepository recordRepository)
        {
            _recordRepository = recordRepository;
        }


        [HttpGet("{petId}")]
        public IActionResult GetRecordsByPetId(int petId)
        {
            var post = _recordRepository.GetPetRecords(petId);
            if (post == null)
            {
                NotFound();
            }
            return Ok(post);
        }
    }
}