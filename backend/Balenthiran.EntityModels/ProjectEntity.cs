using System.ComponentModel.DataAnnotations;

namespace Balenthiran.EntityModels;

public class ProjectEntity
{
    [Key]
    public int Id { get; set; }

    [Required]
    public Guid Guid { get; set; }

    [Required]
    public string Slug { get; set; } = string.Empty;

    [Required]
    public string Title { get; set; } = string.Empty;

    public DateTime LastSyncAt { get; set; } = DateTime.UtcNow;

    // Navigation property
    public virtual ICollection<InterestEntity> Interests { get; set; } = new List<InterestEntity>();
}
