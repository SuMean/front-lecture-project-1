import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import {
  Box,
  Heading,
  VStack,
  HStack,
  Stack,
  Flex,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerFooter,
  Input,
  Button,
} from '@chakra-ui/react';
import ReactPlayer from 'react-player';
import LectureHeader from '../../components/LectureHeader/LectureHeader';

import { BsListUl } from 'react-icons/bs';

const Video = () => {
  const [videoList, setVideoList] = useState(0);
  const navigate = useNavigate();
  const [playedSeconds, setPlayedSeconds] = useState(0);
  const [categoryName, setCategoryName] = useState('');
  const playerRef = useRef(null);
  const location = useLocation();
  const handlePlayerReady = () => {
    if (playedSeconds > 0) {
      playerRef.current?.seekTo(parseFloat(playedSeconds), 'seconds');
    }
  };
  const handleDuration = duration => {
    console.log(duration); // logs the video duration in seconds
  };

  const handleProgress = state => {
    const now = new Date().getTime();
    const data = {
      playedSeconds: state.playedSeconds,
      lastPlayed: now,
    };
    localStorage.setItem('videoData', JSON.stringify(data));
    setPlayedSeconds(state.playedSeconds);
  };
  useEffect(() => {
    const savedData = localStorage.getItem('videoData');
    if (savedData) {
      const { playedSeconds, lastPlayed } = JSON.parse(savedData);
      const now = new Date().getTime();
      console.log(new Date().getTime());
      const timeDiff = now - lastPlayed;
      if (timeDiff < 86400000) {
        // 24 hours in milliseconds
        setPlayedSeconds(parseFloat(playedSeconds));
        playerRef.current?.seekTo(parseFloat(playedSeconds), 'seconds');
      }
    }
  }, []);

  const youtubeConfig = {
    playerVars: {
      origin: window.location.origin,
    },
  };
  useEffect(() => {
    getVideoList();
  }, []);


  const getVideoList = async () => {
    try {
      await fetch(`http://127.0.0.1:8000/api/v1/videos/1`).then(res =>
        res.json().then(data => {
          console.log('Video URL:', data.videoFile);
          setVideoList(data.videoFile);
        })
      );
    } catch (e) {
      console.log('e:', e);
    }
  };
  const getVideoUrl = () => {
    const searchParams = new URLSearchParams(location.search);
    return (
      searchParams.get('videoUrl') || 'http://127.0.0.1:8000/api/v1/videos/1'
    ); // Default URL
  };
  const aspectRatio = 9 / 16; // 비디오 비율 (9:16)
  const maxWidth = 1280; // 최대 너비
  const maxHeight = maxWidth * aspectRatio; // 최대 높이

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const btnRef = useRef();

  const handleDrawerOpen = () => {
    setIsDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setIsDrawerOpen(false);
  };
  return (
    <>
      <LectureHeader />
      <Flex justifyContent="space-between">
        <Box
          width="100%"
          maxWidth={`${maxWidth}px`}
          position="relative"
          paddingTop={`calc(100% * ${aspectRatio})`}
          maxHeight={`${maxHeight}px`}
          margin="auto"
          overflow="hidden"
        >
          <ReactPlayer
            className="react-player"
            style={{ position: 'absolute', top: 0, left: 0 }}
           
            width="100%" // 플레이어 크기 (가로)
            height="100%" // 플레이어 크기 (세로)
            url={getVideoUrl()}
            playing={true} // 자동 재생 on
            muted={true} // 자동 재생 on
            loop={false} // 무한 반복 여부
            controls={true} // 플레이어 컨트롤 노출 여부
            light={false} // 플레이어 모드
            pip={true} // pip 모드 설정 여부
            played={playedSeconds}
            onProgress={handleProgress}
            onReady={handlePlayerReady}
            onDuration={handleDuration} //영상길이
            config={{
              youtube: {
                playerVars: {
                  origin: window.location.origin,
                },
              },
            }}
          />
        </Box>
        <Button ref={btnRef} colorScheme="ghost" onClick={handleDrawerOpen}>
          {<BsListUl size={35} style={{ color: 'black' }} />}
        </Button>
      </Flex>

      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={handleDrawerClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>목차</DrawerHeader>

            <DrawerBody></DrawerBody>

            <DrawerFooter></DrawerFooter>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Video;