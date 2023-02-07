using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Permissions;
using PawPanion.Models;
using PawPanion.Repositories;
using System.Security.Claims;

namespace PawPanion.Controllers
{
    /*[Authorize]*/
    [Route("api/[controller]")]
    [ApiController]
    public class PetController : ControllerBase
    {
        private readonly IPetRepository _petRepository;
        private readonly IUserRepository _userRepository;

        public PetController(IPetRepository petRepository, IUserRepository userRepository)
        {
            _petRepository = petRepository;
            _userRepository=userRepository;
        }

        [HttpGet("{id}")]
        public IActionResult GetPetById(int id)
        {
            var post = _petRepository.GetPetById(id);
            if (post != null)
            {
                NotFound();
            }
            return Ok(post);
        }

        [HttpGet("{id}")]
        public IActionResult GetPetByOwnerId(int id)
        {
            var post = _petRepository.GetPetByOwnerId(id);
            if (post != null)
            {
                NotFound();
            }
            return Ok(post);
        }

        [HttpGet]
        public ActionResult GetAll()
        {
            var pets = _petRepository.GetAllPets();
            return Ok(pets);
        }

        [HttpPost]
        public IActionResult Post(Pet pet)
        {
            _petRepository.Add(pet);
            return CreatedAtAction("Get", new { id = pet.Id }, pet);
        }

        [HttpPut("{id}")]
        public IActionResult Put(int id, Pet pet)
        {
            if (id != pet.Id)
            {
                return BadRequest();
            }

            _petRepository.Edit(pet);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            _petRepository.Delete(id);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
