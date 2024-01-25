import { FastifyRequest } from "fastify";

export interface UploadImagePostFile {
  id: string;
  req: FastifyRequest;
}
