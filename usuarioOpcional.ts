import moment from 'moment';

// **** Types **** //

export interface IUser {
  id?: number; // Pode ser omitido se ainda não estiver definido
  name?: string; // Opcional
  email: string;
  created?: Date; // Opcional, se você não quiser definir a data de criação
  password?: string; // Se necessário para uma rota específica
}

// **** Functions **** //

/**
 * Create new User.
 */
function newUser(
  user: Partial<IUser> // Recebe um objeto parcial de IUser
): IUser {
  return {
    id: user.id ?? -1,
    name: user.name ?? '',
    email: user.email ?? '',
    created: user.created ?? new Date(),
    password: user.password, // Inclui o password apenas se fornecido
  };
}

/**
 * Get user instance from object.
 */
function from(param: Partial<IUser>): IUser {
  if (!isUser(param)) {
    throw new Error('Invalid user object');
  }
  return newUser(param);
}

/**
 * See if the param meets criteria to be a user.
 */
function isUser(arg: Partial<IUser>): boolean {
  return (
    !!arg &&
    'email' in arg && typeof arg.email === 'string' &&
    ('id' in arg ? typeof arg.id === 'number' : true) &&
    ('name' in arg ? typeof arg.name === 'string' : true) &&
    ('created' in arg ? moment(arg.created as string | Date).isValid() : true)
  );
}

// **** Export default **** //

export default {
  newUser,
  from,
  isUser,
} as const;


('name' in arg ? typeof arg.name === 'string' : true) &&