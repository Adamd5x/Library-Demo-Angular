using ErrorOr;
using Library.Abstracts;
using Library.Abstracts.Core;
using Library.Common;

namespace Library.Core.Services;

public class StatCoreService(IUnitOfWork unitOfWork) : IStatCoreService
{
    public async Task<ErrorOr<StatDto>> GetStatAsync ()
    {
        // The name of Sql is Hardcoded in the implementation of FromSql function
        var statResult = unitOfWork.StatResultRepository
                                   .FromSql ()
                                   .ToList();

        var stat = new StatDto(statResult[0].Total, statResult[0].AvailableBooks, statResult[0].Authors);

        return await Task.FromResult(stat);
    }
}
