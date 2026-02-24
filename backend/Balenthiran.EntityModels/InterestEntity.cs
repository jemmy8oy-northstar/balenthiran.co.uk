using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Balenthiran.EntityModels;

public class InterestEntity
{
    [Key]
    public int Id { get; set; }

    [Required]
    public int SubscriberId { get; set; }

    [Required]
    public string ProjectSlug { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    [ForeignKey(nameof(SubscriberId))]
    public virtual SubscriberEntity Subscriber { get; set; } = null!;
}
