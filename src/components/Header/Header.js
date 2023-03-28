import React, { useEffect, useState } from 'react';
import { isLoggedInVar } from '../../apollo';
import { removeAccessToken } from '../../Token';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Icon,
  Link,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Input,
  InputGroup,
  InputRightAddon,
  background,
} from '@chakra-ui/react';
import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
} from '@chakra-ui/icons';
import { SearchIcon } from '@chakra-ui/icons';
import { HiOutlineUserCircle } from 'react-icons/hi';

export default function Header(props) {
  const [searchTextHeader, setSearchTextHeader] = useState('');
  const { isOpen, onToggle } = useDisclosure();
  const navigate = useNavigate();

  const handleLogout = () => {
    removeAccessToken();
    isLoggedInVar(false);
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      isLoggedInVar(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedInVar());
  }, [isLoggedInVar()]);

  return (
    <Box
      mx="auto"
      whiteSpace="nowrap"
      position="fixed"
      width="100%"
      boxShadow="md"
      zIndex="999"
    >
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}
      >
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}
        >
          <IconButton
            onClick={onToggle}
            icon={
              isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />
            }
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Link href="/" ml={3}>
            <Text
              textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
              fontFamily={'heading'}
              color={useColorModeValue('gray.800', 'white')}
            >
              {/* Kwanyeol and the kids. */}
              <img src="/images/logo2.png" alt="logo" width="160" />
            </Text>
          </Link>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav />
          </Flex>
        </Flex>

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}
        >
          {isLoggedInVar() ? (
            <>
              <Link href={'/userinfo'}>
                <Box mt={1}>
                  <HiOutlineUserCircle
                    size="28"
                    color="rgb(0 60 147)"
                    // _hover={{ color: 'rgb(117 157 214)' }}
                  />
                </Box>
              </Link>
              <Button
                color={'rgb(74 84 105)'}
                as={'a'}
                fontSize={'sm'}
                fontWeight={700}
                variant={'link'}
                onClick={handleLogout}
                cursor={'pointer'}
                // marginTop={2}
                paddingTop={2.3}
                paddingBottom={2.3}
                paddingLeft={3}
                paddingRight={3}
                href={'/'}
                margin={0}
                // pr={2}
                _hover={{ background: 'rgb(0 60 147)', color: 'white' }}
              >
                로그아웃
              </Button>
            </>
          ) : (
            <>
              <Button
                as={'a'}
                fontSize={'sm'}
                fontWeight={550}
                variant={'link'}
                href={'/login'}
                textDecor="none"
                paddingTop={2.3}
                paddingBottom={2.3}
                paddingLeft={3}
                paddingRight={3}
                _hover={{
                  textDecoration: 'none',
                  color: 'rgb(0 60 147)',
                  fontWeight: '650',
                }}
              >
                로그인
              </Button>

              <Button
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'#003C93'}
                _hover={{
                  bg: '#003C93',
                }}
                onClick={() => {
                  navigate('/signup');
                }}
              >
                회원가입
              </Button>
            </>
          )}
        </Stack>
      </Flex>
    </Box>
  );
}

const DesktopNav = () => {
  const linkColor = useColorModeValue('gray.600', 'gray.200');
  const linkHoverColor = useColorModeValue('gray.800', 'white');
  const popoverContentBgColor = useColorModeValue('white', 'gray.800');

  return (
    <Stack direction={'row'} spacing={10} mt={4}>
      {NAV_ITEMS.map(navItem => (
        <Box key={navItem.label}>
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Link
                p={2}
                href={navItem.href}
                fontSize={16}
                // fontWeight={500}
                color={linkColor}
                fontWeight={600}
                _hover={{
                  textDecoration: 'none',
                  color: 'rgb(0 60 147)',
                  fontWeight: '700',
                }}
              >
                {navItem.label}
              </Link>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'5'}
              >
                <Stack>
                  {navItem.children.map(child => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
      ))}
    </Stack>
  );
};

const DesktopSubNav = ({ label, href, subLabel }) => {
  return (
    <Link
      href={href}
      role={'group'}
      display={'block'}
      p={3}
      rounded={'md'}
      _hover={{
        bg: useColorModeValue('gray.50', 'gray.900'),
        color: 'rgb(0 60 147)',
        fontWeight: '700',
        fontSize: '20',
      }}
    >
      <Stack
        direction={'row'}
        align={'center'}
        _hover={{ fontWeight: '700', fontSize: '17' }}
      >
        <Box>
          <Text
            padding={0}
            fontSize={15}
            transition={'all .3s ease'}
            _groupHover={{ color: 'black.400' }}
            fontWeight={700}
            _hover={{ fontWeight: 700 }}
          >
            {label}
          </Text>
          <Text fontSize={15}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}
        >
          <Icon color={'black.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Link>
  );
};

const NAV_ITEMS = [
  {
    label: '강의',
    href: '/lectures/all/all?page=1',
    children: [
      {
        label: '전체강의',

        href: '/lectures/all/all?page=1',
      },
      {
        label: '기초코딩',

        href: '/lectures/basic/all/?page=1',
      },
      {
        label: '프론트엔드',

        href: '/lectures/frontend/all/?page=1',
      },
      {
        label: '백엔드',

        href: '/lectures/backend/all/?page=1',
      },
      {
        label: '모바일',

        href: '/lectures/mobile/all/?page=1',
      },
    ],
  },
  {
    label: '소개',
    href: '/lectures',
    // children: [
    //   {
    //     label: '금쪽같은 내새끼',
    //     subLabel: 'abcdefg',
    //     href: '#',
    //   },
    //   {
    //     label: '관열이와 아이들',
    //     subLabel: 'ㄱㄴㄷㄹㅁㅂㅅ',
    //     href: '#',
    //   },
    // ],
  },
  {
    label: '로드맵',
    href: '/lectures',
    // children: [
    //   {
    //     label: '금쪽같은 내새끼',
    //     subLabel: 'abcdefg',
    //     href: '#',
    //   },
    //   {
    //     label: '관열이와 아이들',
    //     subLabel: 'ㄱㄴㄷㄹㅁㅂㅅ',
    //     href: '#',
    //   },
    // ],
  },
  {
    label: '커뮤니티',
    // children: [
    //   {
    //     label: '금쪽같은 내새끼',
    //     subLabel: 'abcdefg',
    //     href: '#',
    //   },
    //   {
    //     label: '관열이와 아이들',
    //     subLabel: 'ㄱㄴㄷㄹㅁㅂㅅ',
    //     href: '#',
    //   },
    // ],
  },
];
