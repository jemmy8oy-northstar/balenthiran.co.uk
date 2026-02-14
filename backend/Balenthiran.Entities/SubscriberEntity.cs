using System.ComponentModel.DataAnnotations;

namespace Balenthiran.Entities;

public class SubscriberEntity
{
    [Key]
    public int Id { get; set; }
    
    [Required]
    [EmailAddress]
    public string Email { get; set; } = string.Empty;
    
    public DateTime SubscribedAt { get; set; } = DateTime.UtcNow;
}
