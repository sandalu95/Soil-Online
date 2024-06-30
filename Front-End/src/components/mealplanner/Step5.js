import React from 'react';
import { Form } from 'react-bootstrap';

const Step5PlanType = ({ planType, handlePlanChange }) => {
  return (
    <div style={{ fontFamily: 'Arial, sans-serif', margin: 'auto', padding: '20px', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <p style={{ fontFamily: 'Arial, sans-serif', fontSize: '30px', fontWeight: 'bold', color: '#426745', textAlign: 'center', marginBottom: '30px' }}>
        Choose a plan type
      </p>
      <Form style={{ width: '30%', marginInline: 'auto', marginTop: '50px', fontSize: '18px', fontFamily: 'Arial, sans-serif' }}>
        <Form.Group controlId='planType'>
          <Form.Check
            label='Daily'
            name='daily-plan'
            value='day'
            type='radio'
            id='radio-daily-plan'
            checked={planType === 'day'}
            onChange={handlePlanChange}
            className='mb-5 ml-5'
          />
          <Form.Check
            label='Weekly'
            name='weekly-plan'
            value='week'
            type='radio'
            id='radio-weekly-plan'
            checked={planType === 'week'}
            onChange={handlePlanChange}
            className='mb-5 ml-5'
          />
        </Form.Group>
      </Form>
    </div>
  );
};

export default Step5PlanType;
