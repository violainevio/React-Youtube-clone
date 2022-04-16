import { CHANNEL_FAIL, CHANNEL_REQUEST, CHANNEL_SUCCESS } from "../actionType";

const initialState = [];

export const channelReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case CHANNEL_REQUEST:
      return { ...state, [payload.id]: { loading: true } };

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

    default:
      return state;
  }
};
