import { DragonSchema } from './dragon.schema';
import { IconIf } from './icon.model';
import * as FileSaver from 'file-saver'

const IfSchemaPatternTranslate = (iconIF: IconIf) : string => {
    let translatedSchema = "";

    return translatedSchema;
}


export const DrgTranslationSave = (schema : DragonSchema) => {
    const translatedSchema ="";
    const blob = new Blob([JSON.stringify(Object.fromEntries(schema._storage))],{type: "text/plain" });
    FileSaver.saveAs(blob, "schema.txt");
}

