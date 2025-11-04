import type { Constructable } from '@n8n/di';
import { Container } from '@n8n/di';
import { mock } from 'jest-mock-extended';
import { Duplex } from 'stream';

// Extract the exact parameter type that jest-mock-extended's mock function expects
// This avoids ts-essentials version conflicts by using the actual type from the library
type MockData<T> = Parameters<typeof mock<T>>[0];

export const mockInstance = <T>(
	constructor: Constructable<T>,
	data: MockData<T> | undefined = undefined,
) => {
	const instance = mock<T>(data);
	Container.set(constructor, instance);
	return instance;
};

export function toStream(buffer: Buffer) {
	const duplexStream = new Duplex();
	duplexStream.push(buffer);
	duplexStream.push(null);

	return duplexStream;
}

export const toFileId = (workflowId: string, executionId: string, fileUuid: string) =>
	`workflows/${workflowId}/executions/${executionId}/binary_data/${fileUuid}`;
