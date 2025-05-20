import {Dispatch, FC, SetStateAction} from 'react';
import {useDropzone} from 'react-dropzone';

import {CurrentStep, ErrorState} from "@/components/PowerPointToPdfConverter";
import UploadIcon from '@/icons/UploadIcon';

type ChooseFileStepProps = {
  setCurrentStep: Dispatch<SetStateAction<CurrentStep>>,
  setFile: Dispatch<SetStateAction<null | File>>,
  setError: Dispatch<SetStateAction<ErrorState>>
};

export const ChooseFileStep: FC<ChooseFileStepProps> = ({
  setCurrentStep,
  setFile,
  setError
}) => {

  const { getRootProps, getInputProps } = useDropzone({
    onDropAccepted: async (files, _event) => {
      const file = files[0]
      setFile(file)
      setCurrentStep(CurrentStep.CONFIRMATION)
    },
    onDropRejected: (fileRejections) => {
      const rejection = fileRejections[0];
      if (rejection) {
        // Handle specific rejection reasons
        if (rejection.errors.some(e => e.code === 'file-too-large')) {
          setError(ErrorState.SIZE_LIMIT_EXCEEDED);
        } else if (rejection.errors.some(e => e.code === 'file-invalid-type')) {
          setError(ErrorState.INVALID_FILE);
        } else if (rejection.errors.some(e => e.code === "too-many-files")) {
          setError(ErrorState.TOO_MANY_FILES)
        } else {
          setError(ErrorState.OTHER);
        }
      }
    },
    accept: {
      'application/vnd.ms-powerpoint': ['.ppt'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx']
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024,
  });

  return (
      <div
          className="group cursor-pointer rounded-xl border border-dashed border-gray-400 bg-white px-6 py-16 w-[416px] min-w-[365px]"
          {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="flex shrink-0 grow-0 flex-col items-center gap-2">
          <div className="mb-2 rounded-full bg-gray-100 p-2">
            <div className="grid place-items-center rounded-full bg-gray-200 p-2 [&>svg]:size-8">
              <UploadIcon/>
            </div>
          </div>
          <p className="text-xs/[18px] leading-8 text-gray-600">
            Drag and drop a PowerPoint file to convert to PDF.
          </p>
          <button
              type="button"
              className="rounded-lg bg-blue-50 px-4 py-2.5 text-sm text-blue-700 transition-colors group-hover:bg-blue-100"
          >
            Choose file
          </button>
        </div>
      </div>
  );
};
