import ImageExtention from "./ImageExtention";

export default function(images) {
  images.forEach((image) => ImageExtention(image));
  return images;
}
