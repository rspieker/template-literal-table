import { interleave } from './Collection';
import { TableRecord, records } from './Table';
import { FilterFunction, divider, defined } from './Filters';


type TemplateLiteralTable = (strings: TemplateStringsArray, ...values: unknown[]) => TableRecord[];

export const create = (...filters: FilterFunction[]): TemplateLiteralTable =>
	<T extends TableRecord>(strings: TemplateStringsArray, ...values: unknown[]) =>
		records<T>(interleave(strings, ...values), ...filters) as T[];


export const empty = create(divider);
export const tag = Object.assign(create(divider, defined), { empty });

export default tag;
