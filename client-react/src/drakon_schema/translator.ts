import { DragonSchema } from './dragon.schema';
import { IconIf } from './icon.model';
import * as FileSaver from 'file-saver'

    // eslint-disable-next-line
const IfSchemaPatternTranslate = (iconIF: IconIf) : string => {
    const translatedSchema = "";

    return translatedSchema;
}

    // eslint-disable-next-line
export const DrgTranslationSave = (schema : DragonSchema) => {
    // eslint-disable-next-line
    const translatedSchema ="";
    const blob = new Blob([JSON.stringify(Object.fromEntries(schema._storage))],{type: "text/plain" });
    FileSaver.saveAs(blob, "schema.txt");
}

