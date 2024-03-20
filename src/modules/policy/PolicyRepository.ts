import BaseRepository from '../../@core/domain/BaseRepository'
import Policy from './Policy'

export default interface PolicyRepository extends BaseRepository<Policy, string> { }