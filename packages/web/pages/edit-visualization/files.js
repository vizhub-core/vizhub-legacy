import classNames from 'classnames';
import { hasName } from '../../utils/files';

export const Files = ({ files, activeFileName, onFileClick }) => {
  const isActive = hasName(activeFileName);
  return (
    <React.Fragment>
      {
        files.map(file => (
          <div
            key={file.name}
            className={classNames('file', { active: isActive(file) })}
            onClick={() => onFileClick(file.name)}
          >
            { file.name }
          </div>
        ))
      }
    </React.Fragment>
  );
};
