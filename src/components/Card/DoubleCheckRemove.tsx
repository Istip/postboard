import { ArrowRightIcon, TrashIcon } from "@radix-ui/react-icons";

interface Props {
  confirm: boolean;
  dangerButton: "bg-red-500" | "bg-red-600";
  handleDelete: () => Promise<void>;
  handleCancellation: () => void;
  handleDoubleCheck: () => void;
  doubleCheck: boolean;
}

export default function DoubleCheckRemove({
  confirm,
  dangerButton,
  handleDelete,
  handleCancellation,
  handleDoubleCheck,
  doubleCheck,
}: Props) {
  return (
    <>
      {!doubleCheck && (
        <>
          <button
            className={`${dangerButton} px-2 py-2 rounded-lg w-full flex items-center justify-center`}
            onClick={handleDelete}
          >
            <div className="sr-only">Remove</div>
            <TrashIcon />
          </button>
        </>
      )}
      <>
        {doubleCheck && (
          <>
            <div>
              {confirm ? (
                <div>
                  <div className="flex">
                    <button
                      className={`${dangerButton} px-2 py-2 rounded-l-lg`}
                      onClick={handleDelete}
                    >
                      <div className="sr-only">Remove</div>
                      <TrashIcon />
                    </button>
                    <button
                      className="px-2 py-2 bg-zinc-700 rounded-r-lg"
                      onClick={handleCancellation}
                    >
                      <div className="sr-only">Cancel remove</div>
                      <ArrowRightIcon />
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <button
                    className={`${dangerButton} px-2 py-2 rounded-lg`}
                    onClick={handleDoubleCheck}
                  >
                    <div className="sr-only">Remove</div>
                    <TrashIcon />
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </>
    </>
  );
}
