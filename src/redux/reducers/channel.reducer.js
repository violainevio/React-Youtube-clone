import {
  CHANNEL_FAIL,
  CHANNEL_REQUEST,
  CHANNEL_SUCCESS,
  SET_SUBSCRIPTION_STATUS,
} from "../actionType";

const initialState = [];

const itemInitialState = {
  loading: true,
  data: null,
  subscriptionStatus: false,
};

export const channelReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANNEL_REQUEST:
      return {
        ...state,
        [payload.id]: itemInitialState,
      };

    case CHANNEL_SUCCESS:
      return {
        ...state,
        [payload.id]: {
          data: payload.data,
          loading: false,
        },
      };

    case CHANNEL_FAIL:
      return {
        ...state,
        [payload.id]: {
          error: payload.error,
          loading: false,
        },
      };

    case SET_SUBSCRIPTION_STATUS:
      return {
        ...state,
        [payload.id]: {
          subscriptionStatus: payload,
        },
      };

    default:
      return state;
  }
};
