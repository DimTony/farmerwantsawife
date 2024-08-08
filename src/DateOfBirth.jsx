/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { Box, Flex, Input, Text } from '@chakra-ui/react';

const DateOfBirthInput = ({ setIsValid, formData, setFormData }) => {
  const [age, setAge] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const { month, day, year } = formData.dateOfBirth;
    if (month && day && year && year.length === 4) {
      const birthDate = new Date(year, month - 1, day);
      const today = new Date();
      let calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const m = today.getMonth() - birthDate.getMonth();
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        calculatedAge--;
      }
      setAge(calculatedAge);

      if (calculatedAge < 21) {
        setErrorMessage('You must be at least 21 years old to proceed.');
        setIsValid(false);
      } else if (calculatedAge > 60) {
        setErrorMessage('You must be 60 years old or younger to proceed.');
        setIsValid(false);
      } else {
        setErrorMessage('');
        setIsValid(true);
      }
    } else {
      setAge(null);
      setErrorMessage('Please enter a valid date.');
      setIsValid(false);
    }
  }, [formData.dateOfBirth, setIsValid]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const [, field] = name.split('.');
    setFormData((prevData) => ({
      ...prevData,
      dateOfBirth: { ...prevData.dateOfBirth, [field]: value },
    }));
  };

  return (
    <Box>
      <Flex gap={4}>
        <Input
          name="dateOfBirth.month"
          placeholder="MM"
          maxLength={2}
          value={formData.dateOfBirth.month}
          onChange={handleChange}
          type="number"
          min={1}
          max={12}
        />
        <Input
          name="dateOfBirth.day"
          placeholder="DD"
          maxLength={2}
          value={formData.dateOfBirth.day}
          onChange={handleChange}
          type="number"
          min={1}
          max={31}
        />
        <Input
          name="dateOfBirth.year"
          placeholder="YYYY"
          maxLength={4}
          value={formData.dateOfBirth.year}
          onChange={handleChange}
          type="number"
          min={1900}
          max={new Date().getFullYear()}
        />
      </Flex>
      {errorMessage && (
        <Text color="red.500" mt={2}>
          {errorMessage}
        </Text>
      )}
      {age !== null && !errorMessage && (
        <Text color="green.500" mt={2}>
          Age verified: {age} years old.
        </Text>
      )}
    </Box>
  );
};

export default DateOfBirthInput;
