import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const toggleVideoLike = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: toggle like on video
  const userId = req.user._id;
  if (!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid input");
  }
  const existedLike = await Like.findOne({
    video: videoId,
    likedBy: userId,
  });
  if (existedLike) {
    await Like.findByIdAndDelete(existedLike._id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Like removed succcessfully"));
  }
  const newLike = await Like.create({
    video: videoId,
    likedBy: userId,
  });

  if (!newLike) {
    throw new ApiError(500, "Something went wrong while liking");
  }
  return res.status(200).json(new ApiResponse(200, "Video liked successfully"));
});

const toggleCommentLike = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  //TODO: toggle like on comment
  const userId = req.user._id;
  if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
    throw new ApiError(400, "Invalid input");
  }
  const existedLike = await Like.findOne({
    comment: commentId,
    likedBy: userId,
  });
  if (existedLike) {
    await Like.findByIdAndDelete(existedLike._id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Like removed succcessfully"));
  }
  const newLike = await Like.create({
    comment: commentId,
    likedBy: userId,
  });

  if (!newLike) {
    throw new ApiError(500, "Something went wrong while liking");
  }
  return res
    .status(200)
    .json(new ApiResponse(200, "Comment liked successfully"));
});

const toggleTweetLike = asyncHandler(async (req, res) => {
  const { tweetId } = req.params;
  //TODO: toggle like on tweet
  const userId = req.user._id;
  if (!tweetId || !mongoose.Types.ObjectId.isValid(tweetId)) {
    throw new ApiError(400, "Invalid input");
  }
  const existedLike = await Like.findOne({
    tweet: tweetId,
    likedBy: userId,
  });
  if (existedLike) {
    await Like.findByIdAndDelete(existedLike._id);
    return res
      .status(200)
      .json(new ApiResponse(200, "Like removed succcessfully"));
  }
  const newLike = await Like.create({
    tweet: tweetId,
    likedBy: userId,
  });

  if (!newLike) {
    throw new ApiError(500, "Something went wrong while liking");
  }
  return res.status(200).json(new ApiResponse(200, "Tweet liked successfully"));
});

const getLikedVideos = asyncHandler(async (req, res) => {
  //TODO: get all liked videos
  const userId = req.user._id
  const likes = await Like.find({
    likedBy:userId,
    video : {$ne : null}
    }).populate("video")
    if(!likes){
        throw new ApiError(500,"Something went wrong while fetching liked videos")
    }
    const likedVideos = likes.map(like => like.video)
    return res
        .status(200)
        .json(new ApiResponse(200,"Liked videos fetched successfully"))
});

export { toggleCommentLike, toggleTweetLike, toggleVideoLike, getLikedVideos };
