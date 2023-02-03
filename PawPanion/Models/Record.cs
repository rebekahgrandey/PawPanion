using System;
using System.Buffers;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PawPanion.Models
{
    public class Record
    {
        public int Id { get; set; }

        [Required]
        public int RecordTypeId { get; set; }

        public RecordType RecordType { get; set; }

        [Required]
        public int PetId { get; set; }

        public Pet Pet { get; set; }

        [Required]
        public int VetId { get; set; }

        public User Vet { get; set; }

        [Required]
        public DateTime Date { get; set; }

        public float Weight { get; set; }

        public string Medication { get; set; }

        public string Illness { get; set; }

        public string Diet { get; set; }

        public string Note { get; set; }
    }
}