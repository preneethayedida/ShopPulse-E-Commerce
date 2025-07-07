// Product Data
const products = [
    {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        price: 3999,
        originalPrice: 4999,
        image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500',
        category: 'Electronics',
        description: 'Premium wireless headphones with noise cancellation and 30-hour battery life. Perfect for music lovers and professionals.',
        features: ['Active Noise Cancellation', '30-hour battery', 'Quick charge', 'Premium sound quality'],
        inStock: true,
        rating: 4.8,
        reviews: 256,
        colors: ['Black', 'White', 'Blue']
    },
    
    {
        id: '2',
        name: 'Organic Cotton T-Shirt',
        price: 1249,
        originalPrice: 1749,
        image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=500&fit=crop',
        category: 'Clothing',
        description: 'Soft, comfortable organic cotton t-shirt available in multiple colors and sizes.',
        features: ['100% Organic Cotton', 'Breathable fabric', 'Pre-shrunk', 'Sustainable'],
        inStock: true,
        rating: 4.4,
        reviews: 94,
        colors: ['White', 'Black', 'Navy', 'Gray'],
        sizes: ['S', 'M', 'L', 'XL']
    },
    {
        id: '3',
        name: 'Leather Messenger Bag',
        price: 4499,
        originalPrice: 5999,
        image: 'https://plus.unsplash.com/premium_photo-1670984076180-22a6c8f27f2b?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8TGVhdGhlciUyMG1lc3NlbmdlciUyMGJhZ3xlbnwwfHwwfHx8MA%3D%3D',
        category: 'Accessories',
        description: 'Genuine leather messenger bag perfect for work or travel. Spacious interior with multiple compartments.',
        features: ['Genuine leather', 'Multiple compartments', 'Adjustable strap', 'Laptop compatible'],
        inStock: true,
        rating: 4.7,
        reviews: 143,
        colors: ['Brown', 'Black', 'Tan']
    },
    {
        id: '4',
        name: 'Ceramic Coffee Mug Set',
        price: 1749,
        originalPrice: 2249,
        image: 'https://images.unsplash.com/photo-1688938675788-657ea207453a?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        category: 'Home & Kitchen',
        description: 'Set of 4 premium ceramic coffee mugs with modern design. Microwave and dishwasher safe.',
        features: ['Set of 4 mugs', 'Microwave safe', 'Dishwasher safe', 'Modern design'],
        inStock: true,
        rating: 4.5,
        reviews: 78,
        colors: ['White', 'Blue', 'Green']
    },
    {
        id: '5',
        name: 'Yoga Exercise Mat',
        price: 1999,
        originalPrice: 2999,
        image: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=500&h=500&fit=crop',
        category: 'Sports & Fitness',
        description: 'Premium yoga mat with superior grip and cushioning. Perfect for yoga, pilates, and floor exercises.',
        features: ['Non-slip surface', 'Extra cushioning', 'Eco-friendly', 'Carrying strap included'],
        inStock: true,
        rating: 4.6,
        reviews: 167,
        colors: ['Purple', 'Pink', 'Blue', 'Green']
    },
    {
        id: '6',
        name: 'Smartphone Stand',
        price: 999,
        originalPrice: 1499,
        image: 'https://images.unsplash.com/photo-1592571148494-08b2c2253556?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fFBob25lJTIwc3RhbmR8ZW58MHx8MHx8fDA%3D',
        category: 'Electronics',
        description: 'Adjustable aluminum smartphone stand compatible with all devices. Perfect for video calls and media consumption.',
        features: ['Adjustable angle', 'Aluminum construction', 'Non-slip base', 'Universal compatibility'],
        inStock: true,
        rating: 4.3,
        reviews: 203,
        colors: ['Silver', 'Black', 'Gold']
    },
    {
        id: '7',
        name: 'Minimalist Wall Clock',
        price: 2499,
        originalPrice: 3499,
        image: 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=500&h=500&fit=crop',
        category: 'Home & Kitchen',
        description: 'Modern minimalist wall clock with silent movement. Perfect for any room decoration.',
        features: ['Silent movement', 'Modern design', 'Easy installation', 'Battery operated'],
        inStock: true,
        rating: 4.4,
        reviews: 89,
        colors: ['White', 'Black', 'Wood']
    },
    
];

