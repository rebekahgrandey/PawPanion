using System;
using System.Buffers;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PawPanion.Models
{
    public class ToDo
    {
        public int Id { get; set; }

        public int OwnerId { get; set; }

        public User Owner { get; set; }

        public int PetId { get; set; }

        public Pet Pet { get; set; }

        [Required]
        public string Message { get; set; }

        [Required]
        public DateTime DueDate { get; set; }

        [Required]
        public Boolean IsComplete { get; set; }
    }
}