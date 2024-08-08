/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable no-const-assign */
import React, { useState } from 'react';
import { Box, Flex, Input, Text, useToast } from '@chakra-ui/react';

const DateOfBirthInput = ({ isUnderage, setIsUnderage }) => {
  const [month, setMonth] = useState('');
  const [day, setDay] = useState('');
  const [year, setYear] = useState('');
  const toast = useToast();

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case 'month':
        setMonth(value);
        break;
      case 'day':
        setDay(value);
        break;
      case 'year':
        setYear(value);
        break;
      default:
        break;
    }

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;
    const currentDay = currentDate.getDate();

    const age = currentYear - parseInt(year);
    if (
      currentMonth < parseInt(month) ||
      (currentMonth === parseInt(month) && currentDay < parseInt(day))
    ) {
      age--;
    }

    setIsUnderage(age < 21);
  };

  return (
    <Box>
      <Flex gap={4}>
        <Input
          name="month"
          placeholder="MM"
          maxLength={2}
          value={month}
          onChange={handleChange}
          type="number"
          min={1}
          max={12}
        />
        <Input
          name="day"
          placeholder="DD"
          maxLength={2}
          value={day}
          onChange={handleChange}
          type="number"
          min={1}
          max={31}
        />
        <Input
          name="year"
          placeholder="YYYY"
          maxLength={4}
          value={year}
          onChange={handleChange}
          type="number"
          min={1900}
          max={new Date().getFullYear()}
        />
      </Flex>
      {isUnderage && (
        <Text color="red.500" mt={2}>
          You must be at least 21 years old to proceed.
        </Text>
      )}
    </Box>
  );
};

export default DateOfBirthInput;
