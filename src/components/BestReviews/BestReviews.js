import { React, useState } from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Center,
} from '@chakra-ui/react';
import { Text, Stack, Heading, HStack } from '@chakra-ui/react';

import { Link } from 'react-router-dom';

import StarRating from '../LectureCard/StarRating';

const ReviewCard = ({ user, lectureNum, rating, id, contents }) => {
  return (
    <Stack>
      <Card
        width={'500px'}
        height={'250px'}
        direction={{ base: 'column' }}
        justifyContent={'center'}
        bg={'#fafafa'}
        borderColor={'#003c93'}
        variant="outline"
        borderRadius={20}
        borderWidth={2}
        boxShadow="md"
      >
        <Stack>
          <CardBody>
            <Heading size="md" fontSize="18px" py="1">
              Best Review {id}
            </Heading>
            <Text py="2" color="#545454">
              {user}
            </Text>
            <Text fontSize="14" py="2">
              {contents}
            </Text>
            <HStack spacing="3px" justify="center" fontSize="24" paddingTop="2">
              <StarRating rating={rating} />
            </HStack>
          </CardBody>
        </Stack>
      </Card>
    </Stack>
  );
};

export default ReviewCard;
