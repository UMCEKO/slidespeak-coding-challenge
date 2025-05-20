import axios from 'axios';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { z } from 'zod';

import { CurrentStep, ErrorState } from '@/components/PowerPointToPdfConverter';
import { Button } from '@/components/PowerPointToPdfConverter/Button';
import { CompressionSelector } from '@/components/PowerPointToPdfConverter/ConfirmationStep/CompressionSelector';
import env from '@/utils/env';

type ConfirmationStepProps = {
  file: File;
  setCurrentStep: Dispatch<SetStateAction<CurrentStep>>;
  setPdfUrl: Dispatch<SetStateAction<string | null>>;
  setError: Dispatch<SetStateAction<ErrorState>>;
};

const PollingResultSchema = z.object({
  message: z.string(),
  success: z.boolean(),
  status: z.discriminatedUnion('status', [
    z.object({
      status: z.literal('PENDING'),
      ready: z.literal(false),
    }),
    z.object({
      status: z.literal('STARTED'),
      ready: z.literal(false),
    }),
    z.object({
      status: z.literal('SUCCESS'),
      ready: z.literal(true),
      result: z.string(),
    }),
    z.object({
      status: z.literal('FAILURE'),
      ready: z.literal(false),
      error: z.string(),
    }),
  ]),
});

const ConvertQueueResultSchema = z.object({
  message: z.string(),
  success: z.boolean(),
  job_id: z.string(),
});

const sleep = (ms: number) => new Promise((resolve) => setTimeout(() => resolve(null), ms));

export const ConfirmationStep: FC<ConfirmationStepProps> = ({
  file,
  setCurrentStep,
  setPdfUrl,
  setError,
}) => {
  const [uploading, setUploading] = useState(false);

  async function confirmClicked() {
    setUploading(true);
    let jobId: string;

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post(`${env.NEXT_PUBLIC_API_URL}/v1/convert`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        responseType: 'json',
      });

      const parsedResult = ConvertQueueResultSchema.safeParse(response.data);
      if (!parsedResult.success) {
        setError(ErrorState.OTHER);
        return;
      }

      jobId = parsedResult.data.job_id;
    } catch (e) {
      console.error('File upload error:', e);
      setError(ErrorState.QUEUE_ERROR);
      setUploading(false); // Reset upload state
      return;
    }

    // Create an AbortController for cleanup
    const abortController = new AbortController();

    try {
      let retryCount = 0;
      const maxRetries = 30; // 60 seconds at 2-second intervals

      while (retryCount < maxRetries) {
        try {
          const response = await axios.get(`${env.NEXT_PUBLIC_API_URL}/v1/status/${jobId}`, {
            responseType: 'json',
            signal: abortController.signal, // For cancellation
          });

          const parsedResult = PollingResultSchema.safeParse(response.data);
          if (!parsedResult.success) {
            setError(ErrorState.OTHER);
            return;
          }

          const data = parsedResult.data;

          if (data.status.status === 'SUCCESS') {
            setPdfUrl(data.status.result);
            setCurrentStep(CurrentStep.DOWNLOAD);
            return;
          }

          if (data.status.status === 'FAILURE') {
            setError(ErrorState.PROCESSING_ERROR);
          }

          // Wait before polling again
          await sleep(2000);
          retryCount++;
        } catch (error) {
          if (!(error instanceof Error)) return;
          if (error.name === 'AbortError') {
            // Request was cancelled, just exit
            return;
          }
          setError(ErrorState.QUERY_ERROR);
          return;
        }
      }

      // If we get here, we've exceeded max retries
      setError(ErrorState.TIMEOUT_ERROR);
      return;
    } catch (e) {
      console.error('Polling error:', e);
      setError(ErrorState.QUERY_ERROR);
      setUploading(false); // Reset upload state
    }
  }

  return (
    <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md w-[464px] min-w-[390px] max-w-full">
      <div
        className={'flex w-full flex-col gap-2 rounded-lg border border-gray-300 p-4 text-center'}
      >
        <p className={'text-lg font-semibold text-gray-800'}>{file.name}</p>
        <p className={'text-sm text-gray-600'}>
          {Math.floor((100 * file.size) / (1024 * 1024)) / 10} MB
        </p>
      </div>
      <CompressionSelector isLoading={uploading} />
      <div className={'flex flex-row gap-3 w-full'}>
        <Button variant={'secondary'} disabled={uploading}>
          Cancel
        </Button>
        <Button
          variant={'primary'}
          isLoading={uploading}
          onClick={confirmClicked}
          disabled={uploading}
        >
          Convert
        </Button>
      </div>
    </div>
  );
};
