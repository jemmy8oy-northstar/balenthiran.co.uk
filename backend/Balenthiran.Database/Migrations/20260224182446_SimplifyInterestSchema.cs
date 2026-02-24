using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Balenthiran.Database.Migrations
{
    /// <inheritdoc />
    public partial class SimplifyInterestSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Interests_SubscriberId_ProjectSlug",
                table: "Interests");

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
                    Name = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false),
                    Slug = table.Column<string>(type: "character varying(100)", maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Projects",
                columns: new[] { "Id", "Name", "Slug" },
                values: new object[,]
                {
                    { 1, "General", "general" },
                    { 2, "Earn Your Beers", "earn-your-beers" },
                    { 3, "APEify", "apeify" },
                    { 4, "House Price Alerts", "house-price-alerts" },
                    { 5, "Personal Habit Tracker", "habit-tracker" },
                    { 6, "Commuter House Search", "commuter-house-search" }
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
    }
}
