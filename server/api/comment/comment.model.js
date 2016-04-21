'use strict';

import mongoose from 'mongoose';

var CommentSchema = new mongoose.Schema({
  commentData: String
});

export default mongoose.model('Comment', CommentSchema);
