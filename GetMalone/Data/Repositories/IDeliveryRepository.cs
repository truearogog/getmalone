namespace GetMalone.Data
{
    public interface IDeliveryRepository
    {
        DeliveryOption? GetOptionById(int optionId);
        IQueryable<DeliveryOption> GetOptionsByCompanyId(int companyId);
        IQueryable<DeliveryOption> GetOptionsByTypeId(int typeId);
        DeliveryCompany? GetCompanyById(int companyId);
        DeliveryType? GetTypeById(int typeId);
        IQueryable<DeliveryOption> GetAllOptions();
        IQueryable<DeliveryCompany> GetAllCompanies();
        IQueryable<DeliveryType> GetAllTypes();
    }
}
