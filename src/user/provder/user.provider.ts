import { USER_PROVIDER } from '../constants/user.constants';
import { User } from '../entities/user.entity';
import { ProviderFactory } from '../../utils/provider.factory';

export const UserProvider = ProviderFactory(USER_PROVIDER, User);
