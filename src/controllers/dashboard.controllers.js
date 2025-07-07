import mongoose from "mongoose";
import { Video } from "../models/video.models.js";
import { Subscription } from "../models/subscription.models.js";
import { Like } from "../models/like.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getChannelStats = asyncHandler(async (req, res) => {
  // TODO: Get the channel stats like total video views, total subscribers, total videos, total likes etc.
  const userId = req.user._id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid userId");
  }
  const videos = await Video.find({ owner: userId }).select("views");
  const totalVideos = videos.length;
  const totalViews = videos.reduce((acc, video) => acc + (video.views || 0), 0);
  const totalSubscribers = await Subscription.countDocuments({
    channel: userId,
  });
  const totalLikes = await Like.countDocuments({
    video: { $in: videos.map((v) => v._id) },
  });
  if (!totalLikes) {
    throw new ApiError(500, "Something went wrong while fetching likes");
  }

  return res.status(200).json(
    new ApiResponse(
      200,
      {
        totalVideos,
        totalViews,
        totalSubscribers,
        totalLikes,
      },
      "Channel stats fetched successfully"
    )
  );
});

const getChannelVideos = asyncHandler(async (req, res) => {
  // TODO: Get all the videos uploaded by the channel
  const userId = req.user._id;
  if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
    throw new ApiError(400, "Invalid userId");
  }
  const videos = await Video.find({ owner: userId })
    .sort({ createdAt: -1 })
    .select("title thumbnail views createdAt duration isPublished");
  if (!videos) {
    throw new ApiError(500, "Something went wrong while fetching videos");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, videos, "Channel videos fetched successfully"));
});

export { getChannelStats, getChannelVideos };
