using System.ComponentModel.DataAnnotations;

namespace Balenthiran.EntityModels;

public class ProjectEntity
{
    [Key]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [MaxLength(100)]
    public string Slug { get; set; } = string.Empty;

    // Navigation property
    public virtual ICollection<InterestEntity> Interests { get; set; } = new List<InterestEntity>();
}
