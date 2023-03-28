import {
  Box,
  Container,
  Link,
  SimpleGrid,
  Stack,
  Text,
  Flex,
  Tag,
  useColorModeValue,
} from '@chakra-ui/react';

const ListHeader = ({ children }) => {
  return (
    <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
      {children}
    </Text>
  );
};

export default function LargeWithLogoCentered() {
  return (
    <Box bg="#262C33" color={useColorModeValue('gray.400')}>
      <Container as={Stack} maxW={'6xl'} py={8}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          spacing={8}
          textAlign="center"
          mt={5}
        >
          <Stack align={'center'}>
            <Link
              p={2}
              fontSize={18}
              href="/lectures/all/all?page=1"
              // fontWeight={500}
              color="white"
              fontWeight={600}
              _hover={{
                textDecoration: 'none',
                color: 'rgb(0 60 147)',
                fontWeight: '800',
              }}
            >
              강의
            </Link>
            <Link
              _hover={{
                color: 'white',
                fontWeight: '600',
              }}
              href={'/lectures/all/all?page=1'}
            >
              전체강의
            </Link>
            <Stack direction={'row'} align={'center'} spacing={2}>
              <Link
                _hover={{
                  color: 'white',
                  fontWeight: '600',
                }}
                href={'#'}
              >
                기초코딩
              </Link>
            </Stack>
            <Link
              _hover={{
                color: 'white',
                fontWeight: '600',
              }}
              href={'#'}
            >
              프론트엔드
            </Link>
            <Link
              _hover={{
                color: 'white',
                fontWeight: '600',
              }}
              href={'#'}
            >
              백엔드
            </Link>
            <Link
              _hover={{
                color: 'white',
                fontWeight: '600',
              }}
              href={'#'}
            >
              모바일
            </Link>
          </Stack>
          <Stack align={'center'}>
            <Link
              p={2}
              fontSize={18}
              // fontWeight={500}
              color="white"
              fontWeight={600}
              _hover={{
                textDecoration: 'none',
                color: 'rgb(0 60 147)',
                fontWeight: '800',
              }}
            >
              소개
            </Link>
            <Link
              _hover={{
                color: 'white',
                fontWeight: '600',
              }}
              href={'#'}
            >
              백관열
            </Link>
            <Link
              _hover={{
                color: 'white',
                fontWeight: '600',
              }}
              href={'#'}
            >
              오수빈
            </Link>
            <Link
              _hover={{
                color: 'white',
                fontWeight: '600',
              }}
              href={'#'}
            >
              김수람
            </Link>
            <Link
              _hover={{
                color: 'white',
                fontWeight: '600',
              }}
              href={'#'}
            >
              윤수민
            </Link>
            <Link
              _hover={{
                color: 'white',
                fontWeight: '600',
              }}
              href={'#'}
            >
              김남욱
            </Link>
            <Link
              _hover={{
                color: 'white',
                fontWeight: '600',
              }}
              href={'#'}
            >
              이승아
            </Link>
          </Stack>
          <Stack align={'center'}>
            <Link
              p={2}
              fontSize={18}
              // fontWeight={500}
              color="white"
              fontWeight={600}
              _hover={{
                textDecoration: 'none',
                color: 'rgb(0 60 147)',
                fontWeight: '800',
              }}
            >
              로드맵
            </Link>
            <Box justify={'center'}>
              <Text>준비중.. 😋</Text>
            </Box>
          </Stack>
          <Stack>
            <Link
              p={2}
              fontSize={18}
              // fontWeight={500}
              color="white"
              fontWeight={600}
              _hover={{
                textDecoration: 'none',
                color: 'rgb(0 60 147)',
                fontWeight: '800',
              }}
            >
              커뮤니티
            </Link>
            <Stack justify={'center'} align={'center'}>
              <Box>
                <Text>준비중.. 😅</Text>
              </Box>
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
      <Box py={10}>
        <Flex
          align={'center'}
          _before={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            mr: 8,
          }}
          _after={{
            content: '""',
            borderBottom: '1px solid',
            borderColor: useColorModeValue('gray.200', 'gray.700'),
            flexGrow: 1,
            ml: 8,
          }}
        >
          <img src="/images/whitelogo.png" alt="logo" width="120" />
        </Flex>
        <Text pt={3} fontSize={'sm'} textAlign={'center'} color="white">
          © 2023 CrazyLab. All rights reserved
        </Text>
        <Text fontSize={'sm'} textAlign={'center'} color="white">
          이메일 contact@CrazyForm.co.kr | 주소 서울특별시 서초구 강남대로99길
          45 엠빌딩 5층{' '}
        </Text>
        <Text fontSize={'sm'} textAlign={'center'} color="white">
          사업자등록번호 540-86-960307 | 대표 : 백관열 | 상호명 : Form Is Crazy
        </Text>
      </Box>
    </Box>
  );
}
