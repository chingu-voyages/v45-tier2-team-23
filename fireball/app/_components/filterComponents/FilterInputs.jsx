export default function FilterInputs(props) {
  const { nameSearch, recSearch, setNameSearch, setRecSearch } = props;

  // On change handler for text input for Name field
  function handleNameInput(e) {
    const newName = e.target.value;
    setNameSearch(newName);
  }

  // On change handlerfor text input for RecClass field
  function handleRecInput(e) {
    const newRec = e.target.value;
    setRecSearch(newRec);
  }

  return (
    <>
      {/* Filter By Typing Input Fields */}
      <div className="InputSearches">
        <div className="flex flex-col w-60 lg:w-40">
          <input
            className="border border-2 shadow-sm focus:border-btnHover focus:outline-none focus:ring-0 border-lightAccent rounded lg:ml-2 px-2 py-1 placeholder-lightAccent"
            type="text"
            placeholder="Filter Name"
            onChange={handleNameInput}
            value={nameSearch}
          />
          <input
            className="border border-2 shadow-sm focus:border-btnHover focus:outline-none focus:ring-0 border-lightAccent rounded lg:ml-2 px-2 py-1 my-1.5 placeholder-lightAccent"
            type="text"
            placeholder="Filter Composition"
            onChange={handleRecInput}
            value={recSearch}
          />
        </div>
      </div>
    </>
  );
}
