export default function getAspectRatio(image: any) {
  const w = image.naturalWidth;
  const h = image.naturalHeight;

  let aspectRatio;

  if (w > h) {
    aspectRatio = w / h;
  } else {
    aspectRatio = h / w;
  }

  return aspectRatio;
}
