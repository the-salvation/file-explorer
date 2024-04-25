import { Component } from "react";
import TreeNode from "../TreeNode/TreeNode";
import closedFolder from "../../assets/icons/closed_folder.svg";
import openedFolder from "../../assets/icons/opened_folder.svg";

class Folder extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFolderOpen: this.props.expandedFolders.some(folderPath => folderPath.includes(this.props.fullPathName)),
    };
    
    this.handleToggle = this.handleToggle.bind(this);
  }

  handleToggle() {
    this.setState(prevState => ({ isFolderOpen: !prevState.isFolderOpen }));
  }

  componentDidUpdate(prevProps) {
    if (prevProps.expandedFolders !== this.props.expandedFolders) {
      this.setState({ isFolderOpen: this.props.expandedFolders.some(folderPath => folderPath.includes(this.props.fullPathName)) });
    }
  }

  render() {
    const { folderName, folderContent, fullPathName } = this.props;
    const { isFolderOpen } = this.state;
    const openClosedSign = isFolderOpen ? openedFolder : closedFolder; 

    return (
      <>
        <div className="folderWrapper">
          <div className="nodeItemWrapper" onClick={this.handleToggle}>
            <img className="treeNodeIcon" src={openClosedSign} />
            <span className="treeNodeName">{folderName}</span>
          </div>
          {isFolderOpen ? (
            <div className="folderContent">
              {folderContent.map((child, index) => (
                <TreeNode
                  key={index + child.name}
                  data={child}
                  expandedFolders={this.props.expandedFolders}
                  fullPathName={fullPathName}
                />
              ))}
            </div>
          ) : null}
        </div>
      </>
    );
  }
}

export default Folder;