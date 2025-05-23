'use client';
import { FC, useState } from 'react';

import { ChooseFileStep } from '@/components/PowerPointToPdfConverter/ChooseFileStep';
import { ConfirmationStep } from '@/components/PowerPointToPdfConverter/ConfirmationStep';
import { DownloadStep } from '@/components/PowerPointToPdfConverter/DownloadStep';
import { ErrorPopup } from '@/components/PowerPointToPdfConverter/ErrorPopup';

export enum CurrentStep {
  CHOOSE,
  CONFIRMATION,
  DOWNLOAD,
}

export enum ErrorState {
  NONE,
  TOO_MANY_FILES,
  SIZE_LIMIT_EXCEEDED,
  INVALID_FILE,
  QUEUE_ERROR,
  PROCESSING_ERROR,
  TIMEOUT_ERROR,
  QUERY_ERROR,
  OTHER,
}

export const PowerPointToPdfConverter: FC = () => {
  const [currentStep, setCurrentStep] = useState<CurrentStep>(CurrentStep.CHOOSE);
  const [file, setFile] = useState<null | File>(null);
  const [pdfUrl, setPdfUrl] = useState<null | string>(null);
  const [error, setError] = useState<ErrorState>(ErrorState.NONE);

  const renderCurrentStep = () => {
    if (error !== ErrorState.NONE) {
      return <ErrorPopup setCurrentStep={setCurrentStep} errorState={error} setError={setError} />;
    }
    switch (currentStep) {
      case CurrentStep.CHOOSE:
        return (
          <ChooseFileStep setCurrentStep={setCurrentStep} setError={setError} setFile={setFile} />
        );
      case CurrentStep.CONFIRMATION:
        return file ? (
          <ConfirmationStep
            setCurrentStep={setCurrentStep}
            setError={setError}
            file={file}
            setPdfUrl={setPdfUrl}
          />
        ) : (
          <ErrorPopup
            setCurrentStep={setCurrentStep}
            errorState={ErrorState.OTHER}
            setError={setError}
          />
        );
      case CurrentStep.DOWNLOAD:
        return pdfUrl ? (
          <DownloadStep setCurrentStep={setCurrentStep} setError={setError} pdfUrl={pdfUrl} />
        ) : (
          <ErrorPopup
            setCurrentStep={setCurrentStep}
            errorState={ErrorState.OTHER}
            setError={setError}
          />
        );
    }
  };

  return <>{renderCurrentStep()}</>;
};
