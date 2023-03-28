import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Text,
  Box,
  Flex,
} from '@chakra-ui/react';
const ModalBasic = ({ isOpen, title, subtitle, successContent, onClose }) => {
  const [modalClick, setModalClick] = useState(true);
  const navigate = useNavigate();
  const handleModalClose = () => {
    if (successContent == '회원가입에 성공하셨습니당당><><') {
      setTimeout(() => {
        navigate('/login');
      }, 1000);
    } else if (successContent == '아이디랑 비밀번호를 확인해주세요') {
      setModalClick(false);
      onClose();
    } else {
      setModalClick(false);
      onClose();
    }
  };

  return (
    <Modal
      isCentered
      onClose={handleModalClose}
      isOpen={isOpen && modalClick}
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent>
        <Flex direction="column" alignItems="center">
          <img
            src="/images/logo.png"
            alt="logo"
            width="150"
            style={{ marginTop: '20px' }}
          />
          <ModalHeader marginTop={5}>{successContent}</ModalHeader>
        </Flex>
        <ModalCloseButton onClick={handleModalClose} />
        <ModalBody>{/* <Box textAlign="center">{subtitle}</Box> */}</ModalBody>
        <ModalFooter>
          <Button
            variant="ghost"
            colorScheme="blue"
            mr={3}
            onClick={handleModalClose}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ModalBasic;
