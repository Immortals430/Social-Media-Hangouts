import sharp from "sharp";
import { ApplicationError } from "../middlewares/error_handler.js";

export const compressImage = async (buffer, size) => {
  const image = await sharp(buffer)
    .resize(size, null)
    .webp({ quality: 100 })
    .toBuffer();
  const uint8Array = new Uint8Array(image);
  return uint8Array 
}