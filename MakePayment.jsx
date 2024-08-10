/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Icon,
  Image,
  Input,
  Spinner,
  Text,
  Tooltip,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { QuestionIcon } from '@chakra-ui/icons';
import React, { useEffect, useRef, useState } from 'react';
import { zoomInOut } from './CustomCSS';
import PayPalLogo from './src/assets/PayPal.png';
import { IoMdPerson } from 'react-icons/io';
import { BsPersonBoundingBox } from 'react-icons/bs';
import MobileQuestionTooltip from './MobileTooltip';

const MakePayment = ({
  formData,
  setFormData,
  isConfirmed,
  showReceiptUpload,
  showSuccess,
  fetchingBarcode,
  setFetchingBarcode,
}) => {
  const toast = useToast();

  useEffect(() => {
    setFetchingBarcode(true);

    const timer = setTimeout(() => {
      setFetchingBarcode(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  if (fetchingBarcode) {
    return (
      <VStack mb="2rem" justifyContent="center">
        <Text
          animation={`${zoomInOut} 3s ease-in-out infinite`}
          fontSize={{ xl: '2rem', base: '1rem' }}
          color="#306ac0"
          fontWeight="700"
          mb="3rem"
        >
          Generating payment option
        </Text>
        <Spinner boxSize="5rem" color="#306ac0" borderWidth="0.5rem" />
      </VStack>
    );
  }

  return (
    <Box position="relative" w="20rem" h="27rem" mb="2rem">
      <Box
        w="100%"
        h="100%"
        bg="white"
        borderRadius="1rem"
        py="1rem"
        border="0.5px solid rgba(48, 106, 192, 0.3)"
      >
        <VStack w="100%">
          <VStack spacing={0}>
            <Image src={PayPalLogo} alt="pp" w="5rem" h="auto" />
            <Text fontSize="1.5rem">Payment review</Text>
          </VStack>
          <VStack
            alignItems="flex-start"
            px="1.5rem"
            justifyContent="center"
            spacing={0}
            w="100%"
          >
            <Text fontSize="0.8rem" fontWeight="700">
              From
            </Text>
            <HStack alignItems="flex-start" h="2.5rem">
              <HStack h="100%" alignItems="center" justifyContent="center">
                <Icon
                  as={IoMdPerson}
                  w={8}
                  h={8}
                  bg="#e0e0e0"
                  boxShadow="20px 20px 60px #bebebe,-20px -20px 60px #ffffff"
                  borderRadius="full"
                  p={1}
                  color="#273465"
                />
              </HStack>
              <VStack w="90%" alignItems="flex-start" spacing={0}>
                <Text fontSize="0.8rem">
                  {formData.firstName} {formData.lastName}
                </Text>
                <Text fontSize="0.8rem">
                  {formData.currentCity}, {formData.currentState}
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <VStack
            alignItems="flex-start"
            px="1.5rem"
            justifyContent="center"
            spacing={0}
            w="100%"
          >
            <HStack alignItems="center">
              <Text fontSize="0.8rem" fontWeight="700">
                To
              </Text>
              <Tooltip
                label={
                  <Box>
                    <Text fontWeight="bold">
                      Please transfer using PayPal's 'Friends and Family'
                      option:
                    </Text>
                    <Text>1. Log in to your PayPal account.</Text>
                    <Text>2. Select 'Send & Request.'</Text>
                    <Text>3. Choose 'Send to a friend.'</Text>
                    <Text>4. Enter the provided email and amount.</Text>
                    <Text>5. Complete the transfer.</Text>
                  </Box>
                }
                aria-label="PayPal Transfer Instructions"
                placement="right"
              >
                <QuestionIcon
                  ml={1}
                  color="blue.500"
                  display={{ xl: 'flex', base: 'none' }}
                />
              </Tooltip>
              <Box display={{ xl: 'none', base: 'flex' }}>
                <MobileQuestionTooltip />
              </Box>
            </HStack>

            <HStack alignItems="flex-start" h="2.5rem">
              <HStack h="100%" alignItems="center" justifyContent="center">
                <Icon
                  as={BsPersonBoundingBox}
                  w={8}
                  h={8}
                  bg="#e0e0e0"
                  boxShadow="20px 20px 60px #bebebe,-20px -20px 60px #ffffff"
                  borderRadius="full"
                  p={1}
                  color="#278fc2"
                />
              </HStack>
              <VStack w="90%" alignItems="flex-start" spacing={0}>
                <Text fontSize="0.8rem">Larry Kell</Text>
                <Text fontSize="0.8rem" color="#306ac0">
                  kelllarry125@gmail.com
                </Text>
              </VStack>
            </HStack>
          </VStack>
          <Box w="100%" px="1.5rem">
            <HStack
              bg="rgba(39, 143, 194, 0.1)"
              p="0.5rem"
              h="100%"
              borderRadius="1rem"
            >
              <HStack
                fontWeight="600"
                fontSize="0.8rem"
                w="100%"
                justifyContent="space-between"
              >
                <Text>Payment Type</Text>
                <Text>Friends & Family</Text>
              </HStack>
            </HStack>
          </Box>

          <Box w="100%" px="1.5rem">
            <VStack
              bg="rgba(39, 143, 194, 0.1)"
              p="0.5rem"
              h="100%"
              borderRadius="1rem"
            >
              <HStack fontSize="0.8rem" w="100%" justifyContent="space-between">
                <Text>Transfer Amount</Text>
                <Text>$500.00</Text>
              </HStack>
              <HStack
                fontSize="0.8rem"
                color="red.500"
                w="100%"
                justifyContent="space-between"
              >
                <Text>Outstanding Amount</Text>
                <Text>-$500.00</Text>
              </HStack>
              <HStack fontSize="0.8rem" w="100%" justifyContent="space-between">
                <Text>Total Amount</Text>
                <Text>$1000.00</Text>
              </HStack>
            </VStack>
          </Box>
        </VStack>
      </Box>

      {isConfirmed && !showSuccess && (
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(255, 255, 255, 0.7)"
          backdropFilter="blur(1px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="1rem"
          px="1rem"
        >
          <VStack w="100%" justifyContent="center">
            <Spinner boxSize="4rem" color="#306ac0" borderWidth="0.4rem" />
            <Text
              textAlign="center"
              animation={`${zoomInOut} 3s ease-in-out infinite`}
              fontSize="0.7rem"
            >
              Please wait while your payment is confirmed...
            </Text>
          </VStack>
        </Box>
      )}
      {showSuccess && (
        <Box
          position="absolute"
          top="0"
          left="0"
          w="100%"
          h="100%"
          bg="rgba(255, 255, 255, 0.9)"
          backdropFilter="blur(2px)"
          display="flex"
          alignItems="center"
          justifyContent="center"
          borderRadius="1rem"
          px="1rem"
        >
          <VStack w="100%" justifyContent="center">
            <Icon as={BsPersonBoundingBox} w={16} h={16} color="green.500" />
            <Text
              textAlign="center"
              fontSize="1.2rem"
              fontWeight="bold"
              color="green.500"
            >
              Payment Successful!
            </Text>

            <Text textAlign="center" fontSize="0.9rem">
              Your interview details will be communicated to you shortly via
              email.
            </Text>
          </VStack>
        </Box>
      )}
    </Box>
  );
};

export default MakePayment;
