import { PrismaPostRepository } from "../repositories/prisma/prisma-post.repository";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from "@nestjs/common";
import { ExceptionsConstants } from "~/commons/consts/exceptions";
import { UploadImagePostFile } from "../interfaces/upload-image-post.interface";
import { randomUUID } from "crypto";
import { getFileExtensionFromMimeType } from "~/helpers/get-file-extension";

import { pipeline } from "stream";
import * as util from "util";
import * as fs from "fs";

const pump = util.promisify(pipeline);

@Injectable()
export class UploadImagePost {
  constructor(private postRepository: PrismaPostRepository) {}

  async execute(params: UploadImagePostFile) {
    const { req, id } = params;

    const data = await req.file();

    if (!data) {
      return new BadRequestException(ExceptionsConstants.NO_FILE_UPLOADED);
    }

    await pump(data.file, fs.createWriteStream(data.filename));

    if (data.file.truncated) {
      throw new InternalServerErrorException(ExceptionsConstants.INTERNAL_SERVER_ERROR);
    }

    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException(ExceptionsConstants.POST_NOT_FOUND);
    }

    const { mimetype, file } = data;
    const typeExtension = getFileExtensionFromMimeType(mimetype);
    const filePath = `./upload-post-image/${randomUUID()}${typeExtension}`;

    const writeStream = fs.createWriteStream(filePath);
    file.pipe(writeStream);

    await this.postRepository.updateImageById(id, filePath);
  }
}
