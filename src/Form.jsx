/* eslint-disable react/no-unescaped-entities */
import { useState } from 'react';
import {
  Box,
  Button,
  Flex,
  Image,
  Text,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
// import HeroPic from './assets/FWAW.jpg';
import HeroPic from './assets/FWAW-1.png';
import DateOfBirthInput from './DateOfBirth';

const MultiStepForm = () => {
  const [isUnderage, setIsUnderage] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const toast = useToast();

  const handleNext = () => {
    if (currentStep === 1 && (!formData.name || !formData.email)) {
      toast({
        title: 'Please fill in all required fields',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (
      currentStep === 2 &&
      (!formData.password || formData.password !== formData.confirmPassword)
    ) {
      toast({
        title: 'Please enter a valid password',
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
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Form data:', formData);
    // Add your submission logic here
  };

  return (
    <VStack
      //   justifyContent="center"
      alignItems="center"
      w="100vw"
      h="100vh"
      overflow="hidden"
    >
      <Image
        mt="2rem"
        src={HeroPic}
        alt="hero"
        w={{ xl: '40rem', base: '20rem' }}
        h="auto"
      />

      <Text
        mt={{ base: '2rem' }}
        fontSize={{ xl: '2rem', base: '1.5rem' }}
        fontWeight="700"
        fontFamily="Work sans"
        textAlign="center"
      >
        Welcome to the "Farmer Wants a Wife" Casting Application
      </Text>
      <Box mx="20rem" w="100%">
        <Text mx={{ base: '2rem' }} fontSize={{ xl: '1rem', base: '1.2rem' }}>
          Good news! The producers and casting crew of FOX's hit show "Farmer
          Wants A Wife" have vetted your profile and decided to reopen the
          application process for 24 hours. If you meet the eligibility criteria
          below, head over to our application portal and get started. Be sure to
          save your registration information, as you can log back in and
          continue the application at any time.
        </Text>
      </Box>

      <VStack mt="1rem" justifyContent="space-between" mb="2rem">
        {currentStep === 1 && (
          <>
            <DateOfBirthInput
              isUnderage={isUnderage}
              setIsUnderage={setIsUnderage}
            />
          </>
        )}

        {currentStep === 2 && (
          <Box>
            <Text mb={4}>Step 2: Account Information</Text>
            <Flex direction="column" gap={4}>
              <input
                name="password"
                type="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
              />
              <input
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChange={handleChange}
              />
            </Flex>
          </Box>
        )}

        {currentStep === 3 && (
          <Box>
            <Text mb={4}>Step 3: Review and Submit</Text>
            <Flex direction="column" gap={4}>
              <Text>Name: {formData.name}</Text>
              <Text>Email: {formData.email}</Text>
              <Text>Password: {formData.password}</Text>
            </Flex>
          </Box>
        )}

        <Flex justify="space-between" mt={6}>
          {currentStep > 1 && (
            <Button leftIcon={<FaArrowLeft />} onClick={handlePrev}>
              Previous
            </Button>
          )}
          {currentStep < 3 ? (
            <Button rightIcon={<FaArrowRight />} onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button colorScheme="blue" onClick={handleSubmit}>
              Submit
            </Button>
          )}
        </Flex>
      </VStack>
    </VStack>
  );
};

export default MultiStepForm;
