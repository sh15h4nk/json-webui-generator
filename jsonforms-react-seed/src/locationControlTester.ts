import { rankWith, scopeEndsWith } from '@jsonforms/core';

export default rankWith(
	100,
	scopeEndsWith('geoCode')//location picker
)