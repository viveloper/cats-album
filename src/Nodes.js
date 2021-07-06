function Nodes({ $app, initialState, onClick, onBack }) {
  this.state = initialState;

  this.$target = document.createElement('div');
  this.$target.className = 'Nodes';
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
  $app.appendChild(this.$target);

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.onClick = onClick;
  this.onBack = onBack;

  this.render = () => {
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
  };
}

export default Nodes;
