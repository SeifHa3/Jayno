const translations = {
  en: {
    home: 'Home',
    shop: 'Shop',
    contact: 'Contact',
    login: 'Login',
    signup: 'Sign Up',
    logout: 'Logout',
    admin: 'Admin',
    hello: 'Hello',
    shopTitle: 'Our Coffee Selection',
    shopSubtitle: 'Small-batch roasts for every palate — from bright and fruity to bold and earthy.',
    brewingTechnique: 'Brewing Technique',
    roastColor: 'Roast Color',
    allTechniques: 'All Techniques',
    allRoasts: 'All Roasts',
    turkishCoffee: 'Turkish Coffee',
    espressoCoffee: 'Espresso Coffee',
    light: 'Light',
    medium: 'Medium',
    dark: 'Dark',
    addToCart: 'Add to Cart',
    resetAll: 'Reset all',
    noProductsTitle: 'NO PRODUCTS WERE FOUND',
    noProductsMsg: 'Check your spelling or search again with less specific terms.',
    returnToShop: 'RETURN TO SHOP',
    proceedCheckout: 'Proceed to Checkout',
    langToggle: 'العربية'
  },
  ar: {
    home: 'الرئيسية',
    shop: 'المتجر',
    contact: 'تواصل',
    login: 'تسجيل الدخول',
    signup: 'إنشاء حساب',
    logout: 'تسجيل الخروج',
    admin: 'الإدارة',
    hello: 'مرحبا',
    shopTitle: 'تشكيلة قهوتنا',
    shopSubtitle: 'قهوة محمصة بدفعات صغيرة لكل الأذواق — من المنعش إلى الجريء.',
    brewingTechnique: 'طريقة التحضير',
    roastColor: 'درجة التحميص',
    allTechniques: 'كل الطرق',
    allRoasts: 'كل الدرجات',
    turkishCoffee: 'قهوة تركية',
    espressoCoffee: 'قهوة إسبريسو',
    light: 'فاتح',
    medium: 'متوسط',
    dark: 'غامق',
    addToCart: 'أضف إلى السلة',
    resetAll: 'مسح الكل',
    noProductsTitle: 'لم يتم العثور على منتجات',
    noProductsMsg: 'تحقق من الإملاء أو ابحث مرة أخرى بكلمات أقل تحديدا.',
    returnToShop: 'العودة إلى المتجر',
    proceedCheckout: 'إتمام الشراء',
    langToggle: 'English'
  }
};

function getLang() {
  return localStorage.getItem('mrBeansLang') || 'en';
}

function setLang(lang) {
  localStorage.setItem('mrBeansLang', lang);
  applyTranslations();
}

function t(key) {
  const lang = getLang();
  return translations[lang][key] || key;
}

function applyTranslations() {
  const lang = getLang();
  document.documentElement.lang = lang;
  document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';

  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    el.textContent = t(key);
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
    const key = el.getAttribute('data-i18n-placeholder');
    el.placeholder = t(key);
  });

  const langBtn = document.getElementById('lang-toggle');
  if (langBtn) langBtn.textContent = t('langToggle');
}

function toggleLanguage() {
  const newLang = getLang() === 'en' ? 'ar' : 'en';
  setLang(newLang);
  location.reload();
}

document.addEventListener('DOMContentLoaded', function() {
  applyTranslations();

  const nav = document.querySelector('nav');
  if (nav) {
    const btn = document.createElement('button');
    btn.id = 'lang-toggle';
    btn.className = 'lang-toggle-btn';
    btn.textContent = t('langToggle');
    btn.onclick = toggleLanguage;
    nav.appendChild(btn);
  }
});
