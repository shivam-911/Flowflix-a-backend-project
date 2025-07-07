import mongoose, { Mongoose } from "mongoose";
import { Video } from "../models/video.models.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

const getAllVideos = asyncHandler(async (req, res) => {
  const {
    page = 1,
    limit = 10,
    query = "",
    sortBy = "createdAt",
    sortType = "desc",
    userId,
  } = req.query;
  //TODO: get all videos based on query, sort, pagination
  const pageNumber = parseInt(page);
  const limitNumber = parseInt(limit);
  const skip = (pageNumber - 1) * limitNumber;

  const matchedConditions = {
    isPublished: true,
  };

  if (query?.trim() !== "") {
    matchedConditions.$or = [
      { title: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ];
  }

  if (userId) {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
      throw new ApiError(404, "User not found");
    }

    matchedConditions.owner = new mongoose.Types.ObjectId(String(userId));
  }

  const sortOptions = {};
  sortOptions[sortBy] = sortType === "asc" ? 1 : -1;

  const result = await Video.aggregate([
    {
      $match: matchedConditions,
    },
    {
      $lookup: {
        from: "users",
        localField: "owner",
        foreignField: "_id",
        as: "owner",
        pipeline: [
          {
            $project: {
              username: 1,
              fullname: 1,
              avatar: 1,
            },
          },
        ],
      },
    },
    {
      $unwind: "$owner",
    },
    {
      $sort: sortOptions,
    },
    {
      $facet: {
        videos: [
          { $skip: skip },
          { $limit: limitNumber },
          {
            $project: {
              videoFile: 1,
              thumbnail: 1,
              title: 1,
              description: 1,
              views: 1,
              createdAt: 1,
              updatedAt: 1,
              owner: 1,
            },
          },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ]);
  if (!result.length || !result[0].videos?.length) {
    throw new ApiError(404, "No videos found");
  }

  const videos = result[0].videos;
  const totalVideos = result[0].totalCount[0]?.count || 0;
  const totalPages = Math.ceil(totalVideos / limitNumber);
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        videos,
        pagination: {
          currentPage: pageNumber,
          totalPages,
          totalVideos,
          hasNextPage: pageNumber < totalPages,
          hasPrevPage: pageNumber > 1,
          limit: limitNumber,
        },
        query: {
          searchQuery: query,
          sortBy,
          sortType,
          userId,
        },
      },
      "Videos are fetched successfully"
    )
  );
});

const publishAVideo = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  // TODO: get video, upload to cloudinary, create video
  const isUser = await User.findById(req.user?._id);
  console.log(isUser);
  if (!isUser) {
    throw new ApiError(404, "User not found");
  }
  //getting video
  const videoFilePath = req.files?.videoFile?.[0]?.path;
  console.log(videoFilePath);

  if (!videoFilePath) {
    throw new ApiError(401, "video is required");
  }
  const uploadedVideo = await uploadOnCloudinary(videoFilePath);

  //getting thumbnail
  const thumbnailFilePath = req.files?.thumbnail?.[0]?.path;
  console.log(thumbnailFilePath);

  if (!thumbnailFilePath) {
    throw new ApiError(401, "video is required");
  }
  const uploadedThumbnail = await uploadOnCloudinary(thumbnailFilePath);

  const duration = uploadedVideo.duration.toFixed(2);

  const video = await Video.create({
    title,
    description,
    thumbnail: uploadedThumbnail.url,
    videoFile: uploadedVideo.url,
    owner: req.user._id,
    duration,
  });
  if (!video) {
    throw new ApiError(501, "Failed to upload");
  }
  await video.save();
  return res
    .status(200)
    .json(new ApiResponse(200, video, "Published successfully"));
});

const getVideoById = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  // Validate ID
  if (!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video ID");
  }

  // Fetch video with populated owner
  const video = await Video.findById(videoId)
    .populate("owner", "fullname avatar username")
    .select(
      "title description thumbnail duration views videoFile createdAt isPublished viewedBy"
    );

  // If not found
  if (!video) {
    throw new ApiError(404, "Video not found");
  }

  if (
    !(
      video.isPublished === true ||
      video.owner._id.toString() === req.user._id.toString()
    )
  ) {
    throw new ApiError(403, "Can not access the video");
  }
  const hasViewed = video.viewedBy.some(
    (id) => id.toString() === req.user._id.toString()
  );

  if (!hasViewed) {
    video.views += 1;
    video.viewedBy.push(req.user._id);
    await video.save();
  }

  return res
    .status(200)
    .json(new ApiResponse(200, video, "Video fetched successfully"));
});

const updateVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: update video details like title, description, thumbnail
  console.log("videoId param:", req.params.videoId);

  if (!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video file");
  }

  const video = await Video.findById(videoId);
  if (!video) {
    throw new ApiError(404, "Video doesn't exists");
  }
  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(
      403,
      "You are not authorized to make chnages in this video"
    );
  }

  const thumbnailFilePath = req.file?.path;

  const thumbnail = await uploadOnCloudinary(thumbnailFilePath);
  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    {
      $set: {
        thumbnail: thumbnail.url,
      },
    },
    { new: true }
  ).select("title description thumbnail");
  return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "Video updated successfully"));
});

const deleteVideo = asyncHandler(async (req, res) => {
  const { videoId } = req.params;
  //TODO: delete video
  if (!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(404, "Invalid videoId");
  }
  const video = await Video.findOneAndDelete({
    _id: videoId,
    owner: req.user._id,
  });

  if (!video) {
    const videoExists = await Video.findById(videoId);

    if (videoExists) {
      throw new ApiError(403, "You are not authorozised to delete the video");
    } else {
      throw new ApiError(404, "Video not found");
    }
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Video deleted successfully"));
});

const togglePublishStatus = asyncHandler(async (req, res) => {
  const { videoId } = req.params;

  if (!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(404, "Invalid videoId");
  }
  const video = await Video.findById(videoId);

  if (!video) {
    throw new ApiError(404, "Video not found");
  }
  if (video.owner.toString() !== req.user._id.toString()) {
    throw new ApiError(403, "You are not authorized to modify this video");
  }

  const updatedVideo = await Video.findByIdAndUpdate(
    videoId,
    [
      {
        $set: {
          isPublished: {
            $not: ["isPublished"],
          },
        },
      },
    ],
    { new: true }
  );
  return res
    .status(200)
    .json(new ApiResponse(200, "Video publish status toggled successfully"));
});

export {
  getAllVideos,
  publishAVideo,
  getVideoById,
  updateVideo,
  deleteVideo,
  togglePublishStatus,
};
