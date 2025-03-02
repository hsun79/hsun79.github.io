import { useRouteError } from 'react-router-dom';

const ErrorPage = () => {
  const error = useRouteError() as any;

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-bold text-red-600">Oops!</h1>
        <p className="mt-2 text-gray-700">Sorry, an unexpected error has occurred.</p>
        <p className="mt-1 text-gray-500">
          {error?.statusText || error?.message || 'Unknown error'}
        </p>
      </div>
    </div>
  );
};

export default ErrorPage; 