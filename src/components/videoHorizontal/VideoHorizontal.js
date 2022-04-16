import React, { useEffect, useState } from "react";
import "./_videoHorizontal.scss";

import { AiFillEye } from "react-icons/ai";
import request from "../../api";

import moment from "moment";
import numeral from "numeral";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Col, Row } from "react-bootstrap";
import { useHistory, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getChannel } from "../../redux/actions/channel.action";

const VideoHorizontal = ({ video }) => {
  const {
    id,
    snippet: {
      channelId,
      channelTitle,
      description,
      title,
      publishedAt,
      thumbnails: { medium },
    },
  } = video;

  const [views, setViews] = useState(null);
  const [duration, setDuration] = useState(null);
  //   const [channelIcon, setChannelIcon] = useState(null);
  //   const channelItem = useSelector((state) => state.channel[channelId]);
  //   const channelIcon = channelItem?.data?.snippet.thumbnails.default;

  //   const dispatch = useDispatch();

  useEffect(() => {
    const get_video_details = async () => {
      const {
        data: { items },
      } = await request("/videos", {
        params: {
          part: "contentDetails,statistics",
          id: id.videoId,
        },
      });
      setDuration(items[0].contentDetails.duration);
      setViews(items[0].statistics.viewCount);
    };
    if (!views || !duration) get_video_details();
  }, [id, views, duration]);

  //   useEffect(() => {
  //     const get_channel_icon = async () => {
  //       const {
  //         data: { items },
  //       } = await request("/channels", {
  //         params: {
  //           part: "snippet",
  //           id: channelId,
  //         },
  //       });
  //       setChannelIcon(items[0].snippet.thumbnails.default);
  //     };
  //     get_channel_icon();
  //   }, [channelId]);

  //   useEffect(() => {
  //     if (!channelItem) dispatch(getChannel(channelId));
  //   }, [channelId, channelItem, dispatch]);

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment
    .utc(seconds * 1000)
    .format(seconds > 60 * 60 ? "h:mm:ss" : "m:ss");
  const navigate = useNavigate();

  const handleClick = () => {
    // TODO handle channel click
    navigate(`/watch/${id.videoId}`);
  };

  return (
    <Row
      className="py-2 m-1 videoHorizontal align-align-items-center"
      onClick={handleClick}
    >
      {/* //TODO refractor grid */}
      <Col xs={6} md={6} className="videoHorizontal__left">
        <LazyLoadImage
          src={medium.url}
          effect="blur"
          className="videoHorizontal__thumbnail"
          wrapperClassName="videoHorizontal__thumbnail-wrapper"
        />
        <span className="videoHorizontal__duration">{_duration}</span>
      </Col>
      <Col xs={6} md={6} className="p-0 videoHorizontal__right">
        <p className="mb-1 videoHorizontal__title">{title}</p>
        <div className="videoHorizontal__channel d-flex align-items-center">
          <p className="mb-0">{channelTitle}</p>
        </div>
        <div className="videoHorizontal__details">
          <AiFillEye /> {numeral(views).format("0 a").replace("m", "M")} Views •{" "}
          {moment(publishedAt).fromNow()}
        </div>

        {/* <div className="my-1 videoHorizontal__channel d-flex align-items-center"> */}
        {/* //TODO show in search screen */}
        {/* <LazyLoadImage
               src='https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png'
               effect='blur'
             
            /> */}
        {/* <img src={channelIcon?.url} alt="channel-pic" /> */}
        {/* </div> */}
      </Col>
    </Row>
  );
};

export default VideoHorizontal;
