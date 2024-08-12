/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import { Box, Image, Text, VStack } from '@chakra-ui/react';
import React from 'react';
import HeroPic from './src/assets/FWAW-1.png';

const TimeOut = () => {
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

        <Box mx="20rem" w="100%">
          <Text
            mx={{ base: '2rem' }}
            fontSize={{ xl: '2rem', base: '1.6rem' }}
            textAlign="center"
            color="red"
          >
            This application form is no longer available. The submission period
            of 24 hours has ended, and we are no longer accepting new
            applications via this form. Thank you for your interest. Please
            check back later for future opportunities or contact us if you have
            any questions.
          </Text>
        </Box>
      </VStack>
    </>
  );
};

export default TimeOut;
