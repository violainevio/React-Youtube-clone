import { CHANNEL_FAIL, CHANNEL_REQUEST, CHANNEL_SUCCESS } from "../actionType";

import request from "../../api";

export const getChannel = (channelId) => async (dispatch) => {
  dispatch({
    type: CHANNEL_REQUEST,
    payload: {
      id: channelId,
    },
  });

  await request("/channels", {
    params: {
      part: "snippet",
      id: channelId,
    },
  })
    .then((res) =>
      dispatch({
        type: CHANNEL_SUCCESS,
        payload: {
          id: channelId,
          data: res.data.items[0],
        },
      })
    )
    .catch((err) => {
      console.log(err.message);
      dispatch({
        type: CHANNEL_FAIL,
        payload: {
          id: channelId,
          error: err.message,
        },
      });
    });
};
