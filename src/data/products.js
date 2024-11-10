export const products = [
  {
    id: 1,
    name: "MacBook Pro",
    price: 1999,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290",
    category: "mac",
    description: "Supercharged by M3 Pro or M3 Max. The most advanced laptop chips ever.",
    specs: [
      "Up to 22 hours battery life",
      "16-inch Liquid Retina XDR display",
      "Up to 128GB unified memory",
      "Space Black or Silver"
    ],
    variants: {
      colors: [
        { name: "Space Black", hex: "#1d1d1f", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-spacegray-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054290" },
        { name: "Silver", hex: "#e3e5e3", image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mbp14-silver-select-202310?wid=904&hei=840&fmt=jpeg&qlt=90&.v=1697311054270" }
      ],
      sizes: [
        { name: "14-inch", price: 1999 },
        { name: "16-inch", price: 2499 }
      ],
      storage: [
        { size: "512GB", price: 0 },
        { size: "1TB", price: 200 },
        { size: "2TB", price: 600 }
      ],
      memory: [
        { size: "16GB", price: 0 },
        { size: "32GB", price: 400 },
        { size: "64GB", price: 800 }
      ]
    }
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-family-select-202309?wid=940&hei=1112&fmt=jpeg&qlt=90&.v=1694968919539",
    category: "iphone",
    description: "Titanium. So strong. So light. So Pro.",
    specs: [
      "6.7-inch Super Retina XDR display",
      "A17 Pro chip",
      "Pro camera system",
      "Titanium design"
    ],
    variants: {
      colors: [
        { 
          name: "Natural Titanium", 
          hex: "#9A9A9A",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-naturaltitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702708"
        },
        { 
          name: "Blue Titanium", 
          hex: "#394A5E",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-bluetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845699311"
        },
        { 
          name: "White Titanium", 
          hex: "#F5F5F0",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-whitetitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845702973"
        },
        { 
          name: "Black Titanium", 
          hex: "#4A4846",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-pro-finish-select-202309-6-7inch-blacktitanium?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692845699341"
        }
      ],
      sizes: [
        { name: "6.1-inch", price: 999 },
        { name: "6.7-inch", price: 1099 }
      ],
      storage: [
        { size: "128GB", price: 0 },
        { size: "256GB", price: 100 },
        { size: "512GB", price: 200 }
      ],
      memory: [
        { size: "6GB", price: 0 },
        { size: "8GB", price: 100 },
        { size: "12GB", price: 200 }
      ]
    }
  },
  {
    id: 3,
    name: "AirPods Pro",
    price: 249,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/MQD83?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1660803972361",
    category: "accessories",
    description: "Up to 2x more Active Noise Cancellation than the previous generation.",
    specs: [
      "Adaptive Audio",
      "Personalized Spatial Audio",
      "Up to 6 hours listening time",
      "MagSafe Charging Case"
    ],
    variants: {
      colors: [
        { name: "White", hex: "#ffffff" },
        { name: "Black", hex: "#000000" }
      ],
      sizes: [
        { name: "S", price: 249 },
        { name: "M", price: 249 },
        { name: "L", price: 249 }
      ],
      storage: [
        { size: "S", price: 249 },
        { size: "M", price: 249 },
        { size: "L", price: 249 }
      ],
      memory: [
        { size: "S", price: 249 },
        { size: "M", price: 249 },
        { size: "L", price: 249 }
      ]
    }
  },
  {
    id: 4,
    name: "Apple Watch Ultra 2",
    price: 799,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-2-49mm-alpine-loop-green-sel-202309?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693271742611",
    category: "watch",
    description: "The most capable Apple Watch pushes every boundary.",
    specs: [
      "49mm titanium case",
      "Always-On Retina display",
      "Up to 36 hours battery life",
      "Precision dual-frequency GPS"
    ],
    variants: {
      colors: [
        { 
          name: "Blue Alpine Loop", 
          hex: "#1C3879",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-2-49mm-alpine-loop-blue-sel-202309?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693271742610"
        },
        { 
          name: "Green Alpine Loop", 
          hex: "#384F3B",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-2-49mm-alpine-loop-green-sel-202309?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693271742611"
        },
        { 
          name: "Orange Alpine Loop", 
          hex: "#D06B48",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-ultra-2-49mm-alpine-loop-orange-sel-202309?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693271742605"
        }
      ],
      sizes: [
        { name: "45mm", price: 799 },
        { name: "49mm", price: 799 }
      ],
      storage: [
        { size: "512GB", price: 0 },
        { size: "1TB", price: 200 },
        { size: "2TB", price: 600 }
      ],
      memory: [
        { size: "16GB", price: 0 },
        { size: "32GB", price: 400 },
        { size: "64GB", price: 800 }
      ]
    }
  },
  {
    id: 5,
    name: "iPad Pro",
    price: 1099,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-pro-13-select-wifi-spacegray-202210?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1664411207213",
    category: "ipad",
    description: "Supercharged by M2. Stunning 12.9-inch Liquid Retina XDR display.",
    specs: [
      "M2 chip",
      "12.9-inch Liquid Retina XDR display",
      "ProMotion technology",
      "Apple Pencil hover"
    ],
    variants: {
      colors: [
        { name: "Space Black", hex: "#1d1d1f" },
        { name: "Silver", hex: "#e3e5e3" }
      ],
      sizes: [
        { name: "11-inch", price: 1099 },
        { name: "12.9-inch", price: 1099 }
      ],
      storage: [
        { size: "128GB", price: 0 },
        { size: "256GB", price: 100 },
        { size: "512GB", price: 200 }
      ],
      memory: [
        { size: "16GB", price: 0 },
        { size: "32GB", price: 400 },
        { size: "64GB", price: 800 }
      ]
    }
  },
  {
    id: 6,
    name: "Mac Studio",
    price: 1999,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/mac-studio-select-202306?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1683931711160",
    category: "mac",
    description: "Staggering performance. Outrageous capability. Endless possibilities.",
    specs: [
      "M2 Ultra or M2 Max",
      "Up to 192GB unified memory",
      "Up to 8TB storage",
      "Advanced connectivity"
    ],
    variants: {
      colors: [
        { name: "Titanium", hex: "#a3a3a3" },
        { name: "Sierra Blue", hex: "#007bff" }
      ],
      sizes: [
        { name: "45mm", price: 1999 },
        { name: "49mm", price: 1999 }
      ],
      storage: [
        { size: "512GB", price: 0 },
        { size: "1TB", price: 200 },
        { size: "2TB", price: 600 }
      ],
      memory: [
        { size: "16GB", price: 0 },
        { size: "32GB", price: 400 },
        { size: "64GB", price: 800 }
      ]
    }
  },
  {
    id: 7,
    name: "iPhone 15",
    price: 799,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923779182",
    category: "iphone",
    description: "New camera. New design. Newphoria.",
    specs: [
      "6.1-inch Super Retina XDR display",
      "Advanced dual-camera system",
      "All-day battery life",
      "USB-C connector"
    ],
    variants: {
      colors: [
        { 
          name: "Pink", 
          hex: "#F8D7C8",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-pink?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923779182"
        },
        { 
          name: "Yellow", 
          hex: "#F7E16E",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-yellow?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777519"
        },
        { 
          name: "Green", 
          hex: "#D5E0D5",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-green?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777566"
        },
        { 
          name: "Blue", 
          hex: "#B8C9D9",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/iphone-15-finish-select-202309-6-1inch-blue?wid=5120&hei=2880&fmt=p-jpg&qlt=80&.v=1692923777467"
        }
      ],
      sizes: [
        { name: "6.1-inch", price: 799 },
        { name: "6.7-inch", price: 1099 }
      ],
      storage: [
        { size: "128GB", price: 0 },
        { size: "256GB", price: 100 },
        { size: "512GB", price: 200 }
      ],
      memory: [
        { size: "6GB", price: 0 },
        { size: "8GB", price: 100 },
        { size: "12GB", price: 200 }
      ]
    }
  },
  {
    id: 8,
    name: "Apple Watch Series 9",
    price: 399,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-hero-202309?wid=1200&hei=630&fmt=jpeg&qlt=95&.v=1693271742739",
    category: "watch",
    description: "Smarter. Brighter. Mightier.",
    specs: [
      "Double tap gesture",
      "Bright display",
      "Health sensors",
      "Carbon neutral"
    ],
    variants: {
      colors: [
        { 
          name: "Midnight", 
          hex: "#1D1D1F",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-unselect-gallery-1-202309_GEO_US?wid=2560&hei=1640&fmt=p-jpg&qlt=80&.v=1693353787698"
        },
        { 
          name: "Starlight", 
          hex: "#E3C5B8",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/watch-s9-unselect-gallery-2-202309?wid=2560&hei=1640&fmt=p-jpg&qlt=80&.v=1693353787754"
        }
      ],
      sizes: [
        { name: "41mm", price: 399 },
        { name: "45mm", price: 399 }
      ],
      storage: [
        { size: "512GB", price: 0 },
        { size: "1TB", price: 200 },
        { size: "2TB", price: 600 }
      ],
      memory: [
        { size: "16GB", price: 0 },
        { size: "32GB", price: 400 },
        { size: "64GB", price: 800 }
      ]
    }
  },
  {
    id: 9,
    name: "iMac",
    price: 1299,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202304?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1677559378395",
    category: "mac",
    description: "Say hello to the new iMac.",
    specs: [
      "24-inch 4.5K Retina display",
      "M3 chip",
      "1080p FaceTime HD camera",
      "Studio-quality mics"
    ],
    variants: {
      colors: [
        { 
          name: "Blue", 
          hex: "#2389C7",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-blue-selection-hero-202304?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1677559378395"
        },
        { 
          name: "Green", 
          hex: "#37B48B",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/imac-24-green-selection-hero-202304?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1677559378449"
        }
      ],
      sizes: [
        { name: "24-inch", price: 1299 },
        { name: "27-inch", price: 1499 }
      ],
      storage: [
        { size: "512GB", price: 0 },
        { size: "1TB", price: 200 },
        { size: "2TB", price: 600 }
      ],
      memory: [
        { size: "16GB", price: 0 },
        { size: "32GB", price: 400 },
        { size: "64GB", price: 800 }
      ]
    }
  },
  {
    id: 10,
    name: "iPad Air",
    price: 599,
    image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1645065732688",
    category: "ipad",
    description: "Light. Bright. Full of might.",
    specs: [
      "10.9-inch Liquid Retina display",
      "M1 chip",
      "12MP Ultra Wide front camera",
      "5G capable"
    ],
    variants: {
      colors: [
        { 
          name: "Blue", 
          hex: "#71A5C5",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-blue-202203?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1645065732688"
        },
        { 
          name: "Purple", 
          hex: "#B8AED9",
          image: "https://store.storeimages.cdn-apple.com/4982/as-images.apple.com/is/ipad-air-select-wifi-purple-202203?wid=800&hei=800&fmt=jpeg&qlt=90&.v=1645065732688"
        }
      ],
      sizes: [
        { name: "10.9-inch", price: 599 },
        { name: "12.9-inch", price: 799 }
      ],
      storage: [
        { size: "64GB", price: 0 },
        { size: "128GB", price: 100 },
        { size: "256GB", price: 200 }
      ],
      memory: [
        { size: "6GB", price: 0 },
        { size: "8GB", price: 100 },
        { size: "12GB", price: 200 }
      ]
    }
  }
]; 