// busca los titulos de los productos y les aplica mayusculas llamando al backend
document.addEventListener('DOMContentLoaded', async () => {
  const productTitles = document.querySelectorAll('.product-title');
  
  for (const title of productTitles) {
    const textoOriginal = title.textContent;
    try {
      // le pide al servidor que lo pase a mayusculas
      const response = await fetch(`/api/uppercase?texto=${encodeURIComponent(textoOriginal)}`);
      if (response.ok) {
        const data = await response.json();
        title.textContent = data.resultado;
      }
    } catch (error) {
      console.log('fallo el pedido de mayusculas:', error);
    }
  }
});
