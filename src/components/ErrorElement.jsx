import React from 'react';

const ErrorElement = ({ error }) => {
  return (
    <div style={{ padding: 24 }}>
      <h2 style={{ color: '#c53030' }}>Something went wrong</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{String(error || 'An unexpected error occurred')}</pre>
    </div>
  );
};

export default ErrorElement;
