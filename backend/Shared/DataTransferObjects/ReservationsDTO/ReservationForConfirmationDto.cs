// Shared/DataTransferObjects/ReservationForConfirmationDto.cs

namespace Shared.DataTransferObjects.ReservationsDTO
{
    public class ReservationForConfirmationDto
    {
        public Guid Id { get; set; }
        public string VolunteerName { get; set; }
        public string AnimalName { get; set; }
        public string AnimalBreed { get; set; }
        public DateTime ReservationDate { get; set; }
        public TimeSpan StartTime { get; set; }
        public TimeSpan EndTime { get; set; }
        public string Photo { get; set; }
    }
}