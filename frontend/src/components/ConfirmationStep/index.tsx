"use client"

import {FC, useState} from 'react';
import {Button} from "@/components/ConfirmationStep/Button";
import {CompressionSelector} from "@/components/ConfirmationStep/CompressionSelector";

type ConfirmationStepProps = {};

export const ConfirmationStep: FC<ConfirmationStepProps> = () => {
    const [uploading, setUploading] = useState(false)

    function confirmClicked() {
        setUploading(true)
    }

    return (
        <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
            <div className={"flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-4 text-center"}>
                <p className={"text-lg font-semibold text-gray-800"}>Digital Marketing requirements.pptx</p>
                <p className={"text-sm text-gray-600"}>3.88 MB</p>
            </div>
            <CompressionSelector isLoading={uploading}/>
            <div className={"flex flex-row gap-3 w-full"}>
                <Button variant={"secondary"} disabled={uploading}>Cancel</Button>
                <Button variant={"primary"} isLoading={uploading} onClick={confirmClicked} disabled={uploading}>Convert</Button>
            </div>
        </div>
    );
};
// <div className="flex flex-col gap-4 rounded-xl bg-white p-6 shadow-md">
//     <div className="flex w-full flex-col gap-1 rounded-lg border border-gray-300 p-4 text-center"><p
//         className="text-lg font-semibold text-gray-800">SUNUM_AI(1) (1).pptx</p><p
//         className="text-sm text-gray-600">1.72 MB</p></div>
//     <div className="flex w-full items-center gap-2 rounded-xl border border-gray-300 p-4">
//         <div className="size-7 animate-spin-pretty rounded-full border-4 border-solid border-t-blue-500"></div>
//         <p className="text-sm text-gray-700">Compressing your file...</p></div>
//     <div className="flex w-full gap-3">
//         <button type="button" title="Cancel"
//                 className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 font-semibold text-gray-700 shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
//                 disabled="">Cancel
//         </button>
//         <button type="button" id="compress-button" title="Compress this PowerPoint document."
//                 className="flex w-full items-center justify-center rounded-lg border border-blue-600 bg-blue-600 px-4 py-2.5 font-semibold text-white shadow-sm disabled:cursor-not-allowed disabled:opacity-30"
//                 disabled="">
//             <div className="animate-spin">
//                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
//                     <g clip-path="url(#clip0_1267_20)">
//                         <path
//                             d="M9.99996 1.66675V5.00008M9.99996 15.0001V18.3334M4.99996 10.0001H1.66663M18.3333 10.0001H15M15.8986 15.8988L13.5416 13.5417M15.8986 4.1667L13.5416 6.52372M4.10127 15.8988L6.45829 13.5417M4.10127 4.1667L6.45829 6.52372"
//                             stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"></path>
//                     </g>
//                     <defs>
//                         <clipPath id="clip0_1267_20">
//                             <rect width="20" height="20" fill="currentColor"></rect>
//                         </clipPath>
//                     </defs>
//                 </svg>
//             </div>
//         </button>
//     </div>
// </div>