import React, { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { ThorinGlobalStyles, lightTheme } from '@ensdomains/thorin'
import { Banner } from '@ensdomains/thorin'
import { EnvelopeSVG } from '@ensdomains/thorin' 
import { Heading } from '@ensdomains/thorin'
import { Card } from '@ensdomains/thorin'
import { Typography } from '@ensdomains/thorin'
import { Tag } from '@ensdomains/thorin'
import { CurrencyToggle } from '@ensdomains/thorin'
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
      <Banner alert='info'  className='bane' icon={<EnvelopeSVG />}title="Not a ordinary job marketplace">
       EasyWork is trusted ecosystem where individuals can confidently attest to their work experiences and payments, fostering a transparent and fair environment for freelancers and job providers alike.

      </Banner>
      <Heading level="2" align='center'>Discover Jobs</Heading>
      </div>
      <div className="cards">
      <Card divider title="Blockchain Job Opportunity!" variant="desktop">
        <Card.Divider />
       <Typography>
       Senior Solidity Software Engineer
        </Typography>
       <Card.Divider />
        <Typography>
        As a Senior Solidity Software Engineer, you will help EasyWork build Web3/crypto platform for renting bikes.
      </Typography>
      <Card.Divider />
      <div className="tags">
      <Tag colorStyle="yellowSecondary">Cryptocurrencies</Tag>
      <Tag colorStyle="yellowSecondary"> Saturday, November 18th</Tag>
      <Tag colorStyle="accentSecondary">3 ETH</Tag>
      </div>
       </Card>
       <Card divider title="Blockchain Job Opportunity!" variant="desktop">
        <Card.Divider />
       <Typography>
       Senior Solidity Software Engineer
        </Typography>
       <Card.Divider />
        <Typography>
        As a Senior Solidity Software Engineer, you will help EasyWork build Web3/crypto platform for renting bikes.
      </Typography>
      <Card.Divider />
      <div className="tags">
      <Tag colorStyle="yellowSecondary">Cryptocurrencies</Tag>
      <Tag colorStyle="yellowSecondary"> Saturday, November 18th</Tag>
      <Tag colorStyle="accentSecondary">3 ETH</Tag>
      </div>
       </Card>
       <Card divider title="Blockchain Job Opportunity!" variant="desktop" className="singlecard">
        <Card.Divider />
       <Typography>
       Senior Solidity Software Engineer
        </Typography>
       <Card.Divider />
        <Typography>
        As a Senior Solidity Software Engineer, you will help EasyWork build Web3/crypto platform for renting bikes.
      </Typography>
      <Card.Divider />
      <div className="tags">
      <Tag colorStyle="yellowSecondary">Cryptocurrencies</Tag>
      <Tag colorStyle="yellowSecondary"> Saturday, November 18th</Tag>
      <Tag colorStyle="accentSecondary">3 ETH</Tag>
      </div>
       </Card>
       
      </div>

      </ThemeProvider>
    </>
  );
};
