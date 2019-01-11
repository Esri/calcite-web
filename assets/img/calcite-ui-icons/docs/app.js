(function () {
  var icons = {};
  var $icons = [];
  var filled = false;

  fetch('./icons.json')
    .then(function (response) {
      return response.json();
    })
    .then(function (payload) {
      icons = payload.icons;
      document.querySelector('.js-version').innerHTML = payload.version;
      document.querySelector('.js-filled').addEventListener("change", toggleFill);
      document.querySelector('.js-search').addEventListener("input", searchIcons);
      startup();
    });

  function startup () {
    document.querySelector('.js-loader').classList.add('hide');
    var $iconContainer = document.querySelector('.js-icons');

    var svgs = Object.keys(icons)
      .map(function (key) {
        return {name: key, icon: icons[key]}
      })
      .forEach(function (detail) {
        var paths = detail.icon.outline['32'];
        var $btn = document.createElement('button');
        $btn.classList = 'js-modal-toggle block padding-leader-2 padding-trailer-2 trailer-1 js-icon-select icon-select btn btn-transparent';
        $btn.setAttribute('data-icon', detail.name);
        $btn.setAttribute('data-modal', 'iconDetail');
        $btn.setAttribute('aria-label', 'View details of icon: ' + detail.name);
        $btn.appendChild(getSVG(paths, 32));
        var $name = document.createElement('span');
        $name.innerHTML = detail.name;
        $name.classList.add('icon-select--name');
        $btn.appendChild($name);
        $iconContainer.appendChild($btn);
        $btn.addEventListener("click", showDetail);
        $icons.push($btn);
      });
    calcite.init();
  }

  function toggleFill (e) {
    filled = e.target.checked;
    $icons.forEach(function ($btn) {
      var name = $btn.getAttribute('data-icon');
      var icon = icons[name];
      var paths = icon[filled ? 'filled' : 'outline']['32'];
      $btn.replaceChild(getSVG(paths, 32), $btn.firstElementChild);
    });
  }

  function searchIcons (e) {
    var term = e.target.value;
    $icons.forEach(function ($btn) {
      var name = $btn.getAttribute('data-icon');
      var icon = icons[name];
      var iconText = name + icon.alias.join('');
      var matches = iconText.toLowerCase().indexOf(e.target.value.toLowerCase()) > -1;
      if (matches) {
        $btn.classList.remove('hide');
      } else {
        $btn.classList.add('hide');
      }
    });
  }

  function showDetail (e) {
    var key = e.target.getAttribute('data-icon');
    var icon = icons[key];
    var paths = filled ? icon.filled : icon.outline;
    var baseURL = 'https://raw.githubusercontent.com/Esri/calcite-ui-icons/master/icons/' + key + '-';
    var suffix = filled ? '-f.svg' : '.svg';
    var tags = icon.alias.map(function (alias) {
      return '<span class="label inline-block margin-right-quarter trailer-quarter">' + alias + '</span>';
    }).join('');

    document.querySelector('.js-detail-name').innerHTML = key;
    document.querySelector('.js-detail-aliases').innerHTML = (tags && tags) || '---';
    document.querySelector('.js-detail-category').innerHTML = (icon.category && icon.category) || '---';
    document.querySelector('.js-detail-release').innerHTML = (icon.release && icon.release) || '---';

    [16, 24, 32].forEach(function (size) {
      document.querySelector('.js-link-' + size).href = baseURL + size + suffix;
      var iconDetail = document.querySelector('.js-detail-' + size);
      iconDetail.innerHTML = '';
      iconDetail.appendChild(getSVG(paths[size], size));
    });
  }

  function getSVG (paths, size) {
    var $svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    $svg.setAttribute('width', size);
    $svg.setAttribute('height', size);
    (paths || []).forEach(function (path) {
      var $path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      $path.setAttribute('d', path);
      $svg.appendChild($path);
    });
    return $svg;
  }
})();
