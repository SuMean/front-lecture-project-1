import React from 'react';
import css from './Home.module.scss';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Home.module.scss';
import { FaHtml5, FaReact, FaMobile } from 'react-icons/fa';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getLectureRate } from '../../api';
import { SiSpring } from 'react-icons/si';
import LectureCard from '../../components/LectureCard/LectureCard';
import ReviewCard from '../../components/BestReviews/BestReviews';
import StarRating from '../../components/LectureCard/StarRating';
import {
  Flex,
  Link,
  Button,
  Heading,
  Text,
  Box,
  Image,
  Container,
  Stack,
  SimpleGrid,
  CardBody,
  Card,
  VStack,
  HStack,
} from '@chakra-ui/react';

function Home() {
  const ListHeader = ({ children }) => {
    return (
      <Text fontWeight={'500'} fontSize={'lg'} mb={2}>
        {children}
      </Text>
    );
  };
  const { isLoading, data } = useQuery(['lectureInfo'], () => getLectureRate());

  if (data) {
    // console.log(data);
    return (
      <>
        <Flex direction="column" align="center" h="100%">
          <VStack align="center" h="100%">
            <Box w="100%" h="100%" pt={14} mt={3}>
              <Carousel
                showThumbs={false}
                showArrows={false}
                autoPlay={true}
                infiniteLoop={true}
                interval={2000}
                style={{ height: '100%' }}
              >
                <Box>
                  <Image
                    src="https://img.freepik.com/free-vector/test-case-typographic-header-application-website-code-test-process-it-specialist-searching-bugs-idea-computer-technology-digital-analysis-vector-flat-illustration_613284-736.jpg?w=1480&t=st=1679998760~exp=1679999360~hmac=df86d576ca28e1c28be7b1d4616ad27707057c3c9ff5df406c4958e2f8a0ca68"
                    alt="Carousel slide 1"
                    objectFit="cover"
                    width="100%"
                    height="600px"
                  />
                </Box>
                <Box>
                  <Image
                    src="https://img.freepik.com/free-vector/data-centers-are-data-centers-serve-applications-supporting-business-information-cloud-computing-technology-business-analysis-analytics-research-strategy-statistic-planning-marketing_1150-55220.jpg?w=1380&t=st=1679998201~exp=1679998801~hmac=5c8feb7ff31566d566add49102ab0e7b9c262d974699e6d80bda862c3f4dd23d"
                    alt="Carousel slide 2"
                    objectFit="cover"
                    width="100%"
                    height="600px"
                  />
                </Box>
                <Box>
                  <Image
                    src="https://img.freepik.com/free-vector/hand-drawn-web-developers_23-2148819604.jpg?w=1060&t=st=1679998690~exp=1679999290~hmac=63fad55e0a707e4ba84bf042a3c235d996824c277eccb16fd819a611b7c382df"
                    alt="Carousel slide 3"
                    objectFit="cover"
                    width="100%"
                    height="600px"
                  />
                </Box>
              </Carousel>
            </Box>
          </VStack>

          <Flex>
            <Box w="100%" h="480px" textAlign="center">
              <Heading size="lg" mt={10} paddingTop="10">
                POPULAR CLASS
              </Heading>
              <Container as={Stack} maxW={'6xl'} py={20} mb={10}>
                <Carousel
                  showThumbs={false}
                  showIndicators={false}
                  showArrows={false}
                  autoPlay={true}
                  infiniteLoop={true}
                  interval={4000}
                  // autoPlay={true}
                  // interval={5000}
                  // infiniteLoop={true}
                >
                  <Flex display="flex" justifyContent="space-between" mb={3}>
                    {data?.carousel.slice(0, 4).map(item => (
                      <HStack textAlign={'left'} mb={10} spacing={8}>
                        <LectureCard
                          lectureNumber={item.LectureId}
                          key={item.id}
                          img={item.thumbnail}
                          lectureDescription={item.lectureDescription}
                          lectureTitle={item.lectureTitle}
                          targetAudience={item.targetAudience}
                          instructor={item.instructor.username}
                          rating={item.rating}
                          reviewsNum={item.reviews_num}
                        />
                      </HStack>
                    ))}
                  </Flex>
                  <Flex display="flex" justifyContent="space-between">
                    {data?.carousel.slice(4, 8).map(item => (
                      <HStack textAlign={'left'} mb={10} spacing={8}>
                        <LectureCard
                          lectureNumber={item.LectureId}
                          key={item.id}
                          img={item.thumbnail}
                          lectureDescription={item.lectureDescription}
                          lectureTitle={item.lectureTitle}
                          targetAudience={item.targetAudience}
                          instructor={item.instructor.username}
                          rating={item.rating}
                          reviewsNum={item.reviews_num}
                        />
                      </HStack>
                    ))}
                  </Flex>
                </Carousel>
              </Container>
            </Box>
          </Flex>

          <Box bg="white" w="100%" h="450px" textAlign="center">
            <Heading size="lg" py="20" my="5">
              수강항목
            </Heading>

            <Container as={Stack} maxW={'6xl'}>
              <SimpleGrid columns={{ base: 1, md: 4 }} spacing={8}>
                <Stack align={'center'}>
                  <Link
                    href="/lectures/basic/all/?page=1"
                    _hover={{
                      textDecoration: 'none',
                    }}
                  >
                    <Card
                      width={'250px'}
                      height={'280px'}
                      direction={{ base: 'column' }}
                      variant="outline"
                      borderRadius={20}
                      boxShadow="md"
                      align={'center'}
                      borderColor="#003c93"
                      borderWidth={4}
                      justifyContent={'center'}
                    >
                      <Stack mt={5}>
                        <Box
                          w="fit-content"
                          _hover={{ transform: 'scale(1.1)' }}
                          transition="transform 0.2s ease"
                        >
                          <FaHtml5 size="150" color="#003c93" />
                        </Box>
                        <CardBody>
                          <Heading size="md" fontSize="17px">
                            기초코딩
                          </Heading>
                        </CardBody>
                      </Stack>
                    </Card>
                  </Link>
                </Stack>
                <Stack align={'center'}>
                  <Link
                    href="/lectures/frontend/all/?page=1"
                    _hover={{
                      textDecoration: 'none',
                    }}
                  >
                    <Card
                      width={'250px'}
                      height={'280px'}
                      direction={{ base: 'column' }}
                      variant="outline"
                      borderRadius={20}
                      align={'center'}
                      boxShadow="md"
                      borderColor="#003c93"
                      borderWidth={4}
                      justifyContent={'center'}
                    >
                      <Stack mt={7}>
                        <Box
                          w="fit-content"
                          _hover={{ transform: 'scale(1.1)' }}
                          transition="transform 0.2s ease"
                        >
                          <FaReact size="150" color="#003c93" />
                        </Box>
                        <CardBody>
                          <Heading size="md" fontSize="17px">
                            프론트엔드
                          </Heading>
                        </CardBody>
                      </Stack>
                    </Card>
                  </Link>
                </Stack>
                <Stack align={'center'}>
                  <Link
                    href="/lectures/backend/all/?page=1"
                    _hover={{
                      textDecoration: 'none',
                    }}
                  >
                    <Card
                      width={'250px'}
                      height={'280px'}
                      direction={{ base: 'column' }}
                      variant="outline"
                      borderRadius={20}
                      boxShadow="md"
                      align={'center'}
                      borderColor="#003c93"
                      borderWidth={4}
                      justifyContent={'center'}
                    >
                      <Stack mt={10}>
                        <Box
                          w="fit-content"
                          _hover={{ transform: 'scale(1.1)' }}
                          transition="transform 0.2s ease"
                        >
                          <SiSpring size="140" color="#003c93" />
                        </Box>
                        <CardBody>
                          <Heading size="md" fontSize="17px">
                            백엔드
                          </Heading>
                        </CardBody>
                      </Stack>
                    </Card>
                  </Link>
                </Stack>
                <Stack align={'center'}>
                  <Link
                    href="/lectures/mobile/all/?page=1"
                    _hover={{
                      textDecoration: 'none',
                    }}
                  >
                    <Card
                      width={'250px'}
                      height={'280px'}
                      direction={{ base: 'column' }}
                      variant="outline"
                      borderRadius={20}
                      boxShadow="md"
                      align={'center'}
                      borderColor="#003c93"
                      borderWidth={4}
                      justifyContent={'center'}
                    >
                      <Stack mt={9}>
                        <Box
                          w="fit-content"
                          _hover={{ transform: 'scale(1.1)' }}
                          transition="transform 0.2s ease"
                        >
                          <FaMobile size="150" color="#003c93" />
                        </Box>
                        <CardBody>
                          <Heading size="md" fontSize="17px">
                            모바일
                          </Heading>
                        </CardBody>
                      </Stack>
                    </Card>
                  </Link>
                </Stack>
              </SimpleGrid>
            </Container>
          </Box>
          <Box
            bg="white"
            w="100%"
            h="800px"
            textAlign="center"
            marginBottom="20"
          >
            <Heading size="lg" py="20" marginTop="20">
              😊수강 후기😊
            </Heading>

            <Container as={Stack} maxW={'6xl'} py={5}>
              {/* <Stack direction={'row'} justify={'center'} spacing={10} mb={10}>
                <Text fontSize="2xl" fontWeight={'bold'}>
                  😊베스트 수강평😊
                </Text>
              </Stack> */}
              <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
                {data?.review.map((item, index) => {
                  return (
                    <Stack align="center">
                      <ReviewCard
                        key={item.id}
                        index={index + 1}
                        user={item.user.username}
                        contents={item.content}
                        rating={item.rating}
                      />
                    </Stack>
                  );
                })}
              </SimpleGrid>
            </Container>
          </Box>
        </Flex>
      </>
    );
  }
}

export default Home;
