import ReceiptUploader from "@/components/ReceiptUploader";

export default function UploadPage() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-2xl font-bold mb-4'>Upload Receipt</h1>
      <ReceiptUploader />
    </div>
  );
}
