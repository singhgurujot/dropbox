import Image from "./image.component";

const ShowImage = ({ images, handleDelete }) => {
  const show = (image) => {
    return (
      <Image
        key={image._id}
        id={image._id}
        handleDelete={handleDelete}
        image={`http://localhost:4000/images/Files/${image.fileName}`}
      />
    );
  };

  const renderFiles = () => {
    if (images.length > 0) return images.map(show);
    return <></>;
  };
  return <div className="container">{renderFiles()}</div>;
};
export default ShowImage;
