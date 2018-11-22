import CommentModel from "../schemas/comment";

class CommentController {
  getCommetns() {
    return CommentModel.find();
  }

  getApprovedCommetns() {
    return CommentModel.find({ approved: true }, { approved: 0 });
  }

  getComment(commentId) {
    return CommentModel.findById(commentId);
  }

  addComment(comment) {
    return new CommentModel(comment).save();
  }

  deleteComment(commentId) {
    return CommentModel.deleteOne({ _id: commentId });
  }

  approve(commentId) {
    return CommentModel.updateOne({ _id: commentId }, { approved: true });
  }

  reject(commentId) {
    return CommentModel.updateOne({ _id: commentId }, { approved: false });
  }
}

export default new CommentController();
