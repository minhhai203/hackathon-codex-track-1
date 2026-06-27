// Trích dữ liệu vai trò thật từ repo AI-TRO-LY (roles.ts) -> data.js cho mockup tĩnh.
// Chạy: npx tsx scripts/extract-roles.mjs [SRC_ROOT]
// SRC_ROOT mặc định: D:/AI-TRO-LY/src/frontend/lib
//
// Dùng tsx để import trực tiếp roles.ts (chỉ phụ thuộc ./roles-hr, import sạch).

import { writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));

const SRC_ROOT = process.argv[2] || "D:/AI-TRO-LY/src/frontend/lib";
const rolesPath = pathToFileURL(resolve(SRC_ROOT, "roles.ts")).href;

const { ROLES, SKILL_LABELS } = await import(rolesPath);

const roleKeys = Object.keys(ROLES);
if (roleKeys.length < 5) {
  console.warn(`[cảnh báo] chỉ thấy ${roleKeys.length} vai trò:`, roleKeys);
}

const payload = { roles: ROLES, skillLabels: SKILL_LABELS };
const out = `// TỰ SINH bởi scripts/extract-roles.mjs — KHÔNG sửa tay.\n// Nguồn: ${SRC_ROOT}/roles.ts\nwindow.AITROLY_DATA = ${JSON.stringify(payload, null, 2)};\n`;

const outPath = join(__dirname, "..", "data.js");
writeFileSync(outPath, out, "utf8");

console.log(`[OK] Đã ghi ${outPath}`);
console.log(`     ${roleKeys.length} vai trò: ${roleKeys.join(", ")}`);
