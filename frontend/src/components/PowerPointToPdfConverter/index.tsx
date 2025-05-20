'use client';
import { FC, useState } from 'react';

import { ChooseFileStep } from '@/components/PowerPointToPdfConverter/ChooseFileStep';
import { ConfirmationStep } from '@/components/PowerPointToPdfConverter/ConfirmationStep';
import { DownloadStep } from '@/components/PowerPointToPdfConverter/DownloadStep';
import { ErrorPopup } from '@/components/PowerPointToPdfConverter/ErrorPopup';

type PowerPointToPdfConverterProps = {};

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

export const PowerPointToPdfConverter: FC<PowerPointToPdfConverterProps> = () => {
  const [currentStep, setCurrentStep] = useState<CurrentStep>(CurrentStep.CHOOSE);
  const [file, setFile] = useState<null | File>(null);
  const [pdfUrl, setPdfUrl] = useState<null | string>(null);
  const [error, setError] = useState<ErrorState>(ErrorState.NONE);

  const renderCurrentStep = () => {
    if (error !== ErrorState.NONE) {
      return <ErrorPopup setCurrentStep={setCurrentStep} errorState={error} />;
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
          <ErrorPopup setCurrentStep={setCurrentStep} errorState={ErrorState.OTHER} />
        );
      case CurrentStep.DOWNLOAD:
        return pdfUrl ? (
          <DownloadStep setCurrentStep={setCurrentStep} pdfUrl={pdfUrl} />
        ) : (
          <ErrorPopup setCurrentStep={setCurrentStep} errorState={ErrorState.OTHER} />
        );
    }
  };

  return (
    <>
      <div className={'flex items-center justify-center w-screen h-screen'}>
        {renderCurrentStep()}
      </div>
    </>
  );
};
