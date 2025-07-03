import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { User } from "../models/user.models.js"



const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description} = req.body

    //TODO: create playlist
    if( name?.trim()==="" || description?.trim() === ""){
        throw new ApiError(401,"Data fields are missing")
    }

    const playlist = await Playlist.create({
        owner: req.user?._id,
        name,
        description
    })

    if(!playlist){
        throw new ApiError(500,"Something went wrong while creating the playlist")
    }

    return res
        .status(200)
        .json(new ApiResponse(200,playlist,"Playlist created successfully"))

})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const {userId} = req.params
    //TODO: get user playlists
    if(!userId || !mongoose.Types.ObjectId.isValid(userId)){
        throw new ApiError(401,"Invalid userId")
    }
    const user = new mongoose.Types.ObjectId(String(userId))

    const playlist = await Playlist.aggregate(
        [
            {
                $match:{
                    owner: user
                }
            },
            {
                $project:{
                    _id:1,
                    owner:1,
                    name:1,
                    description:1,
                    createdAt:1,
                    updatedAt:1
                }
            }
        ]
    )
    if (!playlist || playlist.length === 0) {
        throw new ApiError(404, "No playlists found");
    }
    return res 
        .status(200)
        .json(new ApiResponse(200,playlist,"Playlists fetched successfully"))
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    //TODO: get playlist by id
    if(!playlistId || !mongoose.Types.ObjectId.isValid(playlistId)){
        throw new ApiError(400,"Invalid playlist id")
    }
    const playlist = await Playlist.findById(playlistId)
    if(!playlist){
        throw new ApiError(500,"Something went wrong while fetching the playlist")
    }
    return res
        .status(200)
        .json(new ApiResponse(200,playlist,"Playlist fetched successfully"))
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
  if (!playlistId || !mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new ApiError(400, "Invalid playist id...");
  }

  if (!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video id...");
  }
    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $push:{
                videos: videoId
            }   
         
        },
        {new: true}
    )
    if (!updatedPlaylist) {
        throw new ApiError(
        500,
        "Something went wrong while adding video to playlist..."
        );
    }

    return res 
        .status(200)
        .json(new ApiResponse(200,updatePlaylist,"Video added successfully"))

})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
    // TODO: remove video from playlist
    if (!playlistId || !mongoose.Types.ObjectId.isValid(playlistId)) {
    throw new ApiError(400, "Invalid playist id...");
    }

    if (!videoId || !mongoose.Types.ObjectId.isValid(videoId)) {
    throw new ApiError(400, "Invalid video id...");
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId,
        {
            $pull:{
                videos: videoId
            }
        },
        {new:true}
    )
     if (!updatedPlaylist) {
        throw new ApiError(
        500,
        "Something went wrong while adding video to playlist..."
        );
    }

    return res 
        .status(200)
        .json(new ApiResponse(200,updatePlaylist,"Video removed successfully"))
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    // TODO: delete playlist
    if(!playlistId || !mongoose.Types.ObjectId.isValid(playlistId)){
        throw new ApiError(400,"Invalid playlist id")
    }
    const deletedPlaylist = await Playlist.findByIdAndDelete(playlistId)
    if(!deletedPlaylist){
        throw new ApiError(500,"Something went wrong while deleting the playlist")
    }
    return res
        .status(200)
        .json(new ApiResponse(200,deletePlaylist,"Playlist deleted successfully"))
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
    const {name, description} = req.body
    //TODO: update playlist
     if(!playlistId || !mongoose.Types.ObjectId.isValid(playlistId)){
        throw new ApiError(400,"Invalid playlist id")
    }
     if( name?.trim()==="" || description?.trim() === ""){
        throw new ApiError(401,"Data fields are missing")
    }
    const updatedPlaylist = await Playlist.findByIdAndUpdate(playlistId,
        {
            $set:{
                name: name,
                description:description
            }
        },
        {new:true}
    )
    if(!updatedPlaylist){
        throw new ApiError(500,"Something went wrong while updating the playlist")
    }
    return res
        .status(200)
        .json(new ApiResponse(200,updatedPlaylist,"Playlist updated successfully"))

})

export {
    createPlaylist,
    getUserPlaylists,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist
}
