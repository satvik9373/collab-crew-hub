import { eV1Protocol, eV1HostWithPort, TAGGED_VERSION } from './hosts.js';

export type DynamicImportOptions = {
  host?: string;
  mediaData?: boolean;
};
export const dynamicImport = async (
  filePath: string,
  options: DynamicImportOptions = {},
): Promise<unknown> => {
  const host: string = options.host ?? eV1HostWithPort();

  const taggedVersion: string = TAGGED_VERSION;

  if (taggedVersion !== '' && taggedVersion.length > 0 && options.mediaData !== true) {
    return import(
      /* webpackIgnore: true */ `${eV1Protocol()}//${host}/${filePath}@${taggedVersion}`
    );
  }

  return import(/* webpackIgnore: true */ `${eV1Protocol()}//${host}/${filePath}`);
};
