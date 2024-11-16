using ErrorOr;
using Library.Common;

namespace Library.Abstracts.Core;

public interface IStatCoreService
{
    Task<ErrorOr<StatDto>> GetStatAsync ();
}
