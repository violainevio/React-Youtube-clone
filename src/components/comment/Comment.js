import React from "react";
import moment from "moment";
import "./_comment.scss";

const Comment = ({ comment }) => {
  const {
    authorDisplayName,
    authorProfileImageUrl,
    publishedAt,
    textOriginal,
  } = comment;

  return (
    <div className="p-2 comment d-flex">
      <img
        src={authorProfileImageUrl}
        alt="commenter-pic"
        className="mr-3 rounded-circle"
      />
      <div className="comment__body">
        <p className="mb-1 comment__header">
          {authorDisplayName} • {moment(publishedAt).fromNow()}
        </p>
        <p className="mb-0">{textOriginal}</p>
      </div>
    </div>
  );
};

export default Comment;
