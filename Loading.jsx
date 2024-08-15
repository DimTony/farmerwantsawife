/* eslint-disable no-unused-vars */
import { Skeleton, Spinner, Text, VStack } from '@chakra-ui/react';
import React from 'react';

const Loading = () => {
  return (
    <VStack h="100vh" alignItems="center" justifyContent="center" spacing={4}>
      <Spinner height="20rem" width="20rem" />
    </VStack>
  );
};

export default Loading;
