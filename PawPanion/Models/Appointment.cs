using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PawPanion.Models
{
    public class Appointment
    {
        public int Id { get; set; }

        [Required]
        public string Title { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public int PetId { get; set; }

        public Pet Pet { get; set; }

        public int VetId { get; set; }

        public User Vet { get; set; }
    }
}