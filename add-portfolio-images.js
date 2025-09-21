// Script para facilitar a adição de imagens no portfólio
// Execute este script no console do navegador para testar diferentes imagens

function updatePortfolioImage(index, imageUrl, altText) {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    if (portfolioItems[index]) {
        const img = portfolioItems[index].querySelector('img');
        if (img) {
            img.src = imageUrl;
            img.alt = altText;
            console.log(`Imagem ${index + 1} atualizada: ${altText}`);
        }
    }
}

// Exemplos de uso:
console.log('=== Script para Adicionar Imagens no Portfólio ===');
console.log('');
console.log('Para adicionar uma imagem, use:');
console.log('updatePortfolioImage(0, "URL_DA_IMAGEM", "Texto Alternativo");');
console.log('');
console.log('Exemplos:');
console.log('updatePortfolioImage(0, "images/coroas-digitais.jpg", "Coroas Digitais");');
console.log('updatePortfolioImage(1, "images/facetas-laminadas.jpg", "Facetas Laminadas");');
console.log('updatePortfolioImage(2, "images/enceramento-digital.jpg", "Enceramento Digital");');
console.log('');
console.log('Índices dos itens do portfólio:');
console.log('0 - Coroas Digitais');
console.log('1 - Facetas Laminadas');
console.log('2 - Enceramento Digital');
console.log('3 - Modelos 3D');
console.log('4 - Guias Cirúrgicos');
console.log('5 - Placas Odontológicas');

// Função para testar com imagens de exemplo do Unsplash
function loadExampleImages() {
    const exampleImages = [
        {
            url: 'https://images.unsplash.com/photo-1606811841689-23dfddceeee3?w=400&h=300&fit=crop',
            alt: 'Coroas Digitais - Exemplo'
        },
        {
            url: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?w=400&h=300&fit=crop',
            alt: 'Facetas Laminadas - Exemplo'
        },
        {
            url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=300&fit=crop',
            alt: 'Enceramento Digital - Exemplo'
        },
        {
            url: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=400&h=300&fit=crop',
            alt: 'Modelos 3D - Exemplo'
        },
        {
            url: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=400&h=300&fit=crop',
            alt: 'Guias Cirúrgicos - Exemplo'
        },
        {
            url: 'https://images.unsplash.com/photo-1606811841689-23dfddceeee3?w=400&h=300&fit=crop',
            alt: 'Placas Odontológicas - Exemplo'
        }
    ];

    exampleImages.forEach((image, index) => {
        updatePortfolioImage(index, image.url, image.alt);
    });

    console.log('Imagens de exemplo carregadas!');
}

// Função para restaurar placeholders
function restorePlaceholders() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            // Esconder a imagem e mostrar o placeholder
            img.style.display = 'none';
            const placeholder = item.querySelector('.placeholder-image');
            if (placeholder) {
                placeholder.style.display = 'flex';
            }
        }
    });
    console.log('Placeholders restaurados!');
}

// Função para mostrar imagens
function showImages() {
    const portfolioItems = document.querySelectorAll('.portfolio-item');
    portfolioItems.forEach((item, index) => {
        const img = item.querySelector('img');
        if (img) {
            img.style.display = 'block';
            const placeholder = item.querySelector('.placeholder-image');
            if (placeholder) {
                placeholder.style.display = 'none';
            }
        }
    });
    console.log('Imagens mostradas!');
}

console.log('');
console.log('Funções disponíveis:');
console.log('- loadExampleImages() - Carrega imagens de exemplo');
console.log('- restorePlaceholders() - Restaura os placeholders');
console.log('- showImages() - Mostra as imagens');
console.log('- updatePortfolioImage(index, url, alt) - Atualiza uma imagem específica');
