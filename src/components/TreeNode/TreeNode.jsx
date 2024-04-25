import { Component } from "react";
import Folder from "../Folder/Folder";
import File from "../File/File";
import { object, array, string } from "prop-types";
import { DATA_TYPES } from "../../utils/constants/constants";
import { getUniquePaths } from "../../utils/helpers/helpers";

class TreeNode extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expandedFolders: getUniquePaths(props?.expandedFolders || []),
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expandedFolders !== this.props.expandedFolders) {
      this.setState({ expandedFolders: getUniquePaths(this.props?.expandedFolders || []) });
    }
  }

  render() {
    const { data, fullPathName } = this.props;

    if (data.type === DATA_TYPES.FOLDER) {
      let newFullPathName = fullPathName

      if (!fullPathName.includes(data.name)) { newFullPathName = fullPathName + `/${data.name}`; }

      return (
        <Folder
          fullPathName={newFullPathName}
          folderName={data.name}
          type={data.type}
          folderContent={data.children}
          expandedFolders={this.state.expandedFolders}
        />
      );
    } else if (data.type === DATA_TYPES.FILE) {
      return <File fileName={data.name} fileMime={data.mime} />; 
    } else {
      return null;
    }
  }
}

TreeNode.PropTypes = {
  data: object,
  expandedFolders: array,
  fullPathName: string,
};

export default TreeNode;