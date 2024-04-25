import { Component } from "react";
import { string } from "prop-types";
import fileIcon from '../../assets/icons/file.svg';

class File extends Component {
  constructor(props) {
    super(props);
  }

  render() { 
    const { fileName, fileMime } = this.props;

    return (
      <div className="nodeItemWrapper file">
        <img className="treeNodeIcon" src={fileIcon} alt="file icon" />
        <span>{`${fileName} - (${fileMime})`}</span>
      </div>
    );
  }
}

File.PropTypes = {
  fileName: string,
  fileMime: string,
};

export default File;