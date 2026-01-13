/**
 * Underwater Photography Website
 * Main JavaScript - Gallery, Modal, and Stripe Integration
 */

// Photo data - Matches gallery.html
const photoData = {
  1: {
    title: 'Tiger Shark (Galeocerdo cuvier)',
    category: 'Sharks',
    description: 'The tiger shark is named for the dark, vertical stripes found mainly on juveniles. As these sharks mature, the lines begin to fade and almost disappear. Known as the "garbage cans of the sea," tiger sharks are opportunistic feeders with a reputation for eating almost anything.',
    image: 'images/sharks/galeocerdo-cuvier-2.jpg',
    prices: { digital: {}, print: {} }
  },
  2: {
    title: 'Great Hammerhead (Sphyrna mokarran)',
    category: 'Sharks',
    description: 'The great hammerhead is the largest of the nine identified species of hammerhead sharks. Their distinctive head shape, called a cephalofoil, provides superior sensory capabilities and enhanced maneuverability.',
    image: 'images/sharks/sphyrna-mokarran.jpg',
    prices: { digital: {}, print: {} }
  },
  3: {
    title: 'Blotchy Swellshark (Cephaloscyllium umbratile)',
    category: 'Sharks',
    description: 'The blotchy swellshark, also known as the Japanese swellshark, is a species of catshark found in the northwestern Pacific Ocean. Like other swellsharks, it can inflate its body by swallowing water when threatened.',
    image: 'images/sharks/cephaloscyllium-umbratile-web.jpg',
    prices: { digital: {}, print: {} }
  },
  4: {
    title: 'Tiger Shark (Galeocerdo cuvier)',
    category: 'Sharks',
    description: 'A tiger shark cruises through the deep blue, its powerful form silhouetted against the light from above. These apex predators can grow up to 14 feet in length and are found in tropical and temperate waters worldwide.',
    image: 'images/sharks/galeocerdo-cuvier.jpg',
    prices: { digital: {}, print: {} }
  },
  5: {
    title: 'Great Hammerhead (Sphyrna mokarran)',
    category: 'Sharks',
    description: 'A great hammerhead glides effortlessly through the water column. These magnificent sharks use their uniquely shaped heads to pin stingrays, their favorite prey, against the ocean floor.',
    image: 'images/sharks/sphyrna-mokarran-2.jpg',
    prices: { digital: {}, print: {} }
  },
  6: {
    title: 'Banded Houndshark (Triakis scyllium)',
    category: 'Sharks',
    description: 'The banded houndshark is a species of houndshark found in the northwestern Pacific Ocean. It is easily identified by its distinctive dark bands and spots, and is commonly found in shallow coastal waters.',
    image: 'images/sharks/triakis-scyllium.jpg',
    prices: { digital: {}, print: {} }
  },
  7: {
    title: 'Tiger Shark (Galeocerdo cuvier)',
    category: 'Sharks',
    description: 'An up-close encounter with a tiger shark reveals the intricate patterns and powerful build of this remarkable predator. Tiger sharks are known for their curiosity and will often investigate divers.',
    image: 'images/sharks/galeocerdo-cuvier-3.jpg',
    prices: { digital: {}, print: {} }
  },
  8: {
    title: 'Tiger Shark (Galeocerdo cuvier)',
    category: 'Sharks',
    description: 'A tiger shark emerges from the blue depths. These sharks are solitary hunters, typically hunting at night when many of their prey species are more active.',
    image: 'images/sharks/galeocerdo-cuvier-4-web.jpg',
    prices: { digital: {}, print: {} }
  },
  9: {
    title: 'California Horn Shark (Heterodontus francisci)',
    category: 'Sharks',
    description: 'The California horn shark is a small, bottom-dwelling shark found along the coast of California and Mexico. Named for the small horn-like spines in front of each dorsal fin, these nocturnal sharks spend their days resting in rocky crevices.',
    image: 'images/sharks/heterodontus-francisci.jpg',
    prices: { digital: {}, print: {} }
  },
  10: {
    title: 'Mediterranean Violet Aeolid (Flabellina affinis)',
    category: 'Nudibranchs',
    description: 'Flabellina affinis is a stunning species of aeolid nudibranch found in the Mediterranean Sea and eastern Atlantic. Its vibrant purple and orange coloration serves as a warning to predators of its ability to store stinging cells from its hydroid prey.',
    image: 'images/nudibranchs/flabellina-affinis-web.jpg',
    prices: { digital: {}, print: {} }
  },
  11: {
    title: 'Yellow-Tailed Dascyllus (Dascyllus flavicaudus)',
    category: 'Other Marine Life',
    description: 'The yellow-tailed dascyllus is a species of damselfish found in the Indo-Pacific region. These small, hardy fish are often seen hovering in groups above coral heads, quickly retreating into the branches when threatened.',
    image: 'images/other/dascyllus-flavicaudus.jpg',
    prices: { digital: {}, print: {} }
  },
  12: {
    title: 'Spotted Ratfish (Hydrolagus colliei)',
    category: 'Other Marine Life',
    description: 'The spotted ratfish is a chimaera found in the northeastern Pacific Ocean. Related to sharks and rays, these fascinating creatures have large emerald-green eyes that glow in the dark and a venomous spine in front of the dorsal fin.',
    image: 'images/other/hydrolagus-colliei.jpg',
    prices: { digital: {}, print: {} }
  },
  13: {
    title: 'Regal Angelfish (Pygoplites diacanthus)',
    category: 'Other Marine Life',
    description: 'The regal angelfish is one of the most striking fish on coral reefs, with its bold stripes of blue, white, yellow, and orange. Found throughout the Indo-Pacific, these fish are often seen swimming along reef walls and caves.',
    image: 'images/other/pygoplites-diacanthus.jpg',
    prices: { digital: {}, print: {} }
  }
};

