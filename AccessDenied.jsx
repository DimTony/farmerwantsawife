/* eslint-disable no-unused-vars */
import { Text, VStack } from '@chakra-ui/react';
import React from 'react';

const AccessDenied = () => {
  return (
    <>
      <VStack h="100vh" alignItems="center" justifyContent="center">
        <Text fontSize="10rem" fontWeight="700" color="#306ac0">
          Access Denied
        </Text>
      </VStack>
    </>
  );
};

export default AccessDenied;
