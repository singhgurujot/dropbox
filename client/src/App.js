import React, { useCallback, useState, useEffect } from "react";

import ShowImage from "./components/show-image.component";
import DropBox from "./components/dropbox.component";

import { uploadFile, getFiles, deleteFile } from "./actions";

function App() {
  const [images, setImages] = useState([]);

  const fetchFiles = () => {
    getFiles()
      .then((res) => {
        setImages(res);
      })
      .catch(() => setImages([]));
  };

  useEffect(() => {
    fetchFiles();
  }, []);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles.length > 1) {
      alert("You can select only ONE!");
      return;
    }
    const formata = new FormData();
    formata.append("file", acceptedFiles[0]);
    uploadFile(formata).then(() => {
      setTimeout(() => {
        fetchFiles();
      }, 1000);
    });
    acceptedFiles.map((file, index) => {
      const reader = new FileReader();

      reader.onload = function (e) {
        setImages((prevState) => [
          ...prevState,
          { id: index, src: e.target.result },
        ]);
      };

      reader.readAsDataURL(file);
      return file;
    });
  }, []);

  const handleDelete = (id) => {
    deleteFile(id).then(() => {
      fetchFiles();
    });
  };

  return (
    <div className="App">
      <DropBox onDrop={onDrop} />
      <ShowImage images={images} handleDelete={handleDelete} />
    </div>
  );
}

export default App;
