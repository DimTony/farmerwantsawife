/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import HeroPic from './assets/FWAW-1.png';
import DateOfBirthInput from './DateOfBirth';
import BiosForm from './BiosForm';
import ConfirmInfo from '../ConfirmInfo';
import MakePayment from '../MakePayment';
import UploadReceipt from '../UploadReceipt';
import { baseUrl } from '../Utils';

const MultiStepForm = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [showReceiptUpload, setShowReceiptUpload] = useState(false);
  const [fetchingBarcode, setFetchingBarcode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isDateValid, setIsDateValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    dateOfBirth: {
      month: '',
      day: '',
      year: '',
    },
    mobilePhone: '',
    socialHandles: '',
    currentCity: '',
    currentState: '',
    hometownCity: '',
    hometownState: '',
    occupation: '',
    height: '',
    relationshipStatus: '',
    noOfChildren: '',
    whyApply: '',
    cityGirlOrCountryGirl: '',
    howYouHeard: '',
    appliedBefore: '',
    introVideo: '',
    fullBodyPhoto: '',
    headShotPhoto: '',
    consent: false,
    receiptPhoto: '',
  });
  const toast = useToast();

  const handleNext = () => {
    if (currentStep === 1) {
      if (
        !formData.dateOfBirth.month ||
        !formData.dateOfBirth.day ||
        !formData.dateOfBirth.year
      ) {
        toast({
          title: 'Please fill in your date of birth',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
      if (!isDateValid) {
        toast({
          title:
            'Please enter a valid date of birth. You must be between 21 and 60 years old.',
          status: 'error',
          duration: 3000,
          isClosable: true,
        });
        return;
      }
    }

    if (
      currentStep === 2 &&
      (!formData.firstName ||
        !formData.lastName ||
        !formData.dateOfBirth ||
        !formData.mobilePhone ||
        !formData.socialHandles ||
        !formData.currentCity ||
        !formData.currentState ||
        !formData.hometownCity ||
        !formData.hometownState ||
        !formData.occupation ||
        !formData.height ||
        !formData.relationshipStatus ||
        !formData.noOfChildren ||
        !formData.whyApply ||
        !formData.cityGirlOrCountryGirl ||
        !formData.howYouHeard ||
        !formData.appliedBefore ||
        !formData.introVideo ||
        !formData.fullBodyPhoto ||
        !formData.headShotPhoto)
    ) {
      toast({
        title: 'Please fill the required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    // setFormData({ ...formData, [name]: value });
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleMakePayment = () => {
    if (currentStep === 3 && !formData.consent) {
      toast({
        title: 'Your consent is required!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    setCurrentStep(currentStep + 1);
  };

  const handleConfirmPayment = () => {
    setCurrentStep(currentStep + 1);
  };

  // const handleConfirmReceipt = () => {
  //   setIsConfirmed(true);

  //   setTimeout(() => {
  //     setIsConfirmed(false);
  //     setShowSuccess(true);
  //   }, 10000);
  // };

  const handleConfirmReceipt = async () => {
    setIsConfirmed(true);

    // Create a new FormData object
    const formDataToSend = new FormData();

    // Append all text fields
    Object.keys(formData).forEach((key) => {
      if (
        key !== 'introVideo' &&
        key !== 'fullBodyPhoto' &&
        key !== 'headShotPhoto' &&
        key !== 'receiptPhoto'
      ) {
        if (typeof formData[key] === 'object') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      }
    });

    // Append file inputs
    if (formData.introVideo)
      formDataToSend.append('introVideo', formData.introVideo);
    if (formData.fullBodyPhoto)
      formDataToSend.append('fullBodyPhoto', formData.fullBodyPhoto);
    if (formData.headShotPhoto)
      formDataToSend.append('headShotPhoto', formData.headShotPhoto);
    if (formData.receiptPhoto)
      formDataToSend.append('receiptPhoto', formData.receiptPhoto);

    try {
      const response = await fetch(`${baseUrl}/api/applicants/register`, {
        method: 'POST',
        body: formDataToSend,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Network response was not ok');
      }

      console.log('Success:', result);

      // Show success toast
      toast({
        title: 'Application Submitted',
        description: 'Your application has been successfully submitted!',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

      // If successful, move to the next step and show success message
      setTimeout(() => {
        setIsConfirmed(false);
        setShowSuccess(true);
        // setCurrentStep(currentStep + 1);
      }, 10000);
    } catch (error) {
      console.error('Error:', error);
      toast({
        title: 'An error occurred',
        description:
          error.message ||
          "We couldn't process your application. Please try again.",
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      setIsConfirmed(false);
    }
  };

  const handleDoneClick = () => {
    // Clear the form data
    setFormData({
      firstName: '',
      lastName: '',
      emailAddress: '',
      dateOfBirth: {
        month: '',
        day: '',
        year: '',
      },
      mobilePhone: '',
      socialHandles: '',
      currentCity: '',
      currentState: '',
      hometownCity: '',
      hometownState: '',
      occupation: '',
      height: '',
      relationshipStatus: '',
      noOfChildren: '',
      whyApply: '',
      cityGirlOrCountryGirl: '',
      howYouHeard: '',
      appliedBefore: '',
      introVideo: '',
      fullBodyPhoto: '',
      headShotPhoto: '',
      consent: false,
    });

    // Reset other state variables
    setSuccess(false);
    setIsConfirmed(false);
    setShowSuccess(false);
    setIsDateValid(false);
    setCurrentStep(1);

    // Open the modal
    onOpen();
  };

  return (
    <>
      <VStack
        alignItems="center"
        w={{ xl: '100vw', base: '100%' }}
        h={{ xl: '100%', base: '100%' }}
        overflow="hidden"
        mb="2rem"
      >
        <Image
          mt="1rem"
          src={HeroPic}
          alt="hero"
          w={{ xl: '40rem', base: '20rem' }}
          h="auto"
        />

        <Text
          mt={{ base: '2rem', xl: '0' }}
          fontSize={{ xl: '2rem', base: '1.5rem' }}
          fontWeight="700"
          fontFamily="Work sans"
          textAlign="center"
        >
          Welcome to the "Farmer Wants a Wife" Casting Application
        </Text>
        {currentStep === 1 && (
          <Box mx="20rem" w="100%">
            <Text
              mx={{ base: '2rem' }}
              fontSize={{ xl: '1rem', base: '1.2rem' }}
            >
              Good news! The producers and casting crew of FOX's hit show{' '}
              <Text as="span" fontWeight="bold" color="blue.500">
                "Farmer Wants A Wife"
              </Text>{' '}
              have vetted your profile and decided to reopen the application
              process for{' '}
              <Text as="span" fontWeight="bold" color="red.500">
                24 hours
              </Text>{' '}
              for a one-time fee of $1000.00 of which you are to pay half now
              ($500.00) and the balance in person upon successful completion of
              your interview at our studio. If you meet the eligibility criteria
              below, fill out the form below honestly. Be sure to save your
              registration information, as you can log back in and continue the
              application at any time.
            </Text>
            <HStack justifyContent="center">
              <Text
                mt={{ base: '1rem' }}
                mx={{ base: '2rem' }}
                as="span"
                fontWeight="bold"
                color="red.500"
              >
                This form is only valid for one entry. Ensure you don't share
                the link with anyone as we will only accept the first entry via
                this form.
              </Text>
            </HStack>
          </Box>
        )}

        <VStack mt="1rem" justifyContent="space-between">
          {currentStep === 1 && (
            <>
              <Box mx={{ base: '2rem' }}>
                <Text color="red.500" textAlign="center" fontWeight="700">
                  This casting call requires you to be between 21 and 60 years
                  of age to apply.
                </Text>
              </Box>
              <DateOfBirthInput
                setIsValid={setIsDateValid}
                formData={formData}
                setFormData={setFormData}
              />
            </>
          )}

          {currentStep === 2 && (
            <BiosForm
              formData={formData}
              setFormData={setFormData}
              handleChange={handleChange}
            />
          )}

          {currentStep === 3 && (
            <ConfirmInfo formData={formData} setFormData={setFormData} />
          )}

          {currentStep === 4 && (
            <MakePayment
              formData={formData}
              setFormData={setFormData}
              isConfirmed={isConfirmed}
              showSuccess={showSuccess}
              showReceiptUpload={showReceiptUpload}
              fetchingBarcode={fetchingBarcode}
              setFetchingBarcode={setFetchingBarcode}
            />
          )}

          {currentStep === 5 && (
            <UploadReceipt
              formData={formData}
              setFormData={setFormData}
              isConfirmed={isConfirmed}
              showSuccess={showSuccess}
            />
          )}

          <Flex justify="space-between" gap="2rem" mb="2rem">
            {currentStep > 1 && currentStep < 5 && (
              <Button
                px="5rem"
                w="7rem"
                h="3rem"
                fontSize="1.2rem"
                leftIcon={<FaArrowLeft />}
                onClick={handlePrev}
                outline="0.5px solid rgba(48, 106, 192, 0.4)"
                _hover={{
                  bg: '#306ac0',
                  color: '#eaeff5',
                  outline: '0.5px solid rgba(48, 106, 192, 0.4)',
                }}
              >
                Previous
              </Button>
            )}
            {(currentStep === 1 || currentStep === 2) && (
              <Button
                px="5rem"
                w="7rem"
                h="3rem"
                fontSize="1.2rem"
                color="#fff"
                bg="#306ac0"
                rightIcon={<FaArrowRight />}
                onClick={handleNext}
                _hover={{
                  color: '#306ac0',
                  bg: '#eaeff5',
                  outline: '0.5px solid rgba(48, 106, 192, 0.4)',
                }}
              >
                Next
              </Button>
            )}

            {currentStep === 3 && (
              <Button
                px="5rem"
                w="7rem"
                h="3rem"
                fontSize="1.2rem"
                colorScheme="blue"
                onClick={handleMakePayment}
                _hover={{
                  color: '#306ac0',
                  bg: '#eaeff5',
                  outline: '0.5px solid rgba(48, 106, 192, 0.4)',
                }}
              >
                Make Payment
              </Button>
            )}

            {currentStep === 4 && !showSuccess && (
              <Button
                px="5rem"
                w="7rem"
                h="3rem"
                fontSize="1.2rem"
                colorScheme="blue"
                onClick={handleConfirmPayment}
                _hover={{
                  color: '#306ac0',
                  bg: '#eaeff5',
                  outline: '0.5px solid rgba(48, 106, 192, 0.4)',
                }}
                isDisabled={fetchingBarcode}
              >
                Paid
              </Button>
            )}

            {currentStep === 5 && !showSuccess && (
              <Button
                px="5rem"
                w="7rem"
                h="3rem"
                fontSize="1.2rem"
                colorScheme="blue"
                onClick={handleConfirmReceipt}
                _hover={{
                  color: '#306ac0',
                  bg: '#eaeff5',
                  outline: '0.5px solid rgba(48, 106, 192, 0.4)',
                }}
              >
                Confirm Receipt
              </Button>
            )}

            {currentStep === 5 && showSuccess && (
              <Button
                px="5rem"
                w="7rem"
                h="3rem"
                fontSize="1.2rem"
                colorScheme="blue"
                onClick={handleDoneClick}
                _hover={{
                  color: '#306ac0',
                  bg: '#eaeff5',
                  outline: '0.5px solid rgba(48, 106, 192, 0.4)',
                }}
              >
                Done
              </Button>
            )}
          </Flex>
        </VStack>
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Application Submitted</ModalHeader>
          <ModalBody>
            <Text textAlign="center">
              Your application has been successfully submitted. You may now
              close this window.
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MultiStepForm;
