export default function renderIdLink(data, variables, chainId) {
  const div = document.createElement('div');
  div.classList.add('text-truncate');
  const link = document.createElement('a');
  link.textContent = data.id;
  if (!data) {
    link.textContent = '—';
  }
  link.href = `${process.env.EXPLORER_URL}/${WidgetConfig.getNetwork(chainId)}/token/${data.address}/id/${data.id}`;
  div.appendChild(link);

  return div;
}
