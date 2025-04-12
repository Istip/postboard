const CommentLoading = () => {
  return (
    <div className="flex gap-4 animate-pulse mt-2 mb-4">
      <div className="bg-zinc-700 w-4 h-3 rounded-full" />

      <div className="flex gap-4 justify-between w-full font-light">
        <div className="flex w-full flex-col gap-2">
          <div className="bg-zinc-700 rounded-md w-full h-3" />
          <div className="flex w-full gap-2">
            <div className="bg-zinc-700 rounded-md w-1/3 h-3" />
            <div className="bg-zinc-700 rounded-md w-2/3 h-3" />
          </div>
          <div className="bg-zinc-700 rounded-md w-full h-3" />
        </div>

        <div className="bg-zinc-700 rounded-md w-16 h-3" />
      </div>
    </div>
  );
};
export default CommentLoading;
