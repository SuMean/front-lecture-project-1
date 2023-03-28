import axios from 'axios';
import { is } from 'immutable';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { getAccessToken } from './Token';
export const instance = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  // baseURL: 'http://115.85.182.132:8000/api/v1/',

  headers: {
    'X-CSRFToken': Cookies.get('csrftoken'),
    Authorization: 'Bearer ' + Cookies.get('access'),
  },
  withCredentials: true,
});
export const instanceNotLogin = axios.create({
  baseURL: 'http://127.0.0.1:8000/api/v1/',
  // baseURL: 'http://115.85.182.132:8000/api/v1/',

  headers: {
    'X-CSRFToken': Cookies.get('csrftoken'),
  },
  withCredentials: true,
});
instance.interceptors.response.use(
  response => {
    return response;
  },
  async error => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = Cookies.get('refresh');
        const accessToken = Cookies.get('access');

        const newAccessToken = await postRefreshToken(
          refreshToken,
          accessToken
        );

        if (newAccessToken) {
          Cookies.set('access', newAccessToken);

          // Update the Authorization header with the new access token
          instance.defaults.headers['Authorization'] =
            'Bearer ' + newAccessToken;
          originalRequest.headers['Authorization'] = 'Bearer ' + newAccessToken;

          return instance(originalRequest);
        } else {
          useNavigate('http://127.0.0.1:8000/api/v1/users/jwt-token-auth/');
          return Promise.reject(error);
        }
      } catch (refreshError) {
        useNavigate('http://127.0.0.1:8000/api/v1/users/jwt-token-auth/');
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export async function userNameLogin({ username, password }) {
  const response = await fetch(
    'http://127.0.0.1:8000/api/v1/users/jwt-token-auth/  ',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
      credentials: 'include',
    }
  );

  if (response.ok) {
    const data = await response.json();
    const refresh = data.refresh;
    const access = data.access;

    Cookies.set('access', access);
    Cookies.set('refresh', refresh);

    return true;
  } else {
    const { message } = await response.json();
    throw new Error(message);
  }
}
export async function postRefreshToken(refresh, access) {
  try {
    const response = await axios.post(
      'http://127.0.0.1:8000/api/v1/users/jwt-token-auth/refresh/',
      {
        refresh,
        access,
      }
    );
    return response.data.access;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
}

export const signUpUser = data => {
  return instanceNotLogin.post('users/', data).then(res => res.data);
};

export const getMyProfile = () => {
  return instance.get('users/myprofile').then(res => res.data);
};
export const putMyProfile = () => {
  return instance.put('users/myprofile').then(res => res.data);
};
export const changeProfileUser = data => {
  return instance.put('users/myprofile', data).then(res => res.data);
};

export const getLectureInfo = () => {
  return instance.get(`users/myprofile`).then(res => res.data);
};
export const getBestReviews = () => {
  return instance.get(`reviews/1`).then(res => res.data);
};
export const getLectureRate = () => {
  return instanceNotLogin.get(`lectures/mainpage`).then(res => res.data);
};

export const getLectureDetail = async page => {
  const access = getAccessToken();
  try {
    if (access) {
      const res = await instance.get(`lectures/${page}`);
      return res.data;
    } else {
      const res = await instanceNotLogin.get(`lectures/${page}`);
      return res.data;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
};
export const getLectureAndCategoryAndSearch = async ({ queryKey }) => {
  const [, bigCategory, smallCategory, page, searchName] = queryKey;

  if (searchName) {
    return await instanceNotLogin
      .get(
        `lectures/${bigCategory}/${smallCategory}/?page=${page}&search=${searchName}`
      )
      .then(res => res.data);
  } else {
    return await instanceNotLogin
      .get(`lectures/${bigCategory}/${smallCategory}/?page=${page}`)
      .then(res => res.data);
  }
};
export const postReview = ({ lectureNum, data }) => {
  return instance.post(`reviews/${lectureNum}`, data).then(res => res.data);
};

export const postReply = ({ lectureNum, reviewNum, data }) => {
  return instance
    .post(`reviews/${lectureNum}/${reviewNum}`, data)
    .then(res => res.data);
};
export const registerLecture = lectureNum => {
  return instance
    .put(`users/calculated-lectures/${lectureNum}/`, '')
    .then(res => res.status);
};
export const fetchVideoList = async ({ queryKey }) => {
  const [, lectureId, num] = queryKey;
  return await instance
    .get(`videos/lectures/${lectureId}/${num}`)
    .then(res => res.data);
};

export const savePlayedSeconds = ({ lectureId, num, lastPlayed }) => {
  return instance
    .put(`watchedlectures/${lectureId}/${num}`, { lastPlayed })
    .then(res => res.data);
};

export const watchedlectures80 = ({
  lectureId,
  num,
  is_completed,
  lastPlayed,
}) => {
  return instance
    .put(`watchedlectures/${lectureId}/${num}`, { is_completed, lastPlayed })
    .then(res => res.data);
};
