/* ============================================================
   The Big Bang Carranga · Tarjeta digital
   ============================================================ */
function openModal(id) { document.getElementById(id).classList.add('active'); }
function closeModal(id) { document.getElementById(id).classList.remove('active'); }
function cerrarTodos() { document.querySelectorAll('.modal-overlay.active').forEach(m => closeModal(m.id)); }
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') cerrarTodos(); });

document.addEventListener('DOMContentLoaded', () => {
  const qrBox = document.getElementById("qrcode");
  if (qrBox) {
    new QRCode(qrBox, { text: window.location.href, width: 130, height: 130, colorDark: "#047857", colorLight: "#ffffff" });
  }

  const toast = document.getElementById('toast');
  const showToast = (msg) => {
    toast.textContent = msg;
    toast.style.display = 'block';
    setTimeout(() => toast.style.display = 'none', 2200);
  };

  const copiarFallback = (texto) => {
    const ta = document.createElement('textarea');
    ta.value = texto; ta.style.position = 'fixed'; ta.style.left = '-9999px';
    document.body.appendChild(ta); ta.select();
    try { document.execCommand('copy'); showToast('Enlace copiado'); } catch (e) { showToast('Copia: ' + texto); }
    ta.remove();
  };
  const copiar = (texto) => {
    if (navigator.clipboard && window.isSecureContext) navigator.clipboard.writeText(texto).then(() => showToast('Enlace copiado'), () => copiarFallback(texto));
    else copiarFallback(texto);
  };

  const btnShare = document.getElementById('btn-share');
  if (btnShare) btnShare.addEventListener('click', async () => {
    const data = { title: 'The Big Bang Carranga', text: 'El show parrandero para tu evento. ¡Carranga en vivo!', url: window.location.href };
    try { if (navigator.share) await navigator.share(data); else copiar(window.location.href); } catch (e) {}
  });
  const btnCopiar = document.getElementById('btn-copiar');
  if (btnCopiar) btnCopiar.addEventListener('click', () => copiar(window.location.href));

  document.getElementById('btn-vcard').addEventListener('click', () => {
    const vCardData = `BEGIN:VCARD\nVERSION:3.0\nFN:The Big Bang Carranga\nORG:The Big Bang Carranga\nTEL;TYPE=CELL:+573105591651\nNOTE:Agrupación musical de Carranga Profesional para todo tipo de eventos.\nEND:VCARD`;
    const blob = new Blob([vCardData], { type: 'text/vcard;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'The_Big_Bang_Carranga.vcf';
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1200);
  });

  const anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('./service-worker.js').catch(() => {});
});
