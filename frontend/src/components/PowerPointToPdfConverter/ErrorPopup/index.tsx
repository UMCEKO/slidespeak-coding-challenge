import { Dispatch, FC, SetStateAction } from 'react';

import { CurrentStep, ErrorState } from '@/components/PowerPointToPdfConverter';
import { Button } from '@/components/PowerPointToPdfConverter/Button';
import { ErrorIcon } from '@/icons/ErrorIcon';

type ErrorPopupProps = {
  setCurrentStep: Dispatch<SetStateAction<CurrentStep>>;
  setError: Dispatch<SetStateAction<ErrorState>>;
  errorState: ErrorState;
};
function getErrorMessage(error: ErrorState) {
  switch (error) {
    case ErrorState.NONE:
      return 'No error occurred.';
    case ErrorState.TOO_MANY_FILES:
      return 'Only one PowerPoint file can be uploaded at a time. Please select a single file to convert.';
    case ErrorState.SIZE_LIMIT_EXCEEDED:
      return 'This file exceeds our 50MB size limit. Please compress your PowerPoint or split it into smaller presentations.';
    case ErrorState.INVALID_FILE:
      return "This file format isn't supported. Please upload a PowerPoint file (.pptx or .ppt).";
    case ErrorState.QUEUE_ERROR:
      return "We couldn't queue your file for conversion. Please try again or check your internet connection.";
    case ErrorState.PROCESSING_ERROR:
      return 'An error occurred while converting your PowerPoint to PDF. Please check your file and try again.';
    case ErrorState.TIMEOUT_ERROR:
      return 'Your conversion is taking longer than expected. Please try again with a smaller file or at a less busy time.';
    case ErrorState.QUERY_ERROR:
      return 'We lost connection while checking your conversion status. Please try again or check your network.';
    case ErrorState.OTHER:
      return 'Something unexpected happened. Please try again or contact support if the problem persists.';
  }
}
export const ErrorPopup: FC<ErrorPopupProps> = ({ errorState, setCurrentStep, setError }) => {
  const handleTryAgain = () => {
    setCurrentStep(CurrentStep.CHOOSE);
    setError(ErrorState.NONE);
  };

  return (
    <div className="flex flex-col items-center gap-4 rounded-xl p-6 bg-red-100 border border-red-300 shadow-md w-[464px] min-w-[390px] max-w-full">
      <div className="flex justify-center h-16 mt-2">
        <ErrorIcon width={56} height={56} />
      </div>

      <div className="w-full rounded-lg bg-white bg-opacity-50 p-4 text-center text-gray-900">
        <p className="font-medium">{getErrorMessage(errorState)}</p>
      </div>

      <div className="w-full mt-2">
        <Button variant="primary" onClick={handleTryAgain}>
          Go back
        </Button>
      </div>
    </div>
  );
};
