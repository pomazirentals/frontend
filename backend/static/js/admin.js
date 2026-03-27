/* GuestGuard Admin Dashboard — admin.js */

async function loadPanel(el, panelName) {
  const name = panelName || el.getAttribute('data-panel');

  document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
  const navEl = el || document.querySelector(`[data-panel="${name}"]`);
  if (navEl) navEl.classList.add('active');

  const titles = {
    overview:     'Platform Overview',
    users:        'User Management',
    guest_db:     'Guest Database',
    moderation:   'Report Moderation',
    search_system:'Search System',
    billing:      'Billing & Subscriptions',
    verification: 'Verification System',
    system_admin: 'System Administration',
    tenant_mgmt:  'Tenant Management',
    performance:  'Site Performance',
    ai_assistant: 'AI Assistant',
  };
  document.getElementById('panel-title').textContent = titles[name] || name;

  document.getElementById('loading-spinner').style.display = 'flex';
  document.getElementById('panel-content').style.opacity = '0.4';

  try {
    const res = await fetch(`/admin/panel/${name}`);
    const html = await res.text();
    document.getElementById('panel-content').innerHTML = html;
    document.getElementById('panel-content').style.opacity = '1';
  } catch (e) {
    document.getElementById('panel-content').innerHTML =
      '<p style="color:#ef4444;padding:28px">Failed to load panel. Please try again.</p>';
  } finally {
    document.getElementById('loading-spinner').style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  loadPanel(null, 'overview');

  document.querySelectorAll('[data-panel]').forEach(el => {
    el.addEventListener('click', e => {
      e.preventDefault();
      loadPanel(el);
    });
  });

  function updateClock() {
    const el = document.getElementById('admin-clock');
    if (el) el.textContent = new Date().toLocaleString();
  }
  updateClock();
  setInterval(updateClock, 1000);
});

/* ---------------------------------------------------------------
   Generic admin action helper
   body = plain object { key: value, ... }
--------------------------------------------------------------- */
async function adminAction(url, body, successMsg) {
  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams(body),
    });
    const data = await res.json();
    if (data.success) {
      showToast(successMsg || data.message || 'Done', 'success');
      const active = document.querySelector('.nav-item.active');
      if (active) loadPanel(active);
    } else {
      showToast(data.message || 'Action failed', 'error');
    }
  } catch (e) {
    showToast('Request failed', 'error');
  }
}

/* ---------------------------------------------------------------
   Toast notifications
--------------------------------------------------------------- */
function showToast(msg, type = 'success') {
  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;
  document.body.appendChild(toast);
  setTimeout(() => toast.remove(), 3200);
}

/* ---------------------------------------------------------------
   User management helpers (called from users.html partial)
--------------------------------------------------------------- */
function verifyUser(userId) {
  adminAction('/admin/panel/users/action', { action: 'verify', user_id: userId }, 'User verified');
}

function makeAdmin(userId) {
  if (!confirm('Grant admin access to this user?')) return;
  adminAction('/admin/panel/users/action', { action: 'make_admin', user_id: userId }, 'Admin access granted');
}

function removeAdmin(userId) {
  if (!confirm('Remove admin access?')) return;
  adminAction('/admin/panel/users/action', { action: 'remove_admin', user_id: userId }, 'Admin access removed');
}

function banUser(userId) {
  if (!confirm('Ban this user? They will lose access.')) return;
  adminAction('/admin/panel/users/action', { action: 'ban', user_id: userId }, 'User banned');
}

function unbanUser(userId) {
  adminAction('/admin/panel/users/action', { action: 'unban', user_id: userId }, 'User unbanned');
}

/* ---------------------------------------------------------------
   Moderation helpers (called from moderation.html partial)
--------------------------------------------------------------- */
function approveReport(reportId) {
  adminAction('/admin/panel/moderation/action', { action: 'approve', report_id: reportId }, 'Report approved');
}

function rejectReport(reportId) {
  adminAction('/admin/panel/moderation/action', { action: 'reject', report_id: reportId }, 'Report rejected');
}