// DOM Elements
const modal = document.getElementById('photoModal');
const modalImage = document.getElementById('modalImage');
const modalTitle = document.getElementById('modalTitle');
const modalCategory = document.getElementById('modalCategory');
const modalDescription = document.getElementById('modalDescription');
const productType = document.getElementById('productType');
const digitalOptions = document.getElementById('digitalOptions');
const printOptions = document.getElementById('printOptions');
const digitalSize = document.getElementById('digitalSize');
const printSize = document.getElementById('printSize');
const currentPrice = document.getElementById('currentPrice');
const buyButton = document.getElementById('buyButton');
const closeButton = document.querySelector('.modal-close');

let currentPhotoId = null;

// ============================================
// Header Scroll Effect
// ============================================
window.addEventListener('scroll', () => {
  const header = document.querySelector('header');
  if (window.scrollY > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

// ============================================
// Mobile Menu Toggle
// ============================================
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (menuToggle && navLinks) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });
}

// ============================================
// Gallery Filter
// ============================================
const filterButtons = document.querySelectorAll('.filter-btn');
const photoCards = document.querySelectorAll('.photo-card');

filterButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Update active button
    filterButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    // Filter photos
    photoCards.forEach(card => {
      if (filter === 'all' || card.dataset.category === filter) {
        card.style.display = 'block';
        setTimeout(() => card.style.opacity = '1', 10);
      } else {
        card.style.opacity = '0';
        setTimeout(() => card.style.display = 'none', 300);
      }
    });
  });
});

// ============================================
// Photo Modal
// ============================================
photoCards.forEach(card => {
  card.addEventListener('click', () => {
    const photoId = card.dataset.id;
    openModal(photoId);
  });
});

function openModal(photoId) {
  const photo = photoData[photoId];
  if (!photo) return;

  currentPhotoId = photoId;

  // Populate modal
  modalImage.src = photo.image;
  modalImage.alt = photo.title;
  modalTitle.textContent = photo.title;
  modalCategory.textContent = photo.category;
  modalDescription.textContent = photo.description;

  // Reset to digital option
  productType.value = 'digital';
  showDigitalOptions();
  updatePrice();

  // Show modal
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = '';
  currentPhotoId = null;
}

