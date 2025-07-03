import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.models.js"
import { Subscription } from "../models/subscription.models.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import { subscribe } from "diagnostics_channel"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
    // TODO: toggle subscription
    if (!channelId || !mongoose.Types.ObjectId.isValid(channelId)) {
    throw new ApiError(400, "Invalid channel ID");
    }
    const existingSubscriber = await Subscription.findOne({
        channel: channelId,
        subscriber: req.user?._id
    })

    if(existingSubscriber){
        const unsubscribe = await Subscription.findByIdAndDelete(existingSubscriber._id)
        return res.status(200).json(
        new ApiResponse(200, null, "Unsubscribed successfully"))
       
    } else {
        const subscribe = await Subscription.create({
        channel: channelId,
        subscriber: req.user?._id
        })
    }

    return res.status(200).json(
      new ApiResponse(200, null, "Subscribed successfully")
    );

})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const {channelId} = req.params
     if (!channelId || !mongoose.Types.ObjectId.isValid(channelId)) {
    throw new ApiError(400, "Invalid channel ID");
    }

    const channelSubscribers = await Subscription.aggregate([
        {
            $match:{
                channel: new mongoose.Types.ObjectId(String(channelId))
            }
        },
        {
            $lookup:{
                from: "users",
                localField:"subscriber",
                foreignField: "_id",
                as: "subscribers"
            },
        },
        {
            $unwind: "$subscribers"
        },
        {
            $project:{
                username:"$subscribers.username",
                fullname:"$subscribers.fullname",
                avatar:"$subscribers.avatar"
            }
        }
      
    ])
    if(!channelSubscribers?.length){
        throw new ApiError(500,"Something went wrong while fetching the subscribers")
    }

    return res 
        .status(200)
        .json(new ApiResponse(200,channelSubscribers,"Subscribers fetched successfully"))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    if(!subscriberId || !mongoose.Types.ObjectId.isValid(subscriberId)){
        throw new ApiError(400,"Invalid id")
    }
    const channels = await Subscription.aggregate(
        [
            {
                $match:{
                    subscriber : new mongoose.Types.ObjectId(String(subscriberId))
                }
            },
            {
                $lookup:{
                    from: "users",
                    localField: "channel",
                    foreignField: "_id",
                    as: "channels",
                }
            },
             {
            $unwind: "$channels"
            },
            {
            $project:{
                username:"$channels.username",
                fullname:"$channels.fullname",
                avatar:"$channels.avatar"
                }
            }
        ]
    )
    if (!channels?.length){
        throw new ApiError(500,"Something went wrong while fetching channels")
    }
    return res 
        .status(200)
        .json(new ApiResponse(200,channels,"Channels fetched successfully"))

})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}