import { Dispatch, FC, SetStateAction } from 'react';

import { CurrentStep } from '@/components/PowerPointToPdfConverter';
import { Button } from '@/components/PowerPointToPdfConverter/Button';
import { CheckIcon } from '@/icons/CheckIcon';
import { PdfIcon } from '@/icons/PdfIcon';

type DownloadStepProps = {
  pdfUrl: string;
  setCurrentStep: Dispatch<SetStateAction<CurrentStep>>;
};

export const DownloadStep: FC<DownloadStepProps> = ({ pdfUrl, setCurrentStep }) => {
  function handleDownload() {
    const link = document.createElement('a');
    link.href = pdfUrl;

    // Add download attribute (because this forces download instead of navigation)
    link.download = 'converted-document.pdf';

    // Append to the document
    document.body.appendChild(link);

    // Trigger the download
    link.click();

    // Clean up
    document.body.removeChild(link);
  }

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
        <Button variant={'primary'} onClick={handleDownload}>
          Download file
        </Button>
      </div>
    </div>
  );
};
