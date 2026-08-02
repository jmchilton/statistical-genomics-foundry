import path from 'node:path';

import { loadLicenseFiles, type LicenseFile } from '@galaxy-foundry/license-policy';

// Third-party content licenses live at the repo root in ../LICENSES, outside the Astro project.
// We render them in-app so book notes can link to license terms without bouncing the reader out
// to GitHub.
//
// The READER is not ours — it ships in @galaxy-foundry/license-policy, beside the table whose
// `license_file` obligation these copies satisfy. What stays here is the one thing the package
// declines to know: WHERE the directory is. It takes that as a parameter precisely because the
// callers are Astro pages whose cwd is a subdirectory, and an implicit relative path is the part
// that does not survive being shared.
const LICENSES_DIR = path.resolve('../LICENSES');

export type { LicenseFile };

export function getLicenses(): LicenseFile[] {
  return loadLicenseFiles(LICENSES_DIR);
}
