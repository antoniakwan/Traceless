import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { useRef } from 'react';

const FileUpload: React.FC = () => {
  const [fileName, setFileName] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log("HERE")
    const file = event.target.files?.[0];
    if (file) {
      setFileName(file.name);
      // You can process the file here (e.g., read the contents, upload it to a server, etc.)
      console.log(file.name);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      Upload file here.
      {fileName && <p>Selected file: {fileName}</p>}
    </div>
  );
};

export default FileUpload;

const DownloadButton: React.FC = () => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    const text = "Hello World";
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);

    if (linkRef.current) {
      linkRef.current.href = url;
      linkRef.current.download = 'hello_world.txt';
      linkRef.current.click();
    }
  };

  return (
    <>
      <a ref={linkRef} style={{ display: 'none' }}></a>
      <button onClick={handleDownload}>
        Download Hello World
      </button>
    </>
  );
};

export const Demo: React.FC = () => {
  const [data, setData] = useState<{ message: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log('Making API request...');
    axios.get<{ message: string }>('http://127.0.0.1:5000/')
      .then(response => {
        console.log('Received response:', response.data);
        setData(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  console.log("RENDERING")
  return (
    <div>
      <DownloadButton />
      <FileUpload/>
      <h1>Server Response DATA</h1>
      {loading ? "Loading..." : data?.message}
    </div>
  );
};
