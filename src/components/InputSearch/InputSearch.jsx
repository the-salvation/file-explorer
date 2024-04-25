import { Component } from "react";
import { arrayOf, object, func } from "prop-types";
import { DATA_TYPES } from "../../utils/constants/constants";
import { debounce, getPathSegments } from "../../utils/helpers/helpers";
import magnifyingGlass from '../../assets/icons/magnifying_glass.svg';

class InputSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchTerm: ''
    };

    this.debouncedSearch = debounce(this.handleSearch, 400);
  }

  searchFiles = (fileStructure, searchTerm) => {
    if (!searchTerm) return { newStructure: [], uniquePaths: [] };

    const foundFolders = new Set();
    const foundFiles = [];

    const searchHelper = (node, path = '') => {
      const lowerCaseName = node.name.toLowerCase();
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      const isSearchTermInFileName = node.type === DATA_TYPES.FILE && lowerCaseName.includes(lowerCaseSearchTerm);

      if (isSearchTermInFileName) {
        foundFiles.push({ name: node.name, mime: node.mime, type: DATA_TYPES.FILE, path });
        const pathSegments = getPathSegments(path);

        pathSegments.reduce((currentPath, segment) => {
          currentPath += `/${segment}`;
          foundFolders.add(currentPath);

          return currentPath;
        }, '');
      } else if (node.type === DATA_TYPES.FOLDER) {
        const newPath = path ? `${path}/${node.name}` : node.name;

        node.children.forEach(child => searchHelper(child, newPath));
      }
    };

    fileStructure.forEach(root => searchHelper(root, ''));

    const newStructure = [];

    const createFolder = (pathSegments) => {
      let currentFolder = newStructure;

      for (const segment of pathSegments) {
        const existingFolder = currentFolder.find(folder => folder.name === segment);

        if (existingFolder) {
          currentFolder = existingFolder.children;
        } else {
          const newFolder = { name: segment, type: DATA_TYPES.FOLDER, children: [] };

          currentFolder.push(newFolder);
          currentFolder = newFolder.children;
        }
      }
    };

    foundFolders.forEach(folder => {
      const pathSegments = getPathSegments(folder);
      createFolder(pathSegments);
    });

    foundFiles.forEach(({ name, mime, type, path }) => {
      const pathSegments = getPathSegments(path);

      createFolder(pathSegments);

      const leafFolder = pathSegments.reduce((currentFolder, segment) => {
        return currentFolder.find(folder => folder.name === segment).children;
      }, newStructure);
      leafFolder.push({ name, mime, type });
    });

    return { newStructure, uniquePaths: [...foundFolders] };
  };

  handleSearch = () => {
    const results = this.searchFiles(this.props.fileStructure, this.state.searchTerm);

    this.props.onSearchResults(results);
  };

  handleInputChange = (e) => {
    const searchTerm = e.target.value;
    this.setState({ searchTerm });
    this.debouncedSearch();
  };

  render() {
    return (
      <div className="inputSearchWrapper">
        <input
          type="text"
          placeholder="Search for a file..."
          value={this.state.searchTerm}
          onChange={this.handleInputChange}
        />
        <span className="searchIcon">
          <img src={magnifyingGlass} alt="magnifying glass" />
        </span>
      </div>
    );
  }
}

InputSearch.PropTypes = {
  fileStructure: arrayOf(object),
  onSearchResults: func,
};

export default InputSearch;
