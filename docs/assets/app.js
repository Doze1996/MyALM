function normalizePath(path) {
  return path.replace(/\\/g, '/').replace(/.*\/docs\//, './');
}

function renderSidebar() {
  const sidebar = document.querySelector('[data-sidebar]');
  if (!sidebar || !window.SIDEBAR_ITEMS) return;

  const current = normalizePath(window.location.pathname);
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
      a.href = item.href;
      a.textContent = item.title;
      if (current.endsWith(item.href.replace('./', ''))) {
        a.className = 'active';
      }
      li.appendChild(a);
      list.appendChild(li);
    });

    group.appendChild(list);
    sidebar.appendChild(group);
  });
}

document.addEventListener('DOMContentLoaded', renderSidebar);