// Close modal events
if (closeButton) {
  closeButton.addEventListener('click', closeModal);
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}

// Escape key closes modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
    closeModal();
  }
});

// ============================================
// Purchase Options
// ============================================
function showDigitalOptions() {
  if (digitalOptions) digitalOptions.style.display = 'block';
  if (printOptions) printOptions.style.display = 'none';
}

function showPrintOptions() {
  if (digitalOptions) digitalOptions.style.display = 'none';
  if (printOptions) printOptions.style.display = 'block';
}

if (productType) {
  productType.addEventListener('change', () => {
    if (productType.value === 'digital') {
      showDigitalOptions();
    } else {
      showPrintOptions();
    }
    updatePrice();
  });
}

if (digitalSize) {
  digitalSize.addEventListener('change', updatePrice);
}

if (printSize) {
  printSize.addEventListener('change', updatePrice);
}

function updatePrice() {
  let price = 15; // Default

  if (productType && productType.value === 'digital' && digitalSize) {
    const selected = digitalSize.options[digitalSize.selectedIndex];
    price = selected.dataset.price || 15;
  } else if (productType && productType.value === 'print' && printSize) {
    const selected = printSize.options[printSize.selectedIndex];
    price = selected.dataset.price || 45;
  }

  if (currentPrice) {
    currentPrice.textContent = price;
  }
}

// ============================================
// Stripe Checkout Integration
// ============================================

// IMPORTANT: Replace with your Stripe publishable key
// Get this from your Stripe Dashboard > Developers > API keys
const STRIPE_PUBLISHABLE_KEY = 'pk_test_XXXXXXXXXXXXXXXXXXXXXX';

// Initialize Stripe (uncomment when you have your key)
// const stripe = Stripe(STRIPE_PUBLISHABLE_KEY);

if (buyButton) {
  buyButton.addEventListener('click', async () => {
    if (!currentPhotoId) return;

    const photo = photoData[currentPhotoId];
    const type = productType.value;
    let priceId = null;
    let size = null;

    // Get the appropriate Stripe Price ID
    if (type === 'digital') {
      size = digitalSize.value;
      priceId = photo.prices?.digital?.[size];
    } else {
      size = printSize.value;
      priceId = photo.prices?.print?.[size];
    }

    // Check if Stripe is configured
    if (!priceId || priceId.includes('XXXXXX')) {
      // For demo purposes - show setup instructions
      alert(
        'Stripe checkout is not yet configured.\n\n' +
        'To enable purchases:\n' +
        '1. Create a Stripe account at stripe.com\n' +
        '2. Add your photos as Products in Stripe Dashboard\n' +
        '3. Replace the Price IDs in js/main.js\n' +
        '4. Replace the Stripe publishable key\n\n' +
        'Selected: ' + photo.title + '\n' +
        'Type: ' + type + '\n' +
        'Size: ' + size + '\n' +
        'Price: $' + currentPrice.textContent
      );
      return;
    }

    // Redirect to Stripe Checkout
    try {
      buyButton.disabled = true;
      buyButton.textContent = 'Redirecting...';

      const { error } = await stripe.redirectToCheckout({
        lineItems: [{ price: priceId, quantity: 1 }],
        mode: 'payment',
        successUrl: window.location.origin + '/success.html',
        cancelUrl: window.location.href,
      });

      if (error) {
        console.error('Stripe error:', error);
        alert('Something went wrong. Please try again.');
      }
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Unable to process checkout. Please try again.');
    } finally {
      buyButton.disabled = false;
      buyButton.textContent = 'Buy Now';
    }
  });
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ============================================
// Intersection Observer for Animations
// ============================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('slide-up');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe photo cards for animation
document.querySelectorAll('.photo-card').forEach(card => {
  observer.observe(card);
});
