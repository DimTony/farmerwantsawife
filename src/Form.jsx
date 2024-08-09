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
import HeroPic from './assets/FWAW-1.png';
import DateOfBirthInput from './DateOfBirth';
import BiosForm from './BiosForm';

const MultiStepForm = () => {
  const [isDateValid, setIsDateValid] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    emailAddress: '',
    // password: '',
    // confirmPassword: '',
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
    console.log(formData);
    console.log('44');
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

  const handleSubmit = () => {
    console.log('Form data:', formData);
    // Add your submission logic here
  };

  return (
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
          <Text mx={{ base: '2rem' }} fontSize={{ xl: '1rem', base: '1.2rem' }}>
            Good news! The producers and casting crew of FOX's hit show{' '}
            <Text as="span" fontWeight="bold" color="blue.500">
              "Farmer Wants A Wife"
            </Text>{' '}
            have vetted your profile and decided to reopen the application
            process for{' '}
            <Text as="span" fontWeight="bold" color="red.500">
              24 hours
            </Text>{' '}
            for a one-time fee of $1000.00 of which you are to pay half now and
            the balance in person upon successful completion of your interview
            at our studio. If you meet the eligibility criteria below, fill out
            the form below honestly. Be sure to save your registration
            information, as you can log back in and continue the application at
            any time.
          </Text>
        </Box>
      )}

      <VStack mt="1rem" justifyContent="space-between">
        {currentStep === 1 && (
          <>
            <Box mx={{ base: '2rem' }}>
              <Text color="red.500" textAlign="center" fontWeight="700">
                This casting call requires you to be between 21 and 60 years of
                age to apply.
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
          <Box>
            <Text mb={4}>Step 3: Review and Submit</Text>
            <Flex direction="column" gap={4}>
              <Text>Name: {formData.name}</Text>
              <Text>Email: {formData.email}</Text>
              <Text>
                Date of Birth:{' '}
                {`${formData.dateOfBirth.month}/${formData.dateOfBirth.day}/${formData.dateOfBirth.year}`}
              </Text>
              <Text>Password: {formData.password}</Text>
            </Flex>
          </Box>
        )}

        <Flex justify="space-between" gap="2rem" mb="2rem">
          {currentStep > 1 && (
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
          {currentStep < 3 ? (
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
