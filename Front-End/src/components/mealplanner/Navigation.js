import React from 'react';
import { Button } from 'react-bootstrap';
import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const Navigation = ({ activeStep, handleBack, handleNext, renderDots }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#f8f9fa',
        paddingTop: '10px',
        paddingBottom: '10px'
      }}
    >
      <Button
        variant='light'
        style={{ color: 'darkgreen' }}
        onClick={handleBack}
        disabled={activeStep === 0}
      >
        <KeyboardArrowLeft />
        Back
      </Button>
      <div>{renderDots()}</div>
      <Button
        variant='light'
        style={{ color: 'darkgreen' }}
        onClick={handleNext}
        disabled={activeStep === 8}
      >
        Next
        <KeyboardArrowRight />
      </Button>
    </div>
  );
};

export default Navigation;
