import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { Banner } from '@ensdomains/thorin'
import logo from './logo.svg';


export const HomePage = () => {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
        <Banner alert="info" title="Heading">
        Empowering Work Relationships: Ethereum Attestation Services for Verified Job Accomplishments
        </Banner>
      </ThemeProvider>
    </>
  );
};
