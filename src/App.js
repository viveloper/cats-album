import Nodes from './components/Nodes.js';
import Breadcrumb from './components/Breadcrumb.js';
import ImageViewer from './components/ImageViewer.js';
import { request } from './api.js';

class App {
  constructor({ $container }) {
    this.state = {
      isRoot: false,
      nodes: [],
      depth: [],
      selectedFilePath: null,
    };

    this.breadcrumb = new Breadcrumb({
      $container,
      initialState: this.state.depth,
    });

    this.nodes = new Nodes({
      $container,
      initialState: {
        isRoot: this.state.isRoot,
        nodes: this.state.nodes,
      },
      onClick: this.onNodeClick,
      onBack: this.onBackClick,
    });

    this.imageViewer = new ImageViewer({
      $container,
      initialState: this.state.selectedFilePath,
      onClose: () => {
        this.setState({
          ...this.state,
          selectedFilePath: null,
        });
      },
    });

    this.init();
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  async init() {
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
  }

  onNodeClick = async (node) => {
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
  };

  onBackClick = async () => {
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
  };

  render() {
    this.breadcrumb.setState(this.state.depth);
    this.nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    });
    this.imageViewer.setState(this.state.selectedFilePath);
  }
}

export default App;
