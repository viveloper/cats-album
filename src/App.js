import Nodes from './Nodes.js';
import Breadcrumb from './Breadcrumb.js';

function App($app) {
  this.state = {
    isRoot: false,
    nodes: [],
    depth: [],
  };

  const breadcrumb = new Breadcrumb({
    $app,
    initialState: this.state.depth,
  });

  const nodes = new Nodes({
    $app,
    initialState: { isRoot: this.state.isRoot, nodes: this.state.nodes },
    onClick: (node) => {
      if (node.type === 'DIRECTORY') {
        // DIRECTORY
      } else {
        // FILE
      }
    },
  });
}

export default App;
