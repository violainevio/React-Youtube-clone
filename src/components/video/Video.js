import React, { useEffect, useState } from "react";
import "./_video.scss";

import { AiFillEye } from "react-icons/ai";
import request from "../../api";

import moment from "moment";
// import "moment/locale/fr";
import numeral from "numeral";
import { useDispatch, useSelector } from "react-redux";
import { getChannel } from "../../redux/actions/channel.action";
import { useNavigate } from "react-router-dom";

const Video = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState(video?.statistics?.viewCount);
  const [duration, setDuration] = useState(video?.contentDetails?.duration);
  const channelItem = useSelector((state) => state.channel[channelId]);
  const channelIcon = channelItem?.data?.snippet.thumbnails.default;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment
    .utc(seconds * 1000)
    .format(seconds > 60 * 60 ? "h:mm:ss" : "m:ss");

  const _videoId = id?.videoId || id;

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: _videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    if (!views || !duration) get_video_details();
  }, [_videoId, views, duration]);

  useEffect(() => {
    const get_channel_item = () => {
      dispatch(getChannel(channelId));
    };
    if (!channelItem) get_channel_item();
  }, [channelId, channelItem, dispatch]);

  const handleVideoClick = () => {
    navigate(`/watch/${_videoId}`);
  };

  return (
    <div className="video" onClick={handleVideoClick}>
      <div className="video__top">
        <img src={medium.url} alt="video-pic" />
        <span>{_duration}</span>
      </div>
      <div className="video__title">{title}</div>
      <div className="video__details">
        <span>
          <AiFillEye /> {numeral(views).format("0 a").replace("m", "M")} Views •{" "}
        </span>
        <span> {moment(publishedAt).fromNow()} </span>
      </div>
      <div className="video__channel">
        <img src={channelIcon?.url} alt="channel-pic" />
        <p>{channelTitle}</p>
      </div>
    </div>
  );
};

export default Video;
