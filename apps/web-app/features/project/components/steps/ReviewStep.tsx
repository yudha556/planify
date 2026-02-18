interface Props {
  setStep: (step: number) => void
}

export function ReviewStep({ setStep }: Props) {
  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">Review</h2>

      <div className="border p-4 rounded">
        <p>Semua data project akan ditampilkan di sini.</p>
      </div>

      <div className="flex gap-4">
        <button
          onClick={() => setStep(3)}
          className="px-4 py-2 border rounded"
        >
          Back
        </button>

        <button className="px-4 py-2 bg-black text-white rounded">
          Generate Document
        </button>
      </div>
    </div>
  )
}
