import {
  CHANNEL_FAIL,
  CHANNEL_REQUEST,
  CHANNEL_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from "../actionType";

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
      part: "snippet, statistics",
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

export const checkSubscriptionStatus = (id) => async (dispatch, getState) => {
  try {
    const { data } = await request("/subscriptions", {
      params: {
        part: "snippet",
        forChannelId: id,
        mine: true,
      },
      headers: {
        Authorization: `Bearer ${getState().auth.accessToken}`,
      },
    });
    dispatch({
      type: SET_SUBSCRIPTION_STATUS,
      payload: data.items.length !== 0,
    });
    console.log(data);
  } catch (error) {
    console.log(error.response.data);
  }
};
