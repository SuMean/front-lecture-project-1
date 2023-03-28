import { React, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import MylectureCard from '../MylectureCard/MylectureCard';
import { Box, Grid, GridItem } from '@chakra-ui/react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getLectureInfo } from '../../api';

function MyLecture() {
  const navigate = useNavigate();

  const { isLoading, data, isError } = useQuery(['lectureInfo'], () =>
    getLectureInfo()
  );
  if (isError) {
    navigate('/notfound');
    console.log('hello');
  }
  useEffect(() => {
    if (isError) {
      navigate('/notfound');
    }
  }, [isError, navigate]);
  if (data) {
    console.log(data.calculatedLecture);
    return (
      <>
        <Grid>
          <GridItem w="800px" mx="auto" py="10">
            <Grid
              templateColumns={['repeat(1, 1fr)', 'repeat(3, 1fr)']}
              gap="5"
            >
              {data.calculatedLecture?.map(item => (
                <GridItem key={item.lecture.LectureId} mx="auto">
                  <MylectureCard
                    lectureNumber={item.lecture.LectureId}
                    key={item.id}
                    img={item.lecture.thumbnail}
                    lectureDescription={item.lecture.lectureDescription}
                    lectureTitle={item.lecture.lectureTitle}
                    targetAudience={item.lecture.targetAudience}
                    instructor={item.lecture.instructor.username}
                  />
                </GridItem>
              ))}
            </Grid>
          </GridItem>
        </Grid>
      </>
    );
  }
}

export default MyLecture;
