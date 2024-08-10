/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { australianStates, source } from './assets/JSONs';
import { useRef, useState } from 'react';

const BiosForm = ({ formData, setFormData, handleChange }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedHeadShotFile, setSelectedHeadShotFile] = useState(null);
  const [selectedFullBodyPhotoFile, setSelectedFullBodyPhotoFile] =
    useState(null);
  const fileInputRef = useRef(null);
  const headShotPhotoFileInputRef = useRef(null);
  const fullBodyPhotoFileInputRef = useRef(null);
  const toast = useToast();

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Check if the file is a video
    if (!file.type.startsWith('video/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select a valid video file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setSelectedFile(null);
      setFormData((prevState) => ({ ...prevState, introVideo: null }));
      return;
    }

    // Check file size (limit to 100MB for this example)
    const maxSize = 2000 * 1024 * 1024; // 100MB in bytes
    if (file.size > maxSize) {
      toast({
        title: 'File too large',
        description: 'Please select a video file smaller than 100MB.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setSelectedFile(null);
      setFormData((prevState) => ({ ...prevState, introVideo: null }));
      return;
    }

    // File is valid, update state and formData
    setSelectedFile(file);
    setFormData((prevState) => ({ ...prevState, introVideo: file }));

    toast({
      title: 'File selected',
      description: `${file.name} has been selected.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    // Optional: Preview video
    const videoURL = URL.createObjectURL(file);
    // You can use this URL to display a video preview if desired
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handlePhotoFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select a valid image file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setSelectedFullBodyPhotoFile(null);
      setFormData((prevState) => ({ ...prevState, fullBodyPhoto: null }));
      return;
    }

    // Check file size (limit to 5MB for this example)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: 'File too large',
        description: 'Please select an image file smaller than 5MB.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setSelectedFullBodyPhotoFile(null);
      setFormData((prevState) => ({ ...prevState, fullBodyPhoto: null }));
      return;
    }

    // File is valid, update state and formData
    setSelectedFullBodyPhotoFile(file);
    setFormData((prevState) => ({ ...prevState, fullBodyPhoto: file }));

    toast({
      title: 'File selected',
      description: `${file.name} has been selected.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handlePhotoButtonClick = () => {
    fullBodyPhotoFileInputRef.current.click();
  };

  const handleHeadShotPhotoFileChange = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    // Check if the file is an image
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file type',
        description: 'Please select a valid image file.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setSelectedHeadShotFile(null);
      setFormData((prevState) => ({ ...prevState, headShotPhoto: null }));
      return;
    }

    // Check file size (limit to 5MB for this example)
    const maxSize = 5 * 1024 * 1024; // 5MB in bytes
    if (file.size > maxSize) {
      toast({
        title: 'File too large',
        description: 'Please select an image file smaller than 5MB.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      setSelectedHeadShotFile(null);
      setFormData((prevState) => ({ ...prevState, headShotPhoto: null }));
      return;
    }

    // File is valid, update state and formData
    setSelectedHeadShotFile(file);
    setFormData((prevState) => ({ ...prevState, headShotPhoto: file }));

    toast({
      title: 'File selected',
      description: `${file.name} has been selected.`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  const handleHeadShotPhotoButtonClick = () => {
    headShotPhotoFileInputRef.current.click();
  };

  return (
    <>
      <Box
        w={{ xl: '70vw', base: '90vw' }}
        h={{ xl: '100%' }}
        mb={{ xl: '2rem' }}
      >
        <VStack mb="1rem" display={{ xl: 'none', base: 'flex' }} w="100%">
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
          <FormControl isRequired>
            <FormLabel>
              List your social media handles seperated by commas (e.g.
              IG@farmeraustralia, Facebook@Farmer Wants A Wife )
            </FormLabel>
            <Textarea
              h="4rem"
              name="socialHandles"
              value={formData.socialHandles}
              onChange={handleChange}
              outline="1px solid #306ac0"
            />
          </FormControl>
          <HStack>
            <FormControl isRequired>
              <FormLabel>Current City</FormLabel>
              <Input
                name="currentCity"
                type="text"
                value={formData.currentCity}
                onChange={handleChange}
                outline="1px solid #306ac0"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Current State</FormLabel>
              <Select
                value={formData.currentState}
                placeholder="Select..."
                outline="1px solid #306ac0"
                onChange={handleChange}
                name="currentState"
              >
                {australianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>
          </HStack>
          <HStack>
            <FormControl isRequired>
              <FormLabel>Hometown City</FormLabel>
              <Input
                name="hometownCity"
                type="text"
                value={formData.hometownCity}
                onChange={handleChange}
                outline="1px solid #306ac0"
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Hometown State</FormLabel>
              <Select
                value={formData.hometownState}
                placeholder="Select..."
                outline="1px solid #306ac0"
                onChange={handleChange}
                name="hometownState"
              >
                {australianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>
          </HStack>
          <FormControl isRequired>
            <FormLabel>Occupation</FormLabel>
            <Input
              name="occupation"
              type="text"
              value={formData.occupation}
              onChange={handleChange}
              outline="1px solid #306ac0"
            />
          </FormControl>
          <FormControl isRequired>
            <HStack alignItems="center">
              <FormLabel>Height</FormLabel>
              <Text fontSize="13px" color="red">
                Feet and inches. Please specify if inches is zero, do not leave
                blank
              </Text>
            </HStack>

            <HStack>
              <Input
                name="height"
                type="text"
                value={formData.height}
                onChange={handleChange}
                outline="1px solid #306ac0"
              />
              <Text>ft/in</Text>
            </HStack>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Relationship Status</FormLabel>
            <Select
              value={formData.relationshipStatus}
              onChange={handleChange}
              name="relationshipStatus"
              placeholder="Select..."
              outline="1px solid #306ac0"
            >
              {['Single', 'Married', 'Separated', 'Divorced'].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <HStack alignItems="center">
              <FormLabel>Do you have children?</FormLabel>

              <Text fontSize="13px" color="red">
                If yes, how many?
              </Text>
            </HStack>
            <Input
              name="noOfChildren"
              type="number"
              value={formData.noOfChildren}
              onChange={handleChange}
              outline="1px solid #306ac0"
            />
          </FormControl>
          <FormControl isRequired>
            <HStack alignItems="center">
              <FormLabel>
                Why are you applying for Farmer Wants A Wife? Are you ready for
                love on the farm?
              </FormLabel>
              <Text display="inline" fontSize="13px" color="red">
                Begin sentence with 'To'
              </Text>
            </HStack>

            <Textarea
              h="4rem"
              name="whyApply"
              value={formData.whyApply}
              onChange={handleChange}
              outline="1px solid #306ac0"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>
              Do you consider yourself more of a city girl or a country girl?
            </FormLabel>
            <Select
              value={formData.cityGirlOrCountryGirl}
              onChange={handleChange}
              name="cityGirlOrCountryGirl"
              placeholder="Select..."
              outline="1px solid #306ac0"
            >
              {['City Girl', 'Country Girl'].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>How did you hear about our casting call?</FormLabel>
            <Select
              value={formData.howYouHeard}
              onChange={handleChange}
              name="howYouHeard"
              placeholder="Select..."
              outline="1px solid #306ac0"
            >
              {source.map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </FormControl>
          <FormControl isRequired>
            <FormLabel>
              Have you applied or interviewed for any of our previous seasons of
              Farmer Wants A Wife
            </FormLabel>
            <Select
              value={formData.appliedBefore}
              onChange={handleChange}
              name="appliedBefore"
              placeholder="Select..."
              outline="1px solid #306ac0"
            >
              {['Yes', 'No'].map((state) => (
                <option key={state} value={state}>
                  {state}
                </option>
              ))}
            </Select>
          </FormControl>
          <VStack fontWeight="700" alignItems="flex-start">
            <Text display="inline" fontSize="13px" color="red">
              FOR ALL PHOTO/VIDEO UPLOADS, THE FOLLOWING GUIDELINES APPLY:
            </Text>
            <Text display="inline" fontSize="13px" color="red">
              File size limit: 100MB
            </Text>
            <Text display="inline" fontSize="13px" color="red">
              Valid formats: JPEG, PNG, GIF, BMP, WebP, HEIC, MP4, MOV, AVI,
              WMV, FLV, WebM, MKV, HEVC
            </Text>
          </VStack>
          <FormControl isRequired>
            <FormLabel>Upload a headshot photo of yourself</FormLabel>

            <HStack justifyContent="flex-start" alignItems="flex-start">
              <Input
                type="file"
                accept="image/*"
                onChange={handleHeadShotPhotoFileChange}
                ref={headShotPhotoFileInputRef}
                display="none"
              />
              <Button
                onClick={handleHeadShotPhotoButtonClick}
                colorScheme="blue"
              >
                Choose Photo
              </Button>
              <Box mt={2}>
                {selectedHeadShotFile ? (
                  <Text>
                    Selected file: {selectedHeadShotFile.name} (
                    {(selectedHeadShotFile.size / (1024 * 1024)).toFixed(2)} MB)
                  </Text>
                ) : (
                  <Text>No file selected</Text>
                )}
              </Box>
            </HStack>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>Upload a full body photo of yourself</FormLabel>
            <HStack justifyContent="flex-start" alignItems="flex-start">
              <Input
                type="file"
                accept="image/*"
                onChange={handlePhotoFileChange}
                ref={fullBodyPhotoFileInputRef}
                display="none"
              />
              <Button onClick={handlePhotoButtonClick} colorScheme="blue">
                Choose Photo
              </Button>
              <Box mt={2}>
                {selectedFullBodyPhotoFile ? (
                  <Text>
                    Selected file: {selectedFullBodyPhotoFile.name} (
                    {(selectedFullBodyPhotoFile.size / (1024 * 1024)).toFixed(
                      2
                    )}{' '}
                    MB)
                  </Text>
                ) : (
                  <Text>No file selected</Text>
                )}
              </Box>
            </HStack>
          </FormControl>

          <FormControl isRequired>
            <FormLabel>
              Upload a 1 minute video introducing yourself and showing off your
              personality! Look your best as your first impressions are
              everything!!! Tell us about you, your dating life and why you are
              looking for love with a farmer. This can be shot on a phone and
              uploaded here (please do not upload any old videos). Make sure we
              see you in good light, can hear you and you look your best!
            </FormLabel>
            <HStack justifyContent="flex-start" alignItems="flex-start">
              <Input
                type="file"
                accept="video/*"
                onChange={handleFileChange}
                ref={fileInputRef}
                display="none"
              />
              <Button onClick={handleButtonClick} colorScheme="blue">
                Choose Video
              </Button>
              <Box mt={2}>
                {selectedFile ? (
                  <Text>Selected file: {selectedFile.name}</Text>
                ) : (
                  <Text>No file selected</Text>
                )}
              </Box>
            </HStack>
          </FormControl>
        </VStack>

        <HStack
          display={{ xl: 'flex', base: 'none' }}
          justifyContent="space-between"
          h="100%"
          alignItems="flex-start"
          gap="2rem"
        >
          <VStack w="50%" h="100%">
            <HStack w="100%">
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

            <FormControl isRequired>
              <FormLabel>
                List your social media handles seperated by commas (e.g.
                IG@farmeraustralia, Facebook@Farmer Wants A Wife )
              </FormLabel>
              <Textarea
                h="4rem"
                name="socialHandles"
                value={formData.socialHandles}
                onChange={handleChange}
                outline="1px solid #306ac0"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Current City</FormLabel>
              <Input
                name="currentCity"
                type="text"
                value={formData.currentCity}
                onChange={handleChange}
                outline="1px solid #306ac0"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Current State</FormLabel>
              <Select
                value={formData.currentState}
                placeholder="Select..."
                outline="1px solid #306ac0"
                onChange={handleChange}
                name="currentState"
              >
                {australianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Hometown City</FormLabel>
              <Input
                name="hometownCity"
                type="text"
                value={formData.hometownCity}
                onChange={handleChange}
                outline="1px solid #306ac0"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Hometown State</FormLabel>
              <Select
                value={formData.hometownState}
                placeholder="Select..."
                outline="1px solid #306ac0"
                onChange={handleChange}
                name="hometownState"
              >
                {australianStates.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Occupation</FormLabel>
              <Input
                name="occupation"
                type="text"
                value={formData.occupation}
                onChange={handleChange}
                outline="1px solid #306ac0"
              />
            </FormControl>

            <FormControl isRequired>
              <HStack alignItems="center">
                <FormLabel>Height</FormLabel>
                <Text fontSize="13px" color="red">
                  Feet and inches. Please specify if inches is zero, do not
                  leave blank
                </Text>
              </HStack>

              <HStack>
                <Input
                  name="height"
                  type="text"
                  value={formData.height}
                  onChange={handleChange}
                  outline="1px solid #306ac0"
                />
                <Text>ft/in</Text>
              </HStack>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Relationship Status</FormLabel>
              <Select
                value={formData.relationshipStatus}
                onChange={handleChange}
                name="relationshipStatus"
                placeholder="Select..."
                outline="1px solid #306ac0"
              >
                {['Single', 'Married', 'Separated', 'Divorced'].map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>
          </VStack>
          <VStack w="50%" alignItems="flex-start" h="100%">
            <FormControl isRequired>
              <HStack alignItems="center">
                <FormLabel>Do you have children?</FormLabel>

                <Text fontSize="13px" color="red">
                  If yes, how many?
                </Text>
              </HStack>
              <Input
                name="noOfChildren"
                type="number"
                value={formData.noOfChildren}
                onChange={handleChange}
                outline="1px solid #306ac0"
              />
            </FormControl>

            <FormControl isRequired>
              <HStack alignItems="center">
                <FormLabel>
                  Why are you applying for Farmer Wants A Wife? Are you ready
                  for love on the farm?
                </FormLabel>
                <Text display="inline" fontSize="13px" color="red">
                  Begin sentence with 'To'
                </Text>
              </HStack>

              <Textarea
                h="4rem"
                name="whyApply"
                value={formData.whyApply}
                onChange={handleChange}
                outline="1px solid #306ac0"
              />
            </FormControl>

            <FormControl isRequired>
              <FormLabel>
                Do you consider yourself more of a city girl or a country girl?
              </FormLabel>
              <Select
                value={formData.cityGirlOrCountryGirl}
                onChange={handleChange}
                name="cityGirlOrCountryGirl"
                placeholder="Select..."
                outline="1px solid #306ac0"
              >
                {['City Girl', 'Country Girl'].map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>How did you hear about our casting call?</FormLabel>
              <Select
                value={formData.howYouHeard}
                onChange={handleChange}
                name="howYouHeard"
                placeholder="Select..."
                outline="1px solid #306ac0"
              >
                {source.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>
                Have you applied or interviewed for any of our previous seasons
                of Farmer Wants A Wife
              </FormLabel>
              <Select
                value={formData.appliedBefore}
                onChange={handleChange}
                name="appliedBefore"
                placeholder="Select..."
                outline="1px solid #306ac0"
              >
                {['Yes', 'No'].map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </Select>
            </FormControl>

            <VStack fontWeight="700" alignItems="flex-start">
              <Text display="inline" fontSize="13px" color="red">
                FOR ALL PHOTO/VIDEO UPLOADS, THE FOLLOWING GUIDELINES APPLY:
              </Text>
              <Text display="inline" fontSize="13px" color="red">
                File size limit: 100MB
              </Text>
              <Text display="inline" fontSize="13px" color="red">
                Valid formats: JPEG, PNG, GIF, BMP, WebP, HEIC, MP4, MOV, AVI,
                WMV, FLV, WebM, MKV, HEVC
              </Text>
            </VStack>

            <FormControl isRequired>
              <FormLabel>Upload a headshot photo of yourself</FormLabel>

              <HStack justifyContent="center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handleHeadShotPhotoFileChange}
                  ref={headShotPhotoFileInputRef}
                  display="none"
                />
                <Button
                  onClick={handleHeadShotPhotoButtonClick}
                  colorScheme="blue"
                >
                  Choose Photo
                </Button>
                <Box mt={2}>
                  {selectedHeadShotFile ? (
                    <Text>
                      Selected file: {selectedHeadShotFile.name} (
                      {(selectedHeadShotFile.size / (1024 * 1024)).toFixed(2)}{' '}
                      MB)
                    </Text>
                  ) : (
                    <Text>No file selected</Text>
                  )}
                </Box>
              </HStack>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>Upload a full body photo of yourself</FormLabel>
              <HStack justifyContent="center">
                <Input
                  type="file"
                  accept="image/*"
                  onChange={handlePhotoFileChange}
                  ref={fullBodyPhotoFileInputRef}
                  display="none"
                />
                <Button onClick={handlePhotoButtonClick} colorScheme="blue">
                  Choose Photo
                </Button>
                <Box mt={2}>
                  {selectedFullBodyPhotoFile ? (
                    <Text>
                      Selected file: {selectedFullBodyPhotoFile.name} (
                      {(selectedFullBodyPhotoFile.size / (1024 * 1024)).toFixed(
                        2
                      )}{' '}
                      MB)
                    </Text>
                  ) : (
                    <Text>No file selected</Text>
                  )}
                </Box>
              </HStack>
            </FormControl>

            <FormControl isRequired>
              <FormLabel>
                Upload a 1 minute video introducing yourself and showing off
                your personality! Look your best as your first impressions are
                everything!!! Tell us about you, your dating life and why you
                are looking for love with a farmer. This can be shot on a phone
                and uploaded here (please do not upload any old videos). Make
                sure we see you in good light, can hear you and you look your
                best!
              </FormLabel>
              <HStack justifyContent="center">
                <Input
                  type="file"
                  accept="video/*"
                  onChange={handleFileChange}
                  ref={fileInputRef}
                  display="none"
                />
                <Button onClick={handleButtonClick} colorScheme="blue">
                  Choose Video
                </Button>
                <Box mt={2}>
                  {selectedFile ? (
                    <Text>Selected file: {selectedFile.name}</Text>
                  ) : (
                    <Text>No file selected</Text>
                  )}
                </Box>
              </HStack>
            </FormControl>
          </VStack>
        </HStack>
      </Box>
    </>
  );
};

export default BiosForm;
