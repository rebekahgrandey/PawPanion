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
            var post = _recordRepository.GetPetRecordsByPetId(petId);
            if (post == null)
            {
                NotFound();
            }
            return Ok(post);
        }

        [HttpGet]
        public IActionResult GetAllByDate()
        {
            var post = _recordRepository.GetAllRecordsByDate();
            if (post == null)
            {
                NotFound();
            }
            return Ok(post);
        }

        //[HttpGet("most-recent/{petId}")]
        //public IActionResult NewestRecordByPetId(int id)
        //{
        //    var post = _recordRepository.MostRecentRecordByPetId(id);
        //    if (post == null)
        //    {
        //        NotFound();
        //    }
        //    return Ok(post);
        //}

        [HttpPost]
        public IActionResult Post(Record record)
        {
            _recordRepository.Add(record);
            return Ok(record);
        }

        [HttpDelete("delete/{petId}")]
        public IActionResult Delete(int petId)
        {
            _recordRepository.Delete(petId);
            return NoContent();
        }
    }
}