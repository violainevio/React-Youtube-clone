import React, { useEffect } from "react";
import "./_videoMetaData.scss";
import moment from "moment";
import numeral from "numeral";

import { MdThumbUp, MdThumbDown } from "react-icons/md";
import ShowMoreText from "react-show-more-text";
import { useDispatch, useSelector } from "react-redux";
import { getChannel } from "../../redux/actions/channel.action";

const VideoMetaData = ({ video: { snippet, statistics }, videoId }) => {
  const { channelId, channelTitle, description, title, publishedAt } = snippet;
  const { viewCount, likeCount } = statistics;
  const channelItem = useSelector((state) => state.channel[channelId]);
  const channelIcon = channelItem?.data?.snippet.thumbnails.default;
  const channelStats = channelItem?.data?.statistics.subscriberCount;

  const dispatch = useDispatch();

  const subscriptionStatus = false;

  // const { snippet: channelSnippet, statistics: channelStatistics } =
  //   useSelector((state) => state.channelDetails.channel);

  // const subscriptionStatus = useSelector(
  //   (state) => state.channelDetails.subscriptionStatus
  // );

  // useEffect(() => {
  //    dispatch(getChannelDetails(channelId))
  //    dispatch(checkSubscriptionStatus(channelId))
  // }, [dispatch, channelId])

  useEffect(() => {
    if (!channelItem) dispatch(getChannel(channelId));
  }, [channelId, channelItem, dispatch]);

  return (
    <div className="videoMetaData py-2">
      <div className="videoMetaData__top">
        <h5>{title}</h5>
        <div className="d-flex justify-content-between align-items-center py-1">
          <span>
            {numeral(viewCount).format("0 a").replace("m", "M")} Views •{" "}
            {moment(publishedAt).fromNow()}
          </span>

          <div>
            <span className="mr-3">
              <MdThumbUp size={26} />{" "}
              {numeral(likeCount).format("0 a").replace("m", "M")}
            </span>
            <span className="mr-3">
              <MdThumbDown size={26} />
              {/* {numeral(100).format("0 a").replace("m", "M")} */}
            </span>
          </div>
        </div>
      </div>
      <div className="videoMetaData__channel d-flex justify-content-between align-items-center my-2 py-3">
        <div className="d-flex">
          <img src={channelIcon?.url} alt="" className="mr-3 rounded-circle" />
          <div className="d-flex flex-column">
            <span>{channelTitle}</span>
            <span>
              {" "}
              {numeral(channelStats).format("0 a").replace("m", "M")}{" "}
              Subscribers
            </span>
          </div>
        </div>

        <button
          className={`p-2 m-2 border-0 btn ${subscriptionStatus && "btn-gray"}`}
        >
          {subscriptionStatus ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      <div className="videoMetaData__description">
        <ShowMoreText
          lines={3}
          more="SHOW MORE"
          less="SHOW LESS"
          anchorClass="showMoreText"
          expanded={false}
        >
          {description}
        </ShowMoreText>
      </div>
    </div>
  );
};

export default VideoMetaData;