// Global State
let currentPage = 'home';
let currentProduct = null;
let cart = JSON.parse(localStorage.getItem('shoppulse-cart')) || [];
let filteredProducts = [...products];
let searchQuery = '';
let currentStep = 1;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    updateCartCount();
    showPage('home');
    loadProducts();
    
    // Setup checkout form
    setupCheckoutForm();
});

// Navigation Functions
function showPage(page) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    
    // Show selected page
    document.getElementById(page + 'Page').classList.add('active');
    
    // Update navigation
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.page === page) {
            link.classList.add('active');
        }
    });
    
    currentPage = page;
    
    // Load page-specific content
    switch(page) {
        case 'shop':
            loadProducts();
            break;
        case 'cart':
            loadCart();
            break;
        case 'checkout':
            loadCheckout();
            break;
    }
    
    // Close mobile menu
    document.getElementById('mobileNav').classList.remove('active');
    
    // Scroll to top
    window.scrollTo(0, 0);
}

function toggleMobileMenu() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('active');
}

// Search Functions
function handleSearch(event) {
    event.preventDefault();
    const searchInput = event.target.querySelector('input');
    searchQuery = searchInput.value.toLowerCase();
    
    if (currentPage !== 'shop') {
        showPage('shop');
    } else {
        filterProducts();
    }
    
    // Update shop title
    const shopTitle = document.getElementById('shopTitle');
    if (searchQuery) {
        shopTitle.textContent = `Search Results for "${searchInput.value}"`;
    } else {
        shopTitle.textContent = 'Shop All Products';
    }
}

// Product Functions
function loadProducts() {
    filterProducts();
}

