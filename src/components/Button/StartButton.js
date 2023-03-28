import React from 'react';

import { RiHomeHeartLine } from 'react-icons/ri';
import { BsShare } from 'react-icons/bs';

import { HStack, Box, Flex, Button } from '@chakra-ui/react';

const StartButton = ({ lectureTitle, is_enrolled }) => {
  return (
    <HStack
      position="fixed"
      bottom="20px"
      w="100%"
      h="75px"
      justifyContent="center"
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        h="100%"
        w="1200px"
        fontWeight="bold"
        rounded="15"
        bg="white"
        py="2"
        px="20"
        boxShadow="1px 1px 10px rgba(0, 0, 0, 0.1)"
      >
        <Box fontSize="18px" color="gray.600">
          {lectureTitle}
        </Box>
        <Box h="100%">
          <Button h="100%" colorScheme="gray" px="5" mr="3">
            <BsShare size={30} style={{ color: 'gray' }} />
          </Button>
          <Button
            h="100%"
            bg="#003C93"
            color="white"
            _hover={{ bg: '#012a66' }}
            _active={{ bg: '#012a66' }}
            borderRadius="lg"
            boxShadow="lg"
            fontSize="24px"
            px="20"
          >
            {is_enrolled ? '수강중' : '수강하기'}
          </Button>
        </Box>
      </Box>
    </HStack>
  );
};

export default StartButton;
