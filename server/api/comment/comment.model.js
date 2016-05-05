'use strict';

import mongoose from 'mongoose';

var CommentSchema = new mongoose.Schema({
  commentData: String,
  commentId: Number,
  userName: String,
  date: Date
});

export default mongoose.model('Comment', CommentSchema);
