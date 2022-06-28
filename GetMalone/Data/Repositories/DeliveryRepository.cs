using Microsoft.EntityFrameworkCore;

namespace GetMalone.Data
{
    public class DeliveryRepository : Repository, IDeliveryRepository
    {
        public DeliveryRepository(ApplicationDbContext context) : base(context) { }

        public IQueryable<DeliveryCompany> GetAllCompanies()
        {
            return _context.DeliveryCompanies;
        }

        public IQueryable<DeliveryOption> GetAllOptions()
        {
            return _context.DeliveryOptions
                .Include(dop => dop.DeliveryCompany)
                .Include(dop => dop.DeliveryType);
        }

        public IQueryable<DeliveryType> GetAllTypes()
        {
            return _context.DeliveryTypes;
        }

        public DeliveryCompany? GetCompanyById(int companyId)
        {
            return GetAllCompanies().FirstOrDefault(dc => dc.Id.Equals(companyId));
        }

        public DeliveryOption? GetOptionById(int optionId)
        {
            return GetAllOptions().FirstOrDefault(dop => dop.Id.Equals(optionId));
        }

        public IQueryable<DeliveryOption> GetOptionsByCompanyId(int companyId)
        {
            return GetAllOptions().Where(dop => dop.DeliveryCompanyId.Equals(companyId));
        }

        public IQueryable<DeliveryOption> GetOptionsByTypeId(int typeId)
        {
            return GetAllOptions().Where(dop => dop.DeliveryTypeId.Equals(typeId));
        }

        public DeliveryType? GetTypeById(int typeId)
        {
            return GetAllTypes().FirstOrDefault(dt => dt.Id.Equals(typeId));
        }
    }
}
