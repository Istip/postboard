const FooterHint: React.FC<{
  isShopping: boolean;
  text: string;
  filteredHints: any[];
}> = ({ isShopping, text, filteredHints }) => {
  return (
    <>
      {isShopping && text.length && filteredHints.length ? (
        <div className="bg-slate-800 border border-slate-700 fixed w-auto overflow-x-scroll left-2 right-2 rounded-2xl p-2 bottom-36 flex items-center gap-2">
          {filteredHints.length > 1 && (
            <div className="rounded-lg text-xs font-extrabold py-2 px-4 bg-green-600 text-slate-50">
              {filteredHints.length}
            </div>
          )}

          {filteredHints.map((hint) => (
            <div
              key={hint.id}
              className="rounded-lg text-xs font-light bg-slate-700 py-2 px-4 whitespace-nowrap"
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
