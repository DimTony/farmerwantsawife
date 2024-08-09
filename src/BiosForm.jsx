/* eslint-disable react/prop-types */
import {
  Box,
  FormControl,
  FormLabel,
  HStack,
  Input,
  VStack,
} from '@chakra-ui/react';

const BiosForm = ({ formData, handleChange }) => {
  return (
    <>
      <Box w={{ xl: '70vw', base: '90vw' }} h={{ base: '100dvh' }}>
        {/* <Text mb={4}>Step 2: Account Information</Text> */}

        {/* <input
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
          /> */}
        <HStack display={{ xl: 'none', base: 'flex' }} w="100%">
          <FormControl isRequired>
            <FormLabel>First Name</FormLabel>
            <Input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              outline="1px solid #306ac0"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Last Name</FormLabel>
            <Input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              outline="1px solid #306ac0"
            />
          </FormControl>
        </HStack>
        <HStack
          display={{ xl: 'flex', base: 'none' }}
          justifyContent="space-between"
        >
          <VStack>
            <HStack>
              <FormControl isRequired>
                <FormLabel>First Name:</FormLabel>
                <Input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  outline="1px solid #306ac0"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name:</FormLabel>
                <Input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  outline="1px solid #306ac0"
                />
              </FormControl>
            </HStack>
            {/* <HStack w="100%"> */}
            <FormControl isRequired>
              <FormLabel>Mobile Phone:</FormLabel>
              <Input
                name="mobilePhone"
                type="tel"
                value={formData.mobilePhone}
                onChange={handleChange}
                outline="1px solid #306ac0"
              />
            </FormControl>
            {/* </HStack> */}
            <FormControl isRequired>
              <FormLabel>Email:</FormLabel>
              <Input
                name="emailAddress"
                type="email"
                value={formData.emailAddress}
                onChange={handleChange}
                outline="1px solid #306ac0"
              />
            </FormControl>
          </VStack>
          <VStack>
            <HStack>
              <FormControl isRequired>
                <FormLabel>First Name</FormLabel>
                <Input
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  outline="1px solid #306ac0"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Last Name</FormLabel>
                <Input
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  outline="1px solid #306ac0"
                />
              </FormControl>
            </HStack>
          </VStack>
        </HStack>
      </Box>
    </>
  );
};

export default BiosForm;
