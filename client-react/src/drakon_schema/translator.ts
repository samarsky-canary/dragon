import { DragonSchema } from './dragon.schema';
import { IconIf } from './icon.model';
import * as FileSaver from 'file-saver'
import { SchemaDTO } from '../services/SchemaService';

    // eslint-disable-next-line
const IfSchemaPatternTranslate = (iconIF: IconIf) : string => {
    const translatedSchema = "";

    return translatedSchema;
}

    // eslint-disable-next-line
export const DrgTranslationSave = (schema : DragonSchema) => {
    const blob = new Blob([JSON.stringify(Object.fromEntries(schema._storage))],{type: "application/json" });
    FileSaver.saveAs(blob, `${schema._head.id}.json`);
}

export const DrgTranslationSaveTEMP = (schema : SchemaDTO) => {
    const blob = new Blob([JSON.stringify(schema)],{type: "application/json" });
    FileSaver.saveAs(blob, `${schema.name}.json`);
}