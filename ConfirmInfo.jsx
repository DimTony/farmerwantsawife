/* eslint-disable react/prop-types */
import { Checkbox, FormControl, HStack, Text, VStack } from '@chakra-ui/react';
import { generateUserSummary } from './Utils';

const ConfirmInfo = ({ formData, setFormData }) => {
  const handleCheckbox = (event) => {
    const { checked } = event.target;

    setFormData((prevState) => ({
      ...prevState,
      consent: checked,
    }));
  };
  return (
    <>
      <VStack justifyContent="center">
        <Text fontSize="2rem" fontWeight="700" color="#306ac0" mb={4}>
          Review and Submit
        </Text>
        <Text mx="5rem">{generateUserSummary(formData)}</Text>
        <HStack justifyContent="center">
          <FormControl>
            <Checkbox
              size="lg"
              isChecked={formData.consent}
              onChange={handleCheckbox}
              color="red"
              sx={{
                '& .chakra-checkbox__control': {
                  border: '2px solid',
                  borderColor: 'blue.500', // Adjust border color
                  boxShadow: '0 0 0 2px blue.500', // Outline around the checkbox
                  borderRadius: '4px', // Rounded corners
                  _checked: {
                    bg: 'blue.500', // Background color when checked
                    borderColor: 'blue.500',
                    color: 'white',
                  },
                  _hover: {
                    borderColor: 'blue.400',
                  },
                },
              }}
            >
              I consent that all information filled in this form is valid
            </Checkbox>
          </FormControl>
        </HStack>
      </VStack>
    </>
  );
};

export default ConfirmInfo;
