import { Dispatch, FC, SetStateAction } from 'react';

import { CurrentStep, ErrorState } from '@/components/PowerPointToPdfConverter';
import { Button } from '@/components/PowerPointToPdfConverter/Button';
import { CheckIcon } from '@/icons/CheckIcon';
import { PdfIcon } from '@/icons/PdfIcon';

type DownloadStepProps = {
  pdfUrl: string;
  setCurrentStep: Dispatch<SetStateAction<CurrentStep>>;
  setError: Dispatch<SetStateAction<ErrorState>>;
};

export const DownloadStep: FC<DownloadStepProps> = ({ pdfUrl, setCurrentStep, setError }) => {
  function handleConvertAnother() {
    setCurrentStep(CurrentStep.CHOOSE);
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md min-w-[336px] w-[464px]">
      <div className="flex flex-col gap-4 rounded-lg border border-gray-300 p-4 text-center w-full">
        <div className={'flex items-center flex-col'}>
          <div className={''}>
            <PdfIcon />
          </div>
          <div className={'-mt-3'}>
            <CheckIcon />
          </div>
        </div>
        <p className={'font-[600] text-[20px]/[30px] lin'}>File converted successfully!</p>
      </div>
      <div className="flex w-full gap-3 h-10">
        <Button variant={'secondary'} onClick={handleConvertAnother}>
          Convert another
        </Button>
        {/* I could not find a way to make it download directly,
         it just kept opening it in the same tab without downloading the damn file,
         so I made it open in a new tab instead. */}
        <a href={pdfUrl} target={'_blank'} className={'flex w-full'}>
          <Button variant={'primary'}>Download file</Button>
        </a>
      </div>
    </div>
  );
};
