import moment from 'moment';

// **** Types **** //

export interface IUserBase {
  email: string;
  created?: Date; // Opcional para usuários que ainda não foram criados
}

export interface IUserComplete extends IUserBase {
  id: number;
  name: string;
}

export interface IUserWithPassword extends IUserBase {
  password: string;
}

// **** Functions **** //

/**
 * Create new User.
 */
function createUserComplete(
  user: IUserComplete
): IUserComplete {
  return {
    ...user,
    created: user.created ?? new Date(),
  };
}

/**
 * Create new User with password.
 */
function createUserWithPassword(
  user: IUserWithPassword
): IUserWithPassword {
  return {
    ...user,
    created: user.created ?? new Date(),
  };
}

/**
 * Get user instance from object.
 */
function fromComplete(param: IUserComplete): IUserComplete {
  if (!isUserComplete(param)) {
    throw new Error('Invalid complete user object');
  }
  return createUserComplete(param);
}

function fromWithPassword(param: IUserWithPassword): IUserWithPassword {
  if (!isUserWithPassword(param)) {
    throw new Error('Invalid user with password object');
  }
  return createUserWithPassword(param);
}

/**
 * See if the param meets criteria to be a complete user.
 */
function isUserComplete(arg: IUserComplete): boolean {
  return (
    !!arg &&
    typeof arg.email === 'string' &&
    typeof arg.id === 'number' &&
    typeof arg.name === 'string' &&
    (arg.created ? moment(arg.created).isValid() : true)
  );
}

/**
 * See if the param meets criteria to be a user with password.
 */
function isUserWithPassword(arg: IUserWithPassword): boolean {
  return (
    isUserComplete(arg) &&
    typeof arg.password === 'string'
  );
}

// **** Export default **** //

export default {
  createUserComplete,
  createUserWithPassword,
  fromComplete,
  fromWithPassword,
  isUserComplete,
  isUserWithPassword,
} as const;
