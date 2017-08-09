export default function(image) {
  image.liked = image.liked > 0;
  image.proportion = image.width / image.height;
  return image;
}
