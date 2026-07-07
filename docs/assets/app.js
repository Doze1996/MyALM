const SITE_VERSION = 'v0.1.2';

function getSiteBasePath() {
  const pathname = window.location.pathname;
  const modulesIndex = pathname.indexOf('/modules/');

  if (modulesIndex >= 0) {
    return pathname.slice(0, modulesIndex + 1);
  }

  return pathname.replace(/[^/]*$/, '');
}

function getItemPath(item) {
  return item.href.replace(/^\.\//, '');
}

function getItemUrl(item) {
  return getSiteBasePath() + getItemPath(item);
}

function isCurrentItem(item) {
  const basePath = getSiteBasePath();
  const itemPath = getItemPath(item);
  const currentPath = window.location.pathname;

  if (itemPath === 'index.html') {
    return currentPath === basePath || currentPath === basePath + itemPath;
  }

  return currentPath === basePath + itemPath;
}

function setupBrandVersion() {
  document.querySelectorAll('.brand').forEach((brand) => {
    if (brand.querySelector('.brand-version')) return;

    const version = document.createElement('span');
    version.className = 'brand-version';
    version.textContent = SITE_VERSION;
    version.style.marginLeft = '8px';
    version.style.color = 'var(--muted)';
    version.style.fontSize = '12px';
    version.style.fontWeight = '400';
    version.style.verticalAlign = 'middle';
    brand.appendChild(version);
  });
}

function setupSidebarToggle(sidebar) {
  const aside = sidebar.closest('.sidebar');
  if (!aside || aside.querySelector('.sidebar-toggle')) return;

  const button = document.createElement('button');
  button.type = 'button';
  button.className = 'sidebar-toggle';
  button.setAttribute('aria-expanded', 'false');
  button.textContent = '目录';

  button.addEventListener('click', () => {
    const isOpen = aside.classList.toggle('open');
    button.setAttribute('aria-expanded', String(isOpen));
  });

  const brand = aside.querySelector('.brand');
  if (brand) {
    brand.insertAdjacentElement('afterend', button);
  } else {
    aside.insertBefore(button, aside.firstChild);
  }
}

function renderSidebar() {
  const sidebar = document.querySelector('[data-sidebar]');
  if (!sidebar || !window.SIDEBAR_ITEMS) return;

  setupBrandVersion();
  setupSidebarToggle(sidebar);

  const groups = new Map();

  window.SIDEBAR_ITEMS.forEach((item) => {
    if (!groups.has(item.group)) groups.set(item.group, []);
    groups.get(item.group).push(item);
  });

  sidebar.innerHTML = '';

  groups.forEach((items, groupName) => {
    const group = document.createElement('section');
    group.className = 'sidebar-group';

    const title = document.createElement('h2');
    title.textContent = groupName;
    group.appendChild(title);

    const list = document.createElement('ul');
    items.forEach((item) => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = getItemUrl(item);
      a.textContent = item.title;
      if (isCurrentItem(item)) {
        a.className = 'active';
      }
      a.addEventListener('click', () => {
        const aside = sidebar.closest('.sidebar');
        const button = aside && aside.querySelector('.sidebar-toggle');
        if (aside) aside.classList.remove('open');
        if (button) button.setAttribute('aria-expanded', 'false');
      });
      li.appendChild(a);
      list.appendChild(li);
    });

    group.appendChild(list);
    sidebar.appendChild(group);
  });
}

document.addEventListener('DOMContentLoaded', renderSidebar);