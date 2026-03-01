using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Balenthiran.Database.Migrations
{
    /// <inheritdoc />
    public partial class AddProjectSync : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Interests_SubscriberId_ProjectSlug",
                table: "Interests");

            migrationBuilder.Sql("DELETE FROM \"Interests\"");

            migrationBuilder.DropColumn(
                name: "ProjectSlug",
                table: "Interests");

            migrationBuilder.AddColumn<int>(
                name: "ProjectId",
                table: "Interests",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Guid = table.Column<Guid>(type: "uuid", nullable: false),
                    Slug = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    LastSyncAt = table.Column<DateTime>(type: "timestamp with time zone", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Interests_ProjectId",
                table: "Interests",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_Interests_SubscriberId_ProjectId",
                table: "Interests",
                columns: new[] { "SubscriberId", "ProjectId" },
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_Guid",
                table: "Projects",
                column: "Guid",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Projects_Slug",
                table: "Projects",
                column: "Slug",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Interests_Projects_ProjectId",
                table: "Interests",
                column: "ProjectId",
                principalTable: "Projects",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Interests_Projects_ProjectId",
                table: "Interests");

            migrationBuilder.DropTable(
                name: "Projects");

            migrationBuilder.DropIndex(
                name: "IX_Interests_ProjectId",
                table: "Interests");

            migrationBuilder.DropIndex(
                name: "IX_Interests_SubscriberId_ProjectId",
                table: "Interests");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "Interests");

            migrationBuilder.AddColumn<string>(
                name: "ProjectSlug",
                table: "Interests",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Interests_SubscriberId_ProjectSlug",
                table: "Interests",
                columns: new[] { "SubscriberId", "ProjectSlug" },
                unique: true);
        }
    }
}
