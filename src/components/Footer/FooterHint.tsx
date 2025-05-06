const FooterHint: React.FC<{
  isShopping: boolean;
  text: string;
  filteredHints: any[];
}> = ({ isShopping, text, filteredHints }) => {
  return (
    <>
      {isShopping && text.length && filteredHints.length ? (
        <div className="bg-stone-800 border no-scrollbar border-stone-700 fixed w-auto overflow-x-scroll left-2 right-2 rounded-xl p-2 bottom-[150px] flex items-center gap-2">
          {filteredHints.length > 1 && (
            <div className="rounded-lg text-xs font-extrabold py-2 animate-pulse px-4 bg-green-600 text-stone-50">
              {filteredHints.length}
            </div>
          )}

          {filteredHints.map((hint) => (
            <div
              key={hint.id}
              className="rounded-lg text-xs font-light bg-stone-700 py-2 px-4 whitespace-nowrap"
            >
              {hint.text.toLowerCase()}
            </div>
          ))}
        </div>
      ) : null}
    </>
  );
};
export default FooterHint;
