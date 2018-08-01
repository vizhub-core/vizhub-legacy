const onChange = onFileChosen => event => {
  const file = event.target.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    onFileChosen({
      name: file.name,
      text: reader.result
    });
  };
  reader.readAsText(file);
};

export const FileUploader = ({ onFileChosen }) => (
  <div className='file is-boxed is-centered'>
    <label className='file-label'>
      <input
        onChange={onChange(onFileChosen)}
        className='file-input test-dataset-upload-file-input'
        type='file'
      />
      <span className='file-cta'>
        <span className='file-label'>
          Choose a CSV file…
        </span>
      </span>
    </label>
  </div>
);
