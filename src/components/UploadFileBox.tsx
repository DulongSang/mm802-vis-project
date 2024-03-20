import { useState } from 'react';
import { Button, Grid } from '@mui/material';
import { UploadFile as UploadFileIcon } from '@mui/icons-material';

import { parseDataFile } from '../utils/parseDataFile';
import { FireResponseDataRow } from '../types/DataSetInfo';

export function UploadFileBox(props: UploadFileBoxProps) {
  const { setData, setFilteredData } = props;

  const [filename, setFilename] = useState<string>('');
  const [hasFile, setHasFile] = useState<boolean>(false);
  const [fileSize, setFileSize] = useState<string>(''); // file size in MB
  const [numRows, setNumRows] = useState<number>(0);

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
    const file = event.target.files[0];
    const data = await parseDataFile(file);
    setData(data);
    setFilteredData(data);

    setFilename(file.name.length < 25 ? file.name : file.name.slice(0, 22) + '...');
    setFileSize((file.size / (1024 * 1024)).toFixed(2));
    setNumRows(data.length);
    setHasFile(true);
  };

  const borderColor = hasFile ? 'green' : 'red';

  return (
    <div style={{ border: `3px solid ${borderColor}`, borderRadius: '10px', padding: '10px', backgroundColor: 'white' }}>
      <Grid container spacing={1} alignItems='center' style={{ fontSize: '1.2em' }}>
        <Grid item xs={6}>
          {hasFile ? `File size: ${fileSize} MB`: ''}
        </Grid>
        <Grid item xs={6}>
          {hasFile ? `# of Rows: ${numRows}`: ''}
        </Grid>
        <Grid item xs={6}>
          {hasFile ? filename: 'Please upload a file first'}
        </Grid>
        <Grid item xs={6}>
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
        </Grid>
      </Grid>
    </div>
  );
}

export type UploadFileBoxProps = {
  setData: React.Dispatch<React.SetStateAction<FireResponseDataRow[]>>,
  setFilteredData: React.Dispatch<React.SetStateAction<FireResponseDataRow[]>>,
};