/* ---------------------------------------------------------------
   Tenant management helpers (called from tenant_mgmt.html)
--------------------------------------------------------------- */
function editTenant(t) {
  document.getElementById('tenant-id').value    = t.id;
  document.getElementById('tenant-domain').value = t.domain;
  document.getElementById('tenant-brand').value  = t.brand_name;
  document.getElementById('tenant-logo').value   = t.logo_url || '';
  document.getElementById('tenant-color').value  = t.primary_color || '#3b82f6';
  document.getElementById('tenant-active').checked = !!t.active;
  document.getElementById('tenant-form-title').textContent = 'Edit Tenant';
  document.getElementById('tenant-form-card').scrollIntoView({ behavior: 'smooth' });
}

function deactivateTenant(tenantId) {
  if (!confirm('Deactivate this tenant? It will be hidden from the system.')) return;
  adminAction('/admin/panel/tenant_mgmt/delete', { tenant_id: tenantId }, 'Tenant deactivated');
}

function resetTenantForm() {
  document.getElementById('tenant-id').value     = '';
  document.getElementById('tenant-domain').value  = '';
  document.getElementById('tenant-brand').value   = '';
  document.getElementById('tenant-logo').value    = '';
  document.getElementById('tenant-color').value   = '#3b82f6';
  document.getElementById('tenant-active').checked = true;
  document.getElementById('tenant-form-title').textContent = 'Add New Tenant';
}

async function submitTenantForm(e) {
  e.preventDefault();
  const form = e.target;
  const body = new URLSearchParams(new FormData(form));
  try {
    const res = await fetch('/admin/panel/tenant_mgmt/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    });
    const data = await res.json();
    if (data.success) {
      showToast('Tenant saved successfully', 'success');
      resetTenantForm();
      loadPanel(null, 'tenant_mgmt');
    } else {
      showToast('Failed to save tenant', 'error');
    }
  } catch (e) {
    showToast('Request failed', 'error');
  }
}

/* ---------------------------------------------------------------
   System admin toggle (called from system_admin.html)
--------------------------------------------------------------- */
async function toggleFeature(name, checkbox) {
  const val = checkbox.checked ? '1' : '0';
  try {
    const res = await fetch('/admin/panel/system_admin/toggle', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ setting_name: name, value: val }),
    });
    const data = await res.json();
    if (data.success) {
      showToast(`${name} set to ${val === '1' ? 'ON' : 'OFF'}`, 'success');
    } else {
      checkbox.checked = !checkbox.checked; // revert
    }
  } catch (e) {
    showToast('Toggle failed', 'error');
    checkbox.checked = !checkbox.checked;
  }
}

/* ---------------------------------------------------------------
   AI Assistant (called from ai_assistant.html)
--------------------------------------------------------------- */
async function sendAiMessage() {
  const input = document.getElementById('ai-input');
  const msg = input.value.trim();
  if (!msg) return;

  input.value = '';
  appendChatMsg('user', msg);

  const history = document.getElementById('chat-history');
  const typing = document.createElement('div');
  typing.className = 'chat-msg ai';
  typing.id = 'ai-typing-indicator';
  typing.innerHTML = `
    <div class="chat-avatar ai-av">AI</div>
    <div class="chat-bubble">
      <div class="ai-typing"><span></span><span></span><span></span></div>
    </div>`;
  history.appendChild(typing);
  history.scrollTop = history.scrollHeight;

  try {
    const res = await fetch('/admin/ai-assistant', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({ message: msg }),
    });
    const data = await res.json();
    document.getElementById('ai-typing-indicator')?.remove();
    appendChatMsg('ai', data.reply || 'No response received.');
  } catch (e) {
    document.getElementById('ai-typing-indicator')?.remove();
    appendChatMsg('ai', 'Error: Could not reach AI service. Please try again.');
  }
}

function appendChatMsg(role, text) {
  const history = document.getElementById('chat-history');
  const div = document.createElement('div');
  div.className = `chat-msg ${role}`;
  const avatarHtml = role === 'user'
    ? `<div class="chat-avatar user-av">A</div>`
    : `<div class="chat-avatar ai-av">AI</div>`;
  div.innerHTML = `${avatarHtml}<div class="chat-bubble">${escapeHtml(text)}</div>`;
  if (role === 'user') {
    // swap order so avatar is on right
    div.style.flexDirection = 'row-reverse';
  }
  history.appendChild(div);
  history.scrollTop = history.scrollHeight;
}

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/\n/g, '<br>');
}

function aiInputKeydown(e) {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault();
    sendAiMessage();
  }
}
