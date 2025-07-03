import mongoose from "mongoose"
import {Comment} from "../models/comment.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query
    if(!videoId || !mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400,"Invalid id")
    }
    const pageNumber = parseInt(page)
    const limitNumber = parseInt(limit)
    const skip = (pageNumber-1)*limitNumber
    const videoComments = await Comment.find({
        video: videoId
    })
    .select("owner content")
    .skip(skip)
    .limit(limitNumber)
    .sort({createdAt:-1})

    


    if(!videoComments){
        throw new ApiError(500,"Something went wrong while fetching comments")
    }
    const totalComments = await Comment.countDocuments({video: videoId})
    const totalPages = Math.ceil(totalComments/ limitNumber)
    return res
        .status(200)
        .json(new ApiResponse(200,{videoComments, paginaton: {
            currentPage: pageNumber,
            totalPages,
            totalComments,
            hasNextPage: pageNumber < totalPages,
            hasPrevPage: pageNumber > 1,
            limit: limitNumber
        }}))
})

const addComment = asyncHandler(async (req, res) => {
    // TODO: add a comment to a video
    const {videoId} = req.params
    const {content} = req.body
    if(!content){
        throw new ApiError(400,"Comment can not be empty")
    }
    if(!videoId || !mongoose.Types.ObjectId.isValid(videoId)){
        throw new ApiError(400,"Invalid id")
    }
    const newComment = await Comment.create(
        {
            owner: req.user?._id,
            content : content,
            video: videoId
        }
    )
    if(!newComment){
        throw new ApiError(500,"Something went wrong while adding the comment")
    }
    return res
        .status(200)
        .json(new ApiResponse(200,newComment,"Comment added successfully"))
})

const updateComment = asyncHandler(async (req, res) => {
    // TODO: update a comment
    const {commentId} = req.params
    const {content} = req.body
    if(!commentId || !mongoose.Types.ObjectId.isValid(commentId)){
        throw new ApiError(400,"Invalid commentId")
    }
    if(!content){
        throw new ApiError(400,"Invalid content")
    }
    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
            content : content
        },
        {new:true}
    )
    if(!updateComment){
        throw new ApiError(500,"Something went wrong while updating the comment")
    }
    return res
        .status(200)
        .json(new ApiResponse(200,updateComment,"Comment updated successfully"))


})

const deleteComment = asyncHandler(async (req, res) => {
    // TODO: delete a comment
    const {commentId} = req.params
     if(!commentId || !mongoose.Types.ObjectId.isValid(commentId)){
        throw new ApiError(400,"Invalid commentId")
    }
    const deletedComment = await Comment.findByIdAndDelete(commentId)
    if(!deleteComment){
        throw new ApiError(500,"Something went wrong while deleting the comment")
    }
    return res
        .status(200)
        .json(new ApiResponse(200,"Comment deleted successfully"))
})

export {
    getVideoComments, 
    addComment, 
    updateComment,
     deleteComment
    }
