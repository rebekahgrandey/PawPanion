using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Security.Permissions;
using PawPanion.Models;
using PawPanion.Repositories;
using System.Security.Claims;

namespace PawPanion.Controllers
{
    [Authorize]
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
            if (post == null)
            {
                return NotFound();
            }
            return Ok(post);
        }

        [HttpGet("UserPets")]
        public IActionResult GetPetsByOwner(int id)
        {
            var currentUser = GetCurrentUser();
            var post = _petRepository.GetUserPets(currentUser.Id); //.GetUserPets from PetRepository
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
            return Ok (pet);
        }

        [HttpPut("edit/{petId}")]
        public IActionResult Put(int petId, Pet pet)
        {
            if (petId != pet.Id)
            {
                return BadRequest();
            }

            _petRepository.Edit(pet);
            return NoContent();
        }

        [HttpDelete("delete/{petId}")]
        public IActionResult Delete(int petId)
        {
            _petRepository.Delete(petId);
            return NoContent();
        }

        private User GetCurrentUser()
        {
            var firebaseUserId = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            return _userRepository.GetByFirebaseUserId(firebaseUserId);
        }
    }
}
