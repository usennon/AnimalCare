﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Models.Entities
{
    public class WalkSchedule : BaseEntity
    {
        public DateTime Date { get; set; }
        public TimeSpan TimeStart { get; set; }
        public TimeSpan TimeEnd { get; set; }
        public bool IsAvailable { get; set; }
        public Guid AnimalId { get; set; }
        public Animal Animal { get; set; }
        public Guid CareTakerId { get; set; }
        public CareTaker CareTaker { get; set; }
        public ICollection<Reservation>? Reservations { get; set; } = new List<Reservation>();
    }
}
