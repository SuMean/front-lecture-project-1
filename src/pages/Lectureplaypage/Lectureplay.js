import React, {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
} from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';
import {
  Box,
  Stack,
  HStack,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Button,
  Progress,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import LectureHeader from '../../components/LectureHeader/LectureHeader';
import Notfound from '../Notfound/Notfound';
import {
  fetchVideoList,
  savePlayedSeconds,
  watchedlectures80,
} from '../../api';
import { BsListUl } from 'react-icons/bs';

import VideoList from '../../components/VideoList/VideoList';

import { Spinner } from '@chakra-ui/react';

const Video = () => {
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [played80, setPlayed80] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const navigate = useNavigate();

  const playerRef = useRef(null);

  const { lectureId, num } = useParams();
  const queryKey = ['videoList', lectureId, num];
  const {
    data: videoList,
    isLoading,
    isError,
  } = useQuery(queryKey, fetchVideoList, {
    retry: false,
    staleTime: 5000,
    cacheTime: 0,
    refetchOnMount: true,
  }); // 로딩때 전 내용이 보이고 끔뻑이던 문제 해결
  if (isError) {
    navigate('/notlogin');
  }

  const queryClient = useQueryClient();
  const savePlayedSecondsMutation = useMutation(savePlayedSeconds, {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    },
  });

  const watchedlectures80Mutation = useCallback(
    useMutation(watchedlectures80, {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey);
      },
    }),
    []
  );

  const handleDuration = duration => {
    // console.log('영상길이', duration);
  };

  const handleProgress = state => {
    setPlayedSeconds(state.playedSeconds);
    const duration = playerRef.current?.getDuration();
    if (duration && state.playedSeconds >= duration * 0.8 && !isCompleted) {
      setIsCompleted(true);
      setPlayed80(true);
      watchedlectures80Mutation.mutate({
        lectureId,
        num,
        is_completed: true,
        lastPlayed: playedSeconds,
      });
      return;
    }
  };

  useEffect(() => {
    const fetchedPlayedSeconds = videoList?.lastPlayed;
    if (fetchedPlayedSeconds) {
      setPlayedSeconds(parseFloat(fetchedPlayedSeconds));
      playerRef.current?.seekTo(parseFloat(fetchedPlayedSeconds), 'seconds');
    } else {
      setPlayedSeconds(0);
      playerRef.current?.seekTo(0, 'seconds');
    }
  }, [videoList]);

  const aspectRatio = 9 / 21;
  const maxWidth = 1280;
  const maxHeight = maxWidth * aspectRatio;

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const btnRef = useRef();

  const handleSaveAndClose = async () => {
    try {
      await savePlayedSecondsMutation.mutateAsync({
        lectureId,
        num,
        lastPlayed: playedSeconds,
      });
      navigate('/userinfo');
    } catch (error) {
      console.error(error);
    }
    // console.log('Current played seconds:', playedSeconds);
  };

  const handlePlayerReady = () => {
    const fetchedPlayedSeconds = videoList?.lastPlayed;
    if (fetchedPlayedSeconds && !loaded) {
      playerRef.current.seekTo(parseFloat(fetchedPlayedSeconds), 'seconds');
      setLoaded(true);
    }
    setPlaying(true);
  };

  useEffect(() => {
    if (isCompleted) {
      watchedlectures80Mutation.mutate({
        lectureId,
        num,
        is_completed: true,
        lastPlayed: playedSeconds,
      });
    }
  }, [isCompleted, watchedlectures80Mutation, lectureId, num]);

  const handleError = e => {
    console.error('비디오 에러:', e);
  };

  const resetCompleted = () => {
    setIsCompleted(false);
    setPlayed80(false);
  };

  const completedCount = useMemo(() => {
    return videoList?.list.filter(item => item.is_completed).length || 0;
  }, [videoList]);

  const progressPercent = useMemo(() => {
    return Math.round((completedCount / videoList?.list.length) * 100);
  }, [completedCount, videoList]);

  if (videoList) {
    return (
      <>
        <LectureHeader />
        <Flex justifyContent="space-between" w="100%" h="100%" minh="100h">
          <Box
            width="100%"
            maxWidth={`${maxWidth}px`}
            position="relative"
            paddingTop={`calc(100% * ${aspectRatio})`}
            maxHeight={`${maxHeight}px`}
            // margin="auto"
            overflow="hidden"
          >
            <ReactPlayer
              className="react-player"
              style={{ position: 'absolute', top: 0, left: 0 }}
              width="100%"
              height="100%"
              url={videoList.url.videoFile}
              playing={playing}
              muted={true}
              loop={false}
              controls={true}
              light={false}
              pip={true}
              played={[videoList?.lastPlayed || 0, undefined]}
              onProgress={handleProgress}
              onDuration={handleDuration}
              ref={playerRef}
              onReady={handlePlayerReady}
              onError={handleError}
              config={{
                youtube: {
                  playerVars: {
                    origin: window.location.origin,
                  },
                },
              }}
            />
          </Box>
          <Box bg="rgb(240,240,240,0.8)">
            <Button
              ref={btnRef}
              colorScheme="ghost"
              onClick={() => setIsDrawerOpen(true)}
            >
              {<BsListUl size={35} style={{ color: 'black' }} />}
            </Button>
          </Box>
        </Flex>

        <Drawer
          isOpen={isDrawerOpen}
          placement="right"
          onClose={() => setIsDrawerOpen(false)}
          finalFocusRef={btnRef}
        >
          <DrawerOverlay>
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>
                <Box fontSize="24">목차</Box>
                <Box px="1" py="2">
                  <Box>{videoList.url.calculatedLecture.lectureTitle}</Box>
                  <Box fontSize="14" color="#525252" paddingTop="2">
                    수강 기한 : 무제한
                  </Box>
                  <Box fontSize="14" color="#525252" paddingBottom="5">
                    진도율 : {completedCount}강/{videoList.list.length}강 (
                    {progressPercent}%)
                  </Box>
                </Box>
                <Box px="1">
                  <Progress
                    value={progressPercent}
                    size="xs"
                    rounded="lg"
                    bg="#dedede"
                    sx={{
                      '& div': {
                        backgroundColor: '#003C93',
                      },
                    }}
                  />
                </Box>
              </DrawerHeader>

              <DrawerBody width="100%" fontWeight="600">
                <Stack spacing={3}>
                  {isLoading ? (
                    <Flex justifyContent="center">
                      <Spinner />
                    </Flex>
                  ) : (
                    videoList.list?.map((video, index) => (
                      <VideoList
                        index={index + 1}
                        key={video.id}
                        videoTitle={video.title}
                        videoLength={video.videoLength}
                        lectureId={lectureId}
                        numColor={index + 1 == num ? '#dfe8f5' : '#f2f3f5'}
                        buttonColor={
                          video.is_completed
                            ? '#003C93' //true인 경우: 버튼 색상을 pink로 변경, false인 경우에는 다음 아래의 조건을 확인
                            : index + 1 == num && played80
                            ? '#003C93'
                            : '#b8b8b8'
                        }
                        resetCompleted={resetCompleted}
                      />
                    ))
                  )}
                </Stack>
              </DrawerBody>

              <DrawerFooter>
                <Button
                  bg="#003C93"
                  color="white"
                  _hover={{ bg: '#012a66' }}
                  _active={{ bg: '#012a66' }}
                  borderRadius="lg"
                  boxShadow="lg"
                  onClick={handleSaveAndClose}
                >
                  저장 후 닫기
                </Button>
              </DrawerFooter>
            </DrawerContent>
          </DrawerOverlay>
        </Drawer>
      </>
    );
  }
};

export default Video;
