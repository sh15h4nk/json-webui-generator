import { rankWith, scopeEndsWith } from '@jsonforms/core';

export default rankWith(
	100,
	scopeEndsWith('map')//location picker
)