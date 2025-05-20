import {Dispatch, FC, SetStateAction, useState} from 'react';
import {z} from "zod";

import {CurrentStep, ErrorState} from "@/components/PowerPointToPdfConverter";
import {Button} from "@/components/PowerPointToPdfConverter/Button";
import {CompressionSelector} from "@/components/PowerPointToPdfConverter/ConfirmationStep/CompressionSelector";

type ConfirmationStepProps = {
  file: File,
  setCurrentStep: Dispatch<SetStateAction<CurrentStep>>,
  setPdfUrl: Dispatch<SetStateAction<string | null>>,
  setError: Dispatch<SetStateAction<ErrorState>>
};


const PollingResult = z.object({
  message: z.string(),
  success: z.boolean(),
  status: z.discriminatedUnion("status", [
    z.object({
      status: z.literal("PENDING"),
      ready: z.literal(false),
    }),
    z.object({
      status: z.literal("STARTED"),
      ready: z.literal(false),
    }),
    z.object({
      status: z.literal("SUCCESS"),
      ready: z.literal(true),
      result: z.string()
    }),
    z.object({
      status: z.literal("FAILURE"),
      ready: z.literal(false),
      error: z.string()
    })
  ])
})

const ConvertQueueResult = z.object({
  message: z.string(),
  success: z.boolean(),
  request_id: z.string()
})

export const ConfirmationStep: FC<ConfirmationStepProps> = ({file, setCurrentStep, setPdfUrl}) => {
  const [uploading, setUploading] = useState(false)

  async function confirmClicked() {
    setUploading(true)

    setCurrentStep(CurrentStep.DOWNLOAD)
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md w-[464px] min-w-[390px] max-w-full">
      <div className={"flex w-full flex-col gap-2 rounded-lg border border-gray-300 p-4 text-center"}>
        <p className={"text-lg font-semibold text-gray-800"}>{file.name}</p>
        <p className={"text-sm text-gray-600"}>{Math.floor((100 * file.size) / (1024 * 1024)) / 10} MB</p>
      </div>
      <CompressionSelector isLoading={uploading}/>
      <div className={"flex flex-row gap-3 w-full"}>
        <Button variant={"secondary"} disabled={uploading}>Cancel</Button>
        <Button variant={"primary"} isLoading={uploading} onClick={confirmClicked} disabled={uploading}>Convert</Button>
      </div>
    </div>
  );
};