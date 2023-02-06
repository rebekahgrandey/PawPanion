using System;
using System.Buffers;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PawPanion.Models
{
    public class User
    {
        public int Id { get; set; }

        [Required]
        [StringLength(28, MinimumLength = 28)]
        public string FirebaseUserId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        [Required]
        [MaxLength(320)]
        public string Email { get; set; }

        public string Phone { get; set; }

        public string ImageLocation { get; set; }

        [Required]
        public bool IsVet { get; set; }
    }
}