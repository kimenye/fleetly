import axios from "axios";

export const fetchUserAndTweets = async (store) => {
  const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/auth/user`);
  const { tweets, user } = response.data
  store.setState({ user: user, tweets: tweets, dataFetched: true });
};

export const logout = async (store) => {
  const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/auth/user/logout`);

  if (result.success == 'success') {
    store.setState({ user: null, tweets: []})
  }
};

export const fetchTweets = async (store, userId) => {
  const result = await axios.post(`${process.env.REACT_APP_BASE_URL}/api/v1/users/${userId}/fetchTweets`);
  store.setState({ tweets: result.data.data.tweets, dataFetched:true })
}
