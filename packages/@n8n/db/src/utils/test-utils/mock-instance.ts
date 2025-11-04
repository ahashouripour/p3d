import { Container, type Constructable } from '@n8n/di';
import { mock } from 'jest-mock-extended';

// Local DeepPartial type to avoid ts-essentials version conflicts
// This matches the structure expected by jest-mock-extended
type DeepPartial<T> = T extends object
	? {
			[P in keyof T]?: T[P] extends (infer U)[]
				? DeepPartial<U>[]
				: T[P] extends ReadonlyArray<infer U>
					? ReadonlyArray<DeepPartial<U>>
					: T[P] extends Function
						? T[P]
						: DeepPartial<T[P]>;
		}
	: T;

export const mockInstance = <T>(
	serviceClass: Constructable<T>,
	data: DeepPartial<T> | undefined = undefined,
) => {
	const instance = mock<T>(data);
	Container.set(serviceClass, instance);
	return instance;
};
