function Journal() {
  const [numEntries, setNumEntries] = useState(0);

  useEffect(() => {}, [numEntries]);

  return (
    <div>
      <h2>Sleep Journal</h2>
      <p>What's on your mind today?</p>
      <textarea name="" id=""></textarea>
    </div>
  );
}

export default Journal;
