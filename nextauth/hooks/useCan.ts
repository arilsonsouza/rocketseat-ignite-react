import { useContext } from 'react';
import { AuhtContext } from '../contexts/AuthContext';
import { validateUserPermissions } from '../utils/validateUserPermisions';

type useCanParams = {
  permissions?: string[];
  roles?: string[];
};

export function useCan({ permissions = [], roles = [] }: useCanParams) {
  const { user, isAuthenticated } = useContext(AuhtContext);

  if (!isAuthenticated) {
    return false;
  }

  const userHasValidPermissions = validateUserPermissions({
    user,
    permissions,
    roles
  });

  return userHasValidPermissions;
}