import { FallbackProps } from 'react-error-boundary';
export const fallbackComponent: React.FC<FallbackProps> = ({ error }) => {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre style={{ color: 'red' }}>{error.message}</pre>
    </div>
  );
};
