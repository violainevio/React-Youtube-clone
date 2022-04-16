import { createStore, applyMiddleware, combineReducers } from "redux";

import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import { authReducer } from "./reducers/auth.reducer";
import { channelReducer } from "./reducers/channel.reducer";
import { commentListReducer } from "./reducers/comments.reducer";
import {
  homeVideosReducer,
  relatedVideoReducer,
  selectedVideoReducer,
} from "./reducers/videos.reducer";

const rootReducer = combineReducers({
  auth: authReducer,
  homeVideos: homeVideosReducer,
  channel: channelReducer,
  selectedVideo: selectedVideoReducer,
  // channelDetails: channelDetailsReducer,
  commentList: commentListReducer,
  relatedVideos: relatedVideoReducer,
});

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
