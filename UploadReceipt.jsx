/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
  useToast,
  VStack,
  Icon,
  Image,
  Spinner,
} from '@chakra-ui/react';
import { useRef, useState } from 'react';
import { zoomInOut } from './CustomCSS';
import PayPalLogo from './src/assets/PayPal.png';
import { IoMdPerson } from 'react-icons/io';
import { BsPersonBoundingBox } from 'react-icons/bs';

const UploadReceipt = ({ formData, setFormData, isConfirmed, showSuccess }) => {
  const [selectedReceiptFile, setSelectedReceiptFile] = useState(null);
  const receiptPhotoFileInputRef = useRef(null);
  const toast = useToast();

  const handleReceiptPhotoFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select a valid image file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setSelectedReceiptFile(null);
      setFormData((prevState) => ({ ...prevState, receiptPhoto: null }));
      return;
    }

    // Check file size (limit to 5MB for this example)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: 'File too large',
        description: 'Please select an image file smaller than 5MB.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setSelectedReceiptFile(null);
      setFormData((prevState) => ({ ...prevState, receiptPhoto: null }));
      return;
    }

    // File is valid, update state and formData
    setSelectedReceiptFile(file);
    setFormData((prevState) => ({ ...prevState, receiptPhoto: file }));

    toast({
      title: 'File selected',
      description: `${file.name} has been selected.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleReceiptPhotoButtonClick = () => {
    receiptPhotoFileInputRef.current.click();
  };

  return (
    <>
      <Box position="relative" w="20rem" h="27rem" mb="2rem">
        <Box
          w="100%"
          h="100%"
          bg="white"
          borderRadius="1rem"
          py="1rem"
          border="0.5px solid rgba(48, 106, 192, 0.3)"
        >
          <VStack w="100%" h="100%" justifyContent="center" alignItems="center">
            <FormControl isRequired>
              <FormLabel textAlign="center">
                Upload a clear photo of the payment receipt (screenshots are
                allowed)
              </FormLabel>
              <HStack justifyContent="center" px="0.5rem">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleReceiptPhotoFileChange}
                  ref={receiptPhotoFileInputRef}
                  display="none"
                />
                <Button
                  onClick={handleReceiptPhotoButtonClick}
                  colorScheme="blue"
                  px="1rem"
                  w="10rem"
                >
                  Choose Photo
                </Button>
                <Box mt={2}>
                  {selectedReceiptFile ? (
                    <Text>
                      Selected file: {selectedReceiptFile.name} (
                      {(selectedReceiptFile.size / (1024 * 1024)).toFixed(2)}{' '}
                      MB)
                    </Text>
                  ) : (
                    <Text>No file selected</Text>
                  )}
                </Box>
              </HStack>
            </FormControl>
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
    </>
  );
};

export default UploadReceipt;
