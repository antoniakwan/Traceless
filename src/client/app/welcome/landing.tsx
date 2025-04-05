import React, { useState } from 'react';

// Define a proper interface for the styles
interface Styles {
  container: React.CSSProperties;
  card: React.CSSProperties;
  input: React.CSSProperties;
  buttons: React.CSSProperties;
  button: React.CSSProperties;
}

const FileUploadDownload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    setFile(selectedFile);
  };

  // Handle file download
  const handleDownload = (): void => {
    if (file) {
      const url = URL.createObjectURL(file);
      const a = document.createElement('a');
      a.href = url;
      a.download = file.name;
      a.click();
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>Upload and Download Files</h2>
        <input
          type="file"
          onChange={handleFileChange}
          style={styles.input}
        />
        <div style={styles.buttons}>
          <button onClick={handleDownload} style={styles.button} disabled={!file}>
            Download File
          </button>
          <button disabled={!file} style={styles.button}>
            Upload File
          </button>
        </div>
      </div>
    </div>
  );
};

const styles: Styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    margin: 0,
  },
  card: {
    textAlign: 'center',
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
  },
  input: {
    marginBottom: '20px',
    padding: '10px',
    width: '100%',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    margin: '5px',
  },
};

export default FileUploadDownload;
