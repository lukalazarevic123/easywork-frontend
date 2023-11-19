import React, { useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThorinGlobalStyles, lightTheme, Tag, CurrencyToggle } from '@ensdomains/thorin';
import { Banner, EnvelopeSVG, Heading, Card, Typography } from '@ensdomains/thorin';
import './home-page.css';

export const HomePage = () => {
  // State to track the toggle status
  const [isDollar, setIsDollar] = useState(false);

  // Function to handle the toggle action
  const handleToggle = () => {
    // Toggle the state
    setIsDollar(!isDollar);
  };

  // Content to display based on the toggle status
  const content = isDollar ? '$5866' : '3 ETH';

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
          <Banner alert='info' className='bane' icon={<EnvelopeSVG />} title="Not an ordinary job marketplace">
            EasyWork is a trusted ecosystem where individuals can confidently attest to their work experiences and payments, fostering a transparent and fair environment for freelancers and job providers alike.
          </Banner>
          <Heading level="2" align='center' className="discover">Discover Jobs</Heading>
          <CurrencyToggle onClick={handleToggle} />
        </div>
        <div className="cards">
          {/* Example Card 1 */}
          <Card divider title="Blockchain Job Opportunity!" variant="desktop">
            <Card.Divider />
            <Typography>
              Senior Solidity Software Engineer
            </Typography>
            <Card.Divider />
            <Typography>
              As a Senior Solidity Software Engineer, you will help EasyWork build a Web3/crypto platform for renting bikes.
            </Typography>
            <Card.Divider />
            <div className="tags">
              <Tag colorStyle="yellowSecondary">Cryptocurrencies</Tag>
              <Tag colorStyle="yellowSecondary"> Saturday, November 18th</Tag>
              <Tag colorStyle="accentSecondary">{content}</Tag>
            </div>
          </Card>

          {/* Example Card 2 */}
          <Card divider title="Blockchain Job Opportunity!" variant="desktop">
            <Card.Divider />
            <Typography>
              Senior Solidity Software Engineer
            </Typography>
            <Card.Divider />
            <Typography>
              As a Senior Solidity Software Engineer, you will help EasyWork build a Web3/crypto platform for renting bikes.
            </Typography>
            <Card.Divider />
            <div className="tags">
              <Tag colorStyle="yellowSecondary">Cryptocurrencies</Tag>
              <Tag colorStyle="yellowSecondary"> Saturday, November 18th</Tag>
              <Tag colorStyle="accentSecondary">{content}</Tag>
            </div>
          </Card>

          {/* Example Card 3 */}
          <Card divider title="Blockchain Job Opportunity!" variant="desktop" className="singlecard">
            <Card.Divider />
            <Typography>
              Senior Solidity Software Engineer
            </Typography>
            <Card.Divider />
            <Typography>
              As a Senior Solidity Software Engineer, you will help EasyWork build a Web3/crypto platform for renting bikes.
            </Typography>
            <Card.Divider />
            <div className="tags">
              <Tag colorStyle="yellowSecondary">Cryptocurrencies</Tag>
              <Tag colorStyle="yellowSecondary"> Saturday, November 18th</Tag>
              <Tag colorStyle="accentSecondary">{content}</Tag>
            </div>
          </Card>
        </div>
      </ThemeProvider>
    </>
  );
};
