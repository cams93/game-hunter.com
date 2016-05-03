'use strict';

import mongoose from 'mongoose';

var CommentSchema = new mongoose.Schema({
  commentData: String,
  commentId: Number
});

export default mongoose.model('Comment', CommentSchema);
