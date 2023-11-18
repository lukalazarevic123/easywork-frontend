import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { Banner } from '@ensdomains/thorin'
import { EnvelopeSVG } from '@ensdomains/thorin' 
import { Heading } from '@ensdomains/thorin'
import './home-page.css';



export const HomePage = () => {
  return (
    <>
      <ThemeProvider theme={lightTheme}>
      <ThorinGlobalStyles />
      <div className='banner-main'>
        <div className='banner-text'>
          <Heading>Empowering Work Relationships</Heading>
          <Heading level="3">Welcome to a revolutionary platform that redefines the way people work and collaborate.</Heading>
        </div>
      </div>
      <div className="content">
      <Banner alert='info'  icon={<EnvelopeSVG />}title="Not a ordinary job marketplace">
       EasyWork is trusted ecosystem where individuals can confidently attest to their work experiences and payments, fostering a transparent and fair environment for freelancers and job providers alike.
      </Banner>
      </div>
      </ThemeProvider>
    </>
  );
};
