import { useState } from 'react';
import { Button } from '@mui/material';
import { UploadFile as UploadFileIcon } from '@mui/icons-material';

import { parseDataFile } from '../utils/parseDataFile';
import { FireResponseDataRow } from '../types/DataSetInfo';

export function UploadFileBox(props: UploadFileBoxProps) {
  const { dataRef } = props;

  const [filename, setFilename] = useState<string>('Please Upload File First!');

  const handleFileUploadButtonClick = () => {
    const fileInput = document.getElementById('csv-file-upload');
    if (fileInput) {
      fileInput.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }
    dataRef.current = await parseDataFile(event.target.files[0]);
    setFilename(event.target.files[0].name);
  };

  return (
    <div style={{ border: '2px solid green', borderRadius: '10px', marginTop: '10px', padding: '10px' }}>
      {filename}
      &nbsp;&nbsp;
      <Button
        variant="contained"
        startIcon={<UploadFileIcon />}
        onClick={handleFileUploadButtonClick}
        style={{ position: 'relative' }}
      >
        Upload File
        <input
          id="csv-file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: 'none' }}
        />
      </Button>
    </div>
  );
}

export type UploadFileBoxProps = {
  dataRef: React.MutableRefObject<FireResponseDataRow[]>,
};
