// StatusStepper.js
import React from 'react';
import { Stepper, Step, StepLabel, StepConnector, styled } from '@mui/material';
import { FaCheck, FaTimes, FaHourglassHalf, FaBoxOpen, FaBox } from 'react-icons/fa';

// Custom connector for step styling
const CustomStepConnector = styled(StepConnector)(({ theme }) => ({
  [`&.MuiStepConnector-active`]: {
    borderColor: theme.palette.primary.main,
  },
  [`&.MuiStepConnector-completed`]: {
    borderColor: theme.palette.success.main,
  },
  [`&.MuiStepConnector-disabled`]: {
    borderColor: theme.palette.action.disabled,
  },
  [`&.MuiStepConnector-root`]: {
    borderTopWidth: 2,
  },
}));

// Icon mapping for each status
const icons = {
  pending: <FaHourglassHalf />,
  processing: <FaBoxOpen />,
  shipped: <FaBox />,
  delivered: <FaCheck />,
  cancelled: <FaTimes />,
};

const StatusStepper = ({ status }) => {
  console.log(status);
  // Standardize the steps array and make sure status strings are consistent
  const steps = ['pending', 'processing', 'shipped', 'delivered', 'cancelled'];
  
  // Find active step based on the current status
  const activeStep = steps.indexOf(status.toLowerCase());

  // Function to get the color based on the current step
  const getCircleColor = (step) => {
    switch (step) {
      case 'cancelled':
        return 'red'; // Red for cancelled
      case 'delivered':
        return 'green'; // Green for delivered
      case 'processing':
        return 'blue'; // Blue for processing
      default:
        return 'gray'; // Default color for other statuses
    }
  };

  return (
    <Stepper
      activeStep={activeStep}
      connector={<CustomStepConnector />}
      alternativeLabel
    >
      {steps.map((step, index) => (
        <Step
          key={step}
          completed={index < activeStep} 
          disabled={index > activeStep} // Disable future steps
        >
          <StepLabel
            icon={
              <div
                className="w-8 h-8 flex items-center justify-center rounded-full border-2"
                style={{
                  borderColor: index <= activeStep ? getCircleColor(step) : 'gray',
                  backgroundColor: index === activeStep ? getCircleColor(step) : 'transparent',
                  color: index <= activeStep ? 'white' : 'gray',
                }}
              >
                {icons[step]}
              </div>
            }
          >
            {step.charAt(0).toUpperCase() + step.slice(1)}
          </StepLabel>
        </Step>
      ))}
    </Stepper>
  );
};

export default StatusStepper;
