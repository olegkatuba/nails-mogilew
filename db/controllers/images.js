import ImagetModel from "../schemas/image";

class ImageController {
  getImages() {
    return ImagetModel.find();
  }

  getImage(id) {
    return ImagetModel.findById(id);
  }

  addImage(image) {
    return new ImagetModel(image).save();
  }

  deleteImage(_id) {
    return ImagetModel.deleteOne({ _id });
  }
}

export default new ImageController();
