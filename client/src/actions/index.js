const uploadFile = (apiData) => {
  return new Promise(async (resolve, reject) => {
    try {
      const { data } = fetch("http://localhost:4000/files", {
        method: "POST",
        "Content-Type": "multipart/form-data",
        body: apiData,
      });
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

const getFiles = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch("http://localhost:4000/files", {
        method: "GET",
        "Content-Type": "application/json",
      });
      const { result } = await res.json();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const deleteFile = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      const res = await fetch(`http://localhost:4000/fileDelete/${id}`, {
        method: "DELETE",
        "Content-Type": "application/json",
      });
      const { result } = await res.json();
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

export { uploadFile, getFiles, deleteFile };
