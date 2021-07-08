class Nodes {
  constructor({ $container, initialState, onClick, onBack }) {
    this.state = initialState;

    this.$target = document.createElement('div');
    this.$target.className = 'Nodes';

    this.onClick = onClick;
    this.onBack = onBack;

    this.$target.addEventListener('click', (e) => {
      const node = e.target.closest('.Node');
      if (!node) {
        return;
      }
      const { nodeId } = node.dataset;
      if (!nodeId) {
        this.onBack();
        return;
      }
      const selectedNode = this.state.nodes.find((node) => node.id === nodeId);
      if (selectedNode) {
        this.onClick(selectedNode);
      }
    });
    $container.appendChild(this.$target);
  }

  setState(nextState) {
    this.state = nextState;
    this.render();
  }

  render() {
    if (this.state.nodes) {
      const nodesTemplate = this.state.nodes
        .map((node) => {
          const iconPath =
            node.type === 'FILE'
              ? './assets/file.png'
              : './assets/directory.png';
          return `
              <div class="Node" data-node-id="${node.id}">
                  <img src="${iconPath}" />
                  <div>${node.name}</div>
              </div>
          `;
        })
        .join('');

      this.$target.innerHTML = !this.state.isRoot
        ? `<div class="Node"><img src="./assets/prev.png" /></div>${nodesTemplate}`
        : nodesTemplate;
    }
  }
}

export default Nodes;
