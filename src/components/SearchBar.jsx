const SearchBar = ({ searchTerm, onSearch }) => {
  return (
    <input
      type="text"
      placeholder="Kya Khana Pasand Karoge"
      value={searchTerm}
      onChange={(e) => onSearch(e.target.value)}
    />
  );
};

export default SearchBar;
