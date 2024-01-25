import { PrismaPostRepository } from "../repositories/prisma/prisma-post.repository";
import { Injectable, NotFoundException } from "@nestjs/common";
import { ExceptionsConstants } from "~/commons/consts/exceptions";
import { UploadImagePostFile } from "../interfaces/upload-image-post.interface";
import * as fs from "fs";
import { randomUUID } from "crypto";
import { getFileExtensionFromMimeType } from "~/helpers/get-file-extension";

@Injectable()
export class UploadImagePost {
  constructor(private postRepository: PrismaPostRepository) {}

  async execute(params: UploadImagePostFile) {
    const { req, id } = params;

    if (!req.isMultipart()) {
      throw new NotFoundException(ExceptionsConstants.FILE_NOT_FOUND);
    }

    const post = await this.postRepository.findById(id);

    if (!post) {
      throw new NotFoundException(ExceptionsConstants.POST_NOT_FOUND);
    }

    // const { file } = await req.file();
    const teste = await req.file();

    console.log(teste);

    // const typeExtension = getFileExtensionFromMimeType(mimetype);

    // console.log(typeExtension);

    // for await (const part of file) {
    //   const writeStream = fs.createWriteStream(
    //     `./upload-post-image/${randomUUID()}.${typeExtension}`,
    //   );
    //   part.file.pipe(writeStream);
    // }
  }
}
