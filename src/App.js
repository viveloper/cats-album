import Nodes from './Nodes.js';
import Breadcrumb from './Breadcrumb.js';
import ImageViewer from './ImageViewer.js';
import { request } from './api.js';

function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
    selectedFilePath: null,
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
  });

  const nodes = new Nodes({
    $app,
    initialState: {
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    },
    onClick: async (node) => {
      try {
        if (node.type === 'DIRECTORY') {
          // DIRECTORY
          const nextNodes = await request(node.id);
          this.setState({
            ...this.state,
            isRoot: false,
            depth: [...this.state.depth, node],
            nodes: nextNodes,
          });
        } else {
          // FILE
          this.setState({
            ...this.state,
            selectedFilePath: node.filePath,
          });
        }
      } catch (e) {
        // error
        console.log(e.name + ': ' + e.message);
      }
    },
    onBack: async () => {
      try {
        const nextState = { ...this.state };
        nextState.depth.pop();

        const prevNodeId = nextState.depth.length
          ? nextState.depth[nextState.depth.length - 1].id
          : null;

        if (prevNodeId === null) {
          // root
          const rootNodes = await request();
          this.setState({
            ...nextState,
            isRoot: true,
            nodes: rootNodes,
          });
        } else {
          const prevNodes = await request(prevNodeId);
          this.setState({
            ...nextState,
            isRoot: false,
            nodes: prevNodes,
          });
        }
      } catch (e) {
        // error
        console.log(e.name + ': ' + e.message);
      }
    },
  });

  const imageViewer = new ImageViewer({
    $app,
    initialState: this.state.selectedFilePath,
    onClose: () => {
      this.setState({
        ...this.state,
        selectedFilePath: null,
      });
    },
  });

  this.setState = (nextState) => {
    this.state = nextState;
    breadcrumb.setState(this.state.depth);
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    imageViewer.setState(this.state.selectedFilePath);
  };

  const init = async () => {
    try {
      const rootNodes = await request();
      this.setState({
        ...this.state,
        isRoot: true,
        nodes: rootNodes,
      });
    } catch (e) {
      // error
      console.log(e.name + ': ' + e.message);
    }
  };

  init();
}

export default App;
