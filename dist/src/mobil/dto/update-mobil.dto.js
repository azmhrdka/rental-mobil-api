"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateMobilDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_mobil_dto_1 = require("./create-mobil.dto");
class UpdateMobilDto extends (0, mapped_types_1.PartialType)(create_mobil_dto_1.CreateMobilDto) {
}
exports.UpdateMobilDto = UpdateMobilDto;
//# sourceMappingURL=update-mobil.dto.js.map