function filterProducts() {
    const categoryFilter = document.getElementById('categoryFilter').value;
    const priceMin = parseInt(document.getElementById('priceRangeMin').value);
    const priceMax = parseInt(document.getElementById('priceRangeMax').value);
    
    filteredProducts = products.filter(product => {
        const matchesSearch = !searchQuery || 
            product.name.toLowerCase().includes(searchQuery) ||
            product.description.toLowerCase().includes(searchQuery) ||
            product.category.toLowerCase().includes(searchQuery);
        
        const matchesCategory = categoryFilter === 'All' || product.category === categoryFilter;
        const matchesPrice = product.price >= priceMin && product.price <= priceMax;
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    sortProducts();
}

function sortProducts() {
    const sortBy = document.getElementById('sortSelect').value;
    
    switch(sortBy) {
        case 'price-low':
            filteredProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            filteredProducts.sort((a, b) => b.price - a.price);
            break;
        case 'rating':
            filteredProducts.sort((a, b) => b.rating - a.rating);
            break;
        case 'newest':
            filteredProducts.sort((a, b) => parseInt(b.id) - parseInt(a.id));
            break;
        default:
            // Featured - keep original order
            break;
    }
    
    renderProducts();
}

function renderProducts() {
    const productsGrid = document.getElementById('productsGrid');
    const productCount = document.getElementById('productCount');
    
    productCount.textContent = `${filteredProducts.length} products found`;
    
    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = `
            <div class="text-center" style="grid-column: 1 / -1; padding: 4rem 0;">
                <p style="font-size: 1.25rem; color: #6b7280; margin-bottom: 1rem;">No products found matching your criteria.</p>
                <button class="btn btn-primary" onclick="clearFilters()">Clear All Filters</button>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = filteredProducts.map(product => `
        <div class="product-card" onclick="viewProduct('${product.id}')">
            <div class="product-image">
                <img src="${product.image}" alt="${product.name}" loading="lazy">
                ${product.originalPrice ? `<div class="product-badge">Save ₹${product.originalPrice - product.price}</div>` : ''}
                <div class="product-actions">
                    <button class="action-icon" onclick="event.stopPropagation(); viewProduct('${product.id}')">👁️</button>
                </div>
                ${!product.inStock ? '<div class="out-of-stock"><span>Out of Stock</span></div>' : ''}
            </div>
            <div class="product-info">
                <div class="product-meta">
                    <span class="product-category">${product.category}</span>
                    <div class="product-rating">
                        <span>⭐</span>
                        <span>${product.rating} (${product.reviews})</span>
                    </div>
                </div>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <div class="product-footer">
                    <div class="product-price">
                        <span class="current-price">₹${product.price.toLocaleString()}</span>
                        ${product.originalPrice ? `<span class="original-price">₹${product.originalPrice.toLocaleString()}</span>` : ''}
                    </div>
                    <button class="add-to-cart" onclick="event.stopPropagation(); addToCart('${product.id}')" ${!product.inStock ? 'disabled' : ''}>
                        🛒 Add to Cart
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

function viewProduct(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    
    const productDetail = document.getElementById('productDetail');
    productDetail.innerHTML = `
        <div class="product-detail">
            <div class="product-images">
                <div class="main-image">
                    <img src="${currentProduct.image}" alt="${currentProduct.name}">
                </div>
                <div class="thumbnail-gallery">
                    ${Array(4).fill(0).map((_, i) => `
                        <div class="thumbnail">
                            <img src="${currentProduct.image}" alt="${currentProduct.name} view ${i + 1}">
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="product-details">
                <div class="product-header">
                    <span class="product-category">${currentProduct.category}</span>
                    <h1 class="product-title">${currentProduct.name}</h1>
                    <div class="product-rating-detail">
                        <div class="rating-stars">
                            ${Array(5).fill(0).map((_, i) => `
                                <span style="color: ${i < Math.floor(currentProduct.rating) ? '#fbbf24' : '#d1d5db'}">⭐</span>
                            `).join('')}
                        </div>
                        <span class="rating-text">${currentProduct.rating} (${currentProduct.reviews} reviews)</span>
                    </div>
                </div>
                
                <div class="price-section">
                    <span class="price-current">₹${currentProduct.price.toLocaleString()}</span>
                    ${currentProduct.originalPrice ? `
                        <span class="price-original">₹${currentProduct.originalPrice.toLocaleString()}</span>
                        <span class="price-savings">Save ₹${(currentProduct.originalPrice - currentProduct.price).toLocaleString()}</span>
                    ` : ''}
                </div>
                
                ${currentProduct.colors ? `
                    <div class="product-options">
                        <div class="option-group">
                            <label class="option-label">Color: <span id="selectedColor">${currentProduct.colors[0]}</span></label>
                            <div class="option-buttons">
                                ${currentProduct.colors.map(color => `
                                    <button class="option-btn ${color === currentProduct.colors[0] ? 'active' : ''}" 
                                            onclick="selectOption('color', '${color}')">${color}</button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                ${currentProduct.sizes ? `
                    <div class="product-options">
                        <div class="option-group">
                            <label class="option-label">Size: <span id="selectedSize">${currentProduct.sizes[0]}</span></label>
                            <div class="option-buttons">
                                ${currentProduct.sizes.map(size => `
                                    <button class="option-btn ${size === currentProduct.sizes[0] ? 'active' : ''}" 
                                            onclick="selectOption('size', '${size}')">${size}</button>
                                `).join('')}
                            </div>
                        </div>
                    </div>
                ` : ''}
                
                <div class="quantity-section">
                    <label class="option-label">Quantity</label>
                    <div class="quantity-controls">
                        <div class="quantity-input">
                            <button class="quantity-btn" onclick="updateQuantity(-1)">-</button>
                            <span class="quantity-value" id="quantity">1</span>
                            <button class="quantity-btn" onclick="updateQuantity(1)">+</button>
                        </div>
                        <span class="stock-status">${currentProduct.inStock ? 'In Stock' : 'Out of Stock'}</span>
                    </div>
                </div>
                
                <div class="product-actions-detail">
                    <button class="btn-add-cart" onclick="addToCartFromDetail()" ${!currentProduct.inStock ? 'disabled' : ''}>
                        🛒 Add to Cart
                    </button>
                    <button class="btn-icon">❤️</button>
                    <button class="btn-icon">📤</button>
                </div>
                
                <div class="shipping-info">
                    <div class="shipping-item">
                        <span class="shipping-icon">🚚</span>
                        <span>Free shipping on orders over ₹2000</span>
                    </div>
                    <div class="shipping-item">
                        <span class="shipping-icon">🛡️</span>
                        <span>2-year warranty included</span>
                    </div>
                    <div class="shipping-item">
                        <span class="shipping-icon">🔄</span>
                        <span>30-day returns policy</span>
                    </div>
                </div>
            </div>
        </div>
        
        <div class="product-tabs">
            <div class="tab-nav">
                <button class="tab-btn active" onclick="showTab('description')">Description</button>
                <button class="tab-btn" onclick="showTab('features')">Features</button>
                <button class="tab-btn" onclick="showTab('reviews')">Reviews</button>
            </div>
            
            <div class="tab-content">
                <div class="tab-pane active" id="descriptionTab">
                    <p style="color: #374151; line-height: 1.8;">${currentProduct.description}</p>
                </div>
                
                <div class="tab-pane" id="featuresTab">
                    <h3 style="font-size: 1.125rem; font-weight: 600; margin-bottom: 1rem;">Key Features</h3>
                    <div class="features-list">
                        ${currentProduct.features.map(feature => `
                            <div class="feature-item">
                                <div class="feature-bullet"></div>
                                <span style="color: #374151;">${feature}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
                
                <div class="tab-pane" id="reviewsTab">
                    <div class="reviews-summary">
                        <div class="rating-large">${currentProduct.rating}</div>
                        <div class="rating-stars-large">
                            ${Array(5).fill(0).map((_, i) => `
                                <span style="color: ${i < Math.floor(currentProduct.rating) ? '#fbbf24' : '#d1d5db'}; font-size: 1.25rem;">⭐</span>
                            `).join('')}
                        </div>
                        <p class="rating-count">Based on ${currentProduct.reviews} reviews</p>
                    </div>
                    <div style="text-align: center; color: #6b7280; margin-top: 2rem;">
                        <p>Customer reviews will be displayed here.</p>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    showPage('product');
}

function selectOption(type, value) {
    // Update selected option display
    if (type === 'color') {
        document.getElementById('selectedColor').textContent = value;
        document.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.textContent === value && btn.onclick.toString().includes('color')) {
                btn.classList.add('active');
            } else if (btn.onclick.toString().includes('color')) {
                btn.classList.remove('active');
            }
        });
    } else if (type === 'size') {
        document.getElementById('selectedSize').textContent = value;
        document.querySelectorAll('.option-btn').forEach(btn => {
            if (btn.textContent === value && btn.onclick.toString().includes('size')) {
                btn.classList.add('active');
            } else if (btn.onclick.toString().includes('size')) {
                btn.classList.remove('active');
            }
        });
    }
}

function updateQuantity(change) {
    const quantityElement = document.getElementById('quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity = Math.max(1, quantity + change);
    quantityElement.textContent = quantity;
}

function showTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
    document.getElementById(tabName + 'Tab').classList.add('active');
}

// Filter Functions
function toggleFilters() {
    const filters = document.getElementById('filters');
    filters.classList.toggle('active');
}

function updatePriceRange() {
    const minRange = document.getElementById('priceRangeMin');
    const maxRange = document.getElementById('priceRangeMax');
    const minValue = parseInt(minRange.value);
    const maxValue = parseInt(maxRange.value);
    
    // Ensure min doesn't exceed max
    if (minValue > maxValue) {
        minRange.value = maxValue;
    }
    if (maxValue < minValue) {
        maxRange.value = minValue;
    }
    
    document.getElementById('priceMin').textContent = minRange.value;
    document.getElementById('priceMax').textContent = maxRange.value;
    
    filterProducts();
}

function clearFilters() {
    document.getElementById('categoryFilter').value = 'All';
    document.getElementById('priceRangeMin').value = 0;
    document.getElementById('priceRangeMax').value = 5000;
    document.getElementById('priceMin').textContent = '0';
    document.getElementById('priceMax').textContent = '5000';
    searchQuery = '';
    
    // Clear search inputs
    document.querySelectorAll('input[type="text"]').forEach(input => {
        if (input.placeholder.includes('Search')) {
            input.value = '';
        }
    });
    
    filterProducts();
}

// Cart Functions
function addToCart(productId, quantity = 1, selectedColor = null, selectedSize = null) {
    const product = products.find(p => p.id === productId);
    if (!product || !product.inStock) return;
    
    const existingItem = cart.find(item => 
        item.product.id === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );
    
    if (existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.push({
            product,
            quantity,
            selectedColor: selectedColor || (product.colors ? product.colors[0] : null),
            selectedSize: selectedSize || (product.sizes ? product.sizes[0] : null)
        });
    }
    
    saveCart();
    updateCartCount();
    
    // Show success message
    showNotification('Product added to cart!');
}

function addToCartFromDetail() {
    if (!currentProduct) return;
    
    const quantity = parseInt(document.getElementById('quantity').textContent);
    const selectedColor = document.getElementById('selectedColor')?.textContent || null;
    const selectedSize = document.getElementById('selectedSize')?.textContent || null;
    
    addToCart(currentProduct.id, quantity, selectedColor, selectedSize);
}

function removeFromCart(productId, selectedColor = null, selectedSize = null) {
    cart = cart.filter(item => 
        !(item.product.id === productId &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize)
    );
    
    saveCart();
    updateCartCount();
    loadCart();
}

function updateCartQuantity(productId, quantity, selectedColor = null, selectedSize = null) {
    if (quantity <= 0) {
        removeFromCart(productId, selectedColor, selectedSize);
        return;
    }
    
    const item = cart.find(item => 
        item.product.id === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );
    
    if (item) {
        item.quantity = quantity;
        saveCart();
        updateCartCount();
        loadCart();
    }
}

function loadCart() {
    const cartContent = document.getElementById('cartContent');
    
    if (cart.length === 0) {
        cartContent.innerHTML = `
            <div class="cart-empty">
                <div class="cart-empty-icon">🛒</div>
                <h2 style="font-size: 1.5rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem;">Your Cart is Empty</h2>
                <p style="color: #6b7280; margin-bottom: 2rem;">Add some products to your cart to get started!</p>
                <button class="btn btn-primary" onclick="showPage('shop')">Continue Shopping</button>
            </div>
        `;
        return;
    }
    
    const totalPrice = getTotalPrice();
    const shipping = totalPrice > 2000 ? 0 : 199;
    const tax = totalPrice * 0.18; // 18% GST
    const finalTotal = totalPrice + shipping + tax;
    
    cartContent.innerHTML = `
        <div class="cart-content">
            <div class="cart-items">
                ${cart.map((item, index) => `
                    <div class="cart-item">
                        <div class="cart-item-image">
                            <img src="${item.product.image}" alt="${item.product.name}">
                        </div>
                        <div class="cart-item-details">
                            <h3 class="cart-item-name">${item.product.name}</h3>
                            <p class="cart-item-category">${item.product.category}</p>
                            ${item.selectedColor ? `<p class="cart-item-options">Color: ${item.selectedColor}</p>` : ''}
                            ${item.selectedSize ? `<p class="cart-item-options">Size: ${item.selectedSize}</p>` : ''}
                            <p class="cart-item-price">₹${item.product.price.toLocaleString()}</p>
                        </div>
                        <div class="cart-item-controls">
                            <div class="cart-quantity">
                                <button onclick="updateCartQuantity('${item.product.id}', ${item.quantity - 1}, '${item.selectedColor}', '${item.selectedSize}')">-</button>
                                <span>${item.quantity}</span>
                                <button onclick="updateCartQuantity('${item.product.id}', ${item.quantity + 1}, '${item.selectedColor}', '${item.selectedSize}')">+</button>
                            </div>
                            <button class="cart-remove" onclick="removeFromCart('${item.product.id}', '${item.selectedColor}', '${item.selectedSize}')">🗑️</button>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="cart-summary">
                <h3>Order Summary</h3>
                <div class="summary-line">
                    <span>Items (${getTotalItems()})</span>
                    <span>₹${totalPrice.toLocaleString()}</span>
                </div>
                <div class="summary-line">
                    <span>Shipping</span>
                    <span>${shipping === 0 ? 'FREE' : '₹' + shipping.toLocaleString()}</span>
                </div>
                <div class="summary-line">
                    <span>Tax (GST 18%)</span>
                    <span>₹${tax.toLocaleString()}</span>
                </div>
                <div class="summary-line total">
                    <span>Total</span>
                    <span class="amount">₹${finalTotal.toLocaleString()}</span>
                </div>
                
                ${totalPrice < 2000 ? `
                    <div class="shipping-notice">
                        Add ₹${(2000 - totalPrice).toLocaleString()} more for free shipping!
                    </div>
                ` : ''}
                
                <button class="checkout-btn" onclick="showPage('checkout')">Proceed to Checkout</button>
                
                <div class="security-note">
                    Secure checkout powered by SSL encryption
                </div>
            </div>
        </div>
    `;
}

function getTotalItems() {
    return cart.reduce((total, item) => total + item.quantity, 0);
}

function getTotalPrice() {
    return cart.reduce((total, item) => total + (item.product.price * item.quantity), 0);
}

function updateCartCount() {
    const cartCounts = document.querySelectorAll('.cart-count');
    const totalItems = getTotalItems();
    cartCounts.forEach(count => {
        count.textContent = totalItems;
        count.style.display = totalItems > 0 ? 'block' : 'none';
    });
}

function saveCart() {
    localStorage.setItem('shoppulse-cart', JSON.stringify(cart));
}

function clearCart() {
    cart = [];
    saveCart();
    updateCartCount();
}

// Checkout Functions
function loadCheckout() {
    const checkoutSummary = document.getElementById('checkoutSummary');
    const totalPrice = getTotalPrice();
    const shipping = totalPrice > 2000 ? 0 : 199;
    const tax = totalPrice * 0.18;
    const finalTotal = totalPrice + shipping + tax;
    
    checkoutSummary.innerHTML = `
        <div style="margin-bottom: 1.5rem;">
            ${cart.map(item => `
                <div class="summary-item">
                    <img src="${item.product.image}" alt="${item.product.name}">
                    <div class="summary-item-details">
                        <div class="summary-item-name">${item.product.name}</div>
                        <div class="summary-item-qty">Qty: ${item.quantity}</div>
                    </div>
                    <div class="summary-item-price">₹${(item.product.price * item.quantity).toLocaleString()}</div>
                </div>
            `).join('')}
        </div>
        
        <div style="border-top: 1px solid #f3f4f6; padding-top: 1rem;">
            <div class="summary-line">
                <span>Subtotal</span>
                <span>₹${totalPrice.toLocaleString()}</span>
            </div>
            <div class="summary-line">
                <span>Shipping</span>
                <span>${shipping === 0 ? 'FREE' : '₹' + shipping.toLocaleString()}</span>
            </div>
            <div class="summary-line">
                <span>Tax (GST 18%)</span>
                <span>₹${tax.toLocaleString()}</span>
            </div>
            <div class="summary-line total">
                <span>Total</span>
                <span class="amount">₹${finalTotal.toLocaleString()}</span>
            </div>
        </div>
    `;
}

function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    if (checkoutForm) {
        checkoutForm.addEventListener('submit', function(e) {
            e.preventDefault();
            completeOrder();
        });
    }
}

function nextStep() {
    const currentStepElement = document.getElementById(`step${currentStep}`);
    currentStepElement.classList.remove('active');
    
    currentStep++;
    
    const nextStepElement = document.getElementById(`step${currentStep}`);
    nextStepElement.classList.add('active');
}

function prevStep() {
    const currentStepElement = document.getElementById(`step${currentStep}`);
    currentStepElement.classList.remove('active');
    
    currentStep--;
    
    const prevStepElement = document.getElementById(`step${currentStep}`);
    prevStepElement.classList.add('active');
}

function completeOrder() {
    // Generate order details
    const orderId = `SP${Date.now().toString().slice(-6)}`;
    const orderDate = new Date().toLocaleDateString();
    const deliveryDate = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString();
    
    // Update confirmation page
    document.getElementById('orderId').textContent = orderId;
    document.getElementById('orderDate').textContent = orderDate;
    document.getElementById('deliveryDate').textContent = deliveryDate;
    
    // Clear cart
    clearCart();
    
    // Reset checkout form
    currentStep = 1;
    document.querySelectorAll('.form-step').forEach(step => step.classList.remove('active'));
    document.getElementById('step1').classList.add('active');
    
    // Show confirmation page
    showPage('confirmation');
}

// Contact Form
function submitContactForm(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Simulate form submission
    console.log('Contact form submitted:', data);
    
    // Reset form
    event.target.reset();
    
    // Show success message
    showNotification('Thank you for your message! We\'ll get back to you soon.');
}

// Utility Functions
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 2rem;
        right: 2rem;
        background: #059669;
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Add to page
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
            document.head.removeChild(style);
        }, 300);
    }, 3000);
}

// Performance Optimizations
function lazyLoadImages() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('loading');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Debounce function for search
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Add debounced search
const debouncedSearch = debounce(filterProducts, 300);

// Update search inputs to use debounced search
document.addEventListener('DOMContentLoaded', function() {
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach(input => {
        if (input.placeholder.includes('Search')) {
            input.addEventListener('input', function() {
                searchQuery = this.value.toLowerCase();
                if (currentPage === 'shop') {
                    debouncedSearch();
                }
            });
        }
    });
});