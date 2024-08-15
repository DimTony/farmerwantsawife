/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { baseUrl } from './Utils';
import Loading from './Loading';
import AccessDenied from './AccessDenied';

const IPChecker = ({ children }) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const effectRan = useRef(false);
  const checkEffectRan = useRef(false);

  useEffect(() => {
    if (effectRan.current === false) {
      const verifyIPAddress = async () => {
        try {
          const response = await fetch('https://api.ipify.org?format=json');
          const data = await response.json();
          await sendIPToBackend(data.ip);
        } catch (error) {
          console.error('Error getting IP address:', error);
        }
      };

      const sendIPToBackend = async (ipAddress) => {
        try {
          const response = await axios.post(
            `${baseUrl}/api/ip/verify-ip`,
            { ip: ipAddress },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            }
          );

          if (response.status !== 200) {
            throw new Error('Failed to verify IP');
          }

          setIsLoading(false);
          setIsBlocked(response.data.blocked);
        } catch (error) {
          console.error('Error verifying IP:', error);
        }
      };

      verifyIPAddress();
    }

    return () => {
      effectRan.current = true;
    };
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (isBlocked) {
    return <AccessDenied />;
  }

  return children;
};

export default IPChecker;
