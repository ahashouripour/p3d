import { Container, type Constructable } from '@n8n/di';
import { mock } from 'jest-mock-extended';

// Extract the exact parameter type that jest-mock-extended's mock function expects
// This avoids ts-essentials version conflicts by using the actual type from the library
type MockData<T> = Parameters<typeof mock<T>>[0];

export const mockInstance = <T>(
	serviceClass: Constructable<T>,
	data: MockData<T> | undefined = undefined,
) => {
	const instance = mock<T>(data);
	Container.set(serviceClass, instance);
	return instance;
};
