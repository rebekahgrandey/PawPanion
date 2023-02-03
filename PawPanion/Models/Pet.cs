using System;
using System.Buffers;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PawPanion.Models
{
    public class Pet
    {
        public int Id { get; set; }

        [Required]
        public string Name { get; set; }

        [Required]
        public string Breed { get; set; }

        [Required]
        public Boolean IsMale { get; set; }

        [Required]
        public float Age { get; set; }

        public int OwnerId { get; set; }

        public User Owner { get; set; }

        [Required]
        public Boolean IsDog { get; set; }

        public string ImageLocation { get; set; }
    }
}