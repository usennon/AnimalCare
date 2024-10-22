// ReservationsController.cs
using Microsoft.AspNetCore.Mvc;
using Service.Contracts;
using Shared.DataTransferObjects;
using Shared.DataTransferObjects.ReservationsDTO;

namespace AnimalCare.Presentation.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReservationsController : ControllerBase
    {
        private readonly IServiceManager _service;

        public ReservationsController(IServiceManager service) => _service = service;

        // GET: api/Reservations
        [HttpGet(Name = "GetReservations")]
        public async Task<IActionResult> GetReservations()
        {
            var reservations = await _service.ReservationService.GetAllReservationsAsync(trackChanges: false);
            return Ok(reservations);
        }

        // POST: api/Reservations
        [HttpPost(Name = "CreateReservation")]
        public async Task<IActionResult> CreateReservation([FromBody] ReservationForCreationDto reservationRequest)
        {
            if (reservationRequest == null)
                return BadRequest("ReservationForCreationDto object is null");

            var createdReservation = await _service.ReservationService.CreateReservationAsync(reservationRequest);
            return CreatedAtRoute("GetReservationById", new { id = createdReservation.Id }, createdReservation);
        }

        // GET: api/Reservations/{id}
        [HttpGet("{id:guid}", Name = "GetReservationById")]
        public async Task<IActionResult> GetReservationById(Guid id)
        {
            var reservation = await _service.ReservationService.GetReservationByIdAsync(id, trackChanges: false);
            if (reservation == null)
                return NotFound();

            return Ok(reservation);
        }

        // PATCH: api/Reservations/{id}
        [HttpPatch("{id:guid}", Name = "UpdateReservation")]
        public async Task<IActionResult> UpdateReservation(Guid id, [FromBody] ReservationForUpdateDto reservationForUpdate)
        {
            if (reservationForUpdate == null)
                return BadRequest("ReservationForUpdateDto object is null");

            await _service.ReservationService.UpdateReservationAsync(id, reservationForUpdate, trackChanges: true);
            return NoContent();
        }

        // DELETE: api/Reservations/{id}
        [HttpDelete("{id:guid}", Name = "DeleteReservation")]
        public async Task<IActionResult> DeleteReservation(Guid id)
        {
            await _service.ReservationService.DeleteReservationAsync(id, trackChanges: false);
            return NoContent();
        }
    }
}
