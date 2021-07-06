const IMAGE_PATH_PREFIX =
  'https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public';

function ImageViewer({ $app, initialState, onClose }) {
  this.state = initialState;
  this.$target = document.createElement('div');
  this.$target.className = 'Modal ImageViewer';
  $app.appendChild(this.$target);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      this.onClose();
    }
  });
  this.$target.addEventListener('click', (e) => {
    if (e.target.classList.contains('Modal')) {
      this.onClose();
    }
  });

  this.setState = (nextState) => {
    this.state = nextState;
    this.render();
  };

  this.onClose = onClose;

  this.render = () => {
    this.$target.innerHTML = `
            <div class="content">
                ${
                  this.state
                    ? `<img src="${IMAGE_PATH_PREFIX}${this.state}">`
                    : ''
                }
            </div>
        `;

    this.$target.style.display = this.state ? 'block' : 'none';
  };

  this.render();
}

export default ImageViewer;
