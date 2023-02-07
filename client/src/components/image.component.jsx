function Image({ id, image, handleDelete }) {
  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <img alt="" src={image} />
      <div className="delete-button" onClick={() => handleDelete(id)}>
        Delete
      </div>
    </div>
  );
}
export default Image;
