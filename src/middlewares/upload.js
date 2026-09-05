import multer from 'multer';
import sharp from 'sharp';
import path from 'path';

const upload = multer({
  dest: 'uploads/',
});

const createThumbnail = async (req, res, next) => {
  if (!req.file) {
    console.log('No file received');
    next();
    return;
  }

  console.log('Uploaded file:', req.file.path);

  try {
    const filePath = path.parse(req.file.path);

    const thumbnailPath = path.join(filePath.dir, `${filePath.name}_thumb.png`);

    await sharp(req.file.path).resize(160, 160).png().toFile(thumbnailPath);

    console.log('Thumbnail created:', thumbnailPath);

    next();
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export { upload, createThumbnail };
