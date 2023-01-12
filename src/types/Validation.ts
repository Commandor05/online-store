import { Validated } from '../interfaces/Validated';

export type Validations<T extends Record<string, never>> = Partial<Record<keyof T, Validated>>;