function ListGroup() {
  const cities = ["Yellow", "Green", "Blue", "Red", "Black"];

  return (
    <>
      <h1>List</h1>
      <ul className="list-group">
        {cities.map((item) => (
          <li key={item} className="list-group-item">
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}
export default ListGroup;
