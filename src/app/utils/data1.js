export const brands = [
    {
        id: 1,
        name: "Mercury plast",
        type: "Трубы и фитинги",
        contacts: [
            {
                phone: "+99877 258 73 77",
                email: "mercuryplast@mail.ru"
            }
        ],
        image: "/images/brands/1.png",
        social_links: [
            {
                type: "website",
                url: "https://mercuryplast.uz/"
            },
            {
                type: "instagram",
                url: "https://www.instagram.com/mercury_plast/"
            },
            {
                type: "telegram",
                url: "https://t.me/mercuryplastuz"
            }
        ]
    },
    {
        id: 2,
        name: "Zegor",
        type: "Сместители",
        contacts: [
            {
                phone: "+998 94 084 44 04",
                phone_1: "+998 91 798 86 66"
            }
        ],
        image: "/images/brands/2.png",
        social_links: [
            {
                type: "telegram",
                url: "https://t.me/ZEGORtashkent"
            }
        ]
    },
    {
        id: 3,
        name: "DERYA PLASTIK & DERYA KERAMIKA",
        type: "Сантехника",
        image: "/images/brands/3.png",
        social_links: [
            {
                type: "telegram",
                url: "https://t.me/DeryaPlastikRasmiyDiller"
            }
        ]
    },
    {
        id: 4,
        name: "Hydro Plast",
        type: "Трубы и фитинги",
        contacts: [
            {
                phone: "+998 69 233 33 75",
                phone_1: "+998 33 403 33 75",
                phone_2: "+998 33 401 33 75",
            }
        ],
        image: "/images/brands/4.png",
        social_links: [
            {
                type: "instagram",
                url: "https://www.instagram.com/hydro_plast_"
            },
            {
                type: "telegram",
                url: "https://t.me/hydro_plast_bosh_offis"
            }
        ]
    },
    {
        id: 5,
        name: "Climaroom",
        type: "Сантехника и вентиляция",
        contacts: [
            {
                phone: "+998 93 377 00 66",
            }
        ],
        image: "/images/brands/5.png",
        social_links: [
            {
                type: "instagram",
                url: "https://www.instagram.com/climaroom.uzb"
            },
            {
                type: "telegram",
                url: "https://t.me/climaroom"
            }
        ]
    },
    {
        id: 6,
        name: "Fayz Plast",
        type: "Бочки",
        contacts: [
            {
                phone: "+99899 228 44 04",
                phone_1: "+998 99 727 28 00",
                phone_2: " +99891 344 14 00",
            }
        ],
        image: "/images/brands/6.png",
        social_links: [
            {
                type: "instagram",
                url: "https://www.instagram.com/fayz_plast_uzbekistan/"
            },
            {
                type: "telegram",
                url: "https://t.me/fayzplast"
            },
            {
                type: "facebook",
                url: "https://www.facebook.com/people/Fayzplast-Fayzplast/pfbid01NAQcpUkdeDDx1GZ1nCXcwYjYbcpprAwKSJeUoNT6qkv2gCet6QnKCUBS3L2VX25l/?ref=NONE_ig_profile_ac"
            }
        ]
    },
    {
        id: 7,
        name: "AeMarket",
        type: "Ванная и кухня, вода и насосы, отопление, электричество и генераторы",
        contacts: [
            {
                phone: "+38 093 566 28 19",
                email: "aemarket@ukr.net"
            }
        ],
        image: "/images/brands/7.png",
        social_links: [
            {
                type: "instagram",
                url: "https://www.instagram.com/aemarket.com.ua/"
            },
            {
                type: "telegram",
                url: "https://t.me/+380935662819"
            },
            {
                type: "website",
                url: "https://aemarket.com.ua/"
            }
        ]
    },
];
/////////////////////////////////////////////////////////////////////////////////////////
export const products = [
    // Mercury plast
    {
        id: 1,
        name: "Полипропиленовая труба PPR 20мм",
        category: "Трубы",
        brand: "Mercury plast",
        image: "https://source.unsplash.com/600x600/?ppr,pipes"
    },
    {
        id: 2,
        name: "Фитинг уголок 90° PPR",
        category: "Фитинги",
        brand: "Mercury plast",
        image: "https://source.unsplash.com/600x600/?pipe,fittings"
    },

    // Zegor
    {
        id: 3,
        name: "Смеситель для кухни Zegor",
        category: "Смесители",
        brand: "Zegor",
        image: "https://source.unsplash.com/600x600/?kitchen,faucet"
    },
    {
        id: 4,
        name: "Смеситель для ванной с душем",
        category: "Смесители",
        brand: "Zegor",
        image: "https://source.unsplash.com/600x600/?bathroom,shower,faucet"
    },

    // Derya
    {
        id: 5,
        name: "Пластиковая труба канализационная",
        category: "Сантехника",
        brand: "DERYA PLASTIK & DERYA KERAMIKA",
        image: "https://source.unsplash.com/600x600/?drain,pipe"
    },
    {
        id: 6,
        name: "Керамический умывальник",
        category: "Сантехника",
        brand: "DERYA PLASTIK & DERYA KERAMIKA",
        image: "https://source.unsplash.com/600x600/?ceramic,sink"
    },

    // Hydro Plast
    {
        id: 7,
        name: "Труба для холодной воды 25мм",
        category: "Трубы",
        brand: "Hydro Plast",
        image: "https://source.unsplash.com/600x600/?water,pipes"
    },
    {
        id: 8,
        name: "Муфта соединительная",
        category: "Фитинги",
        brand: "Hydro Plast",
        image: "https://source.unsplash.com/600x600/?pipe,connector"
    },

    // Climaroom
    {
        id: 9,
        name: "Вентилятор вытяжной",
        category: "Вентиляция",
        brand: "Climaroom",
        image: "https://source.unsplash.com/600x600/?ventilation,fan"
    },
    {
        id: 10,
        name: "Воздуховод пластиковый",
        category: "Вентиляция",
        brand: "Climaroom",
        image: "https://source.unsplash.com/600x600/?air,duct"
    },

    // Fayz Plast
    {
        id: 11,
        name: "Пластиковая бочка 200л",
        category: "Бочки",
        brand: "Fayz Plast",
        image: "https://source.unsplash.com/600x600/?plastic,barrel"
    },
    {
        id: 12,
        name: "Пластиковая емкость 500л",
        category: "Бочки",
        brand: "Fayz Plast",
        image: "https://source.unsplash.com/600x600/?water,tank"
    },

    // AeMarket
    {
        id: 13,
        name: "Бойлер электрический 80л",
        category: "Отопление",
        brand: "AeMarket",
        image: "https://source.unsplash.com/600x600/?water,heater"
    },
    {
        id: 14,
        name: "Бензиновый генератор 3кВт",
        category: "Электрооборудование",
        brand: "AeMarket",
        image: "https://source.unsplash.com/600x600/?generator"
    },
    {
        id: 15,
        name: "Циркуляционный насос",
        category: "Насосы",
        brand: "AeMarket",
        image: "https://source.unsplash.com/600x600/?water,pump"
    }
];