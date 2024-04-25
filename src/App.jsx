/* eslint-disable react/prop-types */
import { Component } from 'react';
import jsonData from './assets/data.json';
import TreeNode from './components/TreeNode/TreeNode';
import InputSearch from './components/InputSearch/InputSearch';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fileStructure: null,
      searchResults: [],
      uniquePaths: [],
      foldersToExpand: [],
    };
  }

  componentDidMount() {
    this.setState({ fileStructure: jsonData });
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.searchResults?.uniquePaths?.length !== this.state.searchResults?.uniquePaths?.length) {
      this.setState({ uniquePaths: this.state.searchResults?.uniquePaths });
    }
  }

  handleSearchResults = (results) => {
    this.setState({ searchResults: results });
  };

  render() {
    const { fileStructure, searchResults, uniquePaths } = this.state;

    const defaultExpandedFolders = [];
    const nodesToRender = searchResults?.newStructure?.length ? searchResults.newStructure : fileStructure;
    const foldersToExpand = uniquePaths?.length > 0 ? uniquePaths : defaultExpandedFolders;

    if (!fileStructure) {
      return <div className='appWrapper'>Loading...</div>;
    }

    return (
        <div className='appWrapper'>
          <div>
            {nodesToRender?.map((item, index) => (
              <TreeNode
                key={index + item.name}
                data={item}
                fullPathName={`/${item.name}`}
                expandedFolders={foldersToExpand}
              />
            ))}
          </div>
          <InputSearch
            fileStructure={fileStructure}
            onSearchResults={this.handleSearchResults}
          />
        </div>
    );
  }
}

export default App;
