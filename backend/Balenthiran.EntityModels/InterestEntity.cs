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
    public int ProjectId { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation properties
    [ForeignKey(nameof(SubscriberId))]
    public virtual SubscriberEntity Subscriber { get; set; } = null!;

    [ForeignKey(nameof(ProjectId))]
    public virtual ProjectEntity Project { get; set; } = null!;
}
