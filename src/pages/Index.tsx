
import React from 'react';
import { Navigate } from 'react-router-dom';

// Redirect to the Dashboard component
const Index = () => {
  return <Navigate to="/" replace />;
};

export default Index;
