import handlebars from 'handlebars';
import fs from 'fs';

interface VariablesData {
  [key: string]: string | number;
}

export interface ParseData {
  file: string;
  variables: VariablesData;
}

export default class TemplateMailProvider {
  async parse({ file, variables }: ParseData): Promise<string> {
    const fileTemplate = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });

    const parseTemplate = handlebars.compile(fileTemplate);

    return parseTemplate(variables);
  }
}
