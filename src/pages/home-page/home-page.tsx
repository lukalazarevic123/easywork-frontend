import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { Banner } from '@ensdomains/thorin'
import { LogoSVG } from '../../components/logosvg/logosvg'
import { FlameSVG } from '@ensdomains/thorin' 


export const HomePage = () => {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <Banner  icon={<LogoSVG />} title="Empowering Work Relationships">
        Ethereum Attestation Services for Verified Job Accomplishments
      </Banner>
      </ThemeProvider>
    </>
  );
};
