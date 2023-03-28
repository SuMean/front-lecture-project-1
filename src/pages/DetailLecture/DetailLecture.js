import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  getLectureDetail,
  postReview,
  postReply,
  registerLecture,
} from '../../api';
import ModalConfirm from '../../components/Modal/ModalConfirm';
import StarRating from '../../components/LectureCard/StarRating';
import Review from '../../components/Reviews/Review';
import ReviewForm from '../../components/Reviews/ReviewForm';
import { getAccessToken } from '../../Token';
import {
  faChalkboardTeacher,
  faShare,
} from '@fortawesome/free-solid-svg-icons';
import { BsShare } from 'react-icons/bs';
import { RiHomeHeartLine } from 'react-icons/ri';
import { BsFillPlayCircleFill } from 'react-icons/bs';

import {
  Grid,
  GridItem,
  HStack,
  Box,
  Image,
  VStack,
  Stack,
  Button,
  Input,
  Textarea,
  FormControl,
  Divider,
  Flex,
  Text,
} from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ModalLecture from '../../components/Modal/ModalLecture';
import StartButton from '../../components/Button/StartButton';
// import QnaButton from '../../components/Button/QnaButton';
import { useNavigate } from 'react-router-dom';

import VideoList from '../../components/List/VideoList';

const DetailLecture = () => {
  const { id } = useParams();
  const [registerLectureClick, setRegisterLectureClick] = useState(false);
  const [loginCheck, setLoginCheck] = useState(true);
  const navigate = useNavigate();
  const [lectureData, setLectureData] = useState(null);
  const { isLoading, error, data } = useQuery(
    ['lectureInfo', id],

    () => {
      getLectureDetail(id);
    }
  );
  if (error) {
    navigate('/notfound');
  }
  // if (error) {
  //   navigate('/notfound');
  // }
  const queryClient = useQueryClient();

  const { mutate } = useMutation(registerLecture, {
    onMutate: d => console.log('mutate', d),
    onSuccess: () => {
      queryClient.invalidateQueries(['lectureInfo']);
      navigate('/userinfo');
    },
  });

  const [loadMoreCount, setLoadMoreCount] = useState(0);

  const handleLoadMore = () => {
    setLoadMoreCount(loadMoreCount + 1);
  };

  const reviewsToShow = 5 * (loadMoreCount + 1); // 처음 5개, 10개, 15개 이런 식으로 늘어남.

  // const onRegister = async () => {
  //   try {
  //     await mutate({ lectureNum });
  //     navigate('/userinfo');
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handleRegisterClick = () => {
    try {
      const token = Cookies.get('access');

      if (!token) throw new Error('No token found');
      // use the access token here
      setRegisterLectureClick(true);
    } catch (error) {
      setLoginCheck(false);
    }
  };
  const onSubmit = () => {
    console.log('onSubmit');
    mutate(id);
  };
  useEffect(() => {
    if (!isLoading && !error) {
      setLectureData(data);
      console.log(data);
    }
  }, [data, isLoading, error]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <>
      <Grid
        w="1300px"
        pt="20"
        pb="10"
        px="4"
        gap="1"
        mx="auto"
        templateAreas={`"info"
                  "contents"
                  "reviews"`}
      >
        <GridItem
          bg="#f0f5fc"
          borderRadius="3xl"
          h="400px"
          area={'info'}
          px="20"
          py="10"
          fontWeight="bold"
        >
          <HStack h="100%">
            <Box w="45%" borderRadius="full">
              <Image
                src={data.lecture_data.thumbnail}
                alt="lecture image"
                borderRadius="10px"
                objectFit="cover"
              />
            </Box>
            <Box w="10%"></Box>
            <Box w="45%">
              <Stack h="100%" spacing={3}>
                <Box>{data.lecture_data.categories.parent.name}</Box>
                <Box fontSize="24">{data.lecture_data.lectureTitle}</Box>
                <Box pb="8">
                  <FontAwesomeIcon icon={faChalkboardTeacher} />
                  &nbsp;{data.lecture_data.instructor.username}
                </Box>
                <Box>
                  <StarRating rating={data.lecture_data.rating} /> (
                  {data.lecture_data.rating})
                </Box>
                <Box>
                  {data.lecture_data.reviews_num}개의 수강평 ∙{' '}
                  {data.lecture_data.total_student}명의 수강생
                </Box>
                <Box>
                  <Stack direction="row" spacing={4}>
                    <Button
                      colorScheme="black"
                      variant="outline"
                      w="150px"
                      onClick={handleRegisterClick}
                    >
                      <RiHomeHeartLine size={20} /> &nbsp;&nbsp;
                      {data.is_enrolled ? '수강중' : '수강하기'}
                    </Button>
                    <Button colorScheme="black" variant="outline" w="150px">
                      <BsShare /> &nbsp;&nbsp;공유하기
                    </Button>
                  </Stack>
                </Box>
              </Stack>
            </Box>
          </HStack>
        </GridItem>
        <GridItem
          area={'contents'}
          display="flex"
          justifyContent="center"
          py="10"
        >
          <Stack w="800px">
            <Box fontSize="22" paddingTop="10">
              <Text as="span" fontWeight="bold">
                {data.lecture_data.targetAudience}
              </Text>
              를 위해 준비한
              <br />
              <Text as="span" fontWeight="bold">
                [{data.lecture_data.categories.parent.name} /{' '}
                {data.lecture_data.categories.name}]
              </Text>{' '}
              강의입니다.
            </Box>
            <Box fontSize="22" fontWeight="bold" py="3">
              강의소개
            </Box>
            <Box>{data.lecture_data.lectureDescription}</Box>
            <Divider p="5" />
            <Box fontSize="22" fontWeight="bold" py="10">
              목 차{' '}
              <Box as="span" fontSize="16" fontWeight="600" color="#A6A6A6">
                총 {data.video_data.length}개
              </Box>
            </Box>
            {data.video_data?.map((video, index) => (
              <VideoList
                key={video.id}
                videoTitle={video.title}
                videoLength={video.videoLength}
              />
            ))}
            <Divider p="5" />
          </Stack>
        </GridItem>
        <GridItem
          area={'reviews'}
          py="3"
          display="flex"
          justifyContent="center"
        >
          <Stack w="800px">
            <ReviewForm
              reviewsNum={data.lecture_data.reviews_num}
              ratingScore={data.lecture_data.rating}
              lectureNum={data.lecture_data.LectureId}
            />
            <Box fontSize="18px" fontWeight="600" pt="10">
              Reviews
            </Box>
            <Divider borderColor="black.500" pt="3" />
            <Box pt="3"></Box>
            {data.lecture_data.reviews?.slice(0, reviewsToShow).map(review => (
              <Review
                key={review.id}
                username={review.user.username}
                rating={review.rating}
                content={review.content}
                created_at={review.created_at.slice(0, 10)}
                reply={review.reply}
                lectureNum={data.lecture_data.LectureId}
                reviewNum={review.id}
              />
            ))}
            {data.lecture_data.reviews.length > reviewsToShow && (
              <Box
                display="flex"
                justifyContent="center"
                border="1px solid #DCDCDC"
                rounded="5"
                color="#958E96"
              >
                <Button w="100%" variant="ghost" onClick={handleLoadMore}>
                  수강평 더보기
                </Button>
              </Box>
            )}
          </Stack>
        </GridItem>
      </Grid>
      <StartButton
        lectureTitle={data.lecture_data.lectureTitle}
        is_enrolled={data.is_enrolled}
      />
      {registerLectureClick && loginCheck ? (
        <ModalLecture
          onSubmit={onSubmit}
          isOpen={registerLectureClick && loginCheck}
          onClose={() => setRegisterLectureClick(false)}
        />
      ) : (
        <ModalConfirm
          onSubmit={onSubmit}
          onClose={() => setRegisterLectureClick(false)}
          isOpen={!loginCheck}
        />
      )}
    </>
  );
};

export default DetailLecture;
