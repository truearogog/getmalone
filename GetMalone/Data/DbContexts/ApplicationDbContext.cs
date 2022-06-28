using Newtonsoft.Json;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace GetMalone.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }
        public DbSet<Buyer> Buyers { get; set; }
        public DbSet<Seller> Sellers { get; set; }
        public DbSet<Product> Products { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Review> Reviews { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<DeliveryType> DeliveryTypes { get; set; }
        public DbSet<DeliveryCompany> DeliveryCompanies { get; set; }
        public DbSet<DeliveryOption> DeliveryOptions { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // db serialization
            modelBuilder.Entity<Buyer>()
                .Property(e => e.Interests)
                .HasConversion(new ValueConverter<List<string>, string>(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<List<string>>(v) ?? new List<string>()));
            modelBuilder.Entity<Seller>()
                .Property(e => e.SertificateCodes)
                .HasConversion(new ValueConverter<List<string>, string>(
                    v => JsonConvert.SerializeObject(v),
                    v => JsonConvert.DeserializeObject<List<string>>(v) ?? new List<string>()));
            // user uniquie email
            modelBuilder.Entity<User>(entity => { entity.HasIndex(e => e.Email).IsUnique(); });
            // buyer - user
            modelBuilder.Entity<Buyer>()
                .HasOne(b => b.User)
                .WithOne(u => u.Buyer)
                .HasForeignKey<Buyer>(b => b.UserId);
            // seller - user
            modelBuilder.Entity<Seller>()
                .HasOne(s => s.User)
                .WithOne(u => u.Seller)
                .HasForeignKey<Seller>(s => s.UserId);
            // category - product
            modelBuilder.Entity<Category>()
                .HasMany(c => c.Products)
                .WithOne(p => p.Category)
                .HasForeignKey(p => p.CategoryId)
                .OnDelete(DeleteBehavior.Restrict);
            // seller - product
            modelBuilder.Entity<Seller>()
                .HasMany(s => s.Products)
                .WithOne(p => p.Seller)
                .HasForeignKey(p => p.SellerId)
                .OnDelete(DeleteBehavior.Restrict);
            // comment - product
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Product)
                .WithMany(p => p.Comments)
                .HasForeignKey(c => c.ProductId)
                .OnDelete(DeleteBehavior.Cascade);
            // comment - buyer
            modelBuilder.Entity<Comment>()
                .HasOne(c => c.Buyer)
                .WithMany(b => b.Comments)
                .HasForeignKey(c => c.BuyerId)
                .OnDelete(DeleteBehavior.Restrict);
            // review - seller
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Seller)
                .WithMany(s => s.Reviews)
                .HasForeignKey(r => r.SellerId)
                .OnDelete(DeleteBehavior.Restrict);
            // review - buyer
            modelBuilder.Entity<Review>()
                .HasOne(r => r.Buyer)
                .WithMany(b => b.Reviews)
                .HasForeignKey(r => r.BuyerId)
                .OnDelete(DeleteBehavior.Restrict);
            // order - buyer
            modelBuilder.Entity<Order>()
                .HasOne(o => o.Buyer)
                .WithMany(b => b.Orders)
                .HasForeignKey(o => o.BuyerId);
            // deliveryOption - deliveryType
            modelBuilder.Entity<DeliveryOption>()
                .HasOne(dop => dop.DeliveryType)
                .WithMany(dt => dt.DeliveryOptions)
                .HasForeignKey(dop => dop.DeliveryTypeId);
            // deliveryOption - deliveryCompany
            modelBuilder.Entity<DeliveryOption>()
                .HasOne(dop => dop.DeliveryCompany)
                .WithMany(dc => dc.DeliveryOptions)
                .HasForeignKey(dop => dop.DeliveryCompanyId);
        }
    }
}
