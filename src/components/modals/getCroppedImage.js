import { getFileExt, getFileName } from "../../utility/Util";
import awsExports from "../../aws-exports";

export const createImage = (url) =>
new Promise((resolve, reject) => {
  const image = new Image();
  image.addEventListener("load", () => resolve(image));
  image.addEventListener("error", (error) => reject(error));
  // image.setAttribute('crossOrigin', 'anonymous') // needed to avoid cross-origin issues on CodeSandbox
  image.src = url;
  image.crossOrigin = "Anonymous";

});

export function getRadianAngle(degreeValue) {
  return (degreeValue * Math.PI) / 180;
}

/**
 * Returns the new bounding area of a rotated rectangle.
 */
export function rotateSize(width, height, rotation) {
  const rotRad = getRadianAngle(rotation);

  return {
    width:
      Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
    height:
      Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
  };
}

/**
 * This function was adapted from the one in the ReadMe of https://github.com/DominicTobias/react-image-crop
 */
export default async function getCroppedImg(
  imageSrc,
  pixelCrop,
  rotation = 0,
  flip = { horizontal: false, vertical: false }
) {

  const image = await createImage(imageSrc.url ?? imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  
  if (!ctx) {
    return null;
  }

  const rotRad = getRadianAngle(rotation);

  // calculate bounding box of the rotated image
  const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
    image.width,
    image.height,
    rotation
  );

  // set canvas size to match the bounding box
  canvas.width = bBoxWidth;
  canvas.height = bBoxHeight;

  // translate canvas context to a central location to allow rotating and flipping around the center
  ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
  ctx.rotate(rotRad);
  ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
  ctx.translate(-image.width / 2, -image.height / 2);

  // draw rotated image
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

  // croppedAreaPixels values are bounding box relative
  // extract the cropped image using these values
  const data = ctx.getImageData(
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height
  );

  // set canvas width to final desired crop size - this will clear existing context
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  // paste generated rotate image at the top left corner
  ctx.putImageData(data, 0, 0);

  const fileParams = (file) => {
    return {
      ext: getFileExt(file.name),
      name: getFileName(file.name),
      key: file.name,
      type: file.type,
      url: URL.createObjectURL(file),
      bucket: awsExports.aws_user_files_s3_bucket,
      region: awsExports.aws_user_files_s3_bucket_region,
      level: "public",
      obj: file,
    };
  };
  //Generate file from blob
  function blobToFile(theBlob, fileName) {
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    theBlob.lastModifiedDate = new Date();
    theBlob.name = fileName;
    return theBlob;
  }

  // As a file
  return new Promise((resolve, reject) => {
    canvas.toBlob((file) => {
      const myFile = blobToFile(file, `${imageSrc.name}.${imageSrc.ext}`);
      resolve(fileParams(myFile));
    }, "image/jpeg");
  });
}
